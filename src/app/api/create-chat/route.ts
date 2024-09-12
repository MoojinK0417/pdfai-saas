import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // If body is an object, destructure like this
    const { file_key, file_name } = body;

    // Log the extracted file_key and file_name
    console.log(file_key, file_name);

    // Call your loadS3IntoPinecone function
    const pages = await loadS3IntoPinecone(file_key);

    // Return the response as JSON
    return NextResponse.json({ pages });
  } catch (error) {
    console.error(error);

    // Return a JSON response with a 500 status on error
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
