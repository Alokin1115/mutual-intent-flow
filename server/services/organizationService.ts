import { db } from "../storage";
import { organizationDomains } from "../../shared/schema";
import { eq } from "drizzle-orm";

export class OrganizationService {
  // Top universities and companies from your website
  private static readonly VERIFIED_ORGANIZATIONS = [
    // Universities
    { domain: 'harvard.edu', name: 'Harvard University', type: 'university' },
    { domain: 'stanford.edu', name: 'Stanford University', type: 'university' },
    { domain: 'mit.edu', name: 'MIT', type: 'university' },
    { domain: 'berkeley.edu', name: 'UC Berkeley', type: 'university' },
    { domain: 'ox.ac.uk', name: 'Oxford University', type: 'university' },
    { domain: 'cam.ac.uk', name: 'Cambridge University', type: 'university' },
    { domain: 'caltech.edu', name: 'Caltech', type: 'university' },
    { domain: 'princeton.edu', name: 'Princeton University', type: 'university' },
    { domain: 'yale.edu', name: 'Yale University', type: 'university' },
    { domain: 'columbia.edu', name: 'Columbia University', type: 'university' },
    { domain: 'uchicago.edu', name: 'University of Chicago', type: 'university' },
    { domain: 'upenn.edu', name: 'University of Pennsylvania', type: 'university' },
    { domain: 'cornell.edu', name: 'Cornell University', type: 'university' },
    { domain: 'ucla.edu', name: 'UCLA', type: 'university' },
    { domain: 'jhu.edu', name: 'Johns Hopkins University', type: 'university' },
    { domain: 'duke.edu', name: 'Duke University', type: 'university' },
    { domain: 'northwestern.edu', name: 'Northwestern University', type: 'university' },
    { domain: 'nyu.edu', name: 'NYU', type: 'university' },
    { domain: 'umich.edu', name: 'University of Michigan', type: 'university' },
    { domain: 'utoronto.ca', name: 'University of Toronto', type: 'university' },
    { domain: 'imperial.ac.uk', name: 'Imperial College London', type: 'university' },
    { domain: 'ethz.ch', name: 'ETH Zurich', type: 'university' },
    { domain: 'tsinghua.edu.cn', name: 'Tsinghua University', type: 'university' },
    { domain: 'pku.edu.cn', name: 'Peking University', type: 'university' },
    { domain: 'nus.edu.sg', name: 'National University of Singapore', type: 'university' },
    { domain: 'lse.ac.uk', name: 'LSE', type: 'university' },
    { domain: 'cmu.edu', name: 'Carnegie Mellon University', type: 'university' },
    { domain: 'brown.edu', name: 'Brown University', type: 'university' },
    { domain: 'dartmouth.edu', name: 'Dartmouth College', type: 'university' },
    { domain: 'iitb.ac.in', name: 'IIT Bombay', type: 'university' },
    { domain: 'iitd.ac.in', name: 'IIT Delhi', type: 'university' },

    // Companies
    { domain: 'google.com', name: 'Google', type: 'company' },
    { domain: 'meta.com', name: 'Meta', type: 'company' },
    { domain: 'microsoft.com', name: 'Microsoft', type: 'company' },
    { domain: 'apple.com', name: 'Apple', type: 'company' },
    { domain: 'amazon.com', name: 'Amazon', type: 'company' },
    { domain: 'nvidia.com', name: 'Nvidia', type: 'company' },
    { domain: 'tesla.com', name: 'Tesla', type: 'company' },
    { domain: 'openai.com', name: 'OpenAI', type: 'company' },
    { domain: 'ycombinator.com', name: 'Y Combinator', type: 'company' },
    { domain: 'goldmansachs.com', name: 'Goldman Sachs', type: 'company' },
    { domain: 'mckinsey.com', name: 'McKinsey & Company', type: 'company' },
    { domain: 'bain.com', name: 'Bain & Company', type: 'company' },
    { domain: 'bcg.com', name: 'Boston Consulting Group', type: 'company' },
    { domain: 'jpmorganchase.com', name: 'JP Morgan Chase', type: 'company' },
    { domain: 'morganstanley.com', name: 'Morgan Stanley', type: 'company' },
    { domain: 'stripe.com', name: 'Stripe', type: 'company' },
    { domain: 'airbnb.com', name: 'Airbnb', type: 'company' },
    { domain: 'netflix.com', name: 'Netflix', type: 'company' },
    { domain: 'uber.com', name: 'Uber', type: 'company' },
    { domain: 'salesforce.com', name: 'Salesforce', type: 'company' },
    { domain: 'adobe.com', name: 'Adobe', type: 'company' },
    { domain: 'intel.com', name: 'Intel', type: 'company' },
    { domain: 'spacex.com', name: 'SpaceX', type: 'company' },
    { domain: 'palantir.com', name: 'Palantir', type: 'company' },
    { domain: 'linkedin.com', name: 'LinkedIn', type: 'company' },
    { domain: 'dropbox.com', name: 'Dropbox', type: 'company' },
    { domain: 'atlassian.com', name: 'Atlassian', type: 'company' },
    { domain: 'shopify.com', name: 'Shopify', type: 'company' },
    { domain: 'bytedance.com', name: 'ByteDance', type: 'company' },
    { domain: 'tencent.com', name: 'Tencent', type: 'company' },
  ];

  static async initializeOrganizations(): Promise<void> {
    if (!process.env.DATABASE_URL) {
      console.log('Database not configured - using in-memory organization validation');
      return;
    }

    try {
      // Check if organizations are already seeded
      const existingCount = await db.select().from(organizationDomains).execute();
      
      if (existingCount.length === 0) {
        console.log('Seeding organization domains...');
        
        for (const org of this.VERIFIED_ORGANIZATIONS) {
          await db.insert(organizationDomains).values({
            domain: org.domain,
            organizationName: org.name,
            type: org.type,
          }).execute();
        }
        
        console.log(`Seeded ${this.VERIFIED_ORGANIZATIONS.length} organization domains`);
      }
    } catch (error) {
      console.error('Error initializing organizations:', error);
    }
  }

  static async validateOrganizationEmail(email: string): Promise<{ isValid: boolean; organization?: string }> {
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (!domain) {
      return { isValid: false };
    }

    // If no database, use in-memory validation
    if (!process.env.DATABASE_URL) {
      const org = this.VERIFIED_ORGANIZATIONS.find(o => o.domain === domain);
      return {
        isValid: Boolean(org),
        organization: org?.name
      };
    }

    try {
      const organization = await db
        .select()
        .from(organizationDomains)
        .where(eq(organizationDomains.domain, domain))
        .limit(1)
        .execute();

      if (organization.length > 0) {
        return {
          isValid: true,
          organization: organization[0].organizationName,
        };
      }

      return { isValid: false };
    } catch (error) {
      console.error('Error validating organization email:', error);
      // Fallback to in-memory validation
      const org = this.VERIFIED_ORGANIZATIONS.find(o => o.domain === domain);
      return {
        isValid: Boolean(org),
        organization: org?.name
      };
    }
  }

  static extractDomain(email: string): string | null {
    const domain = email.split('@')[1];
    return domain ? domain.toLowerCase() : null;
  }
}