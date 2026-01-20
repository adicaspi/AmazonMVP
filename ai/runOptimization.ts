// ai/runOptimization.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs/promises";
import path from "path";
import { runOptimizationAgent } from "./optimizationAgent";

const SUGGESTIONS_FILE = path.join(process.cwd(), "data", "optimization-suggestions.json");

async function main() {
  try {
    const suggestions = await runOptimizationAgent();

    if (suggestions.length > 0) {
      // Save suggestions to file
      await fs.writeFile(
        SUGGESTIONS_FILE,
        JSON.stringify(suggestions, null, 2),
        "utf8"
      );
      console.log(`\n💾 Suggestions saved to: ${SUGGESTIONS_FILE}`);
      console.log("\n📋 Review suggestions and apply manually if needed.");
    } else {
      console.log("\n✅ No products need optimization at this time.");
    }
  } catch (error) {
    console.error("Error running optimization agent:", error);
    process.exit(1);
  }
}

main();
