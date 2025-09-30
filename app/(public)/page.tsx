"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Navbar } from "./_components/Navbar";
import { HeroSection } from "./_components/Hero";
import { CollectionCard } from "./_components/CollectionCard";

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
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      {/* Add responsive spacing for the extended hero section */}
      <div className="h-32 sm:h-40 md:h-48 lg:h-56"></div>

      <section className="bg-background py-16 mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Featured Collections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CollectionCard
              title="The Best Mystical Anime"
              images={[
                "/dandadan-poster.webp",
                "/dandadan-poster.webp",
                "/dandadan-poster.webp",
              ]}
            />
            <CollectionCard
              title="Top 20 Romance Anime"
              images={[
                "/dandadan-poster.webp",
                "/dandadan-poster.webp",
                "/dandadan-poster.webp",
              ]}
            />
            <CollectionCard
              title="The Best Classic Animes"
              images={[
                "/dandadan-poster.webp",
                "/dandadan-poster.webp",
                "/dandadan-poster.webp",
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
