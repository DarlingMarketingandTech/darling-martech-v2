export interface PRPacket {
  title: string;
  body: {
    whatChanged: string[];
    whyChanged: string;
    intentionallyNotChanged: string[];
    validationPerformed: Array<{ name: string; ok: boolean }>;
    riskLevel: string;
    rollbackPath: string;
  };
  preparedAt: string;
}
