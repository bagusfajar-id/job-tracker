import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { jobDesc, position } = await req.json();
  if (!jobDesc) return NextResponse.json({ error: "No job description" }, { status: 400 });

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are a professional career advisor. Analyze this job description for the position of "${position}" and provide:

1. **Key Requirements** - Top 5 must-have skills/requirements
2. **Tips to Stand Out** - 3 specific tips to make the application stronger
3. **Keywords to Include** - Important keywords for CV/resume
4. **Match Score Tips** - What kind of candidate would be a 10/10 match

Job Description:
${jobDesc}

Respond in a clear, structured format. Be specific and actionable.
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return NextResponse.json({ analysis: text });
}