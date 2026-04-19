export const generateOperatorInsight = (firstTouch: number, lastTouch: number) => {
  if (lastTouch === 0 && firstTouch === 0) return null;

  const ftToLtRatio = firstTouch / (lastTouch || 1);
  const variance = Math.abs(firstTouch - lastTouch) / ((firstTouch + lastTouch) / 2);

  if (variance < 0.15) {
    return {
      title: "High Agreement",
      message:
        "First and Last-Touch models roughly agree. This channel's reporting is trustworthy. You can safely scale budget here based on standard platform metrics.",
      severity: "low",
    };
  } else if (ftToLtRatio > 1.2) {
    return {
      title: "The Silent Opener",
      message: `Your First-Touch value is significantly higher than Last-Touch. This channel creates top-of-funnel demand but gets robbed of the credit at the finish line. If you cut this budget based on Last-Touch ROAS, your overall pipeline will likely shrink.`,
      severity: "high",
    };
  } else if (ftToLtRatio < 0.8) {
    return {
      title: "The Bottom-Funnel Closer",
      message:
        "Last-Touch dominates here. This channel is harvesting demand created elsewhere. It's great for closing, but don't mistake it for a net-new growth engine.",
      severity: "medium",
    };
  }

  return {
    title: "Complex Journey Detected",
    message:
      "The spread is highly unstable. Your measurement or journey stitching is likely thin. You have revenue coming in, but assigning it to this specific channel with confidence is a guess.",
    severity: "high",
  };
};
