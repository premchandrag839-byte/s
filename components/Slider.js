import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { id: 1, title: "Annual Sports Day", subtitle: "Celebrating talent and teamwork", color: "from-blue-300 to-blue-500" },
  { id: 2, title: "Science Exhibition", subtitle: "Curiosity in action", color: "from-blue-200 to-blue-400" }
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const current = slides[index];

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-blue-100 shadow-sm">
      <div className="aspect-[16/7] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            className={`h-full w-full bg-gradient-to-br ${current.color} flex items-center justify-center text-center text-white`}
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold drop-shadow">{current.title}</h3>
              <p className="text-sm sm:text-base mt-1 drop-shadow">{current.subtitle}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
