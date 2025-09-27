// import { Resend } from "resend";
// import "dotenv/config";
// import { ENV } from "./env.js";

// export const resendClient = new Resend(ENV.RESEND_API_KEY);

// export const sender = {
//   email: ENV.EMAIL_FORM,
//   name: ENV.EMAIL_FORM_NAME,
// };

import { Resend } from "resend";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const resendClient = new Resend(ENV.RESEND_API_KEY);

export const sender = {
  email: (ENV.EMAIL_FROM || "").trim(), // e.g. onboarding@resend.dev
  name: (ENV.EMAIL_FROM_NAME || "chaTChat").trim(),
};
