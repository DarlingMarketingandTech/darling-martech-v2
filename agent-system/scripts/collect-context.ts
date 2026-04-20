export interface ContextPacket {
  mode: string;
  profile: Record<string, unknown>;
  validation: Record<string, unknown>;
  request: { prompt: string; constraints: string[] };
  memory: { sessionState: Record<string, unknown>; taskState: Record<string, unknown> };
  collectedAt: string;
}
