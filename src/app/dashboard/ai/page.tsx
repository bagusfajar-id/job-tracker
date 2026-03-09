import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AIToolsClient from "@/components/AIToolsClient";

export default async function AIPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return <AIToolsClient user={session.user} />;
}