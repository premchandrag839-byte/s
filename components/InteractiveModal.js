import { useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

export default function InteractiveModal({ open, onClose, feature }) {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width; // 0..1
    const relY = (e.clientY - rect.top) / rect.height; // 0..1
    const rY = (relX - 0.5) * 16; // -8..8
    const rX = (0.5 - relY) * 12; // -6..6
    rotateY.set(rY);
    rotateX.set(rX);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformPerspective: 1000, rotateX: springX, rotateY: springY }}
            className="relative z-[101] w-full max-w-2xl rounded-2xl bg-white shadow-xl border border-blue-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {feature?.image ? (
              <div className="relative h-56 w-full">
                <Image src={feature.image} alt={feature.title} fill className="object-cover" />
              </div>
            ) : (
              <div className="h-56 w-full bg-gradient-to-br from-blue-100 via-blue-50 to-white" />
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{feature?.title}</h3>
              {feature?.tagline && <p className="text-sm text-gray-600 mt-1">{feature.tagline}</p>}
              {feature?.description && (
                <p className="mt-3 text-gray-700 leading-relaxed">{feature.description}</p>
              )}
              <div className="mt-4 flex justify-end">
                <button onClick={onClose} className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark transition-colors">{feature?.buttonLabel || 'Close'}</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


