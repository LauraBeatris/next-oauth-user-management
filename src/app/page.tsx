import { UserButton, UserProfile } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { google } from "googleapis";

export default function Home() {
  async function fetchContent() {
    "use server";

    const { userId } = auth();

    const [OauthAccessToken] = await clerkClient.users.getUserOauthAccessToken(
      userId ?? "",
      "oauth_google"
    );

    const { token } = OauthAccessToken;

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const calendarApi = google.calendar({
      version: "v3",
      headers: { Authorization: `Bearer ${token}` },
    });

    const {
      data: { items },
    } = await calendarApi.calendarList.list();

    /**
     * Just accessing the first ID of the list for testing purposes
     */
    const calendarId = items?.[0].id;

    if (calendarId) {
      // TODO - Render events
      const events = await calendarApi.events.list({
        calendarId,
      });
    }
  }

  return (
    <main>
      <form action={fetchContent}>
        <button type="submit">Fetch content</button>
      </form>

      <UserButton afterSignOutUrl="/" />

      <UserProfile />
    </main>
  );
}
