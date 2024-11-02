import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { auth } from "@clerk/nextjs/server";
import { ClientOptions } from "openai";
import {increaseApiLimit, checkApiLimit} from "@/lib/api-limit";

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
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    if(!freeTrial) {
      return new NextResponse("Free trial is expired", {status: 403});
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = messages[0].content;
    

    const result = await model.generateContent(prompt);
    // console.log(result.response.text());
    await increaseApiLimit();

    return new NextResponse(result.response.text(), {status: 201});
  } catch (error) {
    console.log("[Conversation error]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
