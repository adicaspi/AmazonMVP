// ai/runOrchestrator.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs/promises";
import path from "path";
import { runOrchestrator, OrchestratorConfig } from "./orchestratorAgent";

const ORCHESTRATOR_LOG_FILE = path.join(process.cwd(), "data", "orchestrator-logs.json");

async function main() {
  try {
    // Parse command line arguments
    const args = process.argv.slice(2);
    const config: OrchestratorConfig = {
      runComplianceCheck: args.includes("--compliance") || args.includes("--all"),
      runOptimization: args.includes("--optimize") || args.includes("--all"),
      runDecisionEngine: args.includes("--decide") || args.includes("--all"),
      // These require manual input, so we skip them by default
      runProductDiscovery: args.includes("--discover"),
      runLandingPageGeneration: args.includes("--landing"),
      runCreativeGeneration: args.includes("--creatives"),
    };

    // If no specific flags, run the automated steps
    if (args.length === 0) {
      config.runComplianceCheck = true;
      config.runOptimization = true;
      config.runDecisionEngine = true;
    }

    console.log("\n🎯 Orchestrator Agent");
    console.log("Configuration:");
    console.log(`  - Compliance Check: ${config.runComplianceCheck ? "✅" : "❌"}`);
    console.log(`  - Optimization: ${config.runOptimization ? "✅" : "❌"}`);
    console.log(`  - Decision Engine: ${config.runDecisionEngine ? "✅" : "❌"}`);
    console.log(`  - Product Discovery: ${config.runProductDiscovery ? "✅" : "❌"}`);
    console.log(`  - Landing Page Generation: ${config.runLandingPageGeneration ? "✅" : "❌"}`);
    console.log(`  - Creative Generation: ${config.runCreativeGeneration ? "✅" : "❌"}`);

    const result = await runOrchestrator(config);

    // Load existing logs
    let logs: any[] = [];
    try {
      const existing = await fs.readFile(ORCHESTRATOR_LOG_FILE, "utf8");
      logs = JSON.parse(existing);
    } catch {
      // File doesn't exist, start fresh
    }

    // Add new result
    logs.push(result);

    // Keep only last 100 runs
    if (logs.length > 100) {
      logs = logs.slice(-100);
    }

    // Save logs
    await fs.writeFile(ORCHESTRATOR_LOG_FILE, JSON.stringify(logs, null, 2), "utf8");
    console.log(`\n💾 Orchestrator log saved to: ${ORCHESTRATOR_LOG_FILE}`);

    // Exit with error code if any step failed
    if (result.summary.failedSteps > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error("Error running orchestrator:", error);
    process.exit(1);
  }
}

main();
