import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { auth } from "@clerk/nextjs/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});


export async function POST(req: Request) {
  try {
    const { userId, redirectToSignIn } = await auth();

    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error(
        'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
      );
    }

    const body = await req.json();
    const {prompt} = body;

    console.log(prompt);
    
    if (!userId) {
      return new NextResponse("Unauthorised", { status: 501 });
    }

    // if (!messages) {
    //   return new NextResponse("MEssages are required", { status: 400 });
    // }

   

    // console.log(result.response.text());

    return new NextResponse("success", {status: 201});
  } catch (error) {
    console.log("[Conversation error]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
