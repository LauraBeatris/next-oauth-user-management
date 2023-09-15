import { UserButton } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs";
import { google } from "googleapis";
import { Container, Flex } from "@radix-ui/themes";
import { Calendar } from "@/components/Calendar";

export default function Home() {
  async function fetchEventsAction() {
    "use server";

    const { userId } = auth();

    const [OauthAccessToken] = await clerkClient.users.getUserOauthAccessToken(
      userId ?? "",
      "oauth_google"
    );

    const { token } = OauthAccessToken;

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
      const { data: events } = await calendarApi.events.list({
        calendarId,
      });

      return events;
    }
  }

  return (
    <Container
      style={{ justifyContent: "center" }}
      size="2"
      height="100%"
      width="100%"
    >
      <Flex
        grow={"1"}
        direction={"column"}
        justify={"center"}
        align="center"
        gap={"4"}
      >
        <UserButton showName />

        <Calendar action={fetchEventsAction} />
      </Flex>
    </Container>
  );
}
