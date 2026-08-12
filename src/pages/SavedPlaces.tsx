import { motion } from "framer-motion";

export function SavedPlaces() {
  return (
    <div className="pb-24 md:pb-12 px-4 md:px-0 pt-6">
      <h1 className="text-4xl font-serif text-[var(--primary)] mb-8">Your Saved Places</h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-16 h-16 gradient-sunset rounded-full flex items-center justify-center mb-4 shadow-lg shadow-[var(--accent)]/25">
          <span className="text-3xl">❤️</span>
        </div>
        <h3 className="text-xl font-bold mb-2">No saved places yet</h3>
        <p className="text-[var(--muted-foreground)] max-w-sm">
          Tap the heart icon on any place to save it for later and easily add it to your itinerary.
        </p>
      </motion.div>
    </div>
  );
}
