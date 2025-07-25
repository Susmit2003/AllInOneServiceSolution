import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Mail } from "lucide-react";

export default function SuggestFeaturePage() {
  return (
    <div className="container mx-auto max-w-3xl py-12">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Lightbulb className="h-12 w-12 text-primary" />
            </div>
          <CardTitle className="font-headline text-2xl md:text-3xl">Suggest a Feature</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Your feedback is invaluable in shaping the future of HandyConnect.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Have an idea for a new feature or an improvement to an existing one? We would love to hear it! Please send us an email detailing your suggestion. Let us know what problem it would solve and how you see it working.
            </p>
             <a href="mailto:suggestions@handyconnect.example.com?subject=Feature%20Suggestion%20for%20HandyConnect">
                <Button size="lg">
                    <Mail className="mr-2 h-5 w-5" />
                    Email Your Suggestion
                </Button>
            </a>
        </CardContent>
      </Card>
    </div>
  );
}
