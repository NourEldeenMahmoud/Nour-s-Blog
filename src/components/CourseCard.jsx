import { ArrowUpLeft, BookOpen, Download, ExternalLink } from "lucide-react";

export function CourseCard({ course, index }) {
  return (
    <article
      className="archive-reveal group flex min-h-full flex-col overflow-hidden border border-white/10 bg-[#10161d] transition duration-300 hover:-translate-y-1 hover:border-[#d6a458]/55 hover:shadow-[0_24px_60px_#00000055]"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <a href={course.url} target="_blank" rel="noreferrer" className="relative block aspect-video overflow-hidden border-b border-white/10 bg-[#070b0f]">
        <img
          src={course.image}
          alt={`غلاف كورس ${course.title}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
          loading={index === 0 ? "eager" : "lazy"}
        />
        <span className="absolute top-3 right-3 border border-[#d6a458]/60 bg-[#060b10]/90 px-2.5 py-1 text-[10px] font-medium text-[#f3d195] backdrop-blur-sm">
          ملخص شخصي
        </span>
      </a>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.1em] text-[#8bc4d8]">
          <span>{course.category}</span>
          <span className="text-[#71808d]">{course.lessons.toLocaleString("ar-EG")} LESSONS</span>
        </div>

        <h3 className="mt-4 min-h-[4.5rem] text-left font-english text-xl font-semibold leading-8 text-[#f1efe8]" dir="ltr">
          {course.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-[#9ca5b0]">{course.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="تقنيات الكورس">
          {course.tags.map((tag) => (
            <li key={tag} className="border border-white/10 bg-white/[0.025] px-2.5 py-1 font-mono text-[9px] text-[#bdc5cc]" dir="ltr">{tag}</li>
          ))}
        </ul>

        <dl className="mt-6 grid grid-cols-2 border-y border-white/8 py-3 text-xs">
          <div>
            <dt className="font-mono text-[8px] uppercase tracking-wider text-[#5f6c77]">Level</dt>
            <dd className="mt-1 text-[#c5ccd2]">{course.level}</dd>
          </div>
          <div className="border-r border-white/8 pr-4">
            <dt className="font-mono text-[8px] uppercase tracking-wider text-[#5f6c77]">Updated</dt>
            <dd className="mt-1 text-[#c5ccd2]">{course.updated}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <a
              href={course.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 border border-[#d6a458]/70 bg-[#d6a458]/10 px-4 text-sm font-semibold text-[#f3d195] transition hover:bg-[#d6a458] hover:text-[#080c10]"
            >
              <BookOpen size={15} />
              افتح الملخص
              <ArrowUpLeft size={14} />
            </a>
            {course.pdfs?.map((pdf) => (
              <a
                key={pdf.url}
                href={pdf.url}
                download
                className="inline-flex min-h-11 items-center gap-1.5 border border-white/10 bg-white/[0.03] px-3 text-xs font-medium text-[#bdc5cc] transition hover:border-[#8bc4d8]/40 hover:text-[#8bc4d8]"
              >
                <Download size={13} />
                {pdf.label}
              </a>
            ))}
          </div>
          <a
            href={course.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#71808d] transition hover:text-[#8bc4d8]"
            aria-label={`افتح صفحة كورس ${course.title} على Programming Advices`}
          >
            الكورس الأصلي
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </article>
  );
}
