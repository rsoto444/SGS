import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DirectoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" style={{ position: "absolute", left: -9999 }}>Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
