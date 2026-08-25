import Footer from "../components/Footer";
import Section from "../components/Section";
import SEO from "../components/SEO";
import Image from 'next/image';

export default function SeniorSecondaryPage() {
  return (
    <div className="font-inter">
      <SEO title="Senior Secondary (XI - XII)" description="Senior Secondary section overview" />
      <Section title="Senior Secondary (XI - XII)" subtitle="Advanced knowledge and career-focused skills">
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <p className="text-gray-700 leading-relaxed">
            The Senior Secondary Section offers specialized Science streams with Mathematics and Biology options, providing students with in-depth knowledge and research-oriented learning. We emphasize advanced problem-solving, critical analysis, and career-focused skills, ensuring that learners are well-prepared for higher education in prestigious institutions. This stage empowers them to excel in competitive exams, thrive in their chosen fields, and contribute meaningfully to the world of science, technology, and innovation.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              '/assets/images/academics/senior-secondary/1.jpg',
              '/assets/images/academics/senior-secondary/2.jpg',
              '/assets/images/academics/senior-secondary/3.jpg',
              '/assets/images/academics/senior-secondary/4.jpg',
            ].map((src, i) => (
              <div key={src} className="relative h-32 sm:h-40 w-full rounded-lg overflow-hidden">
                <Image src={src} alt={`Senior Secondary ${i + 1}`} fill className="object-cover" />
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


