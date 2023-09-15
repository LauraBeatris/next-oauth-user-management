"use client";

import { Box, Button, Flex, Grid, Text } from "@radix-ui/themes";
import { calendar_v3 } from "googleapis";
import { useState } from "react";

interface CalendarProps {
  action: () => Promise<calendar_v3.Schema$Events | undefined>;
}

export const Calendar = ({ action }: CalendarProps) => {
  const [data, setData] = useState<calendar_v3.Schema$Events>();
  const [isLoading, setLoading] = useState(false);

  return (
    <Flex justify="center" align="center" direction="column" gap="4">
      <Flex justify="center" align="center">
        <form
          action={async () => {
            setLoading(true);

            setData(await action().finally(() => setLoading(false)));
          }}
        >
          <Button variant="surface" size="3" highContrast>
            {isLoading ? "Loading events..." : "Get calendar events"}
          </Button>
        </form>
      </Flex>

      {data && (
        <Flex
          direction="column"
          gap="2"
          style={{ maxHeight: "400px", overflow: "scroll" }}
        >
          <Text weight="bold" align="center" size="4" highContrast color="gray">
            Calendar name: {data.description}
          </Text>

          <Grid columns="3" gap="3" width="auto">
            {data.items?.map((item) => (
              <Box height="9">
                <Text>{item.summary}</Text>
              </Box>
            ))}
          </Grid>
        </Flex>
      )}
    </Flex>
  );
};
