// ai/runCompliance.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs/promises";
import path from "path";
import { runComplianceAgent } from "./complianceAgent";

const COMPLIANCE_REPORT_FILE = path.join(process.cwd(), "data", "compliance-reports.json");

async function main() {
  try {
    // Check all products in testing, or specify product IDs
    const productIds = process.argv.slice(2).length > 0 ? process.argv.slice(2) : undefined;

    const results = await runComplianceAgent(productIds);

    // Save report
    await fs.writeFile(
      COMPLIANCE_REPORT_FILE,
      JSON.stringify(results, null, 2),
      "utf8"
    );
    console.log(`\n💾 Compliance report saved to: ${COMPLIANCE_REPORT_FILE}`);

    // Summary
    const highRisk = results.filter((r) => r.overallRisk === "high");
    const mediumRisk = results.filter((r) => r.overallRisk === "medium");
    const lowRisk = results.filter((r) => r.overallRisk === "low");

    if (highRisk.length > 0) {
      console.log("\n⚠️  HIGH RISK PRODUCTS:");
      highRisk.forEach((r) => {
        console.log(`   - ${r.productName} (${r.productId})`);
      });
    }

    if (mediumRisk.length > 0) {
      console.log("\n⚠️  MEDIUM RISK PRODUCTS:");
      mediumRisk.forEach((r) => {
        console.log(`   - ${r.productName} (${r.productId})`);
      });
    }
  } catch (error) {
    console.error("Error running compliance agent:", error);
    process.exit(1);
  }
}

main();
