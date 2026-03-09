import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const applications = await prisma.application.findMany({
    where: { userId: session.user.id },
    orderBy: { appliedAt: "desc" },
  });

  return <DashboardClient applications={applications} user={session.user} />;
}