
"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Database, UserCog, Share2, Contact } from "lucide-react";

export default function PrivacyPolicyPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);
  
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: ShieldCheck,
      content: "HandyConnect (\"we,\" \"our,\" or \"us\") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by HandyConnect. This Privacy Policy applies to our website, and its associated subdomains (collectively, our \"Service\"). By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy and our Terms of Service. This is placeholder text. Please replace with your actual privacy policy."
    },
    {
      id: "informationCollected",
      title: "2. Information We Collect",
      icon: Database,
      content: "We collect information you provide directly to us, such as when you create an account, book a service, or communicate with us. This may include your name, email address, phone number, postal address, payment information, and details about the services you request. We also collect information automatically when you use our Service, such as your IP address, device type, browser type, operating system, usage data, and location information (if you permit). This is placeholder text."
    },
    {
      id: "howWeUseInformation",
      title: "3. How We Use Your Information",
      icon: UserCog,
      content: "We use the information we collect to: provide, maintain, and improve our Service; process transactions and send related information, including confirmations and invoices; send technical notices, updates, security alerts, and support messages; respond to your comments, questions, and requests; communicate with you about products, services, offers, and events; monitor and analyze trends, usage, and activities in connection with our Service; personalize the Service and provide advertisements, content, or features that match user profiles or interests. This is placeholder text."
    },
    {
      id: "informationSharing",
      title: "4. Sharing of Your Information",
      icon: Share2,
      content: "We may share your information with service providers who need access to such information to carry out work on our behalf (e.g., payment processors, data analytics providers). We may share information with other users as necessary to facilitate service bookings (e.g., sharing your name and address with a Provider). We may also share information if required by law or legal process, or if we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of HandyConnect or others. This is placeholder text."
    },
    {
      id: "dataSecurity",
      title: "5. Data Security",
      icon: ShieldCheck,
      content: "We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable, and we cannot guarantee the security of our systems 100%. This is placeholder text."
    },
    {
      id: "cookies",
      title: "6. Cookies and Tracking Technologies",
      icon: Database,
      content: "We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. This is placeholder text."
    },
    {
      id: "yourChoices",
      title: "7. Your Choices and Rights",
      icon: UserCog,
      content: "You may update, correct, or delete information about you at any time by logging into your account or contacting us. You may opt out of receiving promotional emails from us by following the instructions in those emails. If you opt out, we may still send you non-promotional communications, such as those about your account or our ongoing business relations. This is placeholder text."
    },
    {
      id: "policyChanges",
      title: "8. Changes to This Privacy Policy",
      icon: ShieldCheck,
      content: "We may update this Privacy Policy from time to time. If we make material changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice (such as adding a statement to our homepage or sending you a notification). This is placeholder text."
    },
    {
      id: "contactUs",
      title: "9. Contact Us",
      icon: Contact,
      content: "If you have any questions about this Privacy Policy, please contact us at: privacy@handyconnect.example.com. (Replace with your actual contact information). This is placeholder text."
    }
  ];

  return (
    <div className="bg-background text-foreground">
      <section className="py-20 md:py-28 bg-gradient-to-br from-accent/10 via-background to-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <ShieldCheck className="h-16 w-16 text-accent mb-6 mx-auto" />
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl !leading-tight">
            Privacy Policy
          </h1>
          {lastUpdated && (
            <p className="mt-6 text-lg text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
          )}
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Card className="shadow-xl overflow-hidden">
            <CardContent className="p-6 md:p-10 space-y-8">
              {sections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-20">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="mt-1 p-2 bg-secondary rounded-full">
                      <section.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h2 className="font-headline text-2xl md:text-3xl font-semibold text-foreground">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed pl-14">
                    {section.content}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
