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
              "rounded-[1.5rem] border p-5 text-left transition-colors",
              isSelected
                ? "border-[#F05A28] bg-[#F05A28]/10"
                : "border-[#F5F4F0]/10 bg-[#101014] hover:border-[#F05A28]/40"
            )}
          >
            <h3 className="text-lg font-semibold text-[#F5F4F0]">{intent.label}</h3>
            <p className="mt-2 text-sm leading-6 text-[#F5F4F0]/65">{intent.clarifier}</p>
          </button>
        );
      })}
    </div>
  );
}
