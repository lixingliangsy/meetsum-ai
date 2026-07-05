import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>AsyncStandup | Async Standups for Remote Teams</title>
        <meta name="description" content="Replace synchronous standups with async updates. Save time, keep everyone in the loop." />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AS</span>
              </div>
              <span className="font-bold text-xl">AsyncStandup</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <a href="https://github.com" target="_blank" className="text-gray-600 hover:text-gray-900">GitHub</a>
              <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm mb-8">
              <span>🚀</span>
              <span>Trusted by 300+ remote teams</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Kill the Daily<br />
              <span className="text-purple-600">Standup Meeting</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Replace synchronous standups with async updates. 
              Save 5+ hours per week per team. Keep everyone aligned without the meeting fatigue.
            </p>
            <div className="flex justify-center space-x-4 mb-16">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition font-medium">
                Start Free Trial
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-gray-400 transition font-medium">
                See How It Works
              </button>
            </div>

            {/* Demo Preview */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 max-w-3xl mx-auto">
              <div className="text-left mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">S</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Sarah K.</div>
                    <div className="text-sm text-gray-500">Engineering • 2 min ago</div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <div className="text-sm font-medium text-gray-900 mb-2">✅ Yesterday</div>
                  <div className="text-sm text-gray-700">Deployed v2.3.1 to production, fixed the auth bug</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <div className="text-sm font-medium text-gray-900 mb-2">🎯 Today</div>
                  <div className="text-sm text-gray-700">Working on the new dashboard, ETA 3pm</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 mb-2">🚧 Blockers</div>
                  <div className="text-sm text-gray-700">Waiting for design review on the settings page</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>👍 3</span>
                  <span>💬 2 comments</span>
                </div>
                <span>2/5 team members updated</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Go Async?</h2>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {[
                {
                  icon: "⏱️",
                  title: "Save 5+ Hours/Week",
                  desc: "No more scheduling across time zones. Team members update when it works for them."
                },
                {
                  icon: "📝",
                  title: "Record Once, Read Anywhere",
                  desc: "Written updates create a searchable record. No more 'what did they say in standup?'"
                },
                {
                  icon: "🔗",
                  title: "Slack & Teams Ready",
                  desc: "Post updates directly to your Slack/Teams channels. No context switching."
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-10">
              {[
                { name: "Starter", price: "0", desc: "For individuals", features: ["3 updates/week", "1 team", "7-day history"] },
                { name: "Team", price: "15", desc: "For teams", features: ["Unlimited updates", "5 teams", "Slack integration"], highlighted: true },
                { name: "Business", price: "39", desc: "For orgs", features: ["Everything in Team", "Unlimited teams", "SSO & SAML"] }
              ].map((plan, i) => (
                <div key={i} className={`rounded-xl p-6 ${plan.highlighted ? 'bg-purple-600 text-white shadow-xl' : 'bg-white border border-gray-200'}`}>
                  <div className="font-bold text-lg mb-1">{plan.name}</div>
                  <div className={`text-sm mb-4 ${plan.highlighted ? 'text-purple-100' : 'text-gray-600'}`}>{plan.desc}</div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className={plan.highlighted ? 'text-purple-100' : 'text-gray-600'}>/mo</span>
                  </div>
                  <ul className="text-sm space-y-2 mb-6 text-left">
                    {plan.features.map((f, j) => (
                      <li key={j}>✓ {f}</li>
                    ))}
                  </ul>
                  <button className={`w-full py-2 rounded-lg font-medium ${plan.highlighted ? 'bg-white text-purple-600' : 'bg-purple-600 text-white'}`}>
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-100 py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-8">
              <div className="flex justify-center gap-6 mb-4">
                <a href="/terms.html" className="text-gray-600 hover:text-gray-900">Terms</a>
                <a href="/privacy.html" className="text-gray-600 hover:text-gray-900">Privacy</a>
                <a href="/pricing.html" className="text-gray-600 hover:text-gray-900">Pricing</a>
                <a href="/support.html" className="text-gray-600 hover:text-gray-900">Support</a>
                <a href="/refund-policy.html" className="text-gray-600 hover:text-gray-900">Refund Policy</a>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AS</span>
                </div>
                <span className="font-bold">AsyncStandup</span>
              </div>
              <div className="text-sm text-gray-500">© 2026 AsyncStandup. All rights reserved.</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
