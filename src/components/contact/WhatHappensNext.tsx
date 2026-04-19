type WhatHappensStep = {
  number: string;
  body: string;
};

type WhatHappensNextProps = {
  eyebrow: string;
  steps: WhatHappensStep[];
};

export function WhatHappensNext({ eyebrow, steps }: WhatHappensNextProps) {
  return (
    <div className="surface-card rounded-4xl p-7">
      <p className="text-sm uppercase tracking-[0.24em] text-[#0FD9C8]">{eyebrow}</p>
      <div className="mt-5 grid gap-4">
        {steps.map((step) => (
          <div key={step.number}>
            <p className="font-mono text-[#F05A28]">{step.number}</p>
            <p className="mt-2 text-base leading-7 text-[#F5F4F0]/72">{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
