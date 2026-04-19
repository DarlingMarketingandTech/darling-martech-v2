type QuizProgressProps = {
  current: number;
  total: number;
};

export function QuizProgress({ current, total }: QuizProgressProps) {
  const segments = Array.from({ length: total }, (_, index) => index < current);

  return (
    <div className="sticky top-24 z-10 rounded-3xl border border-[#F5F4F0]/8 bg-[#0C0C0E]/80 p-4 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 text-sm text-[#F5F4F0]/64">
        <span>
          Question {current} of {total}
        </span>
        <span>{Math.round((current / total) * 100)}%</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
        {segments.map((isActive, index) => (
          <span
            key={`${index}-${isActive ? "active" : "inactive"}`}
            className={isActive ? "h-2 rounded-full bg-[#F05A28]" : "h-2 rounded-full bg-[#F5F4F0]/8"}
          />
        ))}
      </div>
    </div>
  );
}
