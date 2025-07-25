
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <MessageSquare className="h-16 w-16 text-primary mb-6 mx-auto" />
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl !leading-tight">
            Contact Us
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            We're here to help and answer any questions you might have. We look forward to hearing from you!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-xl text-center">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-4">
                    <Mail className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="font-headline text-3xl">Get in Touch</CardTitle>
                <CardDescription className="text-lg">
                  Have questions? We have answers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions. Reach out and let us know how we can help. Your feedback is important to us.
                </p>
                <a href="mailto:contact@handyconnect.example.com?subject=Contact%20Us%20Inquiry">
                    <Button size="lg" variant="default">
                        <Mail className="mr-2 h-5 w-5" /> Contact Support
                    </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
