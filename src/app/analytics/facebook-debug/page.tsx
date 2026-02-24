import FacebookDebugDashboard from "./FacebookDebugDashboard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Facebook Pixel Debug — AI Picks",
  description: "Diagnose and verify Facebook Pixel integration across all pages.",
};

export default function FacebookDebugPage() {
  return <FacebookDebugDashboard />;
}
