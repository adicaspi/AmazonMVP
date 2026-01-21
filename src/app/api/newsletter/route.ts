import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Send welcome email to subscriber (if Resend API key is configured)
    if (resend) {
      try {
        await resend.emails.send({
        from: "AI Picks <newsletter@aipicks.co>",
        to: email,
        subject: "Welcome to AI Picks Newsletter! 🎉",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(to bottom right, #0f172a, #1e293b); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Welcome to AI Picks!</h1>
              </div>
              
              <div style="background: white; padding: 40px 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
                <p style="font-size: 16px; margin-bottom: 20px;">
                  Thank you for subscribing to our newsletter! 🎉
                </p>
                
                <p style="font-size: 16px; margin-bottom: 20px;">
                  You'll now receive weekly recommendations for the best home accessories, organization tips, and exclusive product picks delivered straight to your inbox.
                </p>
                
                <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 30px 0;">
                  <p style="font-size: 14px; margin: 0; color: #64748b;">
                    <strong>What to expect:</strong><br>
                    • Curated product recommendations<br>
                    • Practical home organization guides<br>
                    • Exclusive tips and insights<br>
                    • Weekly updates on new picks
                  </p>
                </div>
                
                <p style="font-size: 16px; margin-top: 30px;">
                  We're excited to help you create a more organized, comfortable, and beautiful home.
                </p>
                
                <p style="font-size: 14px; color: #64748b; margin-top: 30px;">
                  If you have any questions or feedback, feel free to reply to this email.
                </p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="font-size: 12px; color: #94a3b8; margin: 0;">
                  AI Picks - Curated home accessories and practical guides<br>
                  <a href="https://www.aipicks.co" style="color: #10b981; text-decoration: none;">Visit our website</a> | 
                  <a href="https://www.aipicks.co/contact" style="color: #10b981; text-decoration: none;">Contact us</a>
                </p>
                <p style="font-size: 11px; color: #cbd5e1; margin-top: 10px;">
                  You can unsubscribe at any time by clicking the link in any email.
                </p>
              </div>
            </body>
          </html>
        `,
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Continue even if email fails - still return success to user
      }
    } else {
      console.log("Newsletter subscription (email not sent - RESEND_API_KEY not configured):", email);
    }

    // Optionally: Save to database or mailing list service
    // For now, we'll just send the email

    return NextResponse.json({ 
      success: true,
      message: "Successfully subscribed! Check your email for confirmation." 
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}
