export function WhatHappensNext() {
  return (
    <div className="surface-card rounded-[2rem] p-7">
      <p className="text-sm uppercase tracking-[0.24em] text-[#0FD9C8]">What happens next</p>
      <div className="mt-5 grid gap-4">
        <div>
          <p className="font-mono text-[#F05A28]">01</p>
          <p className="mt-2 text-base leading-7 text-[#F5F4F0]/72">I read the message myself and reply directly.</p>
        </div>
        <div>
          <p className="font-mono text-[#F05A28]">02</p>
          <p className="mt-2 text-base leading-7 text-[#F5F4F0]/72">
            If there&apos;s a fit, we schedule a diagnostic conversation instead of a canned sales call.
          </p>
        </div>
        <div>
          <p className="font-mono text-[#F05A28]">03</p>
          <p className="mt-2 text-base leading-7 text-[#F5F4F0]/72">
            Scope only gets discussed after the actual bottleneck is clear.
          </p>
        </div>
      </div>
    </div>
  );
}
