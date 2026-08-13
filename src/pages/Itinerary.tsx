import { useState } from "react";
import { Clock, MapPin, Navigation, Info, Utensils, Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { foods } from "../data/foods";
import { distanceKm, formatDistance } from "../lib/geo";
import anh3 from "../assets/anh3.jpg";
import anh4 from "../assets/anh4.jpg";

const dayHero: Record<string, string> = {
  "DAY 01": "https://newlifetravel.vn/wp-content/uploads/2025/09/quang-truong-lam-vien-da-lat.webp",
  "DAY 02": "https://images.unsplash.com/photo-1530483287673-ab2d5a643ec0?q=80&w=1600&auto=format&fit=crop",
  "DAY 03": "https://images.unsplash.com/photo-1764015732157-db88c520d4f3?q=80&w=1600&auto=format&fit=crop",
};

const attractionImages: Record<string, string> = {
  "Puppy Farm": "https://images.unsplash.com/photo-1694895070352-44c513812a2b?q=80&w=1200&auto=format&fit=crop",
  "Floating Town": "https://images.unsplash.com/photo-1530483287673-ab2d5a643ec0?q=80&w=1200&auto=format&fit=crop",
  "Mongo Land": "https://images.unsplash.com/photo-1760715138979-a0439b3e4721?q=80&w=1200&auto=format&fit=crop",
  "Datanla": "https://images.unsplash.com/photo-1511936606692-5e0d73f6b638?q=80&w=1200&auto=format&fit=crop",
  "Thiền viện Trúc Lâm → Hồ Tuyền Lâm": anh3,
  "Tuyến đi bộ": "https://dalatopentours.com/images/quang-truong-lam-vien.jpg",
  "Chợ đêm": anh4,
  "Café săn mây": "https://images.unsplash.com/photo-1764015732157-db88c520d4f3?q=80&w=1200&auto=format&fit=crop",
};

const activityImgPosition: Record<string, string> = {
  [anh3]: "50% 42%",
  [anh4]: "50% 38%",
};

function cleanFoodLabel(raw: string): string {
  let s = raw;
  if (s.includes(": ")) s = s.split(": ").pop()!;
  s = s.split(" – ")[0].split(" - ")[0].split(" (")[0].split(",")[0];
  return s.trim().toLowerCase();
}

function findFood(text?: string) {
  if (!text) return undefined;
  const cleaned = cleanFoodLabel(text);
  return foods.find((f) => {
    const name = f.name.toLowerCase();
    return cleaned.includes(name) || name.includes(cleaned);
  });
}

function findActivityImage(title: string, primary?: string): string | undefined {
  const match = findFood(primary);
  if (match) return match.img;
  return attractionImages[title];
}

const itineraryData = {
  "DAY 01": {
    subtitle: "Trung tâm, đi bộ 100%",
    activities: [
      {
        time: "07:00",
        type: "food",
        icon: "🌅",
        title: "Ăn sáng",
        primary: "Bánh mì xíu mại 79",
        options: [
          "Bánh căn 31 Nguyễn Trãi",
          "Cháo lòng Bà Mén",
          "Bún riêu Kim Anh – 14/2 Trần Phú"
        ],
        note: "Khuyến nghị: Bánh mì xíu mại 79 vì nhanh, nhẹ bụng và phù hợp bắt đầu ngày đi bộ."
      },
      {
        time: "08:00–11:30",
        type: "activity",
        icon: "🚶",
        title: "Tuyến đi bộ",
        desc: "Chợ Đà Lạt → Hồ Xuân Hương → Quảng trường Lâm Viên → Nhà thờ Con Gà → trung tâm",
        note: "Không cần xe."
      },
      {
        time: "11:30–12:30",
        type: "food",
        icon: "🍜",
        title: "Ăn trưa",
        primary: "Bún riêu Kim Anh",
        options: [
          "Bún thịt nướng Bà Tám – Hoàng Văn Thụ",
          "Bánh bèo hẻm 17/1 Bà Triệu",
          "Bánh canh cá lóc",
          "Nem nướng Hùng Vân"
        ],
        note: "Nếu sáng đã ăn bánh mì thì bún riêu là lựa chọn chính hợp lý nhất."
      },
      {
        time: "13:00–15:00",
        type: "rest",
        icon: "😴",
        title: "Về khách sạn nghỉ",
      },
      {
        time: "15:30",
        type: "food",
        icon: "🍮",
        title: "Ăn vặt",
        primary: "Bánh flan Tùng",
        options: [
          "Chè Thái Lan cổ 1926 – 25 Đoàn Thị Điểm",
          "Trà nhãn sen Dlume",
          "Trà sữa Dulsis"
        ],
        note: "Không cần ăn cả 4. Chọn 1 món + 1 đồ uống là đẹp."
      },
      {
        time: "16:00–18:00",
        type: "activity",
        icon: "🚶",
        title: "Tiếp tục đi bộ khu trung tâm",
        desc: "Chợ → Khu Hòa Bình → các con dốc/check-in → Hồ Xuân Hương",
      },
      {
        time: "18:30",
        type: "food",
        icon: "🍖",
        title: "Ăn tối",
        primary: "Nem nướng Hùng Vân",
        options: [
          "Bún thịt nướng Bà Tám",
          "Lẩu gà lá é Cao Phụng",
          "Bánh canh cá lóc"
        ],
        note: "Nếu đi 2 người trở lên, mình ưu tiên nem nướng ngày 1 vì dễ ăn và không quá nặng bụng."
      },
      {
        time: "20:00–22:00",
        type: "activity",
        icon: "🌙",
        title: "Chợ đêm",
        primary: "Đặc sản Ngọc Sương – 169 (Mua dâu/đặc sản/quà)",
        options: [
          "Chè Thái Lan cổ",
          "Dulsis",
          "Trà nhãn sen Dlume"
        ]
      }
    ]
  },
  "DAY 02": {
    subtitle: "Puppy Farm → Floating Town → Mongo Land",
    activities: [
      {
        time: "06:30–07:00",
        type: "food",
        icon: "🌅",
        title: "Ăn sáng",
        primary: "Bún bò 31 Lê Thánh Tôn",
        options: [
          "Bánh mì xíu mại 79",
          "Bánh căn 31 Nguyễn Trãi",
          "Cháo lòng Bà Mén"
        ],
        note: "Mình vẫn giữ Bún bò 31 Lê Thánh Tôn làm lựa chọn chính. Ngày này không nên ăn quá nhiều buổi sáng, vì còn phải chạy xe và vui chơi."
      },
      {
        time: "08:00–10:30",
        type: "activity",
        icon: "🐶",
        title: "Puppy Farm",
      },
      {
        time: "10:30–11:15",
        type: "transfer",
        icon: "🚗",
        title: "Di chuyển về Tà Nung",
      },
      {
        time: "11:15–12:15",
        type: "activity",
        icon: "☕",
        title: "Floating Town",
        note: "Ở đây ưu tiên Café + check-in + nghỉ chân. Không cần ăn một bữa lớn tại đây."
      },
      {
        time: "12:30–13:15",
        type: "food",
        icon: "🍜",
        title: "Ăn trưa",
        primary: "Ăn trưa khu Tà Nung",
        options: [
          "Bún thịt nướng Bà Tám",
          "Bánh canh cá lóc",
          "Bánh bèo",
          "Nem nướng (Nếu chưa ăn ngày 1)"
        ],
        note: "Điểm duy nhất không muốn bắt bạn chạy ngược về trung tâm chỉ để ăn."
      },
      {
        time: "13:30–16:30",
        type: "activity",
        icon: "🌿",
        title: "Mongo Land",
      },
      {
        time: "17:00",
        type: "activity",
        icon: "🍓",
        title: "Trên đường về",
        primary: "Dâu Tây Phúc Trinh – 169 Nguyễn Công Trứ",
        note: "Mục đích chính: mua dâu + đặc sản, không cần coi đây là bữa ăn."
      },
      {
        time: "19:00",
        type: "food",
        icon: "🍲",
        title: "Ăn tối",
        primary: "Lẩu gà lá é Cao Phụng",
        options: [
          "Nem nướng Hùng Vân",
          "Bún thịt nướng Bà Tám",
          "Bánh canh cá lóc"
        ],
        note: "Sau một ngày đi chơi xa thì lẩu nóng buổi tối rất hợp (đi 2-4 người). Nếu đi 1-2 người ăn nhẹ thì chọn bánh canh/bún thịt nướng."
      }
    ]
  },
  "DAY 03": {
    subtitle: "Săn mây Café → Datanla",
    activities: [
      {
        time: "05:00",
        type: "transfer",
        icon: "🌅",
        title: "Rời khách sạn",
      },
      {
        time: "05:30–07:30",
        type: "activity",
        icon: "☕",
        title: "Café săn mây",
        primary: "Café + đồ ăn sáng tại quán",
        options: [
          "Mua bánh mì xíu mại 79 mang theo",
          "Ăn sáng sau khi về trung tâm"
        ],
        note: "Nguyên tắc: Săn mây = café + ăn sáng, không leo núi."
      },
      {
        time: "08:00–09:30",
        type: "rest",
        icon: "😴",
        title: "Về khách sạn nghỉ",
      },
      {
        time: "09:30–10:00",
        type: "food",
        icon: "🍜",
        title: "Ăn nhẹ",
        primary: "Bánh canh cá lóc",
        options: [
          "Cháo lòng Bà Mén",
          "Bánh căn 31 Nguyễn Trãi",
          "Bún thịt nướng Bà Tám"
        ],
        note: "Ăn một phần vừa đủ trước khi đi Datanla."
      },
      {
        time: "10:30–13:30",
        type: "activity",
        icon: "🎢",
        title: "Datanla",
        desc: "Thác • Alpine Coaster • Check-in • Trò chơi",
      },
      {
        time: "13:30–14:30",
        type: "food",
        icon: "🍜",
        title: "Ăn trưa",
        primary: "Ăn trưa ngay khu Datanla/Tuyền Lâm",
        options: [
          "Bún thịt nướng Bà Tám",
          "Nem nướng",
          "Bún bò",
          "Lẩu gà nếu nhóm đông"
        ],
        note: "Option bên trên là nếu không thích ăn ở khu du lịch và muốn về hướng trung tâm."
      },
      {
        time: "14:30–16:30",
        type: "activity",
        icon: "🌲",
        title: "Thiền viện Trúc Lâm → Hồ Tuyền Lâm",
      },
      {
        time: "17:00–18:00",
        type: "food",
        icon: "🧋",
        title: "Đồ uống",
        primary: "Trà sữa Dulsis",
        options: [
          "Trà nhãn sen Dlume",
          "Chè Thái Lan cổ",
          "Bánh flan Tùng"
        ]
      },
      {
        time: "19:00",
        type: "food",
        icon: "🍲",
        title: "Ăn tối",
        desc: "Ngày cuối không bắt buộc ăn một món cố định. Tùy mood:",
        options: [
          "Muốn ăn no: Lẩu gà lá é Cao Phụng",
          "Muốn nhẹ: Bún bò 31 Lê Thánh Tôn",
          "Muốn ăn đặc sản: Nem nướng Hùng Vân",
          "Muốn ăn nhanh: Bánh canh cá lóc"
        ]
      }
    ]
  }
};

const dayKeys = Object.keys(itineraryData) as Array<keyof typeof itineraryData>;

export function Itinerary() {
  const [activeDay, setActiveDay] = useState<keyof typeof itineraryData>("DAY 01");
  const data = itineraryData[activeDay];

  return (
    <div className="pb-24 md:pb-12 px-4 md:px-0 pt-6 max-w-3xl mx-auto">

      <h1 className="text-4xl font-serif text-[var(--primary)] mb-2">Your Dalat Plan</h1>
      <p className="text-[var(--muted-foreground)] mb-6">{data.subtitle}</p>

      {/* Day Hero Banner */}
      <div className="relative h-48 md:h-64 w-full rounded-[2rem] overflow-hidden shadow-lg mb-8">
        <AnimatePresence>
          <motion.img
            key={activeDay}
            src={dayHero[activeDay]}
            alt={data.subtitle}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 md:p-8">
          <span className="gradient-sunset text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            {activeDay}
          </span>
          <div className="text-white text-xl md:text-2xl font-serif font-semibold mt-2">{data.subtitle}</div>
        </div>
      </div>

      {/* Day Selector - Sticky Header */}
      <div className="sticky top-[73px] z-40 bg-[var(--background)]/90 backdrop-blur-md py-4 mb-8 flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {dayKeys.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={clsx(
              "px-6 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap",
              activeDay === day
                ? "gradient-forest text-white shadow-md shadow-[var(--primary)]/30"
                : "bg-[var(--card)] text-[var(--muted-foreground)] hover:bg-[var(--muted)] border border-[var(--border)]"
            )}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Timeline Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative pl-6 md:pl-8 border-l-2 border-[var(--border)] space-y-10 pb-12"
        >
          {data.activities.map((act, index) => {
            const activityImg = findActivityImage(act.title, act.primary);
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[33px] md:-left-[41px] top-1 w-4 h-4 rounded-full bg-[var(--background)] border-[3px] border-[var(--primary)] shadow-[0_0_0_4px_var(--background)]"></div>

              {/* Time & Title Row */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-3">
                <span className="font-serif font-bold text-lg text-[var(--primary)] shrink-0 w-28">
                  {act.time}
                </span>
                <h3 className="text-lg font-bold flex items-center gap-2 text-[var(--foreground)]">
                  <span className="text-xl" role="img" aria-label="icon">{act.icon}</span>
                  {act.title}
                </h3>
              </div>

              {/* Card Content */}
              <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow overflow-hidden">

                {activityImg && (
                  <div className="h-36 md:h-44 w-full overflow-hidden">
                    <img
                      src={activityImg}
                      alt={act.title}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: activityImgPosition[activityImg] ?? "center" }}
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="p-5">

                {/* Primary / Main */}
                {act.primary && (
                  <div className="mb-4">
                    <span className="inline-block bg-[var(--gold)]/15 text-[var(--gold)] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider mb-2">
                      ⭐ Món chính / Ưu tiên
                    </span>
                    <div className="font-semibold text-lg text-[var(--foreground)]">{act.primary}</div>
                  </div>
                )}

                {/* Description */}
                {act.desc && (
                  <div className="text-[var(--foreground)] font-medium mb-4">
                    {act.desc}
                  </div>
                )}

                {/* Options */}
                {act.options && act.options.length > 0 && (
                  <div className="mb-4 border-t border-[var(--border)] pt-4 mt-2">
                    <div className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                      Option thay thế:
                    </div>
                    <ul className="space-y-2">
                      {act.options.map((opt, i) => {
                        const optFood = findFood(opt);
                        const primaryFood = findFood(act.primary);
                        const dist = optFood && primaryFood ? distanceKm(optFood, primaryFood) : undefined;
                        return (
                          <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                            <span className="flex-1">{opt}</span>
                            {dist !== undefined && (
                              <span
                                className={clsx(
                                  "shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap",
                                  dist <= 0.3
                                    ? "bg-green-500/15 text-green-600"
                                    : dist <= 1
                                    ? "bg-amber-500/15 text-amber-600"
                                    : "bg-red-500/15 text-red-600"
                                )}
                                title="Khoảng cách so với món chính được khuyến nghị"
                              >
                                {dist <= 0.3 ? "Cùng tuyến" : dist <= 1 ? "Hơi lệch tuyến" : "Lệch tuyến"} · {formatDistance(dist)}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* Recommendation Note */}
                {act.note && (
                  <div className="bg-[var(--muted)]/50 p-4 rounded-xl text-sm text-[var(--muted-foreground)] flex gap-3 leading-relaxed mt-4">
                    <Info size={18} className="text-[var(--primary)] shrink-0 mt-0.5" />
                    <span><strong className="text-[var(--primary)]">Tips:</strong> {act.note.replace('👉 ', '').replace('Khuyến nghị: ', '')}</span>
                  </div>
                )}

                </div>
              </div>
            </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
