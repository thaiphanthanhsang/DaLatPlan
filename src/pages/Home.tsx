import { MapPin, Navigation, Coffee, Utensils, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import anh1 from "../assets/anh1.jpg";
import anh2 from "../assets/anh2.jpg";
import anh3 from "../assets/anh3.jpg";
import anh4 from "../assets/anh4.jpg";

const memories = [
  { src: anh1, alt: "Bà ngoại Thảo và cháu gái tại vườn hoa Đà Lạt", caption: "Vườn hoa thành phố", position: "50% 30%" },
  { src: anh2, alt: "Bà ngoại Thảo bên giàn hoa chuông đỏ", caption: "Giàn hoa chuông đỏ", position: "50% 30%" },
  { src: anh3, alt: "Cả nhà check-in tượng Phật giữa vườn hoa", caption: "Check-in cùng cả nhà", position: "50% 45%" },
  { src: anh4, alt: "Hai anh em dạo phố đêm Đà Lạt", caption: "Dạo phố đêm", position: "50% 38%" },
];

const days = [
  {
    day: "DAY 01",
    badge: "🚶 WALK ONLY",
    badgeClass: "bg-[var(--muted)] text-[var(--muted-foreground)]",
    accent: "gradient-forest",
    title: "Dalat City Walk",
    desc: "Khám phá trung tâm Đà Lạt hoàn toàn bằng cách đi bộ.",
    items: ["Chợ Đà Lạt", "Hồ Xuân Hương", "Quảng trường Lâm Viên", "Nhà thờ Con Gà", "Chợ đêm"],
    dotBullets: true,
  },
  {
    day: "DAY 02",
    badge: "🚗 DRIVE",
    badgeClass: "bg-[var(--secondary)] text-[var(--secondary-foreground)]",
    accent: "gradient-sunset",
    title: "West Dalat Adventure",
    desc: "Puppy Farm → Floating Town → Mongo Land",
    items: ["🐶 Puppy Farm", "☕ Floating Town", "🌿 Mongo Land", "🍲 Lẩu gà lá é"],
  },
  {
    day: "DAY 03",
    badge: "🌅 EARLY START",
    badgeClass: "bg-[var(--gold)] text-[var(--gold-foreground)]",
    accent: "gradient-forest",
    title: "Clouds & Waterfalls",
    desc: "Săn mây tại café → Datanla → Trúc Lâm → Hồ Tuyền Lâm",
    items: ["☁️ Cloud hunting café", "💦 Datanla", "🌲 Thiền viện Trúc Lâm", "🌊 Hồ Tuyền Lâm"],
  },
];

export function Home() {
  return (
    <div className="pb-24 md:pb-12">
      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:mt-4"
      >
        {/* Photo composite - all 4 trip photos, fully visible, no text overlay */}
        <div className="relative h-[70vh] md:h-[76vh] w-full rounded-[2rem] overflow-hidden shadow-xl">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1.5 bg-[var(--background)]">
            {memories.map((m, i) => (
              <motion.div
                key={m.src}
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full overflow-hidden"
              >
                <img
                  src={m.src}
                  alt={m.alt}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: m.position }}
                />
              </motion.div>
            ))}
          </div>
          {/* Soft vignette only at the very bottom, keeps faces fully clear */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2"
          >
            <span className="glass-panel text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border-white/20">
              <MapPin size={12} /> Đà Lạt, Lâm Đồng
            </span>
            <span className="glass-panel text-white px-3 py-1 rounded-full text-xs font-medium border-white/20">
              3 Days · 2 Nights
            </span>
          </motion.div>
        </div>

        {/* Caption block - below the photos, never covers faces */}
        <div className="px-6 md:px-2 pt-8 md:pt-10">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 font-serif leading-tight text-[var(--primary)] break-words"
          >
            3 Days in Dalat<br />cùng gia đình bà ngoại Thảo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-2xl text-[var(--muted-foreground)] mb-6 max-w-lg font-light"
          >
            Ăn ngon · Chơi đẹp · Không chạy vòng đường
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)] mb-8"
          >
            <span className="flex items-center gap-1.5"><Navigation size={16} /> Walk</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Navigation size={16} className="rotate-90" /> Drive</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Coffee size={16} /> Café</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Utensils size={16} /> Food</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/itinerary"
              className="gradient-sunset text-white px-8 py-4 rounded-full font-medium shadow-lg shadow-[var(--accent)]/30 hover:shadow-xl hover:shadow-[var(--accent)]/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 w-fit"
            >
              Khám phá lịch trình <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* TRIP OVERVIEW */}
      {/* <section className="px-6 md:px-0 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-sm font-semibold tracking-widest text-[var(--accent)] uppercase mb-2">Trip Overview</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-[var(--primary)]">Chuyến đi của bạn</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {days.map((d, i) => (
            <motion.div
              key={d.day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-[var(--card)] rounded-[var(--radius-lg)] p-6 shadow-sm border border-[var(--border)] group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className={accentBarClass(d.accent)} />
              <div className="flex justify-between items-start mb-6">
                <span className="text-[var(--primary)] font-serif text-xl font-semibold">{d.day}</span>
                <span className={`${d.badgeClass} px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
                  {d.badge}
                </span>
              </div>
              <h4 className="text-2xl font-serif mb-2">{d.title}</h4>
              <p className="text-[var(--muted-foreground)] text-sm mb-6 line-clamp-2">{d.desc}</p>
              <div className="space-y-2 mb-8">
                {d.items.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                    {d.dotBullets && <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />}
                    {item}
                  </div>
                ))}
              </div>
              <Link to="/itinerary" className="text-[var(--primary)] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Xem ngày này <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section> */}

    </div>
  );
}

function accentBarClass(gradientClass: string) {
  return `absolute top-0 left-0 right-0 h-1.5 ${gradientClass}`;
}
