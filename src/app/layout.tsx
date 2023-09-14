import "@radix-ui/themes/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Flex, Theme } from "@radix-ui/themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Theme>
            <Flex
              style={{
                height: "100vh",
                width: "100vw",
                backgroundColor: "var(--accent-12)",
              }}
              justify="center"
              align="center"
            >
              {children}
            </Flex>
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
