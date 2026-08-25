import Footer from "../components/Footer";
import Section from "../components/Section";
import SEO from "../components/SEO";
import { useState } from "react";
import { useRouter } from "next/router";
import InteractiveModal from "../components/InteractiveModal";

export default function AcademicsPage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  const classes = [
    {
      name: "Pre-Primary Classes",
      tagline: "Joyful beginnings for young learners",
      desc:
        "A joyful beginning for young learners! Our Play Group, Nursery, LKG, and UKG classes offer a caring space where curiosity grows, creativity thrives, and the foundation for lifelong learning is built.",
      route: "/pre-primary",
    },
    {
      name: "Primary (I - V)",
      tagline: "Strong foundations, joyful learning",
      desc:
        "In the Primary Section, we focus on building strong academic foundations while nurturing creativity, critical thinking, and curiosity. Through interactive lessons, hands-on activities, and value-based learning, students develop essential literacy and numeracy skills along with the confidence to explore the world around them.",
      route: "/primary",
    },
    {
      name: "Middle (VI - VIII)",
      tagline: "Confidence through concepts and skills",
      desc:
        "The Middle Section focuses on deepening subject knowledge while encouraging independent thinking and problem-solving skills. Through interdisciplinary projects, practical learning experiences, and skill-based activities, students gain the confidence and competence needed for future academic success.",
      route: "/middle",
    },
    {
      name: "Secondary (IX - X)",
      tagline: "Mastery, analysis, and board readiness",
      desc:
        "The Secondary Section focuses on comprehensive subject mastery, analytical thinking, and skill enhancement. At this stage, students dive deeper into core subjects while applying concepts through projects, discussions, and practical learning experiences. With a strong emphasis on board examination preparation, we guide students to excel academically, build confidence, and make informed choices for their future academic and career pursuits.",
      route: "/secondary",
    },
    {
      name: "Senior Secondary (XI - XII)",
      tagline: "Advanced knowledge for higher studies",
      desc:
        "The Senior Secondary Section offers specialized Science streams with Mathematics and Biology options, providing students with in-depth knowledge and research-oriented learning. We emphasize advanced problem-solving, critical analysis, and career-focused skills, ensuring that learners are well-prepared for higher education in prestigious institutions. This stage empowers them to excel in competitive exams, thrive in their chosen fields, and contribute meaningfully to the world of science, technology, and innovation.",
      route: "/senior-secondary",
    },
  ];

  function openFeature(item) {
    if (item.route) {
      router.push(item.route);
      return;
    }
  }

  return (
    <div className="font-inter">
      <SEO title="Academics" description="Curriculum, classes offered, and timetable downloads at Akash Inter College." />

      <Section title="Curriculum" subtitle="Comprehensive, inquiry-based learning aligned with national standards.">
        <p className="text-gray-700 max-w-3xl">Our curriculum integrates core subjects with arts, sports, and technology. We encourage critical thinking and hands-on learning through labs, clubs, and field trips.</p>
      </Section>

      <Section title="Classes Offered">
        <div className="grid gap-6 md:grid-cols-2">
          {classes.map((c) => (
            <button
              key={c.name}
              onClick={() => openFeature(c)}
              className="text-left rounded-xl border border-blue-100 p-6 hover:shadow transition focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <h3 className="font-semibold text-gray-800">{c.name}</h3>
              {c.tagline && <p className="text-gray-600 text-sm mt-1">{c.tagline}</p>}
              <p className="text-gray-700 mt-2 line-clamp-2">{c.desc}</p>
              <span className="mt-3 inline-block text-primary hover:underline">Learn more</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Timetable">
        <a href="/assets/sample-timetable.pdf" target="_blank" rel="noopener" download className="inline-flex items-center gap-2 px-5 py-3 rounded bg-primary text-white hover:bg-primary-dark">
          Download Timetable (PDF)
        </a>
        <p className="text-sm text-gray-600 mt-2"> Download From Here</p>
      </Section>

      <Footer />
      <InteractiveModal open={modalOpen} onClose={() => setModalOpen(false)} feature={activeFeature} />
    </div>
  );
}
