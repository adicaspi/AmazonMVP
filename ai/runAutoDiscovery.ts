// ai/runAutoDiscovery.ts
// Run the fully automatic discovery agent
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { runAutoDiscovery } from "./autoDiscoveryAgent";

runAutoDiscovery().catch(console.error);
