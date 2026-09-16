import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pomodoro Timer",
  description:
    "A Three.js Pomodoro timer — a little bear wakes up as the focus session progresses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
