"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Navbar } from "./_components/Navbar";
import { HeroSection } from "./_components/Hero";

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

      {/* Featured Collections Section
      <section className="bg-background py-16 mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Featured Collections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            Collection Card 1
            <div className="group cursor-pointer">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                <img
                  src="/dandadan-poster.webp"
                  alt="Top Rated Anime"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Top Rated Anime
                    </h3>
                    <p className="text-sm text-white/80">
                      Best rated anime of all time
                    </p>
                  </div>
                </div>
              </div>
            </div>

            Collection Card 2
            <div className="group cursor-pointer">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                <img
                  src="/dandadan-poster.webp"
                  alt="Currently Airing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Currently Airing
                    </h3>
                    <p className="text-sm text-white/80">
                      Latest episodes this season
                    </p>
                  </div>
                </div>
              </div>
            </div>

            Collection Card 3
            <div className="group cursor-pointer">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                <img
                  src="/dandadan-poster.webp"
                  alt="Classic Anime"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Classic Anime
                    </h3>
                    <p className="text-sm text-white/80">
                      Timeless masterpieces
                    </p>
                  </div>
                </div>
              </div>
            </div>

            Collection Card 4
            <div className="group cursor-pointer">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                <img
                  src="/dandadan-poster.webp"
                  alt="Action & Adventure"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Action & Adventure
                    </h3>
                    <p className="text-sm text-white/80">
                      Thrilling battles and journeys
                    </p>
                  </div>
                </div>
              </div>
            </div>

            Collection Card 5
            <div className="group cursor-pointer">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                <img
                  src="/dandadan-poster.webp"
                  alt="Romance & Drama"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Romance & Drama
                    </h3>
                    <p className="text-sm text-white/80">
                      Heartfelt stories and emotions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            Collection Card 6
            <div className="group cursor-pointer">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                <img
                  src="/dandadan-poster.webp"
                  alt="Slice of Life"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Slice of Life
                    </h3>
                    <p className="text-sm text-white/80">
                      Everyday moments and charm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}
