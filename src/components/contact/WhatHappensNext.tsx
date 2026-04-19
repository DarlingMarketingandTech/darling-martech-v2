export function WhatHappensNext() {
  return (
    <div className="surface-card rounded-[2rem] p-7">
      <p className="text-sm uppercase tracking-[0.24em] text-[#0FD9C8]">After you send this</p>
      <div className="mt-5 grid gap-4">
        <div>
          <p className="font-mono text-[#F05A28]">01</p>
          <p className="mt-2 text-base leading-7 text-[#F5F4F0]/72">
            I read it myself — not an assistant, not a bot, not an email routing rule. I read every message.
          </p>
        </div>
        <div>
          <p className="font-mono text-[#F05A28]">02</p>
          <p className="mt-2 text-base leading-7 text-[#F5F4F0]/72">
            If the situation is clear, I reply with specific questions or a direct response. If I need more context,
            I&apos;ll ask.
          </p>
        </div>
        <div>
          <p className="font-mono text-[#F05A28]">03</p>
          <p className="mt-2 text-base leading-7 text-[#F5F4F0]/72">
            If it sounds like a fit, I&apos;ll suggest a 30-minute diagnostic call — no prep required, no agenda to
            follow. Just a conversation.
          </p>
        </div>
      </div>
    </div>
  );
}
