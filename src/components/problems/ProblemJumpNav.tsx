const LINKS = [
  { id: "symptoms", label: "Signals" },
  { id: "cost", label: "Cost" },
  { id: "system-breakdown", label: "System" },
  { id: "system-fix", label: "Fix" },
  { id: "proof", label: "Proof" },
  { id: "tools", label: "Tools" },
  { id: "next-step", label: "Next step" },
  { id: "explore", label: "More" },
] as const;

export function ProblemJumpNav() {
  return (
    <nav
      aria-label="On this page"
      className="-mx-1 flex gap-2 overflow-x-auto px-1 py-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden"
    >
      {LINKS.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="shrink-0 rounded-full border border-[#F5F4F0]/12 bg-[#13131A]/40 px-4 py-2.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[#F5F4F0]/70 transition-colors hover:border-[#0FD9C8]/35 hover:text-[#0FD9C8] min-[480px]:py-2"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
