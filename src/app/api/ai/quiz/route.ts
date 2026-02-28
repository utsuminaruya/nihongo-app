import { NextResponse } from "next/server";

export async function POST() {
  // TODO: Step 5で実装 - AI問題生成API
  return NextResponse.json(
    { message: "Quiz Generation API - Coming soon" },
    { status: 501 }
  );
}
