"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import Image from "next/image";

export default function VerifyRequestPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [emailPending, startEmailPending] = useTransition();
  const params = useSearchParams();
  const email = params.get("email") as string;
  const isOtpValid = otp.length === 6;

  return (
    <>
      <div className="text-center">
        <Link href="/" className="inline-block mb-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="p-2 bg-primary/20 rounded-xl">
              <Image src="/fav-icon.png" alt="logo" width={32} height={32} />
            </div>
            <span className="text-lg font-semibold">Otaku Tracker</span>
          </div>
        </Link>
      </div>

      <Card className="w-full mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Please check your email</CardTitle>
          <CardDescription>
            We have sent a verification code to your email address. Please open
            the email and paste the code below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <InputOTP
              value={otp}
              onChange={(value) => setOtp(value)}
              maxLength={6}
              className="gap-2"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
