type AntiClaim = {
  claim: string;
  truth: string;
};

type AntiClaimRowProps = {
  antiClaims: AntiClaim[];
};

export function AntiClaimRow({ antiClaims }: AntiClaimRowProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {antiClaims.map((item) => (
        <article key={item.claim} className="surface-card rounded-[2rem] p-6">
          <p className="text-sm text-[#F5F4F0]/44 line-through">{item.claim}</p>
          <p className="mt-4 text-base leading-7 text-[#F5F4F0]/72">{item.truth}</p>
        </article>
      ))}
    </div>
  );
}
