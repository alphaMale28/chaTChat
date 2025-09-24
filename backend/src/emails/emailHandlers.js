// import { resendClient, sender } from "../lib/resend.js";
// import createWelcomeEmailTemplate from "./emailTemplates.js";

// export const sendWelcomeEmail = async (email, name, clientURL) => {
//   const { data, error } = await resendClient.emails.send({
//     from: `${sender.name} <${sender.email}>`,
//     to: email,
//     subject: "Welcome to chaTChat!",
//     html: createWelcomeEmailTemplate(name, clientURL),
//   });

//   if (error) {
//     console.log("Error sending welcome email:", error);
//     throw new Error("Failed to send welcome email");
//   }

//   console.log("Welcome Email sent successfully", data);
// };

import { resendClient, sender } from "../lib/resend.js";
import createWelcomeEmailTemplate from "../emails/emailTemplates.js";

const isEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((e || "").trim());

export const sendWelcomeEmail = async (email, name, clientURL) => {
  const fromEmail = sender.email;
  const fromName = sender.name;

  // Guard against bad env values
  if (!isEmail(fromEmail)) {
    throw new Error(
      `EMAIL_FROM invalid: "${fromEmail}" (use onboarding@resend.dev for dev)`
    );
  }
  // Build header; NEVER put brackets in .env
  const fromHeader = fromName ? `${fromName} <${fromEmail}>` : fromEmail;

  const html = createWelcomeEmailTemplate(name, clientURL);
  if (typeof html !== "string" || html.length === 0) {
    throw new Error("Email template returned empty/invalid HTML");
  }

  const { data, error } = await resendClient.emails.send({
    from: fromHeader,
    to: email, // string or string[]
    subject: "Welcome to chaTChat!",
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(
      `Failed to send welcome email: ${error.message || "unknown"}`
    );
  }

  // console.log("Welcome Email sent successfully:", data);
  return data;
};
