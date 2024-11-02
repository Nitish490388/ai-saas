import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { auth } from "@clerk/nextjs/server";
import { ClientOptions } from "openai";
import {ChatCompletionRequestMessage} from "../../(dashboard)/(routes)/conversation/page";

const options: ClientOptions = {
  apiKey: process.env.OPEN_API_KEY,
};

export async function POST(req: Request) {
  try {
    const { userId, redirectToSignIn } = await auth();

    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 501 });
    }

    if (!messages) {
      return new NextResponse("MEssages are required", { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = messages[0].content;
    
    const instruction = "You are a code generator. You must answer in markdown code snippets.Use code comments for explanation";

    const result = await model.generateContent(`${instruction}\n\n`+prompt);

    return new NextResponse(result.response.text(), {status: 201});
  } catch (error) {
    console.log("[Conversation error]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}