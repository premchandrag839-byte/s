import Section from '../../../components/Section';
import SEO from '../../../components/SEO';
import Footer from '../../../components/Footer';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { achievementsData } from '../../../lib/data/achievements';

export default function HighSchool2025Page() {
  const [active, setActive] = useState(null);
  const list = achievementsData[2025].highSchool;
  const router = useRouter();
  return (
    <div className="font-inter">
      <SEO title="High School Board Exam Toppers (2024–2025)" description="Top 5 high school board exam toppers for 2024–2025." />
      <Section title="High School Board Exam Toppers" subtitle="Batch 2024 – 2025">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 animate-fade-in">
          {list.map((t, i) => (
            <button key={i} onClick={() => setActive(t)} className="rounded-xl border border-blue-100 bg-white p-4 shadow hover:shadow-lg hover:scale-[1.02] transition text-left">
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
      </Section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 flex items-center gap-3">
        <button onClick={() => history.back()} className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark">Back</button>
        <button onClick={() => router.push('/achievements/2025/intermediate')} className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark">Next</button>
      </div>
      <Footer />

      {active && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setActive(null)} />
          <div className="relative z-[101] w-full max-w-md [transform-style:preserve-3d] animate-card-flip">
            <div className="rounded-2xl bg-white shadow-xl border border-blue-100 overflow-hidden">
              <div className="relative h-64 w-full">
                <Image src={active.photo} alt={active.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{active.name}</h3>
                <p className="text-sm text-gray-600">Marks: {active.marks} • Percentage: {active.percent}</p>
                {active.school && <p className="text-xs text-gray-500 mt-1">{active.school}</p>}
                <div className="mt-4 flex justify-end">
                  <button onClick={() => setActive(null)} className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark">Back</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


