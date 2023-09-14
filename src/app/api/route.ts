import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { google } from "googleapis";
import clerk from "@clerk/clerk-sdk-node";

export async function GET() {
  try {
    const { userId } = auth();

    const [OauthAccessToken] = await clerk.users.getUserOauthAccessToken(
      userId ?? "",
      "oauth_google"
    );

    const { token } = OauthAccessToken;

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const gmail = google.gmail({
      version: "v1",
      headers: { Authorization: `Bearer ${token}` },
    });

    const { data } = await gmail.users.labels.list({
      userId: "me",
    });

    return NextResponse.json(data.labels);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
