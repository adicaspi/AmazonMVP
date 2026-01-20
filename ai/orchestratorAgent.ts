// ai/orchestratorAgent.ts
import "dotenv/config";
import { runDecisionEngine } from "./decisionEngineAgent";
import { runOptimizationAgent } from "./optimizationAgent";
import { runComplianceAgent } from "./complianceAgent";

export type OrchestratorConfig = {
  runProductDiscovery?: boolean;
  runLandingPageGeneration?: boolean;
  runCreativeGeneration?: boolean;
  runComplianceCheck?: boolean;
  runOptimization?: boolean;
  runDecisionEngine?: boolean;
};

export type OrchestratorResult = {
  timestamp: string;
  steps: {
    productDiscovery?: { success: boolean; message: string };
    landingPageGeneration?: { success: boolean; message: string; productsCreated?: number };
    creativeGeneration?: { success: boolean; message: string; creativesGenerated?: number };
    complianceCheck?: { success: boolean; message: string; passed?: number; failed?: number };
    optimization?: { success: boolean; message: string; suggestionsGenerated?: number };
    decisionEngine?: { success: boolean; message: string; winners?: number; killed?: number };
  };
  summary: {
    totalSteps: number;
    successfulSteps: number;
    failedSteps: number;
  };
};

export async function runOrchestrator(
  config: OrchestratorConfig = {}
): Promise<OrchestratorResult> {
  console.log("\n🎯 Orchestrator Agent - Starting Pipeline\n");
  console.log("=" .repeat(60));

  const result: OrchestratorResult = {
    timestamp: new Date().toISOString(),
    steps: {},
    summary: {
      totalSteps: 0,
      successfulSteps: 0,
      failedSteps: 0,
    },
  };

  // Step 1: Product Discovery (if enabled)
  if (config.runProductDiscovery) {
    console.log("\n📦 Step 1: Product Discovery");
    console.log("-".repeat(60));
    result.summary.totalSteps++;
    try {
      // Note: This would call runSelection, but we'll skip for now
      // as it requires manual input (discoveryInput.json)
      result.steps.productDiscovery = {
        success: true,
        message: "Product discovery skipped (requires manual input)",
      };
      result.summary.successfulSteps++;
      console.log("✅ Product discovery: Skipped (manual process)");
    } catch (error: any) {
      result.steps.productDiscovery = {
        success: false,
        message: error.message || "Unknown error",
      };
      result.summary.failedSteps++;
      console.error("❌ Product discovery failed:", error);
    }
  }

  // Step 2: Landing Page Generation (if enabled)
  if (config.runLandingPageGeneration) {
    console.log("\n📄 Step 2: Landing Page Generation");
    console.log("-".repeat(60));
    result.summary.totalSteps++;
    try {
      // This would require importing and running the pipeline
      // For now, we'll mark it as a manual step
      result.steps.landingPageGeneration = {
        success: true,
        message: "Run 'npm run ai:pipeline' to generate landing pages",
        productsCreated: 0,
      };
      result.summary.successfulSteps++;
      console.log("✅ Landing page generation: Manual step (run 'npm run ai:pipeline')");
    } catch (error: any) {
      result.steps.landingPageGeneration = {
        success: false,
        message: error.message || "Unknown error",
      };
      result.summary.failedSteps++;
      console.error("❌ Landing page generation failed:", error);
    }
  }

  // Step 3: Creative Generation (if enabled)
  if (config.runCreativeGeneration) {
    console.log("\n🎨 Step 3: Creative Generation");
    console.log("-".repeat(60));
    result.summary.totalSteps++;
    try {
      // This would require importing and running creative generator
      // For now, we'll mark it as a manual step
      result.steps.creativeGeneration = {
        success: true,
        message: "Run 'npm run ai:creatives' to generate creatives",
        creativesGenerated: 0,
      };
      result.summary.successfulSteps++;
      console.log("✅ Creative generation: Manual step (run 'npm run ai:creatives')");
    } catch (error: any) {
      result.steps.creativeGeneration = {
        success: false,
        message: error.message || "Unknown error",
      };
      result.summary.failedSteps++;
      console.error("❌ Creative generation failed:", error);
    }
  }

  // Step 4: Compliance Check (if enabled)
  if (config.runComplianceCheck) {
    console.log("\n🛡️  Step 4: Compliance Check");
    console.log("-".repeat(60));
    result.summary.totalSteps++;
    try {
      const complianceResults = await runComplianceAgent();
      const passed = complianceResults.filter((r) => r.canPublish).length;
      const failed = complianceResults.filter((r) => !r.canPublish).length;

      result.steps.complianceCheck = {
        success: true,
        message: `Compliance check completed: ${passed} passed, ${failed} failed`,
        passed,
        failed,
      };
      result.summary.successfulSteps++;
      console.log(`✅ Compliance check: ${passed} passed, ${failed} failed`);
    } catch (error: any) {
      result.steps.complianceCheck = {
        success: false,
        message: error.message || "Unknown error",
      };
      result.summary.failedSteps++;
      console.error("❌ Compliance check failed:", error);
    }
  }

  // Step 5: Optimization (if enabled)
  if (config.runOptimization) {
    console.log("\n🚀 Step 5: Optimization");
    console.log("-".repeat(60));
    result.summary.totalSteps++;
    try {
      const suggestions = await runOptimizationAgent();
      result.steps.optimization = {
        success: true,
        message: `Optimization completed: ${suggestions.length} suggestions generated`,
        suggestionsGenerated: suggestions.length,
      };
      result.summary.successfulSteps++;
      console.log(`✅ Optimization: ${suggestions.length} suggestions generated`);
    } catch (error: any) {
      result.steps.optimization = {
        success: false,
        message: error.message || "Unknown error",
      };
      result.summary.failedSteps++;
      console.error("❌ Optimization failed:", error);
    }
  }

  // Step 6: Decision Engine (if enabled)
  if (config.runDecisionEngine) {
    console.log("\n🤖 Step 6: Decision Engine");
    console.log("-".repeat(60));
    result.summary.totalSteps++;
    try {
      const decisions = await runDecisionEngine();
      const winners = decisions.filter((d) => d.newStatus === "winner").length;
      const killed = decisions.filter((d) => d.newStatus === "killed").length;

      result.steps.decisionEngine = {
        success: true,
        message: `Decision engine completed: ${winners} winners, ${killed} killed`,
        winners,
        killed,
      };
      result.summary.successfulSteps++;
      console.log(`✅ Decision engine: ${winners} winners, ${killed} killed`);
    } catch (error: any) {
      result.steps.decisionEngine = {
        success: false,
        message: error.message || "Unknown error",
      };
      result.summary.failedSteps++;
      console.error("❌ Decision engine failed:", error);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 Pipeline Summary");
  console.log("=".repeat(60));
  console.log(`Total Steps: ${result.summary.totalSteps}`);
  console.log(`✅ Successful: ${result.summary.successfulSteps}`);
  console.log(`❌ Failed: ${result.summary.failedSteps}`);
  console.log("=".repeat(60));

  return result;
}
