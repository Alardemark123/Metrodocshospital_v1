import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const position = formData.get("position") as string;
    const department = formData.get("department") as string;
    const location = formData.get("location") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const resume = formData.get("resume") as File | null;

    console.log("Form received:", { firstName, lastName, email, position });

    let attachments: any[] = [];
    if (resume && resume.size > 0) {
      const bytes = await resume.arrayBuffer();
      attachments = [{ filename: resume.name, content: Buffer.from(bytes) }];
    }

    // ── Email 1: HR Notification ───────────────────────────────────────
    await transporter.sendMail({
      from: `"Careers" <${process.env.SMTP_USER}>`,
      to: process.env.HR_EMAIL,
      replyTo: email,
      subject: `New Application: ${position} — ${firstName} ${lastName}`,
      attachments,
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Application</title></head>
<body style="margin:0;padding:0;background:#f0f4f0;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#5aa61b;border-radius:12px 12px 0 0;padding:36px 40px;text-align:center;">
              <p style="margin:0 0 6px;color:rgba(255,255,255,0.75);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">New Job Application</p>
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:800;line-height:1.3;">${position}</h1>
              <p style="margin:10px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">${department} &nbsp;·&nbsp; ${location}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">

              <!-- Applicant Info -->
              <p style="margin:0 0 20px;font-size:13px;font-weight:700;color:#5aa61b;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #f0f4f0;padding-bottom:10px;">Applicant Information</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f4f0;width:140px;font-size:13px;font-weight:700;color:#888;">Full Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f4f0;font-size:14px;color:#1a3c2a;font-weight:600;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f4f0;font-size:13px;font-weight:700;color:#888;">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f4f0;font-size:14px;"><a href="mailto:${email}" style="color:#5aa61b;text-decoration:none;font-weight:600;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f4f0;font-size:13px;font-weight:700;color:#888;">Position</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f4f0;font-size:14px;color:#333;">${position}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f4f0;font-size:13px;font-weight:700;color:#888;">Department</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f4f0;font-size:14px;color:#333;">${department}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-size:13px;font-weight:700;color:#888;">Location</td>
                  <td style="padding:10px 0;font-size:14px;color:#333;">${location}</td>
                </tr>
              </table>

              ${
                coverLetter
                  ? `
              <!-- Cover Letter -->
              <p style="margin:28px 0 12px;font-size:13px;font-weight:700;color:#5aa61b;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #f0f4f0;padding-bottom:10px;">Cover Letter</p>
              <div style="background:#f8faf8;border-left:4px solid #5aa61b;border-radius:0 8px 8px 0;padding:16px 20px;">
                <p style="margin:0;font-size:14px;color:#444;line-height:1.8;white-space:pre-wrap;">${coverLetter}</p>
              </div>`
                  : ""
              }

              <!-- Resume -->
              <p style="margin:28px 0 12px;font-size:13px;font-weight:700;color:#5aa61b;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #f0f4f0;padding-bottom:10px;">Resume</p>
              ${
                resume?.size
                  ? `<table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background:#f0f9e8;border:1px solid #c8e6a0;border-radius:8px;padding:12px 18px;">
                        <p style="margin:0;font-size:14px;color:#2d6a0f;font-weight:600;">📎 ${resume.name}</p>
                        <p style="margin:4px 0 0;font-size:12px;color:#5aa61b;">Attached to this email</p>
                      </td>
                    </tr>
                  </table>`
                  : `<p style="margin:0;font-size:14px;color:#999;">No resume was attached.</p>`
              }

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8faf8;border-top:1px solid #e8f0e8;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#aaa;">This email was sent automatically from your Careers portal.<br/>Reply directly to contact the applicant.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    console.log("HR email sent");

    // ── Email 2: Applicant Confirmation ───────────────────────────────
    await transporter.sendMail({
      from: `"Careers" <${process.env.SMTP_USER}>`,
      to: email,
      replyTo: process.env.HR_EMAIL,
      subject: `We received your application for ${position}`,
      priority: "high",
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "High",
      },
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Application Received</title></head>
<body style="margin:0;padding:0;background:#f0f4f0;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#5aa61b;border-radius:12px 12px 0 0;padding:36px 40px;text-align:center;">
              <div style="width:56px;height:56px;background:rgba(255,255,255,0.2);border-radius:50%;margin:0 auto 16px;line-height:56px;font-size:26px;">✓</div>
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:800;">Application Received!</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">Thank you for applying, ${firstName}.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">
              <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.7;">Hi <strong style="color:#1a3c2a;">${firstName}</strong>,</p>
              <p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7;">
                We've successfully received your application for the <strong style="color:#5aa61b;">${position}</strong> role. Our hiring team will carefully review your submission and get back to you if your profile is a great match.
              </p>
              <p style="margin:0 0 28px;font-size:15px;color:#555;line-height:1.7;">
                In the meantime, if you have any questions feel free to reply to this email.
              </p>

              <!-- Summary Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8faf8;border:1px solid #e0ece0;border-radius:10px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#5aa61b;text-transform:uppercase;letter-spacing:1.5px;">Your Application Summary</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:7px 0;border-bottom:1px solid #e8f0e8;width:120px;font-size:13px;color:#888;font-weight:600;">Position</td>
                        <td style="padding:7px 0;border-bottom:1px solid #e8f0e8;font-size:13px;color:#1a3c2a;font-weight:700;">${position}</td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0;border-bottom:1px solid #e8f0e8;font-size:13px;color:#888;font-weight:600;">Department</td>
                        <td style="padding:7px 0;border-bottom:1px solid #e8f0e8;font-size:13px;color:#333;">${department}</td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0;font-size:13px;color:#888;font-weight:600;">Location</td>
                        <td style="padding:7px 0;font-size:13px;color:#333;">${location}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- What's Next -->
              <p style="margin:28px 0 14px;font-size:13px;font-weight:700;color:#5aa61b;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #f0f4f0;padding-bottom:10px;">What Happens Next?</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;vertical-align:top;width:32px;">
                    <div style="width:24px;height:24px;background:#5aa61b;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:#fff;">1</div>
                  </td>
                  <td style="padding:8px 0;font-size:14px;color:#555;line-height:1.6;">Our team reviews your application</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;vertical-align:top;width:32px;">
                    <div style="width:24px;height:24px;background:#5aa61b;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:#fff;">2</div>
                  </td>
                  <td style="padding:8px 0;font-size:14px;color:#555;line-height:1.6;">Shortlisted candidates are contacted for an interview</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;vertical-align:top;width:32px;">
                    <div style="width:24px;height:24px;background:#5aa61b;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:#fff;">3</div>
                  </td>
                  <td style="padding:8px 0;font-size:14px;color:#555;line-height:1.6;">Final decision and offer extended</td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8faf8;border-top:1px solid #e8f0e8;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#5aa61b;">The Hiring Team</p>
              <p style="margin:0;font-size:12px;color:#aaa;">This is an automated confirmation. Reply to reach our HR team.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    console.log("Applicant email sent");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SMTP error:", err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 },
    );
  }
}
