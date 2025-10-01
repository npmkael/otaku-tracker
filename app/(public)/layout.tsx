import { Footer } from "./_components/Footer";
import { Navbar } from "./_components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
