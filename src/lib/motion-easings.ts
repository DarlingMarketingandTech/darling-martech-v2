/**
 * Typed cubic-bezier easings for Framer Motion. Framer Motion v12 requires
 * a strict 4-tuple (`[number, number, number, number]`) for inline beziers,
 * so we centralize the canonical curves here as tuples.
 */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT_EXPO: [number, number, number, number] = [0.87, 0, 0.13, 1];
export const EASE_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];
