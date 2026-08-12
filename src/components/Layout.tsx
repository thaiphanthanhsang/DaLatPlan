import { NavLink, Outlet, useLocation } from "react-router";
import { Compass, Calendar, Utensils, Map as MapIcon, Heart, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop Header */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 sticky top-0 z-50 glass-panel border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center">
            <Compass size={18} />
          </div>
          <span className="font-serif text-xl font-semibold tracking-tight text-[var(--primary)]">
            Dalat Explorer
          </span>
        </div>
        
        <nav className="flex items-center gap-8">
          {[
            { to: "/", label: "Overview" },
            { to: "/itinerary", label: "Plan" },
            { to: "/food", label: "Food" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                clsx(
                  "text-sm font-medium transition-colors hover:text-[var(--primary)]",
                  isActive ? "text-[var(--primary)] border-b-2 border-[var(--primary)] py-1" : "text-[var(--muted-foreground)]"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <NavLink to="/saved" className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">
            <Heart size={20} />
          </NavLink>
          <button className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto md:px-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 glass-panel border-t border-[var(--border)] px-6 py-3 pb-safe flex justify-between items-center">
        {[
          { to: "/", icon: Compass, label: "Home" },
          { to: "/itinerary", icon: Calendar, label: "Plan" },
          { to: "/food", icon: Utensils, label: "Food" },
        ].map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              clsx(
                "flex flex-col items-center gap-1 transition-colors",
                isActive ? "text-[var(--primary)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              )
            }
          >
            <link.icon size={20} strokeWidth={2.5} />
            <span className="text-[10px] font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
