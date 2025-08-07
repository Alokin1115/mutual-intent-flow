
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

// Form schema for waitlist wildcard
const waitlistSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  linkedinX: z.string().url("Please enter a valid LinkedIn or X (Twitter) URL"),
  reason: z.string().min(10, "Please provide at least 10 characters explaining why you belong here"),
});

type WaitlistForm = z.infer<typeof waitlistSchema>;

const WaitlistSection = () => {
  const { toast } = useToast();

  // Waitlist form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistForm>({
    resolver: zodResolver(waitlistSchema),
  });

  // Waitlist signup mutation
  const waitlistMutation = useMutation({
    mutationFn: async (data: WaitlistForm) => {
      const response = await fetch("/api/waitlist-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to join waitlist");
      return result;
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message || "You've been added to the waitlist successfully!",
        duration: 5000,
      });
      reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  const onSubmit = (data: WaitlistForm) => {
    waitlistMutation.mutate(data);
  };

  return (
    <section className="py-16 md:py-20 px-4 md:px-6" id="waitlist">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">Waitlist Wild Card</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            For Non-Org Members Who Belong With The Elite
          </p>
        </div>

        <Card className="relative overflow-hidden md:max-w-2xl md:mx-auto">
          {/* Dark Gold Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-orange-600/20"></div>
          
          <CardHeader className="relative text-center">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-accent mb-4 px-2">
              Think You Belong Here?
            </CardTitle>
            <CardDescription className="text-base sm:text-lg text-foreground/80 px-2">
              If you are not from the listed org and think you belong here with elites & high achievers, 
              then pre-register to get your invitation link this week.
            </CardDescription>
          </CardHeader>

          <CardContent className="relative">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Name</label>
                  <Input
                    type="text"
                    className="glass-effect border-accent/30 focus:border-accent min-h-[48px] text-base"
                    placeholder="Your full name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                  <Input
                    type="email"
                    className="glass-effect border-accent/30 focus:border-accent min-h-[48px] text-base"
                    placeholder="your@email.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">LinkedIn/X Link</label>
                <Input
                  type="url"
                  className="glass-effect border-accent/30 focus:border-accent min-h-[48px] text-base"
                  placeholder="https://linkedin.com/in/yourprofile"
                  {...register("linkedinX")}
                />
                {errors.linkedinX && (
                  <p className="text-red-400 text-sm mt-1">{errors.linkedinX.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Why do you belong here?</label>
                <Textarea
                  className="glass-effect border-accent/30 focus:border-accent min-h-[120px] text-base"
                  placeholder="Tell us about your achievements, ambitions, and why you belong with the elite..."
                  {...register("reason")}
                />
                {errors.reason && (
                  <p className="text-red-400 text-sm mt-1">{errors.reason.message}</p>
                )}
              </div>

              <Button 
                type="submit"
                disabled={waitlistMutation.isPending}
                className="w-full gradient-gold text-black font-bold py-4 text-base sm:text-lg glow-gold hover:scale-105 transition-all duration-300 min-h-[56px]"
              >
                {waitlistMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Join the Weekly Waitlist"
                )}
              </Button>
            </form>

            {/* Weekly Curation Notice */}
            <div className="mt-8 text-center">
              <div className="inline-block bg-red-500/20 border border-red-400/30 rounded-xl px-6 py-3">
                <p className="text-red-300 font-semibold">
                  ⚠️ Only &gt;1% get invited each Friday
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Curation Stats */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="text-center glass-effect rounded-xl p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold text-accent mb-2">2,847</div>
            <div className="text-xs md:text-sm text-muted-foreground">Applications This Week</div>
          </div>
          <div className="text-center glass-effect rounded-xl p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">28</div>
            <div className="text-xs md:text-sm text-muted-foreground">Approved Last Friday</div>
          </div>
          <div className="text-center glass-effect rounded-xl p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold text-accent mb-2">1.2%</div>
            <div className="text-xs md:text-sm text-muted-foreground">Acceptance Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;