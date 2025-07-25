
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, KeyRound, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppLogo } from "@/components/icons/app-logo";
import { useAuth } from "@/context/auth-context";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { sendOtp, verifyOtpAndLogin } from "@/lib/actions/user.actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries } from "@/lib/constants";

export default function LoginPage() {
  const [countryDialCode, setCountryDialCode] = useState("+1");
  const [selectedCountryCode, setSelectedCountryCode] = useState("US");
  const [localMobileNumber, setLocalMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fullMobileNumber = countryDialCode + localMobileNumber;

  useEffect(() => {
    if (isMounted) {
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          if (data && data.country_code) {
            const country = countries.find(c => c.code === data.country_code);
            if(country) {
                setSelectedCountryCode(country.code);
                setCountryDialCode(country.dial_code);
            }
          }
        })
        .catch(err => console.error("Could not fetch country code, defaulting.", err));
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted && !isLoading && isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, isLoading, router, isMounted]);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
        timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleCountryChange = (countryCodeValue: string) => {
    const country = countries.find(c => c.code === countryCodeValue);
    if (country) {
        setSelectedCountryCode(country.code);
        setCountryDialCode(country.dial_code);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!localMobileNumber.match(/^\d{7,15}$/)) {
        setErrorMessage("Please enter a valid mobile number (7-15 digits).");
        return;
    }
    
    setIsSubmitting(true);
    try {
        const result = await sendOtp(fullMobileNumber);
        if (result.error) {
            throw new Error(result.error);
        }
        setOtpSent(true);
        setResendCooldown(30);
    } catch (error) {
        setErrorMessage((error as Error).message || "Failed to send OTP. Please check the number and try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!otp.match(/^[0-9]{6}$/)) {
      setErrorMessage("Please enter a valid 6-digit OTP.");
      return;
    }
    setIsSubmitting(true);
    
    try {
      const result = await verifyOtpAndLogin(fullMobileNumber, otp);

      if (result.error) {
        throw new Error(result.error);
      }
      
      router.refresh(); // Invalidate client cache
      router.push('/dashboard'); // Navigate to dashboard
      
    } catch (error) {
      setErrorMessage((error as Error).message || "Login failed. Please try again.");
      setIsSubmitting(false); // Only reset on error
    }
  };
  
  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  if (isLoading) {
    return (
       <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center p-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <Link href="/" className="inline-block mx-auto mb-4">
            <AppLogo className="h-12 w-12 text-primary" />
          </Link>
          <CardTitle className="font-headline text-2xl sm:text-3xl">Welcome to HandyConnect</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {otpSent ? `Enter the OTP sent to ${fullMobileNumber}` : "Login or Sign Up with your mobile number."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Login Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-6">
            {!otpSent ? (
              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="text-base">Mobile Number</Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={selectedCountryCode} onValueChange={handleCountryChange}>
                    <SelectTrigger className="h-12 sm:w-[120px] sm:flex-shrink-0">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(c => <SelectItem key={c.code} value={c.code}>{c.code} ({c.dial_code})</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="mobileNumber"
                      type="tel"
                      placeholder="Your mobile number"
                      value={localMobileNumber}
                      onChange={(e) => setLocalMobileNumber(e.target.value.replace(/\D/g, ''))}
                      required
                      minLength={7}
                      maxLength={15}
                      className="pl-10 h-12"
                      aria-describedby="mobileNumberHelp"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                 <p id="mobileNumberHelp" className="text-xs text-muted-foreground">Your country code is auto-detected. You can change it if needed.</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-base">Enter OTP</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    minLength={6}
                    maxLength={6}
                    className="pl-10 h-12 tracking-[0.3em] text-center" 
                    aria-describedby="otpHelp"
                    disabled={isSubmitting}
                  />
                </div>
                 <div id="otpHelp" className="text-xs text-muted-foreground flex justify-between items-center">
                    <span>
                        OTP sent to {fullMobileNumber}.{' '}
                        <Button variant="link" size="sm" className="p-0 h-auto" onClick={() => { setOtpSent(false); setOtp(""); setErrorMessage(""); }} disabled={isSubmitting} type="button">
                            Change number?
                        </Button>
                    </span>
                    <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto"
                        onClick={handleSendOtp}
                        disabled={isSubmitting || resendCooldown > 0}
                        type="button"
                    >
                        {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP'}
                    </Button>
                 </div>
              </div>
            )}
            <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {isSubmitting ? "Processing..." : (otpSent ? "Verify & Login" : "Send OTP")}
              {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to HandyConnect's <br />
            <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
