// ai/runFullyAutomatic.ts
// Run the fully automatic discovery and import system
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { runFullyAutomaticDiscovery } from "./trendingProductsAgent";

runFullyAutomaticDiscovery().catch(console.error);
