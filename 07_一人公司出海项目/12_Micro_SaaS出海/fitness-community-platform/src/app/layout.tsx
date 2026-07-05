export const metadata = {
  title: "Fitness Community Platform",
  description: "AI-powered Micro SaaS tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <a href="/terms.html" className="text-gray-300 hover:text-white">Terms</a>
              <a href="/privacy.html" className="text-gray-300 hover:text-white">Privacy</a>
              <a href="/pricing.html" className="text-gray-300 hover:text-white">Pricing</a>
              <a href="/support.html" className="text-gray-300 hover:text-white">Support</a>
              <a href="/refund-policy.html" className="text-gray-300 hover:text-white">Refund Policy</a>
            </div>
            <p className="text-center text-gray-400">&copy; 2026 Fitness Community Platform. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
