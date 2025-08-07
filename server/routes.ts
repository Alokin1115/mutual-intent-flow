import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./storage";
import { organizationInvitations, waitlistSignups, insertOrganizationInvitationSchema, insertWaitlistSignupSchema } from "../shared/schema";
import { EmailService } from "./services/emailService";
import { OrganizationService } from "./services/organizationService";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize organization domains on startup
  await OrganizationService.initializeOrganizations();

  // Organization email invitation endpoint
  app.post("/api/organization-invitation", async (req, res) => {
    try {
      const { email } = insertOrganizationInvitationSchema.parse(req.body);

      // Validate organization email
      const validation = await OrganizationService.validateOrganizationEmail(email);
      if (!validation.isValid) {
        return res.status(400).json({
          error: "Email domain not recognized as a verified organization",
          suggestion: "Try using your official organization email or join our waitlist instead"
        });
      }

      // Check if already exists
      const existing = await db
        .select()
        .from(organizationInvitations)
        .where(eq(organizationInvitations.email, email))
        .limit(1)
        .execute();

      if (existing.length > 0) {
        if (existing[0].isVerified) {
          return res.status(400).json({
            error: "Email already verified",
            message: "This email has already been verified and processed"
          });
        } else {
          return res.status(400).json({
            error: "Verification pending",
            message: "Please check your email for the verification link"
          });
        }
      }

      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');

      // Insert invitation record
      await db.insert(organizationInvitations).values({
        email,
        organization: validation.organization!,
        verificationToken,
      }).execute();

      // Send verification email
      const emailSent = await EmailService.sendVerificationEmail(email, verificationToken, 'organization');

      if (!emailSent) {
        return res.status(500).json({
          error: "Failed to send verification email",
          message: "Please try again later"
        });
      }

      res.json({
        success: true,
        message: "Verification email sent successfully",
        organization: validation.organization
      });

    } catch (error) {
      console.error('Organization invitation error:', error);
      res.status(500).json({
        error: "Internal server error",
        message: "Please try again later"
      });
    }
  });

  // Waitlist signup endpoint
  app.post("/api/waitlist-signup", async (req, res) => {
    try {
      const { name, email, linkedinX, reason } = insertWaitlistSignupSchema.parse(req.body);

      // Check if email already exists
      const existing = await db
        .select()
        .from(waitlistSignups)
        .where(eq(waitlistSignups.email, email))
        .limit(1)
        .execute();

      if (existing.length > 0) {
        if (existing[0].isVerified) {
          return res.status(400).json({
            error: "Email already registered",
            message: "This email is already on our waitlist"
          });
        } else {
          return res.status(400).json({
            error: "Verification pending",
            message: "Please check your email for the verification link"
          });
        }
      }

      // Validate LinkedIn/X URL format
      const urlPattern = /^https?:\/\/(www\.)?(linkedin\.com\/in\/|x\.com\/|twitter\.com\/)/i;
      if (!urlPattern.test(linkedinX)) {
        return res.status(400).json({
          error: "Invalid LinkedIn/X URL",
          message: "Please provide a valid LinkedIn or X (Twitter) profile URL"
        });
      }

      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');

      // Insert waitlist record
      await db.insert(waitlistSignups).values({
        name,
        email,
        linkedinX,
        reason,
        verificationToken,
      }).execute();

      // Send verification email
      const emailSent = await EmailService.sendVerificationEmail(email, verificationToken, 'waitlist');

      if (!emailSent) {
        return res.status(500).json({
          error: "Failed to send verification email",
          message: "Please try again later"
        });
      }

      res.json({
        success: true,
        message: "Verification email sent successfully. Please check your inbox to complete your waitlist registration."
      });

    } catch (error) {
      console.error('Waitlist signup error:', error);
      if (error instanceof Error && error.message.includes('validation')) {
        return res.status(400).json({
          error: "Invalid form data",
          message: "Please check all fields and try again"
        });
      }
      res.status(500).json({
        error: "Internal server error",
        message: "Please try again later"
      });
    }
  });

  // Email verification endpoint
  app.get("/api/verify-email", async (req, res) => {
    try {
      const { token, type } = req.query;

      if (!token || !type || (type !== 'organization' && type !== 'waitlist')) {
        return res.status(400).send(`
          <html>
            <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
              <h2>Invalid Verification Link</h2>
              <p>The verification link is invalid or malformed.</p>
            </body>
          </html>
        `);
      }

      if (type === 'organization') {
        const invitation = await db
          .select()
          .from(organizationInvitations)
          .where(eq(organizationInvitations.verificationToken, token as string))
          .limit(1)
          .execute();

        if (invitation.length === 0) {
          return res.status(404).send(`
            <html>
              <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                <h2>Verification Link Not Found</h2>
                <p>This verification link is invalid or has already been used.</p>
              </body>
            </html>
          `);
        }

        if (invitation[0].isVerified) {
          return res.send(`
            <html>
              <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                <h2>Already Verified</h2>
                <p>This email has already been verified. Welcome to MutualBook!</p>
                <a href="/" style="color: #ec4899;">Return to MutualBook</a>
              </body>
            </html>
          `);
        }

        // Update verification status
        await db
          .update(organizationInvitations)
          .set({
            isVerified: true,
            verifiedAt: new Date(),
            verificationToken: null,
          })
          .where(eq(organizationInvitations.verificationToken, token as string))
          .execute();

        return res.send(`
          <html>
            <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #0a0a0a; color: white;">
              <h2 style="color: #ec4899;">Email Verified Successfully!</h2>
              <p>Welcome to MutualBook, ${invitation[0].organization}!</p>
              <p>Your organization email has been verified. You'll receive your invitation soon.</p>
              <a href="/" style="color: #f59e0b; text-decoration: none; padding: 10px 20px; border: 1px solid #f59e0b; border-radius: 5px;">Return to MutualBook</a>
            </body>
          </html>
        `);

      } else if (type === 'waitlist') {
        const signup = await db
          .select()
          .from(waitlistSignups)
          .where(eq(waitlistSignups.verificationToken, token as string))
          .limit(1)
          .execute();

        if (signup.length === 0) {
          return res.status(404).send(`
            <html>
              <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                <h2>Verification Link Not Found</h2>
                <p>This verification link is invalid or has already been used.</p>
              </body>
            </html>
          `);
        }

        if (signup[0].isVerified) {
          return res.send(`
            <html>
              <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                <h2>Already Verified</h2>
                <p>Your waitlist registration is already verified. We'll notify you about your application status every Friday.</p>
                <a href="/" style="color: #ec4899;">Return to MutualBook</a>
              </body>
            </html>
          `);
        }

        // Update verification status
        await db
          .update(waitlistSignups)
          .set({
            isVerified: true,
            verifiedAt: new Date(),
            verificationToken: null,
          })
          .where(eq(waitlistSignups.verificationToken, token as string))
          .execute();

        return res.send(`
          <html>
            <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #0a0a0a; color: white;">
              <h2 style="color: #ec4899;">Waitlist Registration Verified!</h2>
              <p>Thank you, ${signup[0].name}!</p>
              <p>Your email has been verified and you're now on our waitlist.</p>
              <p>We review applications every Friday. You'll be notified if selected.</p>
              <a href="/" style="color: #f59e0b; text-decoration: none; padding: 10px 20px; border: 1px solid #f59e0b; border-radius: 5px;">Return to MutualBook</a>
            </body>
          </html>
        `);
      }

    } catch (error) {
      console.error('Email verification error:', error);
      res.status(500).send(`
        <html>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h2>Verification Error</h2>
            <p>An error occurred while verifying your email. Please try again later.</p>
          </body>
        </html>
      `);
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);

  return httpServer;
}
