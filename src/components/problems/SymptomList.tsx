type SymptomListProps = {
  symptoms: string[];
};

export function SymptomList({ symptoms }: SymptomListProps) {
  return (
    <div className="panel-obsidian grain-mask rounded-4xl p-7 md:p-8">
      <h2 className="font-display text-2xl font-semibold leading-snug tracking-[-0.02em]">
        Does this sound familiar?
      </h2>
      <div className="tech-divider my-5 max-w-md" />
      <div className="grid gap-4">
        {symptoms.map((symptom) => (
          <div key={symptom} className="flex gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#F05A28]" />
            <p className="text-base leading-7 text-[#F5F4F0]/72">{symptom}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
