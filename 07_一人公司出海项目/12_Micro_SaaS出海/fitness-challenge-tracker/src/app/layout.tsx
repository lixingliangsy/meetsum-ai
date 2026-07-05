export const metadata = {
  title: "Fitness Challenge Tracker",
  description: "AI-powered Micro SaaS tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{{children}}</body>
    </html>
  );
}
