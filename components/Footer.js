import Image from "next/image";
import { useState } from "react";
import { site } from "../config/site";

export default function Footer() {
  // Editable creator info
  const creator = {
    photo: "/assets/images/creator.jpg", // replace with your downloaded image
    title: "Website Created By",
    names: ["Vansh Gupta  (A Student Of Akash Inter College)"],
    helpers: ["With The Help Of   Vasu , Saurabh"],
    phones: ["9369972785"],
    emails: ["guptavansh890@gmail.com"],
  };

  const [showCreator, setShowCreator] = useState(false);
  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Image src="/assets/logo.png" alt="AKASH INTER COLLEGE logo" width={32} height={32} className="h-8 w-8 rounded" />
            <span className="font-bold text-white">{site.name}</span>
          </div>
          <p className="mt-3 text-sm text-gray-300">Nurturing minds, shaping futures. Excellence in education and character development.</p>
          {/* Social icons */}
          <div className="mt-4 flex items-center gap-3">
            <a aria-label="Facebook" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">
              <svg className="h-5 w-5 text-white/80" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5c0-1.16.32-1.95 2-1.95H17V2.14C16.66 2.1 15.6 2 14.38 2 11.71 2 10 3.66 10 7v3H7v4h3v8h3Z"/></svg>
            </a>
            <a aria-label="YouTube" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">
              <svg className="h-5 w-5 text-white/80" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a4 4 0 0 0-2.8-2.8C18.9 3 12 3 12 3s-6.9 0-8.7.4A4 4 0 0 0 .5 6.2 41 41 0 0 0 0 12a41 41 0 0 0 .5 5.8 4 4 0 0 0 2.8 2.8C5.1 21 12 21 12 21s6.9 0 8.7-.4a4 4 0 0 0 2.8-2.8A41 41 0 0 0 24 12a41 41 0 0 0-.5-5.8ZM9.7 15.5v-7l6 3.5-6 3.5Z"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <p className="mt-2 text-sm text-gray-300">{site.address}</p>
          <p className="text-sm text-gray-300">PHONE.NO- {site.phone}</p>
          <p className="text-sm text-gray-300">Email: {site.email}</p>
        </div>
        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <a className="group flex items-center gap-2 hover:text-white" href="/about">
                <svg className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" viewBox="0 0 24 24" fill="currentColor"><path d="M10 17l5-5-5-5v10Z"/></svg>
                About
              </a>
            </li>
            <li>
              <a className="group flex items-center gap-2 hover:text-white" href="/academics">
                <svg className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" viewBox="0 0 24 24" fill="currentColor"><path d="M10 17l5-5-5-5v10Z"/></svg>
                Academics
              </a>
            </li>
            <li>
              <a className="group flex items-center gap-2 hover:text-white" href="/admissions">
                <svg className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" viewBox="0 0 24 24" fill="currentColor"><path d="M10 17l5-5-5-5v10Z"/></svg>
                Admissions
              </a>
            </li>
            <li>
              <a className="group flex items-center gap-2 hover:text-white" href="/gallery">
                <svg className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" viewBox="0 0 24 24" fill="currentColor"><path d="M10 17l5-5-5-5v10Z"/></svg>
                Gallery
              </a>
            </li>
            <li>
              <a className="group flex items-center gap-2 hover:text-white" href="/contact">
                <svg className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" viewBox="0 0 24 24" fill="currentColor"><path d="M10 17l5-5-5-5v10Z"/></svg>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left text-xs text-gray-400">© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
          <button
            onClick={() => setShowCreator(true)}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white shadow-sm hover:shadow-[0_0_0_3px_rgba(99,102,241,0.25)] text-sm transition-all"
          >
            Creator
          </button>
        </div>
      </div>

      {showCreator && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCreator(false)} />
          <div className="relative z-[201] w-full max-w-sm [transform-style:preserve-3d] animate-card-flip">
            <div className="rounded-2xl bg-white shadow-xl border border-blue-100 overflow-hidden">
              <div className="relative h-56 w-full bg-blue-50">
                <Image src={creator.photo} alt="Creator" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{creator.title}</h3>
                {creator.names?.length > 0 && (
                  <p className="mt-1 text-gray-800 text-sm">
                    {creator.names.join(", ")}
                  </p>
                )}
                {creator.description && (
                  <p className="text-gray-600 text-xs">{creator.description}</p>
                )}
                {creator.helpers?.length > 0 && (
                  <p className="mt-1 text-gray-600 text-xs">{creator.helpers.join(", ")}</p>
                )}
                {creator.phones?.length > 0 && (
                  <p className="mt-3 text-sm text-gray-700"><span className="font-medium">Mobile:</span> {creator.phones.join(" / ")}</p>
                )}
                {creator.emails?.length > 0 && (
                  <p className="text-sm text-gray-700"><span className="font-medium">Email:</span> {creator.emails.join(", ")}</p>
                )}
                <div className="mt-4 flex justify-end">
                  <button onClick={() => setShowCreator(false)} className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
