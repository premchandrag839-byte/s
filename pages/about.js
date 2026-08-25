import Footer from "../components/Footer";
import Section from "../components/Section";
import SEO from "../components/SEO";
import Image from "next/image";
import { useState } from "react";
import InteractiveModal from "../components/InteractiveModal";

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  const galleryImages = [
    { src: "/assets/images/about-1.jpg", title: "Campus Gallery", description: "" },
    { src: "/assets/images/about-2.jpg", title: "Campus Gallery", description: "" },
    { src: "/assets/images/about-3.jpg", title: "Campus Gallery", description: "" },
    { src: "/assets/images/about-4.jpg", title: "Campus Gallery", description: "" },
  ];

  function openImage(item) {
    setActiveFeature({ title: item.title, description: item.description, image: item.src });
    setModalOpen(true);
  }
  return (
    <div className="font-inter">
      <SEO title="About Us" description="Learn about Akash Inter College's history, vision, mission, and leadership." />

      <Section title="Our Story" subtitle="A legacy of excellence and innovation in education.">
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <p className="text-gray-700 leading-relaxed">Founded in 2008 by Mr. Awadhesh Kumar Gupta, Akash Inter College in Husainganj, Fatehpur has grown to become the leading educational institution in the region. With over 1,900 students and 30+ highly qualified teachers, we are committed to delivering quality education, fostering discipline, and inspiring success for every learner.</p>
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.map((img, i) => (
              <button
                type="button"
                key={i}
                onClick={() => openImage(img)}
                className="relative h-32 sm:h-40 w-full rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <Image src={img.src} alt={`About image ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Vision & Mission">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-blue-100 p-6">
            <h3 className="font-semibold text-gray-800">Vision</h3>
            <p className="text-gray-700 mt-2">To empower students to become compassionate leaders and lifelong learners who positively impact the world.</p>
          </div>
          <div className="rounded-xl border border-blue-100 p-6">
            <h3 className="font-semibold text-gray-800">Mission</h3>
            <p className="text-gray-700 mt-2">To deliver holistic education that fosters intellectual curiosity, creativity, and character through innovative teaching and community engagement.</p>
          </div>
        </div>
      </Section>

		{/* Manager's Message section placed above Principal's section */}
		<Section title="Manager's Message">
			<div className="grid gap-6 md:grid-cols-[200px,1fr] items-start">
				<div className="relative h-48 w-48 rounded-full overflow-hidden mx-auto md:mx-0">
					<Image src="/assets/images/manager.jpg" alt="Mr. Awadhesh Kumar Gupta" fill className="object-cover" />
				</div>
				<div>
					<p className="text-gray-700 leading-relaxed">Welcome to our school community. We are committed to creating a supportive environment where students are encouraged to explore, engage, and excel. Together with our dedicated staff and supportive parents, we strive for continual growth and achievement.</p>
					<p className="mt-2 font-semibold text-gray-800">- Mr. Awadhesh Kumar Gupta (Gudda Sir)</p>
				</div>
			</div>
		</Section>

		<Section title="Principal's Message">
			<div className="grid gap-6 md:grid-cols-[200px,1fr] items-start">
				<div className="relative h-48 w-48 rounded-full overflow-hidden mx-auto md:mx-0">
					<Image src="/assets/images/principal.jpg" alt="Mr. Jitendra Sharma Sir " fill className="object-cover" />
				</div>
				<div>
            <p className="text-gray-700 leading-relaxed">Dear students and parents, welcome to Akash Inter College. We believe in a balanced education that nurtures the mind and heart. Together, we will cultivate a community of respect, responsibility, and resilience.</p>
            <p className="mt-2 font-semibold text-gray-800">-  Ms. Apurva Gupta, Principal</p>
          </div>
        </div>
      </Section>

      <Footer />
      <InteractiveModal open={modalOpen} onClose={() => setModalOpen(false)} feature={activeFeature} />
    </div>
  );
}
