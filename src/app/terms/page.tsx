
"use client"; 
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ShieldAlert, UserCheck, Info } from "lucide-react";

export default function TermsPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  const sections = [
    { 
      id: "acceptance",
      title: "1. Acceptance of Terms", 
      icon: FileText,
      content: "By accessing or using the HandyConnect platform (\"Service\"), you agree to be bound by these Terms of Service (\"Terms\"). If you disagree with any part of the terms, then you may not access the Service. Your continued use of the Service following the posting of revised Terms means that you accept and agree to the changes. This is placeholder text, and you should replace it with your actual terms." 
    },
    { 
      id: "serviceDescription",
      title: "2. Description of Service", 
      icon: Info,
      content: "HandyConnect provides an online platform that connects users seeking home services (\"Users\") with independent third-party service providers (\"Providers\"). HandyConnect does not directly provide home services and is not an employer of any Provider. Providers are solely responsible for the services they offer and perform. We facilitate booking, communication, and payments. This is placeholder text." 
    },
    { 
      id: "userAccounts",
      title: "3. User Accounts & Responsibilities", 
      icon: UserCheck,
      content: "To access most features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. You are responsible for safeguarding your password and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account. This is placeholder text." 
    },
    { 
      id: "providerTerms",
      title: "4. Service Provider Obligations", 
      icon: UserCheck,
      content: "Providers agree to accurately represent their skills, qualifications, and services. They must comply with all applicable laws and regulations, maintain necessary licenses and insurance, and perform services to a professional standard. HandyConnect reserves the right to remove Providers from the platform for violations of these terms or poor performance. This is placeholder text." 
    },
    { 
      id: "payment",
      title: "5. Payments, Cancellations, and Refunds", 
      icon: FileText,
      content: "Users agree to pay for the services booked through the platform at the rates displayed. Payment processing services are provided by third-party payment processors. Cancellation and refund policies will be specified at the time of booking and may vary depending on the service and Provider. HandyConnect may charge a service fee, which will be clearly disclosed. This is placeholder text." 
    },
    { 
      id: "limitationLiability",
      title: "6. Limitation of Liability", 
      icon: ShieldAlert,
      content: "To the fullest extent permitted by law, HandyConnect shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising out of your use of the Service or services provided by Providers. Our total liability to you for any claim arising out of these Terms or the Service will not exceed the amount paid by you to HandyConnect in the 12 months preceding the claim. This is placeholder text." 
    },
    { 
      id: "changes",
      title: "7. Modifications to Terms", 
      icon: Info,
      content: "We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the new Terms on the Service or by other means. Your continued use of the Service after such changes constitutes your acceptance of the new Terms. This is placeholder text." 
    },
    { 
      id: "governingLaw",
      title: "8. Governing Law", 
      icon: FileText,
      content: "These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. This is placeholder text." 
    },
    { 
      id: "contact",
      title: "9. Contact Information", 
      icon: Info,
      content: "If you have any questions about these Terms, please contact us at support@handyconnect.example.com. (Replace with your actual contact information). This is placeholder text." 
    }
  ];

  return (
    <div className="bg-background text-foreground">
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <FileText className="h-16 w-16 text-primary mb-6 mx-auto" />
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl !leading-tight">
            Terms of Service
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
                      <section.icon className="h-6 w-6 text-primary" />
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
