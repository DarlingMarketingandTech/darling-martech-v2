export interface ContextPacket {
  mode: string;
  profile: Record<string, unknown>;
  validation: Record<string, unknown>;
  strategicContext?: Record<string, string>;
  request: { prompt: string; constraints: string[] };
  memory: { sessionState: Record<string, unknown>; taskState: Record<string, unknown> };
  collectedAt: string;
}
