"use client";

import { Button, Flex, Text } from "@radix-ui/themes";
import { calendar_v3 } from "googleapis";
import { useState } from "react";

interface CalendarProps {
  action: () => Promise<calendar_v3.Schema$Events | undefined>;
}

export const Calendar = ({ action }: CalendarProps) => {
  const [data, setData] = useState<calendar_v3.Schema$Events>();

  return (
    <Flex justify="center" align="center" direction="column" gap="4">
      <Flex justify="center" align="center">
        <form
          action={async () => {
            setData(await action());
          }}
        >
          <Button size="4">Fetch content</Button>
        </form>
      </Flex>

      {data && (
        <Text size="4" highContrast color="gray">
          {data.description}
        </Text>
      )}
    </Flex>
  );
};
