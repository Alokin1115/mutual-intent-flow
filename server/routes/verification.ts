import type { Express } from "express";
import { EmailValidationService } from "../services/emailValidationService";
import { OrganizationService } from "../services/organizationService";

export function registerVerificationRoutes(app: Express) {
  // Enhanced email verification endpoint
  app.post("/api/verify-email", async (req, res) => {
    try {
      const { email } = req.body;

      if (!email || typeof email !== 'string') {
        return res.status(400).json({
          error: "Email is required",
          isValid: false
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: "Invalid email format",
          isValid: false
        });
      }

      // Use enhanced validation
      const validation = await OrganizationService.validateOrganizationEmail(email);

      // Return structured response
      res.json({
        isValid: validation.isValid,
        organization: validation.organization || null,
        suggestedFix: validation.suggestedFix || null,
        correctionType: validation.correctionType || null,
        orgStatus: validation.isValid ? "approved" : "unapproved"
      });

    } catch (error) {
      console.error('Email verification error:', error);
      res.status(500).json({
        error: "Internal server error",
        isValid: false
      });
    }
  });

  // Bulk domain validation for admin
  app.post("/api/admin/validate-domains", async (req, res) => {
    try {
      const { emails } = req.body;

      if (!Array.isArray(emails)) {
        return res.status(400).json({
          error: "Emails must be an array"
        });
      }

      const results = await Promise.all(
        emails.map(async (email) => {
          const validation = await OrganizationService.validateOrganizationEmail(email);
          return {
            email,
            ...validation
          };
        })
      );

      res.json({
        results,
        summary: {
          total: results.length,
          valid: results.filter(r => r.isValid).length,
          invalid: results.filter(r => !r.isValid).length,
          withSuggestions: results.filter(r => r.suggestedFix).length
        }
      });

    } catch (error) {
      console.error('Bulk validation error:', error);
      res.status(500).json({
        error: "Internal server error"
      });
    }
  });
}