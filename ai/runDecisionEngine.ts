// ai/runDecisionEngine.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { runDecisionEngine } from "./decisionEngineAgent";

async function main() {
  try {
    const decisions = await runDecisionEngine();

    console.log("\n📊 Summary:");
    const winners = decisions.filter((d) => d.newStatus === "winner");
    const killed = decisions.filter((d) => d.newStatus === "killed");
    const stillTesting = decisions.filter((d) => d.newStatus === "testing");

    console.log(`   🏆 Winners: ${winners.length}`);
    console.log(`   ❌ Killed: ${killed.length}`);
    console.log(`   ⏳ Still Testing: ${stillTesting.length}`);

    if (winners.length > 0) {
      console.log("\n🏆 Winners:");
      winners.forEach((w) => {
        console.log(`   - ${w.productName} (CTR: ${w.metrics.ctr.toFixed(2)}%)`);
      });
    }

    if (killed.length > 0) {
      console.log("\n❌ Killed:");
      killed.forEach((k) => {
        console.log(`   - ${k.productName} (CTR: ${k.metrics.ctr.toFixed(2)}%)`);
      });
    }
  } catch (error) {
    console.error("Error running decision engine:", error);
    process.exit(1);
  }
}

main();
