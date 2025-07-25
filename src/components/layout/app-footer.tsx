
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppLogo } from '@/components/icons/app-logo';

export function AppFooter() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const footerLinks = [
    { href: "/about", label: "About Us" },
    { href: "/all-services", label: "Browse Services" },
    { href: "/dashboard/my-services", label: "Offer Your Services" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
  ];

  return (
    <footer className="border-t bg-secondary/30 dark:bg-secondary/10">
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <AppLogo className="h-10 w-10 text-primary" />
              <span className="font-headline text-2xl font-semibold">HandyConnect</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Connecting you with trusted local professionals for all your home service needs. Quick, reliable, and just a click away.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.slice(0,3).map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Support & Legal</h3>
            <ul className="space-y-2">
              {footerLinks.slice(3).map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
               <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors">
                    Contact Us
                  </Link>
                </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear ? currentYear : '...'} HandyConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
