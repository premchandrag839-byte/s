import { appendEnquiry } from "../../lib/server/enquiry";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { name, email, phone, message } = req.body || {};
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    const record = {
      name,
      email,
      phone,
      message,
      createdAt: new Date().toISOString(),
    };

    // Save enquiry (await if appendEnquiry is async)
    await appendEnquiry(record);

    // Send email notification via Gmail SMTP
    const smtpUser = process.env.NOTIFY_EMAIL_USER; // e.g., 'akashinterclg@gmail.com'
    const smtpPass = process.env.NOTIFY_EMAIL_PASS; // e.g., 'gmfn yhex vajj kdub'

    if (!smtpUser || !smtpPass) {
      if (process.env.NODE_ENV !== 'production') console.warn("Email not sent: SMTP credentials missing");
    } else {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: smtpUser, pass: smtpPass },
      });

      const mailOptions = {
        from: smtpUser,
        to: smtpUser,
        subject: "New Online Enquiry",
        text: `New enquiry submitted:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}\n\nSubmitted at: ${record.createdAt}`,
        html: `
          <h2>New Online Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
          <p><em>Submitted at: ${record.createdAt}</em></p>
        `,
        replyTo: email,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') console.warn("Email notification failed:", e?.message || e);
      }
    }

    if (process.env.NODE_ENV !== 'production') console.log("New enquiry:", { name, email, phone });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: "Failed to store enquiry" });
  }
}
