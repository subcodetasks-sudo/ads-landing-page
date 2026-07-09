import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    const body =
      contentType.includes("application/json")
        ? await request.json()
        : Object.fromEntries((await request.formData()).entries());
    const { name, email, phone, projectType, message } = body;

    // Basic validation
    if (!name || !email || !phone || !projectType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real application, you would save this lead to a database (e.g. Firebase or PostgreSQL)
    // or send an email notification to the sales team.
    console.log("Lead Received successfully:", {
      name,
      email,
      phone,
      projectType,
      message,
      submittedAt: new Date().toISOString(),
    });

    // Simulate database/API lag
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({ success: true, message: "Lead captured successfully" });
  } catch (error) {
    console.error("Contact Form API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
