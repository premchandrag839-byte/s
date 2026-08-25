import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Section from "../components/Section";
import SEO from "../components/SEO";

export default function NoticesPage() {
  const [data, setData] = useState({ items: [], total: 0, page: 1, limit: 10 });
  const [loading, setLoading] = useState(true);

  async function load(page = 1) {
    setLoading(true);
    const res = await fetch(`/api/notices?page=${page}&limit=10`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  useEffect(() => { load(1); }, []);

  const totalPages = Math.max(Math.ceil((data.total || 0) / (data.limit || 10)), 1);

  function formatDisplayDate(ymd) {
    if (!ymd) return '';
    const parts = String(ymd).slice(0, 10).split('-');
    if (parts.length === 3) {
      const [yyyy, mm, dd] = parts;
      return `Date: ${dd.padStart(2,'0')}/${mm.padStart(2,'0')}/${yyyy}`;
    }
    return String(ymd);
  }

  return (
    <div className="font-inter">
      <SEO title="Notices" description="All school notices and updates." />
      <Section title="Notices">
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <div className="space-y-4">
            {data.items.map((n) => (
              <div key={n.id} className="rounded-lg border border-blue-100 p-4">
                <h3 className="font-semibold text-gray-800">{n.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{formatDisplayDate(n.date)}</p>
                {n.description && (
                  <p className="text-gray-700 mt-2">{n.description}</p>
                )}
              </div>
            ))}
            <div className="flex items-center justify-center gap-2 pt-4">
              <button disabled={data.page <= 1} onClick={() => load(data.page - 1)} className="px-3 py-2 rounded border border-blue-100 disabled:opacity-50">Prev</button>
              <span className="text-sm text-gray-600">Page {data.page} of {totalPages}</span>
              <button disabled={data.page >= totalPages} onClick={() => load(data.page + 1)} className="px-3 py-2 rounded border border-blue-100 disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </Section>
      <Footer />
    </div>
  );
}


