import { BookingDetail } from "@/components/BookingDetail";
import { ContactForm } from "@/components/ContactForm";
import { FAQ } from "@/components/FAQ";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Profile } from "@/components/Profile";
import { SectionWave } from "@/components/SectionWave";
import { Services } from "@/components/Services";
import { SiteFooter } from "@/components/SiteFooter";
import { Works } from "@/components/Works";

export default function Home() {
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || undefined;
  const xUrl = process.env.NEXT_PUBLIC_X_URL?.trim() || undefined;
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || undefined;

  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionWave tone="white" />
        <Services />
        <SectionWave tone="warm" flip />
        <BookingDetail />
        <SectionWave tone="white" />
        <Works />
        <SectionWave tone="sky" flip />
        <Process />
        <SectionWave tone="cream" />
        <FAQ />
        <SectionWave tone="warm" flip />
        <Profile />
        <SectionWave tone="white" />
        <ContactForm
          contactEmail={contactEmail}
          xUrl={xUrl}
          instagramUrl={instagramUrl}
        />
        <SectionWave tone="wood" flip />
      </main>
      <SiteFooter />
    </>
  );
}
