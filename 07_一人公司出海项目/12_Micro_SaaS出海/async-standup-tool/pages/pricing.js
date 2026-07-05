import Head from 'next/head'
import Link from 'next/link'

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: 0,
      description: "For individuals trying async standups",
      features: ["3 updates per week", "1 team", "7-day history", "Email support"],
      cta: "Get Started Free",
      highlighted: false
    },
    {
      name: "Team",
      price: 15,
      description: "Best for teams going fully async",
      features: ["Unlimited updates", "Up to 5 teams", "Slack & Teams integration", "30-day history", "Priority support"],
      cta: "Start Free Trial",
      highlighted: true
    },
    {
      name: "Business",
      price: 39,
      description: "For organizations that need control",
      features: ["Everything in Team", "Unlimited teams", "SSO & SAML", "90-day history", "Admin dashboard", "Dedicated support"],
      cta: "Contact Sales",
      highlighted: false
    }
  ]

  return (
    <>
      <Head>
        <title>Pricing | AsyncStandup</title>
        <meta name="description" content="Simple pricing for async standups. Start free, upgrade when ready." />
      </Head>

      <div className="min-h-screen bg-white">
        <nav className="border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AS</span>
              </div>
              <span className="font-bold text-xl">AsyncStandup</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
                Get Started
              </button>
            </div>
          </div>
        </nav>

        <section className="py-16 px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 mb-8">Start free. No credit card required.</p>
        </section>

        <section className="px-6 pb-20">
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div key={i} className={`rounded-2xl p-8 ${plan.highlighted ? 'bg-purple-600 text-white shadow-2xl' : 'bg-white border border-gray-200'}`}>
                {plan.highlighted && (
                  <div className="inline-block bg-white text-purple-600 text-xs font-bold px-3 py-1 rounded-full mb-4">MOST POPULAR</div>
                )}
                <div className="font-bold text-2xl mb-2">{plan.name}</div>
                <div className={`text-sm mb-6 ${plan.highlighted ? 'text-purple-100' : 'text-gray-600'}`}>{plan.description}</div>
                <div className="mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className={plan.highlighted ? 'text-purple-100' : 'text-gray-600'}>/month</span>
                </div>
                <button className={`w-full py-3 rounded-lg font-medium mb-8 ${plan.highlighted ? 'bg-white text-purple-600' : 'bg-purple-600 text-white'}`}>
                  {plan.cta}
                </button>
                <ul className="space-y-4">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start space-x-3">
                      <span className={plan.highlighted ? 'text-purple-200' : 'text-green-500'}>✓</span>
                      <span className={`text-sm ${plan.highlighted ? 'text-purple-50' : 'text-gray-700'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-gray-100 py-12 px-6">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AS</span>
              </div>
              <span className="font-bold">AsyncStandup</span>
            </div>
            <div className="text-sm text-gray-500">© 2026 AsyncStandup. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </>
  )
}
