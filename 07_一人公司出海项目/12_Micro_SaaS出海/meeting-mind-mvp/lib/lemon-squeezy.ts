import { lemonSqueezySetup, createCheckout, getSubscription, cancelSubscription } from '@lemonsqueezy/lemonsqueezy.js'
import { v4 as uuidv4 } from 'uuid'

// Initialize Lemon Squeezy
lemonSqueezySetup({
  apiKey: process.env.LEMON_SQUEEZY_API_KEY || '',
})

// Plan variants
export const PLANS = {
  free: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_FREE_VARIANT || 'free',
  pro: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PRO_VARIANT || 'pro',
  team: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_TEAM_VARIANT || 'team',
}

// Create checkout session
export async function createCheckoutSession({
  variantId,
  email,
  userId,
  redirectUrl,
}: {
  variantId: string
  email: string
  userId: string
  redirectUrl: string
}) {
  try {
    const storeId = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STORE || ''
    
    const checkout = await createCheckout(storeId, variantId, {
      checkoutData: {
        email,
        custom: {
          user_id: userId,
        },
      },
      checkoutOptions: {
        embed: false,
        media: true,
        logo: true,
      },
      productOptions: {
        redirectUrl,
        receiptButtonText: 'Go to Dashboard',
        receiptThankYouNote: 'Thank you for your purchase!',
      },
    })

    return checkout
  } catch (error) {
    console.error('Error creating checkout:', error)
    throw error
  }
}

// Get subscription
export async function getUserSubscription(subscriptionId: string) {
  try {
    const { data, error } = await getSubscription(subscriptionId)
    
    if (error) {
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Error getting subscription:', error)
    throw error
  }
}

// Cancel subscription
export async function cancelUserSubscription(subscriptionId: string) {
  try {
    const { data, error } = await cancelSubscription(subscriptionId)
    
    if (error) {
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Error canceling subscription:', error)
    throw error
  }
}

// Verify webhook signature
export function verifyWebhookSignature(payload: string, signature: string): boolean {
  const crypto = require('crypto')
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || ''
  
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(payload)
  const digest = hmac.digest('hex')
  
  return crypto.timingSafeEquals(Buffer.from(digest), Buffer.from(signature))
}
