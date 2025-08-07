export class EmailValidationService {
  // Common email typos dictionary
  private static readonly TYPO_CORRECTIONS: Record<string, string> = {
    // Gmail variations
    'gamil.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'gmial.com': 'gmail.com',
    'gmaol.com': 'gmail.com',
    'gmal.com': 'gmail.com',
    
    // Yahoo variations
    'yaho.com': 'yahoo.com',
    'yahooo.com': 'yahoo.com',
    'yhoo.com': 'yahoo.com',
    'yaioo.com': 'yahoo.com',
    
    // University typos
    'mit.ed': 'mit.edu',
    'stamford.edu': 'stanford.edu',
    'standford.edu': 'stanford.edu',
    'harvad.edu': 'harvard.edu',
    'harward.edu': 'harvard.edu',
    'berkley.edu': 'berkeley.edu',
    'princton.edu': 'princeton.edu',
    'yale.ed': 'yale.edu',
    'columba.edu': 'columbia.edu',
    'corneel.edu': 'cornell.edu',
    
    // Company typos
    'gogle.com': 'google.com',
    'googel.com': 'google.com',
    'googlr.com': 'google.com',
    'microsft.com': 'microsoft.com',
    'microsooft.com': 'microsoft.com',
    'metaa.com': 'meta.com',
    'appl.com': 'apple.com',
    'amazn.com': 'amazon.com',
    'amazom.com': 'amazon.com',
    'tesls.com': 'tesla.com',
    'teslaa.com': 'tesla.com',
  };

  // Levenshtein distance for fuzzy matching
  private static levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i += 1) {
      matrix[0][i] = i;
    }

    for (let j = 0; j <= str2.length; j += 1) {
      matrix[j][0] = j;
    }

    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1, // deletion
          matrix[j - 1][i] + 1, // insertion
          matrix[j - 1][i - 1] + indicator, // substitution
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  // Find closest match using fuzzy matching
  private static findClosestMatch(domain: string, validDomains: string[]): string | null {
    let closestMatch = null;
    let minDistance = Infinity;
    const maxDistance = 2; // Allow up to 2 character differences

    for (const validDomain of validDomains) {
      const distance = this.levenshteinDistance(domain, validDomain);
      if (distance <= maxDistance && distance < minDistance) {
        minDistance = distance;
        closestMatch = validDomain;
      }
    }

    return closestMatch;
  }

  static validateEmailDomain(email: string, validDomains: string[]): {
    isValid: boolean;
    suggestedFix: string | null;
    orgStatus: 'approved' | 'unapproved' | 'typo_corrected';
    originalDomain: string;
    correctedDomain?: string;
  } {
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (!domain) {
      return {
        isValid: false,
        suggestedFix: null,
        orgStatus: 'unapproved',
        originalDomain: '',
      };
    }

    // Check if domain is in approved list
    if (validDomains.includes(domain)) {
      return {
        isValid: true,
        suggestedFix: null,
        orgStatus: 'approved',
        originalDomain: domain,
      };
    }

    // Check for known typos
    if (this.TYPO_CORRECTIONS[domain]) {
      const correctedDomain = this.TYPO_CORRECTIONS[domain];
      const correctedEmail = email.replace(domain, correctedDomain);
      
      return {
        isValid: validDomains.includes(correctedDomain),
        suggestedFix: correctedEmail,
        orgStatus: 'typo_corrected',
        originalDomain: domain,
        correctedDomain,
      };
    }

    // Use fuzzy matching to find close matches
    const closestMatch = this.findClosestMatch(domain, validDomains);
    if (closestMatch) {
      const suggestedEmail = email.replace(domain, closestMatch);
      
      return {
        isValid: false,
        suggestedFix: suggestedEmail,
        orgStatus: 'typo_corrected',
        originalDomain: domain,
        correctedDomain: closestMatch,
      };
    }

    return {
      isValid: false,
      suggestedFix: null,
      orgStatus: 'unapproved',
      originalDomain: domain,
    };
  }

  static extractDomainVariations(domain: string): string[] {
    // Generate common variations for fuzzy matching
    const variations: string[] = [domain];
    
    // Common TLD variations
    if (domain.endsWith('.com')) {
      variations.push(domain.replace('.com', '.edu'));
      variations.push(domain.replace('.com', '.org'));
    } else if (domain.endsWith('.edu')) {
      variations.push(domain.replace('.edu', '.com'));
    }

    // Common letter swaps
    const commonSwaps = [
      ['a', 'e'], ['e', 'i'], ['o', 'u'], ['l', 'r'], ['m', 'n']
    ];

    for (const [from, to] of commonSwaps) {
      if (domain.includes(from)) {
        variations.push(domain.replace(from, to));
      }
      if (domain.includes(to)) {
        variations.push(domain.replace(to, from));
      }
    }

    return Array.from(new Set(variations)); // Remove duplicates
  }
}