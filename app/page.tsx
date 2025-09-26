"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // redirect to login page
          toast.success("Signed out successfully");
        },
        onError: () => {
          toast.error("Failed to sign out");
        },
      },
    });
  }

  return (
    <div className="text-2xl font-bold">
      <ThemeToggle />
      Root
      {session ? (
        <>
          <div>Logged in: {session.user?.email}</div>
          <Button onClick={signOut}>Sign out</Button>
        </>
      ) : (
        <>
          <div>Logged out</div>
          <Link href="/login">Login</Link>
        </>
      )}
    </div>
  );
}
