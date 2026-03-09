import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { jobDesc, position, company, userName } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
Write a professional cover letter for:
- Position: ${position}
- Company: ${company}
- Applicant Name: ${userName}

Job Description:
${jobDesc}

Write a compelling, personalized cover letter that:
- Is 3-4 paragraphs long
- Highlights relevant skills from the job description
- Shows enthusiasm for the role and company
- Has a strong opening and closing
- Sounds natural and professional, not generic

Return only the cover letter text, no extra commentary.
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return NextResponse.json({ coverLetter: text });
}