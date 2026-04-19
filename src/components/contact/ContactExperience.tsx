"use client";

import { useState } from "react";
import { contactPageData } from "@/data/contact";
import { FormbricksSurvey } from "@/components/contact/FormbricksSurvey";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactAlternativePaths } from "@/components/contact/ContactAlternativePaths";
import { DirectContactBlock } from "@/components/contact/DirectContactBlock";
import { IntentSelector } from "@/components/contact/IntentSelector";
import { WhatHappensNext } from "@/components/contact/WhatHappensNext";

export function ContactExperience() {
  const [selectedIntent, setSelectedIntent] = useState(contactPageData.intents[0]?.label ?? "");

  return (
    <div className="mt-14">
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="grid gap-6">
          <div className="surface-band rounded-[2rem] p-7 md:p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-[#F05A28]">Intent selector</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#F5F4F0]/72">
              Pick the option below that&apos;s closest to where you are. It pre-fills the message field with a useful
              starting point.
            </p>
            <p className="mt-3 text-sm text-[#F5F4F0]/50">What best describes where you are right now?</p>
            <div className="mt-6">
              <IntentSelector
                intents={contactPageData.intents}
                selectedIntent={selectedIntent}
                onSelect={(intent) => setSelectedIntent(intent.label)}
              />
            </div>
          </div>
          <FormbricksSurvey />
          <ContactForm
            intents={contactPageData.intents}
            selectedIntent={selectedIntent}
            formSectionLabel={contactPageData.formSectionLabel}
            budgetOptions={contactPageData.budgetOptions}
            budgetIntentLabel={contactPageData.budgetIntentLabel}
          />
        </div>
        <div className="grid gap-6">
          <WhatHappensNext
            eyebrow={contactPageData.whatHappensNext.eyebrow}
            steps={contactPageData.whatHappensNext.steps}
          />
          <DirectContactBlock />
        </div>
      </div>

      <ContactAlternativePaths alternatives={contactPageData.alternatives} />

      <p className="mx-auto mt-10 max-w-xl text-center text-sm text-[#F5F4F0]/48">{contactPageData.reassurance}</p>
    </div>
  );
}
