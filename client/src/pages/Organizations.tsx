import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowLeft, Building2, GraduationCap } from "lucide-react";
import { useLocation } from "wouter";

interface Organization {
  name: string;
  domain: string;
  logo: string;
  type: "university" | "company";
}

const Organizations = () => {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrgs, setFilteredOrgs] = useState<Organization[]>([]);
  const [selectedType, setSelectedType] = useState<"all" | "university" | "company">("all");

  // All approved organizations
  const organizations = [
    // Universities
    { name: "Harvard University", domain: "harvard.edu", logo: "/logos/universities/Harvard.png", type: "university" },
    { name: "Stanford University", domain: "stanford.edu", logo: "/logos/universities/Stanford.png", type: "university" },
    { name: "Massachusetts Institute of Technology", domain: "mit.edu", logo: "/logos/universities/MIT.png", type: "university" },
    { name: "University of California, Berkeley", domain: "berkeley.edu", logo: "/logos/universities/UC_Berkeley.png", type: "university" },
    { name: "University of Oxford", domain: "ox.ac.uk", logo: "/logos/universities/Oxford.png", type: "university" },
    { name: "University of Cambridge", domain: "cam.ac.uk", logo: "/logos/universities/Cambridge.png", type: "university" },
    { name: "California Institute of Technology", domain: "caltech.edu", logo: "/logos/universities/Caltech.png", type: "university" },
    { name: "Princeton University", domain: "princeton.edu", logo: "/logos/universities/Princeton.png", type: "university" },
    { name: "Yale University", domain: "yale.edu", logo: "/logos/universities/Yale.png", type: "university" },
    { name: "Columbia University", domain: "columbia.edu", logo: "/logos/universities/Columbia.png", type: "university" },
    { name: "University of Chicago", domain: "uchicago.edu", logo: "/logos/universities/UChicago.png", type: "university" },
    { name: "University of Pennsylvania", domain: "upenn.edu", logo: "/logos/universities/UPenn.png", type: "university" },
    { name: "Cornell University", domain: "cornell.edu", logo: "/logos/universities/Cornell.png", type: "university" },
    { name: "University of California, Los Angeles", domain: "ucla.edu", logo: "/logos/universities/UCLA.png", type: "university" },
    { name: "Johns Hopkins University", domain: "jhu.edu", logo: "/logos/universities/Johns_Hopkins.png", type: "university" },
    { name: "Duke University", domain: "duke.edu", logo: "/logos/universities/Duke.png", type: "university" },
    { name: "Northwestern University", domain: "northwestern.edu", logo: "/logos/universities/Northwestern.png", type: "university" },
    { name: "New York University", domain: "nyu.edu", logo: "/logos/universities/NYU.png", type: "university" },
    { name: "University of Michigan", domain: "umich.edu", logo: "/logos/universities/Michigan.png", type: "university" },
    { name: "University of Toronto", domain: "utoronto.ca", logo: "/logos/universities/Toronto.png", type: "university" },
    { name: "Imperial College London", domain: "imperial.ac.uk", logo: "/logos/universities/Imperial_College_London.png", type: "university" },
    { name: "ETH Zurich", domain: "ethz.ch", logo: "/logos/universities/ETH_Zurich.png", type: "university" },
    { name: "Tsinghua University", domain: "tsinghua.edu.cn", logo: "/logos/universities/Tsinghua.png", type: "university" },
    { name: "Peking University", domain: "pku.edu.cn", logo: "/logos/universities/Peking_University.png", type: "university" },
    { name: "National University of Singapore", domain: "nus.edu.sg", logo: "/logos/universities/National_University_of_Singapore.png", type: "university" },
    { name: "London School of Economics", domain: "lse.ac.uk", logo: "/logos/universities/LSE.png", type: "university" },
    { name: "Carnegie Mellon University", domain: "cmu.edu", logo: "/logos/universities/Carnegie_Mellon.png", type: "university" },
    { name: "Brown University", domain: "brown.edu", logo: "/logos/universities/Brown.png", type: "university" },
    { name: "Dartmouth College", domain: "dartmouth.edu", logo: "/logos/universities/Dartmouth.png", type: "university" },
    { name: "IIT Bombay", domain: "iitb.ac.in", logo: "/logos/universities/IIT_Bombay.png", type: "university" },
    { name: "IIT Delhi", domain: "iitd.ac.in", logo: "/logos/universities/IIT_Delhi.png", type: "university" },
    
    // Companies
    { name: "Google", domain: "google.com", logo: "https://logo.clearbit.com/google.com", type: "company" },
    { name: "Meta", domain: "meta.com", logo: "https://logo.clearbit.com/meta.com", type: "company" },
    { name: "Microsoft", domain: "microsoft.com", logo: "https://logo.clearbit.com/microsoft.com", type: "company" },
    { name: "Apple", domain: "apple.com", logo: "https://logo.clearbit.com/apple.com", type: "company" },
    { name: "Amazon", domain: "amazon.com", logo: "https://logo.clearbit.com/amazon.com", type: "company" },
    { name: "Netflix", domain: "netflix.com", logo: "https://logo.clearbit.com/netflix.com", type: "company" },
    { name: "Tesla", domain: "tesla.com", logo: "https://logo.clearbit.com/tesla.com", type: "company" },
    { name: "OpenAI", domain: "openai.com", logo: "https://logo.clearbit.com/openai.com", type: "company" },
    { name: "Nvidia", domain: "nvidia.com", logo: "https://logo.clearbit.com/nvidia.com", type: "company" },
    { name: "SpaceX", domain: "spacex.com", logo: "https://logo.clearbit.com/spacex.com", type: "company" },
    { name: "Stripe", domain: "stripe.com", logo: "https://logo.clearbit.com/stripe.com", type: "company" },
    { name: "Airbnb", domain: "airbnb.com", logo: "https://logo.clearbit.com/airbnb.com", type: "company" },
    { name: "Uber", domain: "uber.com", logo: "https://logo.clearbit.com/uber.com", type: "company" },
    { name: "Salesforce", domain: "salesforce.com", logo: "https://logo.clearbit.com/salesforce.com", type: "company" },
    { name: "Oracle", domain: "oracle.com", logo: "https://logo.clearbit.com/oracle.com", type: "company" },
    { name: "IBM", domain: "ibm.com", logo: "https://logo.clearbit.com/ibm.com", type: "company" },
    { name: "Adobe", domain: "adobe.com", logo: "https://logo.clearbit.com/adobe.com", type: "company" },
    { name: "Intel", domain: "intel.com", logo: "https://logo.clearbit.com/intel.com", type: "company" },
    { name: "Goldman Sachs", domain: "gs.com", logo: "https://logo.clearbit.com/goldmansachs.com", type: "company" },
    { name: "JPMorgan Chase", domain: "jpmorgan.com", logo: "https://logo.clearbit.com/jpmorganchase.com", type: "company" },
    { name: "McKinsey & Company", domain: "mckinsey.com", logo: "https://logo.clearbit.com/mckinsey.com", type: "company" },
    { name: "Boston Consulting Group", domain: "bcg.com", logo: "https://logo.clearbit.com/bcg.com", type: "company" },
    { name: "Bain & Company", domain: "bain.com", logo: "https://logo.clearbit.com/bain.com", type: "company" },
    { name: "Deloitte", domain: "deloitte.com", logo: "https://logo.clearbit.com/deloitte.com", type: "company" },
    { name: "PwC", domain: "pwc.com", logo: "https://logo.clearbit.com/pwc.com", type: "company" },
    { name: "EY", domain: "ey.com", logo: "https://logo.clearbit.com/ey.com", type: "company" },
    { name: "KPMG", domain: "kpmg.com", logo: "https://logo.clearbit.com/kpmg.com", type: "company" },
    { name: "Palantir", domain: "palantir.com", logo: "https://logo.clearbit.com/palantir.com", type: "company" },
    { name: "Coinbase", domain: "coinbase.com", logo: "https://logo.clearbit.com/coinbase.com", type: "company" },
    { name: "TikTok", domain: "tiktok.com", logo: "https://logo.clearbit.com/tiktok.com", type: "company" },
    { name: "ByteDance", domain: "bytedance.com", logo: "https://logo.clearbit.com/bytedance.com", type: "company" },
  ].sort((a, b) => a.name.localeCompare(b.name)) as Organization[];

  useEffect(() => {
    let filtered = organizations;
    
    if (selectedType !== "all") {
      filtered = filtered.filter(org => org.type === selectedType);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(org => 
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.domain.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredOrgs(filtered);
  }, [searchTerm, selectedType]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <div className="flex-1" />
            <img 
              src="/Mutualbook complete logo.png" 
              alt="MutualBook" 
              className="h-8 w-auto object-contain"
            />
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Approved Organizations
            </h1>
            <p className="text-muted-foreground">
              Browse all {organizations.length} organizations eligible for instant access
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search organizations or domains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedType === "all" ? "default" : "outline"}
              onClick={() => setSelectedType("all")}
              className="flex items-center gap-2"
            >
              All ({organizations.length})
            </Button>
            <Button
              variant={selectedType === "university" ? "default" : "outline"}
              onClick={() => setSelectedType("university")}
              className="flex items-center gap-2"
            >
              <GraduationCap className="h-4 w-4" />
              Universities ({organizations.filter(o => o.type === "university").length})
            </Button>
            <Button
              variant={selectedType === "company" ? "default" : "outline"}
              onClick={() => setSelectedType("company")}
              className="flex items-center gap-2"
            >
              <Building2 className="h-4 w-4" />
              Companies ({organizations.filter(o => o.type === "company").length})
            </Button>
          </div>
        </div>

        {/* Organizations Grid */}
        <div className="grid gap-4">
          {filteredOrgs.length > 0 ? (
            filteredOrgs.map((org, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={org.logo}
                        alt={`${org.name} logo`}
                        className="h-12 w-12 object-contain rounded-lg bg-white p-1"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = org.type === "university" 
                            ? "/logos/universities/default.png" 
                            : "https://via.placeholder.com/48x48/e5e7eb/6b7280?text=" + org.name.charAt(0);
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{org.name}</h3>
                      <p className="text-muted-foreground text-sm">@{org.domain}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Badge variant={org.type === "university" ? "default" : "secondary"}>
                        {org.type === "university" ? "University" : "Company"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">No organizations found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <Card className="bg-muted/20">
            <CardHeader>
              <CardTitle className="text-xl">Don't see your organization?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We're constantly adding new organizations. If your organization isn't listed, 
                you can still join through our waitlist process.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => {
                    const waitlistSection = document.getElementById('waitlist');
                    if (waitlistSection) {
                      setLocation("/");
                      setTimeout(() => {
                        waitlistSection.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      setLocation("/");
                    }
                  }}
                  className="gradient-gold text-black font-semibold"
                >
                  Join Waitlist
                </Button>
                <Button variant="outline" onClick={() => setLocation("/")}>
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Organizations;