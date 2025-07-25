import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bug, Mail } from "lucide-react";

export default function ReportBugPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                <Bug className="h-12 w-12 text-destructive" />
            </div>
          <CardTitle className="font-headline text-2xl md:text-3xl">Report a Bug</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            We appreciate your help in making HandyConnect a better platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                If you've encountered a bug, please email us with a detailed description of the issue. To help us resolve it quickly, please include what you were doing, what you expected to happen, and what actually happened. Screenshots are also very helpful!
            </p>
             <a href="mailto:bugs@handyconnect.example.com?subject=Bug%20Report%20from%20App">
                <Button variant="destructive" size="lg">
                    <Mail className="mr-2 h-5 w-5" />
                    Compose Bug Report
                </Button>
            </a>
        </CardContent>
      </Card>
    </div>
  );
}
