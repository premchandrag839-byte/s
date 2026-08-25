import Footer from "../components/Footer";
import Section from "../components/Section";
import SEO from "../components/SEO";
import Image from 'next/image';

export default function SecondaryPage() {
  return (
    <div className="font-inter">
      <SEO title="Secondary (IX - X)" description="Secondary section overview" />
      <Section title="Secondary (IX - X)" subtitle="Mastery, analysis, and preparedness for boards">
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <p className="text-gray-700 leading-relaxed">
            The Secondary Section focuses on comprehensive subject mastery, analytical thinking, and skill enhancement. At this stage, students dive deeper into core subjects while applying concepts through projects, discussions, and practical learning experiences. With a strong emphasis on board examination preparation, we guide students to excel academically, build confidence, and make informed choices for their future academic and career pursuits.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              '/assets/images/academics/secondary/1.jpg',
              '/assets/images/academics/secondary/2.jpg',
              '/assets/images/academics/secondary/3.jpg',
              '/assets/images/academics/secondary/4.jpg',
            ].map((src, i) => (
              <div key={src} className="relative h-32 sm:h-40 w-full rounded-lg overflow-hidden">
                <Image src={src} alt={`Secondary ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </Section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
        <button onClick={() => history.back()} className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark">Back</button>
      </div>
      <Footer />
    </div>
  );
}


