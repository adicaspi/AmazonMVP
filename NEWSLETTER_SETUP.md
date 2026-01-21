# Newsletter Email Setup

The newsletter subscription now sends actual welcome emails to subscribers using Resend.

## Setup Instructions

1. **Get a Resend API Key:**
   - Go to https://resend.com
   - Sign up for a free account
   - Create an API key in the dashboard

2. **Add API Key to Environment Variables:**
   - Add to `.env.local`:
     ```
     RESEND_API_KEY=re_your_api_key_here
     ```
   - For Vercel deployment, add the same variable in:
     Vercel Dashboard → Project Settings → Environment Variables

3. **Verify Domain (Optional but Recommended):**
   - In Resend dashboard, verify your domain `aipicks.co`
   - This allows sending from `newsletter@aipicks.co` instead of the default domain

## How It Works

- When a user subscribes, they receive a welcome email
- The email includes:
  - Welcome message
  - What to expect from the newsletter
  - Links to website and contact page
  - Unsubscribe information

## Testing

- Test locally by subscribing with your email
- Check Resend dashboard for email logs
- Verify emails are delivered successfully

## Notes

- If `RESEND_API_KEY` is not set, subscriptions will still work but no email will be sent
- Free tier includes 3,000 emails/month
- Emails are sent from `newsletter@aipicks.co` (or your verified domain)
