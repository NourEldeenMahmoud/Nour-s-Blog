import { ArrowUpLeft, Github } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d6a458]/25 bg-[#070b0f]/92 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between px-4 sm:px-6 lg:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="Nour's Notes - Home">
          <span className="grid size-10 place-items-center border border-[#d6a458]/60 bg-[#d6a458]/8 font-mono text-xs font-semibold tracking-[0.12em] text-[#f3d195]">
            NE
          </span>
          <span>
            <strong className="block font-english text-sm font-semibold text-[#f1efe8]" dir="ltr">Nour's Notes</strong>
            <span className="block font-english text-[10px] text-[#8bc4d8]" dir="ltr">Programming course summaries</span>
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-3">
          <a
            href="#courses"
            className="hidden px-3 py-2 text-xs font-medium text-[#9ca5b0] transition hover:text-[#f1efe8] sm:block"
          >
            كل الملخصات
          </a>
          <a
            href="https://github.com/NourEldeenMahmoud"
            target="_blank"
            rel="noreferrer"
            className="grid size-9 place-items-center text-[#9ca5b0] transition hover:text-[#f3d195]"
            aria-label="حساب GitHub"
          >
            <Github size={17} />
          </a>
          <a
            href="https://www.noureldeendev.me/en"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center gap-2 border border-[#d6a458]/60 px-3 text-xs font-semibold text-[#f3d195] transition hover:border-[#f0bd6a] hover:bg-[#d6a458]/10 sm:px-4"
          >
            <span className="hidden font-english sm:inline" dir="ltr">View my portfolio</span>
            <ArrowUpLeft size={15} />
          </a>
        </div>
      </div>
    </header>
  );
}
