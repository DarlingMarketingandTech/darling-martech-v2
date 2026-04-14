"use client";

import { useState } from "react";
import { contactPageData } from "@/data/contact";
import { ContactForm } from "@/components/contact/ContactForm";
import { DirectContactBlock } from "@/components/contact/DirectContactBlock";
import { IntentSelector } from "@/components/contact/IntentSelector";
import { WhatHappensNext } from "@/components/contact/WhatHappensNext";

export function ContactExperience() {
  const [selectedIntent, setSelectedIntent] = useState(contactPageData.intents[0]?.label ?? "");

  return (
    <div className="mt-14 grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <div className="grid gap-6">
        <div className="surface-band rounded-[2rem] p-7 md:p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-[#F05A28]">Intent selector</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#F5F4F0]/72">
            Pick the version that sounds most like your situation. It preloads the message so you do not have to start from zero.
          </p>
          <div className="mt-6">
            <IntentSelector
              intents={contactPageData.intents}
              selectedIntent={selectedIntent}
              onSelect={(intent) => setSelectedIntent(intent.label)}
            />
          </div>
        </div>
        <ContactForm intents={contactPageData.intents} selectedIntent={selectedIntent} />
      </div>
      <div className="grid gap-6">
        <WhatHappensNext />
        <DirectContactBlock />
      </div>
    </div>
  );
}
