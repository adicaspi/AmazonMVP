// ai/types.ts
import "dotenv/config";
export type CandidateProduct = {
  id: string;
  slug: string;
  vertical: string;
  name: string;
  baseAmazonUrl: string;
  trackingId: string;
  targetUser: string;
  keyProblem: string;
};
