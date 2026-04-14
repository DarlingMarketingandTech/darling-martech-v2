import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { MonoMetric } from "@/components/ui/MonoMetric";

type Credential = {
  value: string;
  label: string;
};

type CredentialsBarProps = {
  credentials: Credential[];
};

export function CredentialsBar({ credentials }: CredentialsBarProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {credentials.map((credential, index) => (
        <AnimateOnScroll key={credential.label} delay={index * 0.04}>
          <article className="surface-card rounded-[2rem] p-6">
            <MonoMetric value={credential.value} label={credential.label} size="sm" />
          </article>
        </AnimateOnScroll>
      ))}
    </div>
  );
}
