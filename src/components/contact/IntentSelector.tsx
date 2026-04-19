"use client";

import { cn } from "@/lib/utils";

type ContactIntent = {
  label: string;
  clarifier: string;
  prefill: string;
};

type IntentSelectorProps = {
  intents: ContactIntent[];
  selectedIntent: string;
  onSelect: (intent: ContactIntent) => void;
};

export function IntentSelector({ intents, selectedIntent, onSelect }: IntentSelectorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {intents.map((intent) => {
        const isSelected = selectedIntent === intent.label;

        return (
          <button
            key={intent.label}
            type="button"
            onClick={() => onSelect(intent)}
            className={cn(
              "rounded-3xl border p-5 text-left transition-colors",
              isSelected
                ? "border-[#F05A28] bg-[#F05A28]/8 text-[#F5F4F0]"
                : "border-[#F5F4F0]/8 bg-[#13131A] text-[#F5F4F0]/70 hover:border-[#F05A28]/30"
            )}
          >
            <h3 className={cn("text-lg font-bold", isSelected ? "text-[#F5F4F0]" : "text-[#F5F4F0]/90")}>
              {intent.label}
            </h3>
            <p
              className={cn(
                "mt-2 text-sm leading-6",
                isSelected ? "text-[#F5F4F0]/55" : "text-[#F5F4F0]/45"
              )}
            >
              {intent.clarifier}
            </p>
          </button>
        );
      })}
    </div>
  );
}
