# Email Deliverability - Avoiding Spam/Junk Folder

## Current Status
✅ SPF configured  
✅ DKIM configured  
✅ Domain verified in Resend

## To Improve Deliverability (Reduce Junk Folder)

### 1. Add DMARC Record (IMPORTANT)
Add this TXT record in GoDaddy DNS:

**Record Type:** TXT  
**Name:** `_dmarc`  
**Value:** `v=DMARC1; p=none; rua=mailto:dmarc@aipicks.co; ruf=mailto:dmarc@aipicks.co; fo=1`

**Steps:**
1. Go to GoDaddy DNS Management
2. Add new TXT record
3. Name: `_dmarc`
4. Value: `v=DMARC1; p=none; rua=mailto:dmarc@aipicks.co`
5. Save

**After 1-2 weeks of monitoring, change to:**
- `p=quarantine` (soft enforcement)
- Then eventually `p=reject` (full enforcement)

### 2. Email Content Improvements (Already Done)
- ✅ Removed emojis from subject line
- ✅ Cleaner, professional content
- ✅ Added replyTo address
- ✅ Clear unsubscribe information

### 3. Additional Recommendations

**Warm Up the Domain:**
- Start with small volume
- Gradually increase over time
- Consistency is key

**Monitor:**
- Check Resend Dashboard → Metrics
- Monitor bounce rates
- Watch spam complaint rates (keep under 0.1%)

**Best Practices:**
- Always use opt-in lists (we do)
- Remove hard bounces immediately
- Include clear unsubscribe link (we do)
- Maintain good sender reputation

### 4. Test Deliverability
Use these tools to check your domain:
- https://www.mail-tester.com
- https://mxtoolbox.com/dmarc.aspx
- Google Postmaster Tools (if sending to Gmail)

### 5. Time to Build Reputation
New domains typically need 2-4 weeks to build reputation. During this time:
- Some emails may go to spam
- This is normal for new domains
- Reputation improves over time with consistent sending

## Current Email Settings
- From: `newsletter@aipicks.co`
- Reply-To: `info@aipicks.co`
- Subject: Clean, no emojis
- Content: Professional, helpful
