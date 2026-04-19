import type { ProcessWhatNot } from "@/types";

type WhatIDontDoListProps = {
  items: ProcessWhatNot[];
};

function splitLeadingSentence(title: string, body: string): { lead: string; rest: string } {
  const combined = `${title} ${body}`.trim();
  const dot = combined.indexOf(".");
  if (dot === -1) {
    return { lead: combined, rest: "" };
  }
  return {
    lead: combined.slice(0, dot + 1).trim(),
    rest: combined.slice(dot + 1).trim(),
  };
}

export function WhatIDontDoList({ items }: WhatIDontDoListProps) {
  return (
    <div className="mt-8 grid gap-8 md:grid-cols-2">
      {items.map((item) => {
        const { lead, rest } = splitLeadingSentence(item.title, item.body);
        return (
          <p key={item.title} className="text-base leading-7">
            <span className="font-bold text-[#F5F4F0]">{lead}</span>
            {rest ? <span className="text-[#F5F4F0]/50"> {rest}</span> : null}
          </p>
        );
      })}
    </div>
  );
}
