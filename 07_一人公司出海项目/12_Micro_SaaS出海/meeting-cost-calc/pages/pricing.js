import Head from 'next/head'
import Link from 'next/link'

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: 0,
      description: "Perfect for individuals who want to track meeting costs",
      features: [
        "5 meetings per month",
        "Basic cost calculator",
        "Email support",
        "CSV export"
      ],
      cta: "Get Started Free",
      highlighted: false
    },
    {
      name: "Pro",
      price: 19,
      description: "Best for teams who want to optimize meeting culture",
      features: [
        "Unlimited meetings",
        "Advanced analytics dashboard",
        "Slack & Teams integration",
        "Meeting recordings (optional)",
        "Team cost reports",
        "Priority support"
      ],
      cta: "Start Free Trial",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: 49,
      description: "For organizations that need full control and insights",
      features: [
        "Everything in Pro",
        "SSO & SAML support",
        "Advanced permissions",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ]

  return (
    <>
      <Head>
        <title>Pricing | Meeting Cost Calculator</title>
        <meta name="description" content="Simple, transparent pricing for Meeting Cost Calculator. Start free, upgrade when you're ready." />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MC</span>
              </div>
              <span className="font-bold text-xl">MeetingCalc</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <a href="https://github.com" target="_blank" className="text-gray-600 hover:text-gray-900">GitHub</a>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* Header */}
        <section className="py-16 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600 mb-8">
              Start free and upgrade when you see the value. No hidden fees, no surprises.
            </p>
            <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
              <button className="px-4 py-2 rounded-md bg-white shadow-sm font-medium text-sm">
                Monthly
              </button>
              <button className="px-4 py-2 rounded-md text-gray-600 font-medium text-sm">
                Annual (Save 20%)
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-6 pb-20">
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div 
                key={i}
                className={`rounded-2xl p-8 ${
                  plan.highlighted 
                    ? 'bg-blue-600 text-white shadow-2xl scale-105' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                {plan.highlighted && (
                  <div className="inline-block bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    MOST POPULAR
                  </div>
                )}
                <div className="font-bold text-2xl mb-2">{plan.name}</div>
                <div className={`text-sm mb-6 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.description}
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className={`${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>/month</span>
                </div>
                <button 
                  className={`w-full py-3 rounded-lg font-medium mb-8 ${
                    plan.highlighted
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } transition`}
                >
                  {plan.cta}
                </button>
                <ul className="space-y-4">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start space-x-3">
                      <span className={`text-lg ${plan.highlighted ? 'text-blue-200' : 'text-green-500'}`}>✓</span>
                      <span className={`text-sm ${plan.highlighted ? 'text-blue-50' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "Can I change my plan later?",
                  a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of the next billing cycle."
                },
                {
                  q: "Is there a free trial?",
                  a: "Yes, all paid plans come with a 14-day free trial. No credit card required to start."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards (Visa, MasterCard, AmEx) and PayPal. Enterprise customers can also pay by invoice."
                },
                {
                  q: "Can I cancel anytime?",
                  a: "Absolutely. There are no long-term contracts. You can cancel your subscription at any time from your account settings."
                }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Optimize Your Meetings?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join 500+ remote teams who are making every meeting count.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
                Start Free Trial
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-gray-400 transition font-medium">
                Schedule Demo
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-100 py-12 px-6">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MC</span>
              </div>
              <span className="font-bold">MeetingCalc</span>
            </div>
            <div className="text-sm text-gray-500">
              © 2026 MeetingCalc. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
