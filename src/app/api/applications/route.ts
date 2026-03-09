import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const application = await prisma.application.create({
    data: {
      userId: session.user.id,
      company: body.company,
      position: body.position,
      status: body.status || "applied",
      jobUrl: body.jobUrl || null,
      jobDesc: body.jobDesc || null,
      notes: body.notes || null,
    },
  });

  return NextResponse.json(application);
}