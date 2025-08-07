import { useState, useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

// Form schemas
const organizationInviteSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type OrganizationInviteForm = z.infer<typeof organizationInviteSchema>;

interface InvitationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvitationDialog({ open, onOpenChange }: InvitationDialogProps) {
  const [activeTab, setActiveTab] = useState("waitlist");
  const [orgEmailSuggestion, setOrgEmailSuggestion] = useState<string | null>(null);
  const [isOrgEmailValidating, setIsOrgEmailValidating] = useState(false);
  const [orgEmailValidationResult, setOrgEmailValidationResult] = useState<any>(null);
  const { toast } = useToast();
  const orgEmailValidationTimeoutRef = useRef<NodeJS.Timeout>();

  // Email validation mutation for dialog
  const dialogEmailValidationMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Validation failed");
      return result;
    },
    onSuccess: (data) => {
      setOrgEmailValidationResult(data);
      // If email needs correction, show suggestion
      if (!data.isValid && data.suggestedFix) {
        setOrgEmailSuggestion(data.suggestedFix);
      } else {
        setOrgEmailSuggestion(null);
      }
      setIsOrgEmailValidating(false);
    },
    onError: (error: Error) => {
      console.warn('Email validation error:', error.message);
      setOrgEmailSuggestion(null);
      setOrgEmailValidationResult(null);
      setIsOrgEmailValidating(false);
    },
  });

  // Handle organization email input changes with debounced validation
  const handleOrgEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setOrgEmailSuggestion(null);
    setOrgEmailValidationResult(null);

    // Clear existing timeout
    if (orgEmailValidationTimeoutRef.current) {
      clearTimeout(orgEmailValidationTimeoutRef.current);
    }

    // Only validate if email looks complete (has @ and domain)
    if (newEmail.includes('@') && newEmail.split('@')[1]?.includes('.')) {
      setIsOrgEmailValidating(true);
      orgEmailValidationTimeoutRef.current = setTimeout(() => {
        dialogEmailValidationMutation.mutate(newEmail);
      }, 500); // Wait 500ms after user stops typing
    }
  }, [dialogEmailValidationMutation]);

  // Organization invite form
  const {
    register: registerOrg,
    handleSubmit: handleSubmitOrg,
    formState: { errors: errorsOrg },
    reset: resetOrg,
    watch: watchOrg,
    setValue: setValueOrg,
  } = useForm<OrganizationInviteForm>({
    resolver: zodResolver(organizationInviteSchema),
  });

  const orgEmailValue = watchOrg("email");



  // Organization invitation mutation
  const orgInviteMutation = useMutation({
    mutationFn: async (data: OrganizationInviteForm) => {
      const response = await fetch("/api/organization-invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(JSON.stringify(result));
      return result;
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message,
        duration: 5000,
      });
      resetOrg();
      onOpenChange(false);
    },
    onError: (error: any) => {
      // Try to parse error response for suggested corrections
      try {
        const errorData = JSON.parse(error.message);
        if (errorData.suggestedEmail) {
          toast({
            title: "Email Domain Issue",
            description: `${errorData.error}. ${errorData.suggestion}`,
            variant: "destructive",
            duration: 8000,
          });
        } else {
          toast({
            title: "Error",
            description: errorData.error || error.message,
            variant: "destructive",
            duration: 5000,
          });
        }
      } catch {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
          duration: 5000,
        });
      }
    },
  });



  const onSubmitOrganization = (data: OrganizationInviteForm) => {
    // If there's a suggestion, use it instead
    const emailToSubmit = orgEmailSuggestion || data.email;
    orgInviteMutation.mutate({ email: emailToSubmit });
  };



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-gray-950 border-gray-800">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text text-transparent">
            MutualBook Access
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Sign in to your account or get an invitation
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900">
            <TabsTrigger value="organization" className="data-[state=active]:bg-pink-600">
              Get Invitation
            </TabsTrigger>
            <TabsTrigger value="waitlist" className="data-[state=active]:bg-blue-600">
              Member Login
            </TabsTrigger>
          </TabsList>

          <TabsContent value="organization" className="space-y-4 mt-6">
            <div className="text-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-white">Instant Access</h3>
              <p className="text-sm text-gray-400">
                Use your organization email from Harvard, Stanford, Google, Meta, etc.
              </p>
            </div>

            <form onSubmit={handleSubmitOrg(onSubmitOrganization)} className="space-y-4">
              <div>
                <Label htmlFor="org-email" className="text-white">Organization Email</Label>
                <div className="relative">
                  <div className="relative">
                    <Input
                      id="org-email"
                      type="email"
                      placeholder="john@stanford.edu"
                      className={`bg-gray-900 border-gray-700 text-white pr-10 ${
                        orgEmailValidationResult?.isValid && !isOrgEmailValidating 
                          ? 'border-green-400/50' 
                          : ''
                      }`}
                      {...registerOrg("email", {
                        onChange: (e) => {
                          handleOrgEmailChange(e);
                        }
                      })}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {isOrgEmailValidating ? (
                        <Loader2 className="h-4 w-4 animate-spin text-accent" />
                      ) : orgEmailValidationResult?.isValid && !orgEmailSuggestion ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : null}
                    </div>
                  </div>
                  {orgEmailSuggestion && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-blue-900/90 backdrop-blur-sm border border-blue-400/30 rounded-md p-2 text-sm z-10">
                      <div className="flex items-center gap-2 text-blue-200">
                        <AlertCircle className="h-4 w-4" />
                        <span>Did you mean: </span>
                        <button
                          type="button"
                          onClick={() => {
                            setValueOrg("email", orgEmailSuggestion);
                            setOrgEmailSuggestion(null);
                            setOrgEmailValidationResult(null);
                          }}
                          className="text-accent hover:text-accent/80 underline font-medium"
                        >
                          {orgEmailSuggestion}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {errorsOrg.email && (
                  <p className="text-red-400 text-sm mt-1">{errorsOrg.email.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={orgInviteMutation.isPending || !orgEmailValue?.includes('@')}
                className="w-full gradient-gold text-black font-semibold hover:scale-105 transition-transform"
              >
                {orgInviteMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Get Instant Access"
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="waitlist" className="space-y-4 mt-6">
            <div className="text-center mb-6">
              <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white text-lg">Member Login</h3>
              <p className="text-sm text-gray-400">
                Access your MutualBook account
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <Label htmlFor="login-email" className="text-white">Email Address</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your-email@organization.com"
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>

              <div>
                <Label htmlFor="login-password" className="text-white">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-gray-800"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <button
                    type="button"
                    className="font-medium text-blue-400 hover:text-blue-300"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold hover:scale-105 transition-transform"
              >
                Sign In
              </Button>
            </form>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("organization")}
                  className="font-medium text-blue-400 hover:text-blue-300"
                >
                  Get an invitation
                </button>
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-4 pt-4 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            By joining, you agree to our terms and privacy policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}