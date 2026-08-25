import { useState } from 'react';
import { useRouter } from 'next/router';
import Section from '../components/Section';
import SEO from '../components/SEO';
import Image from 'next/image';

const DATA = [
  {
    key: '2024',
    title: 'Batch 2023 – 2024',
    categories: [
      { key: 'hs', title: 'High School Board Exam Toppers' },
      { key: 'inter', title: 'Intermediate Board Exam Toppers' },
    ],
    toppers: {
      hs: [],
      inter: [],
    }
  },
  {
    key: '2025',
    title: 'Batch 2024 – 2025',
    categories: [
      { key: 'hs', title: 'High School Board Exam Toppers' },
      { key: 'inter', title: 'Intermediate Board Exam Toppers' },
    ],
    toppers: {
      hs: [],
      inter: [],
    }
  }
];

export default function AchievementsPage() {
  const router = useRouter();
  const [openBatch, setOpenBatch] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const [activeTopper, setActiveTopper] = useState(null);

  const selectedBatch = DATA.find(b => b.key === openBatch);
  const toppers = selectedBatch && openCategory ? selectedBatch.toppers[openCategory] : [];

  return (
    <div className="font-inter">
      <SEO title="Our Achievements" description="Board exam toppers and excellence at Akash Inter College." />
      <Section title="Our Achievements">
        <p className="text-center text-gray-600 max-w-3xl mx-auto">
          In the UP Board High School Examination 2025, our students proudly secured 4th, 6th, and 7th ranks in the district. With a remarkable 100% pass rate in the 2024 board examinations, Akash Inter College stands as the top-performing school in the entire Bhitaura block and surrounding region.
        </p>
      </Section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        {/* Batches */}
        <div className="grid gap-6 md:grid-cols-2">
          {DATA.map((b) => (
            <button
              key={b.key}
              onClick={() => {
                if (b.key === '2024') { router.push('/achievements/2024/high-school'); return; }
                if (b.key === '2025') { router.push('/achievements/2025/high-school'); return; }
                setOpenBatch(b.key === openBatch ? null : b.key); setOpenCategory(null);
              }}
              className="rounded-2xl border border-blue-100 bg-white p-8 shadow hover:shadow-lg hover:scale-[1.01] transition text-left"
            >
              <h3 className="text-xl font-semibold text-gray-900">{b.title}</h3>
              <p className="text-sm text-gray-600 mt-1">Click to view toppers</p>
            </button>
          ))}
        </div>

        {/* Categories */}
        {selectedBatch && (
          <div className="mt-8 grid gap-4 md:grid-cols-2 animate-fade-in">
            {selectedBatch.categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setOpenCategory(c.key)}
                className="rounded-xl border border-blue-100 bg-white p-6 shadow hover:shadow-md hover:scale-[1.01] transition text-left"
              >
                <h4 className="font-semibold text-gray-900">{c.title}</h4>
                <p className="text-sm text-gray-600">Tap to see top 5 students</p>
              </button>
            ))}
          </div>
        )}

        {/* Toppers grid */}
        {selectedBatch && openCategory && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 animate-fade-in">
            {toppers.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTopper(t)}
                className="rounded-xl border border-blue-100 bg-white p-4 shadow hover:shadow-lg hover:scale-[1.02] transition text-left"
              >
                <div className="relative h-36 w-full overflow-hidden rounded-lg">
                  <Image src={t.photo} alt={t.name} fill className="object-cover" />
                </div>
                <div className="mt-3">
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-700">Marks: {t.marks}</p>
                  <p className="text-sm text-gray-700">Percentage: {t.percent}</p>
                  {t.school && <p className="text-xs text-gray-500">{t.school}</p>}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal with flip animation */}
      {activeTopper && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setActiveTopper(null)} />
          <div className="relative z-[101] w-full max-w-md [transform-style:preserve-3d] animate-card-flip">
            <div className="rounded-2xl bg-white shadow-xl border border-blue-100 overflow-hidden">
              <div className="relative h-64 w-full">
                <Image src={activeTopper.photo} alt={activeTopper.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{activeTopper.name}</h3>
                <p className="text-sm text-gray-600">Marks: {activeTopper.marks} • Percentage: {activeTopper.percent}</p>
                {activeTopper.school && <p className="text-xs text-gray-500 mt-1">{activeTopper.school}</p>}
                <div className="mt-4 flex justify-end">
                  <button onClick={() => setActiveTopper(null)} className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark">Back</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple keyframes via Tailwind utility classes
// Add these classes to globals.css if needed:
// .animate-fade-in { animation: fadeIn 300ms ease-out both; }
// .animate-card-flip { animation: cardFlip 450ms ease-out both; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(6px) scale(.98); } to { opacity: 1; transform: none; } }
// @keyframes cardFlip { from { transform: rotateY(-90deg); opacity: 0; } to { transform: rotateY(0deg); opacity: 1; } }
