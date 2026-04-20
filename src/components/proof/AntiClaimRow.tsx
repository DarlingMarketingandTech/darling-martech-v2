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
        <article key={item.claim} className="panel-titanium grain-mask rounded-4xl p-6 md:p-7">
          <p className="meta-label text-[#F5F4F0]/40 line-through">{item.claim}</p>
          <div className="tech-divider my-4" />
          <p className="text-base leading-7 text-[#F5F4F0]/72">{item.truth}</p>
        </article>
      ))}
    </div>
  );
}
