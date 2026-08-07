import { useDeferredValue, useState } from "react";
import { Archive, Github, Linkedin, MessageCircle, Search, Send, X } from "lucide-react";
import { CourseCard } from "./components/CourseCard.jsx";
import { Header } from "./components/Header.jsx";
import { courses } from "./data/courses.js";

function normalizeSearchText(text) {
  return text.toLocaleLowerCase("ar").normalize("NFD").replace(/[\u064B-\u065F\u0670]/g, "");
}

function courseMatches(course, query, category) {
  if (category !== "الكل" && course.category !== category) return false;
  const searchableText = [course.title, course.description, course.source, ...course.tags].join(" ");
  return normalizeSearchText(searchableText).includes(normalizeSearchText(query));
}

function Hero() {
  const lessonCount = courses.reduce((total, course) => total + course.lessons, 0);

  return (
    <section id="top" className="border-b border-white/10 bg-[#080c10] font-english" dir="ltr">
      <div className="mx-auto grid max-w-[90rem] lg:min-h-[34rem] lg:grid-cols-[minmax(0,0.9fr)_minmax(32rem,1.1fr)]">
        <div className="relative min-h-[19rem] overflow-hidden border-b border-white/10 lg:min-h-full lg:border-b-0 lg:border-r">
          <img
            src="https://www.noureldeendev.me/engineering-room-learn-straight.webp"
            alt="محطة التعلّم داخل غرفة نور الدين الهندسية"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-[#05090d]/25" />
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between border border-[#d6a458]/45 bg-[#060b10]/90 px-4 py-3 backdrop-blur-sm sm:inset-x-6 sm:bottom-6">
            <div>
              <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-[#d6a458]">Personal study desk</span>
              <strong className="mt-1 block text-sm font-semibold text-[#f1efe8]">Built while learning. Shared for anyone who needs them.</strong>
            </div>
            <span className="size-2 bg-[#8bc4d8] shadow-[0_0_14px_#8bc4d8]" aria-label="المحطة متصلة" />
          </div>
        </div>

        <div className="flex flex-col justify-center px-5 py-14 sm:px-10 lg:px-14 lg:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d6a458]">PERSONAL COURSE NOTES</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.3] text-[#f1efe8] sm:text-5xl lg:text-[3.4rem]">
            Notes from the courses I study.
          </h1>
          <div className="mt-6 grid max-w-3xl gap-5 sm:grid-cols-[1fr_0.9fr] sm:items-start">
            <p className="text-base leading-8 text-[#9ca5b0]">
              Clear, structured summaries shared for anyone who wants a faster review.
            </p>
            <p className="border-[#d6a458]/35 text-sm leading-7 text-[#b7c0c8] sm:border-l sm:pl-5" dir="rtl">
              هنا بشارك ملاحظاتي وملخصات الكورسات اللي بذاكرها، وخصوصًا كورسات Programming Advices.
            </p>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-2 border-y border-white/10">
            <div className="py-4">
              <dt className="font-mono text-[9px] uppercase tracking-wider text-[#71808d]">Published notes</dt>
              <dd className="mt-1 text-xl font-semibold text-[#f3d195]">{courses.length.toLocaleString("en-US")}</dd>
            </div>
            <div className="border-l border-white/10 px-5 py-4">
              <dt className="font-mono text-[9px] uppercase tracking-wider text-[#71808d]">Lessons covered</dt>
              <dd className="mt-1 text-xl font-semibold text-[#f3d195]">{lessonCount.toLocaleString("en-US")}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function ArchiveToolbar({ query, onQueryChange, categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="mt-8 grid gap-3 border border-white/10 bg-[#0d1319] p-3 lg:grid-cols-[minmax(18rem,1fr)_auto]">
      <label className="flex h-11 items-center gap-3 border border-white/10 bg-[#080c10] px-3 focus-within:border-[#8bc4d8]/60">
        <Search size={16} className="shrink-0 text-[#71808d]" />
        <span className="sr-only">ابحث في الملخصات</span>
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="ابحث باسم الكورس أو التقنية..."
          className="w-full bg-transparent text-sm text-[#f1efe8] outline-none placeholder:text-[#5f6c77]"
        />
        {query && <button type="button" onClick={() => onQueryChange("")} className="cursor-pointer text-[#71808d] hover:text-[#f1efe8]" aria-label="مسح البحث"><X size={15} /></button>}
      </label>
      <div className="flex flex-wrap gap-2" role="group" aria-label="تصنيفات الملخصات">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            aria-pressed={selectedCategory === category}
            className="min-h-11 cursor-pointer border border-white/10 px-3.5 text-xs text-[#9ca5b0] transition hover:border-[#d6a458]/45 hover:text-[#f3d195] aria-pressed:border-[#d6a458] aria-pressed:bg-[#d6a458]/10 aria-pressed:text-[#f3d195]"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

function CourseArchive() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const deferredQuery = useDeferredValue(query);
  const categories = ["الكل", ...new Set(courses.map((course) => course.category))];
  const visibleCourses = courses.filter((course) => courseMatches(course, deferredQuery, selectedCategory));

  return (
    <section id="courses" className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8bc4d8]" dir="ltr">COURSE NOTES / {String(courses.length).padStart(2, "0")} SUMMARIES</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#f1efe8] sm:text-4xl">الملخصات المتاحة</h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-[#7f8a95]">كل ملخص مجاني ومتاح لأي حد محتاج يراجع الكورس أو يرجع لنقطة معينة.</p>
      </header>

      <ArchiveToolbar
        query={query}
        onQueryChange={setQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleCourses.map((course, index) => <CourseCard key={course.id} course={course} index={index} />)}
      </div>

      {visibleCourses.length === 0 && (
        <div className="mt-5 border border-dashed border-white/15 py-16 text-center">
          <Archive size={30} className="mx-auto text-[#52606c]" />
          <h3 className="mt-4 font-semibold text-[#f1efe8]">مفيش ملف مطابق للبحث</h3>
          <button type="button" onClick={() => { setQuery(""); setSelectedCategory("الكل"); }} className="mt-4 cursor-pointer text-sm text-[#d6a458] hover:text-[#f0bd6a]">اعرض كل الملخصات</button>
        </div>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060a0e]">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-3 px-4 py-8 text-xs text-[#71808d] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p>ملخصات شخصية من نور الدين، متاحة لكل حد بيتعلّم.</p>
          <p>المحتوى الأصلي للكورسات محفوظ لأصحابه.</p>
      </div>
    </footer>
  );
}

const contactLinks = [
  { label: "Telegram", href: "https://t.me/DevNourEldeen", icon: Send },
  { label: "WhatsApp", href: "https://wa.me/201556335858", icon: MessageCircle },
  { label: "GitHub", href: "https://github.com/NourEldeenMahmoud", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/nour-eldeen-eg", icon: Linkedin },
];

function ContactSection() {
  return (
    <section className="border-t border-white/10 bg-[#080c10]">
      <div className="mx-auto grid max-w-[90rem] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:px-10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8bc4d8]" dir="ltr">CONTACT / SAY HELLO</p>
          <h2 className="mt-3 text-2xl font-semibold text-[#f1efe8]">لو عندك سؤال أو ملاحظة، تواصل معايا.</h2>
        </div>
        <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4" dir="ltr">
          {contactLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-20 items-center justify-between bg-[#0d1319] px-4 text-sm text-[#aab3bc] transition hover:bg-[#121a22] hover:text-[#f3d195]"
            >
              <span>{label}</span>
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0d10] text-[#f1efe8]">
      <Header />
      <main><Hero /><CourseArchive /><ContactSection /></main>
      <Footer />
    </div>
  );
}
