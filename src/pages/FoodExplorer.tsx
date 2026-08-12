import { useState } from "react";
import { Search, MapPin, Heart, Clock, Music2 } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { foods } from "../data/foods";

const filters = ["All", "Breakfast", "Lunch", "Dinner", "Snack", "Café", "Dessert", "Local Food"];
const tags = ["Near Me", "Near Today's Route", "Walking", "Under 100k", "Group Friendly"];

function typeBadgeClass(type: string) {
  if (type.includes("Dinner")) return "bg-gradient-to-r from-[#7A2E2E] to-[#C25E30]";
  if (type.includes("Breakfast")) return "bg-gradient-to-r from-[#C99A3C] to-[#D9A05B]";
  if (type.includes("Lunch")) return "bg-gradient-to-r from-[#C25E30] to-[#D9A05B]";
  if (type.includes("Snack")) return "bg-gradient-to-r from-[#B5566B] to-[#C25E30]";
  if (type.includes("Café")) return "bg-gradient-to-r from-[#5B3A29] to-[#8C5D3E]";
  if (type.includes("Dessert")) return "bg-gradient-to-r from-[#C2588E] to-[#D9A05B]";
  if (type.includes("Local")) return "gradient-forest";
  return "bg-black/60";
}

export function FoodExplorer() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="pb-24 md:pb-12 px-4 md:px-0 pt-6">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-[38vh] md:h-[45vh] w-full rounded-[2rem] overflow-hidden shadow-xl mb-8"
      >
        <img
          src="https://images.unsplash.com/photo-1743485754079-d7fde0e9283f?q=80&w=2400&auto=format&fit=crop"
          alt="Chợ đêm Đà Lạt lung linh ánh đèn lồng"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/25 via-transparent to-[var(--primary)]/25" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-white">
          <span className="gradient-sunset text-white px-3 py-1 rounded-full text-xs font-medium w-fit mb-3 shadow-lg shadow-black/20">
            🍜 {foods.length} quán đã ghé & review
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-2">
            Eat Your Way Through Dalat
          </h1>
          <p className="text-white/90 text-sm md:text-lg font-light max-w-lg">
            Danh sách quán ăn ngon, sạch sẽ, có địa chỉ rõ ràng và review TikTok thật.
          </p>
        </div>
      </motion.section>

      {/* Search & Main Filters */}
      {/* <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={20} />
          <input 
            type="text" 
            placeholder="Tìm món ăn, tên quán..." 
            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-shadow"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide shrink-0">
          {filters.map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={clsx(
                "px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all",
                activeFilter === filter
                  ? "gradient-sunset text-white shadow-md shadow-[var(--accent)]/30"
                  : "bg-[var(--card)] text-[var(--muted-foreground)] border border-[var(--border)] hover:bg-[var(--muted)]"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div> */}

      {/* Sub-tags */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {tags.map(tag => (
          <button key={tag} className="px-4 py-1.5 rounded-full border border-[var(--border)] bg-transparent text-xs font-medium text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] whitespace-nowrap transition-colors">
            {tag}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {foods.map((food, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (i % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[var(--card)] rounded-[2rem] overflow-hidden border border-[var(--border)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
          >
            {/* Image Container - Taller and sharper */}
            <div className="relative h-64 overflow-hidden bg-[var(--muted)]">
              <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[var(--foreground)] hover:text-red-500 hover:scale-110 transition-all shadow-sm">
                <Heart size={20} />
              </button>

              {/* Category Badge on image */}
              <div className={clsx("absolute top-4 left-4 z-10 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md", typeBadgeClass(food.type))}>
                {food.type}
              </div>

              <img
                src={food.img}
                alt={food.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-3 gap-2">
                <h3 className="font-bold text-xl leading-tight text-[var(--foreground)]">{food.name}</h3>
                <span className="font-semibold text-[var(--primary)] whitespace-nowrap">{food.price}</span>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                  <MapPin size={16} className="text-[var(--primary)] shrink-0"/>
                  <span>{food.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                  <Clock size={16} className="text-[var(--accent)]"/>
                  <span>{food.time}</span>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-[var(--border)] flex flex-col gap-2">
                {food.tiktok && (
                  <a
                    href={food.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full bg-black text-white font-semibold text-sm hover:bg-black/80 transition-colors flex items-center justify-center gap-2"
                  >
                    <Music2 size={16} /> Xem review TikTok
                  </a>
                )}
                <button className="w-full py-3 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] font-bold text-sm hover:bg-[var(--primary)] hover:text-white transition-colors flex items-center justify-center gap-2">
                  Thêm vào lịch trình
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
