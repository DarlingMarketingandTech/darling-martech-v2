import Link from "next/link";

export function ContactAlternativePaths() {
  return (
    <div className="surface-card rounded-[2rem] p-7">
      <p className="text-sm uppercase tracking-[0.24em] text-[#F5F4F0]/45">Not quite ready to send a message?</p>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        <li>
          <p className="font-display font-semibold">Run a diagnostic first</p>
          <p className="mt-2 text-sm text-[#F5F4F0]/62">
            Take the Growth Bottleneck Quiz. Get a specific result in 3 minutes, no email required.
          </p>
          <Link href="/tools/growth-bottleneck-quiz" className="mt-3 inline-block text-sm text-[#F05A28] hover:underline">
            Take the quiz →
          </Link>
        </li>
        <li>
          <p className="font-display font-semibold">Read the case studies</p>
          <p className="mt-2 text-sm text-[#F5F4F0]/62">See what the work looks like and what it produces before deciding.</p>
          <Link href="/proof" className="mt-3 inline-block text-sm text-[#F05A28] hover:underline">
            See the proof →
          </Link>
        </li>
        <li>
          <p className="font-display font-semibold">Read about the process</p>
          <p className="mt-2 text-sm text-[#F5F4F0]/62">Understand how engagements work before reaching out.</p>
          <Link href="/process" className="mt-3 inline-block text-sm text-[#F05A28] hover:underline">
            See how I work →
          </Link>
        </li>
      </ul>
    </div>
  );
}
