import speakeasy from "speakeasy";
import qrcode from "qrcode";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendMail } from "../utils/mailer.js";

dotenv.config();

export const signup = async (req, res) => {
  // console.log("Signup endpoint hit");
  // console.log("Request body:", req.body);
  try {
    const { fullName, email, password } = req.body;
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({
        message: "Email and password are required and cannot be empty",
      });
    }
    const existingUser = await User.findOne({ email: email.trim() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    const secret = speakeasy.generateSecret({
      name: `Notes Manager (${email.trim()})`,
    });
    const qrCodeDataURL = await qrcode.toDataURL(secret.otpauth_url);
    const user = new User({
      fullName: fullName.trim(),
      email: email.trim(),
      password: hashedPassword,
      mfaSecret: secret.base32,
    });
    console.log("New user created:", user);
    await user.save();
    try {
      const base64 = (qrCodeDataURL || "").split(",")[1];
      await sendMail(
        user.email,
        "Welcome to Notes Manager 🎉",
        "Thanks for signing up! Your account is now active. Scan the attached QR code in Google Authenticator.",
        {
          html: `
            <div style="font-family: Arial, sans-serif; line-height:1.5;">
              <h2>Welcome to Notes Manager 🎉</h2>
              <p>Thanks for signing up! Your account is now active.</p>
              <p>Scan this QR code in your authenticator app to enable MFA:</p>
              <p><img src="cid:mfa-qr" alt="MFA QR Code" style="max-width: 250px;"/></p>
              <p>If you can't scan the QR, you can manually add the secret from your profile later.</p>
            </div>
          `,
          attachments: base64
            ? [
                {
                  filename: "mfa-qr.png",
                  content: Buffer.from(base64, "base64"),
                  contentType: "image/png",
                  cid: "mfa-qr",
                },
              ]
            : undefined,
        }
      );
    } catch (mailErr) {
      console.error("Signup email failed:", mailErr.message);
    }
    res.json({
      message:
        "Signup successful. Scan this QR code with Google Authenticator.",
      qrCode: qrCodeDataURL,
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, token } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({
        message: "Email and password are required and cannot be empty",
      });
    }

    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(
      password.trim(),
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If token is not provided, only credentials validation is requested
    if (!token?.trim()) {
      return res.status(200).json({
        message: "Credentials verified. MFA required.",
        mfaRequired: true,
      });
    }

    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: "base32",
      token: token.trim(),
      window: 2,
    });

    if (!verified) {
      return res.status(401).json({ message: "Invalid MFA code" });
    }

    const jwtToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    try {
      await sendMail(
        user.email,
        "New Login Detected ✅",
        `Hi ${
          user.email
        }, you just logged in at ${new Date().toLocaleString()}.`,
        {
          html: `<p>Hi <strong>${
            user.email
          }</strong>,</p><p>You just logged in at <strong>${new Date().toLocaleString()}</strong>.</p>`,
        }
      );
    } catch (mailErr) {
      console.error("Login email failed:", mailErr.message);
    }

    res.json({
      message: "Login successful",
      token: jwtToken,
      user: { id: user._id, email: user.email, fullName: user.fullName },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const logout = async (req, res) => {
  // logout handled on the client side because jwt is stateless
  res.json({ message: "Logout successful" });
};
