import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://pomodorso.vercel.app"),
  title: "Pomo d'Orso",
  description:
    "A Pomodoro timer — Orsetto chills with you as you stay on task!",
  openGraph: {
    title: "Pomo d'Orso",
    description:
      "A cozy Pomodoro timer — Orsetto chills with you as you stay on task",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 600,
        alt: "Orsetto the bear fishing by a lake, with honey pots he just finished",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pomo d'Orso",
    description:
      "A Pomodoro timer — Orsetto chills with you as you stay on task!",
    images: ["/og-image.png"],
  },
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
