import { useState } from "react";
import Footer from "../components/Footer";
import Section from "../components/Section";
import SEO from "../components/SEO";
import Link from "next/link";

export default function AdmissionsPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Please enter a valid email.";
    if (!/^\+?[0-9\s-]{7,15}$/.test(form.phone)) return "Please enter a valid phone number.";
    if (form.message.trim().length < 10) return "Message should be at least 10 characters.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) return setStatus({ type: "error", msg: err });
    setStatus({ type: "loading", msg: "Submitting..." });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Request failed");
      setStatus({ type: "success", msg: "Enquiry submitted!" });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", msg: "Failed to submit. Please try again." });
    }
  }

  return (
    <div className="font-inter">
      <SEO title="Admissions" description="Admission process, fee structure, and enquiry form for Akash Inter College." />

      <Section title="Admission Process" subtitle="Simple steps to join our vibrant community.">
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Submit online enquiry form</li>
          <li>School visit and interaction</li>
          <li>Document verification</li>
          <li>Fee payment and confirmation</li>
        </ol>
      </Section>

      <Section title="Fee Structure">
        <div className="mt-1 overflow-x-auto rounded-2xl border border-white/40 bg-white/70 dark:bg-white/10 backdrop-blur shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-sky-50/60 dark:bg-white/5 text-gray-700 dark:text-gray-200">
                <th className="text-left px-4 py-3 font-medium">Class</th>
                <th className="text-left px-4 py-3 font-medium">Tuition</th>
                <th className="text-left px-4 py-3 font-medium">
                  <span className="inline-flex items-center gap-2">
                    {/* Transport icon */}
                    <svg className="h-4 w-4 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17 3H7a3 3 0 0 0-3 3v10h2a2 2 0 1 0 4 0h6a2 2 0 1 0 4 0h2V9l-3-4a3 3 0 0 0-2.4-1ZM4 10h16v2H4v-2Z"/>
                    </svg>
                    Transport
                  </span>
                </th>
                <th className="text-left px-4 py-3 font-medium">
                  <span className="inline-flex items-center gap-2">
                    {/* Exam icon */}
                    <svg className="h-4 w-4 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 2H8a2 2 0 0 0-2 2v16l6-3 6 3V4a2 2 0 0 0-2-2Z"/>
                    </svg>
                    Exam Fees
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-200">
              {[
                "Pre-Primary",
                "Primary",
                "Middle",
                "Secondary",
                "Senior Secondary",
              ].map((cls, i) => (
                <tr key={cls} className={i % 2 ? "bg-black/0" : "bg-black/0"}>
                  <td className="px-4 py-3 font-medium">{cls}</td>
                  <td className="px-4 py-3">–</td>
                  <td className="px-4 py-3">–</td>
                  <td className="px-4 py-3">–</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">For Fees Enquiry</p>
        <div className="mt-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 px-5 py-2.5 text-white shadow-lg ring-1 ring-white/10 transition-all transform-gpu hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(56,189,248,0.45)]"
          >
            Contact Us
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </Section>

      <Section title="Online Enquiry Form">
        <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full rounded border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your full name" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="mt-1 w-full rounded border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 w-full rounded border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="+1 234 567 890" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea name="message" rows="4" value={form.message} onChange={handleChange} className="mt-1 w-full rounded border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Tell us about the applicant"></textarea>
          </div>
          <button className="inline-flex justify-center items-center gap-2 px-5 py-3 rounded bg-primary text-white hover:bg-primary-dark">Submit Enquiry</button>
          {status && (
            <p className={{
              loading: "text-gray-600",
              error: "text-red-600",
              success: "text-green-600"
            }[status.type]}>{status.msg}</p>
          )}
        </form>
      </Section>

      <Footer />
    </div>
  );
}
