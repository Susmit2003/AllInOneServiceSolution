
"use client"; 
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Users, Target, Eye, Building, Zap, ShieldCheck, Smile, Mail } from "lucide-react";
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const [foundedYear, setFoundedYear] = useState<number | null>(null);

  useEffect(() => {
    setFoundedYear(new Date().getFullYear() - 2);
  }, []);

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Building className="h-16 w-16 text-primary mb-6 mx-auto" />
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl !leading-tight">
            About HandyConnect
          </h1>
          <p className="mt-8 text-lg leading-8 text-muted-foreground sm:text-xl max-w-3xl mx-auto">
            We're passionate about connecting skilled local professionals with those who need their expertise, making home services simpler, more reliable, and accessible for everyone.
          </p>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-3xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To empower local service providers by providing a robust platform to connect with customers, manage their services, and grow their business. We strive to make finding and booking home services simple, reliable, and transparent.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="p-6">
                 <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <Eye className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="font-headline text-3xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To be the leading platform for home services, fostering a community where quality workmanship meets convenience, and every home maintenance need is met with trust and excellence, enriching local economies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-headline text-3xl sm:text-4xl font-semibold mb-6">The HandyConnect Story</h2>
                {foundedYear !== null ? (
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                    Founded in {foundedYear}, HandyConnect was born from a simple yet common frustration: the challenge of finding trustworthy and skilled home service professionals quickly and efficiently. We saw an opportunity to bridge this gap.
                </p>
                ) : (
                <div className="h-6 bg-muted rounded w-3/4 animate-pulse mx-auto"></div>
                )}
                <p className="text-muted-foreground text-lg leading-relaxed mt-4">
                Our journey began with a commitment to leveraging technology to simplify lives. What started as a passionate project has evolved into a thriving platform, dedicated to supporting local economies and ensuring every user experience is seamless and satisfactory. We're continuously innovating to serve you better.
                </p>
            </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <header className="text-center mb-12 md:mb-16">
            <h2 className="font-headline text-3xl sm:text-4xl font-semibold">Why HandyConnect?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We're more than just a platform; we're your trusted partner in home services.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Speed & Efficiency", description: "Quickly find and book services with verified professionals in just a few clicks.", dataAiHint: "fast service" },
              { icon: ShieldCheck, title: "Trust & Safety", description: "All service providers are vetted to ensure quality and reliability for your peace of mind.", dataAiHint: "secure platform" },
              { icon: Smile, title: "Customer Focused", description: "Dedicated support and a user-friendly experience designed around your needs.", dataAiHint: "happy customer" },
            ].map((feature, i) => (
              <Card key={i} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className={`mb-4 inline-flex items-center justify-center p-4 rounded-full ${i % 2 === 0 ? 'bg-primary/10' : 'bg-accent/10'}`}>
                  <feature.icon className={`h-10 w-10 ${i % 2 === 0 ? 'text-primary' : 'text-accent'}`} />
                </div>
                <CardTitle className="font-headline text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-xl text-center">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-4">
                    <Mail className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="font-headline text-3xl">Get in Touch</CardTitle>
                <CardDescription className="text-lg">
                  We’re here to help and answer any questions you might have.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions. Reach out and let us know how we can help.
                </p>
                <a href="mailto:contact@handyconnect.example.com?subject=Contact%20Us%20Inquiry">
                    <Button size="lg" variant="outline" className="text-base">
                        <Mail className="mr-2 h-5 w-5" /> Contact Support
                    </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section (Placeholder) */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Users className="h-12 w-12 text-primary mb-6 mx-auto" />
          <h2 className="font-headline text-3xl sm:text-4xl font-semibold mb-4">Meet Our (Placeholder) Team</h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto mb-12">
            Our dedicated team is the driving force behind HandyConnect, committed to innovation and excellence in connecting you with the best local services.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Alex Johnson", role: "Founder & CEO", hint: "ceo portrait" },
              { name: "Maria Garcia", role: "Head of Product", hint: "product manager" },
              { name: "Sam Lee", role: "Lead Engineer", hint: "software engineer" },
            ].map((member, i) => (
              <Card key={i} className="shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden mb-5 border-4 border-primary/20 group-hover:border-primary/40 transition-all">
                    <Image src={`https://placehold.co/200x200.png`} alt={member.name} layout="fill" objectFit="cover" data-ai-hint={member.hint} />
                  </div>
                  <CardTitle className="font-headline text-xl mb-1">{member.name}</CardTitle>
                  <CardDescription className="text-primary">{member.role}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
