import Head from 'next/head';
import HeroVanta from '../components/HeroVanta';
import Slider from "../components/Slider";
import Section from "../components/Section";
import Footer from "../components/Footer";
import { useState, useEffect } from 'react';
import InteractiveModal from '../components/InteractiveModal';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      key: 'modern-classrooms',
      title: 'Modern Classrooms',
      description: 'More Than 30 classrooms designed for interactive learning, fostering creativity, collaboration, and active student engagement',
      image: '/assets/images/why-us/modern-classrooms.jpg',
    },
    {
      key: 'smart-library',
      title: 'Smart Library',
      description: 'Our Smart library is fully air-conditioned and designed to provide students with a peaceful and comfortable learning environment. With thousands of books, journals, and digital resources, it opens the door to knowledge beyond the classroom. Equipped with cozy seating, an easy-to-use catalog system, and quiet study areas, the library encourages reading habits, research skills, and academic excellence.',
      image: '/assets/images/why-us/smart-library.jpg',
    },
    {
      key: 'qualified-faculty',
      title: 'Qualified Faculty',
      description: 'Our school is proud to have over 30 highly qualified and experienced teachers, dedicated to nurturing each student’s potential. Their expertise and guidance ensure quality education, personal growth, and academic excellence',
      image: '/assets/images/why-us/qualified-faculty.jpg',
    },
    {
      key: 'sports-arts',
      title: 'Sports & Arts',
      description: 'We offer diverse sports and arts programs that promote physical fitness, creativity, and teamwork. From playground to stage, students develop discipline, confidence, and a well-rounded personality.',
      image: '/assets/images/why-us/sports-arts.jpg',
    },
    {
      key: 'nextgen-labs',
      title: 'NextGen Labs',
      description: 'Equipped with modern technology and advanced tools, our NextGen Labs provide hands-on learning in science, technology, and innovation. They inspire curiosity, critical thinking, and practical skills for the future.',
      image: '/assets/images/why-us/nextgen-labs.jpg',
    },
    {
      key: 'playground',
      title: 'Playground',
      description: 'Our large and well-maintained playground encourages physical fitness, teamwork, and sportsmanship. It offers students the space to play, practice, and develop a healthy, active lifestyle.',
      image: '/assets/images/why-us/playground.jpg',
    },
    {
      key: 'transport',
      title: 'Transport',
      description: 'With 20+ well-maintained vehicles, our school provides safe, reliable, and comfortable transport facilities. We ensure timely pick-up and drop-off, making education and activities accessible for every studets.',
      image: '/assets/images/why-us/transport.jpg',
    },
  ];

  const events = [
    {
      key: 'republic-day',
      title: 'Republic Day Celebration',
      description:
        'A grand celebration on 26th January featuring flag hoisting, cultural performances, and patriotic activities to honor our nation’s pride and unity.',
      image: 'https://static.vecteezy.com/system/resources/previews/035/474/898/non_2x/75th-indian-republic-day-26-january-celebration-social-media-post-web-benner-status-wishes-free-vector.jpg',
    },
    {
      key: 'independence-day',
      title: 'Independence Day Celebration',
      description:
        'On 15th August, we celebrate India’s freedom with flag hoisting, cultural programs, and patriotic performances, fostering unity and national pride.',
      image: 'https://s7ap1.scene7.com/is/image/incredibleindia/independence-day-fes-hero?qlt=82&ts=1726639288095',
    },
    {
      key: 'childrens-day',
      title: 'Children’s Day Celebration',
      description:
        'Celebrated on 14th November with fun games, cultural performances, and special activities, honoring the joy, talent, and spirit of our students.',
      image: 'https://www.shutterstock.com/shutterstock/photos/2060707511/display_1500/stock-vector-vector-horizontal-banners-world-children-s-day-with-happy-kids-on-the-cloud-2060707511.jpg',
    },
  ];

  function openFeature(feature) {
    setActiveFeature(feature);
    setModalOpen(true);
  }

  return (
    <div className="font-inter">
      <Head>
        <title>AKASH INTER COLLEGE</title>
        <meta name="description" content="Inspiring excellence in academics, leadership, and character." />
      </Head>
      <HeroVanta /> {/* This adds the animated hero */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6">
        <Slider />
      </div>

      {/* Notice Board */}
      <Section title="Notice Board">
        <HomeNotices />
      </Section>

      <Section title="Why Choose Us" subtitle="Holistic development through academics, sports, and arts.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <motion.button
              key={f.key}
              whileHover={{ y: -6, rotateX: 3, rotateY: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => openFeature(f)}
              style={{ transformStyle: 'preserve-3d' }}
              className="group text-left rounded-2xl p-6 bg-white/50 dark:bg-white/10 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-indigo-500/20 via-sky-400/20 to-emerald-400/20 text-primary flex items-center justify-center mb-3">
                <span className="text-xl">★</span>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{f.description.length > 120 ? f.description.slice(0, 117) + '…' : f.description}</p>
            </motion.button>
          ))}
        </div>
      </Section>

      <Section title="Upcoming Events" subtitle="Stay updated with school activities and announcements.">
        <div className="grid gap-6 md:grid-cols-3">
          {events.map((ev) => (
            <motion.button
              key={ev.key}
              onClick={() => openFeature(ev)}
              whileHover={{ y: -4 }}
              className="group text-left rounded-2xl border border-white/40 bg-white/50 dark:bg-white/10 backdrop-blur-md p-5 shadow-sm hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <div className="relative h-40 w-full overflow-hidden rounded-lg">
                <Image src={ev.image} alt={ev.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h4 className="mt-3 font-semibold text-gray-800 dark:text-gray-100">{ev.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{ev.description.length > 120 ? ev.description.slice(0, 117) + '…' : ev.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 px-3 py-1.5 text-white">
                Learn more
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </motion.button>
          ))}
        </div>
      </Section>

      <Footer />
      <InteractiveModal open={modalOpen} onClose={() => setModalOpen(false)} feature={activeFeature} />
    </div>
  );
}

function HomeNotices() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/notices?page=1&limit=7');
        if (!res.ok) throw new Error('Failed to load notices');
        const json = await res.json();
        setItems(Array.isArray(json.items) ? json.items : []);
      } catch (_) {
        // Gracefully degrade: show "No notices yet." without throwing
        setItems([]);
      }
    }
    load();
  }, []);

  function formatDisplayDate(ymd) {
    if (!ymd) return '';
    const parts = String(ymd).slice(0, 10).split('-');
    if (parts.length === 3) {
      const [yyyy, mm, dd] = parts;
      return `${dd.padStart(2,'0')}/${mm.padStart(2,'0')}/${yyyy}`;
    }
    return String(ymd);
  }

  return (
    <div className="rounded-2xl border border-white/40 bg-white/70 dark:bg-white/10 backdrop-blur p-4 shadow-sm">
      <div className="notice-ticker space-y-3 pr-2 max-h-64 overflow-y-auto overscroll-contain">
        {items.length === 0 && <p className="text-gray-600 dark:text-gray-300">No notices yet.</p>}
        {items.map(n => {
          const isImportant = n.important || /important|urgent/i.test(n.title || '');
          return (
            <div key={n.id} className="border-b last:border-0 border-blue-100/50 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 break-words">{n.title}</h4>
                {isImportant && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400/90 text-black text-[10px] font-semibold px-2 py-0.5">Important</span>
                )}
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2a1 1 0 0 0-1 1v1H5a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-1V3a1 1 0 1 0-2 0v1H8V3a1 1 0 0 0-1-1Zm12 8H5v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8Z"/></svg>
                {formatDisplayDate(n.date)}
              </p>
              {n.description && <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 break-words">{n.description}</p>}
            </div>
          );
        })}
      </div>
      <div className="pt-4">
        <a href="/notices" className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white">
          View All Notices
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  );
}
