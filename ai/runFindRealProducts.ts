// ai/runFindRealProducts.ts
// Run the real product finder
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { findRealProducts } from "./findRealProducts";

findRealProducts().catch(console.error);
