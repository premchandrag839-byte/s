import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 placeholder-bg" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900">
          AKASH INTER COLLEGE
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-4 text-lg text-gray-700 max-w-2xl">
          Inspiring excellence in academics, leadership, and character.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-8">
          <Link href="/admissions" className="inline-block px-6 py-3 rounded bg-primary text-white font-semibold shadow hover:-translate-y-0.5 hover:shadow-lg transition">
            Admission Open
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
