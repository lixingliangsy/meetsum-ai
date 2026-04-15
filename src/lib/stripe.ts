import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

// Pricing plans
export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    priceId: null,
    limits: {
      meetings: 10,
      minutes: 60,
    },
  },
  pro: {
    name: 'Pro',
    price: 29,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    limits: {
      meetings: 100,
      minutes: 1000,
    },
  },
  team: {
    name: 'Team',
    price: 99,
    priceId: process.env.STRIPE_TEAM_PRICE_ID,
    limits: {
      meetings: -1, // unlimited
      minutes: -1,
    },
  },
} as const

export type PlanType = keyof typeof PLANS

// Create checkout session
export async function createCheckoutSession(
  priceId: string,
  customerId?: string,
  customerEmail?: string
) {
  return stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    ...(customerId ? { customer: customerId } : { customer_email: customerEmail! }),
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
  })
}

// Create customer portal session
export async function createPortalSession(customerId: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  })
}
