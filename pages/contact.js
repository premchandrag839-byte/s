import { useState } from "react";
import Footer from "../components/Footer";
import Section from "../components/Section";
import SEO from "../components/SEO";
import { site } from "../config/site";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError('Could not send your message. Please try again.');
    }
  }

  return (
    <div className="font-inter">
      <SEO title="Contact" description={`Contact ${site.name} – ${site.address}. PHONE.NO- ${site.phone}`} />

      <Section title="Find Us">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <div className="h-[360px] sm:h-[420px] rounded-lg overflow-hidden border border-blue-100">
              <iframe
                title="School Location"
                src="https://maps.google.com/maps?q=25.9981804,80.9314033&z=16&output=embed"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://www.google.com/maps/place/Akash+inter+college+husainganj/@25.9981804,80.9288284,796m/data=!3m2!1e3!4b1!4m6!3m5!1s0x399b7b179cf66ded:0x6915c514aff7c064!8m2!3d25.9981804!4d80.9314033!16s%2Fg%2F11shjgnvwn?entry=ttu&g_ep=EgoyMDI1MDgxMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener"
              className="inline-block px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark"
            >
              Get Directions
            </a>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Contact Details</h3>
            <p className="text-gray-700 mt-2">Address: {site.address}</p>
            <p className="text-gray-700">PHONE.NO- {site.phone}</p>
            <p className="text-gray-700">Email: {site.email}</p>
          </div>
        </div>
      </Section>

      <Section title="Send a Message">
        <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full rounded border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="mt-1 w-full rounded border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 w-full rounded border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="+91 98390 35500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea name="message" rows="4" value={form.message} onChange={handleChange} className="mt-1 w-full rounded border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="How can we help?" />
          </div>
          <button className="inline-flex justify-center items-center gap-2 px-5 py-3 rounded bg-primary text-white hover:bg-primary-dark">Send</button>
          {sent && <p className="text-green-600">Thanks! Your enquiry has been sent.</p>}
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </Section>

      <Footer />
    </div>
  );
}
