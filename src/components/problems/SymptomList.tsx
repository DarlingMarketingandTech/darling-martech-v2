type SymptomListProps = {
  symptoms: string[];
};

export function SymptomList({ symptoms }: SymptomListProps) {
  return (
    <div className="surface-card rounded-[2rem] p-7">
      <h2 className="font-display text-2xl font-semibold">Does this sound familiar?</h2>
      <div className="mt-5 grid gap-4">
        {symptoms.map((symptom) => (
          <div key={symptom} className="flex gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-[#F05A28]" />
            <p className="text-base leading-7 text-[#F5F4F0]/72">{symptom}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
