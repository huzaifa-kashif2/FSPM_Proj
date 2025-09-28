import speakeasy from "speakeasy";
import qrcode from "qrcode";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { sendMail } from "../utils/mailer.js";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const secret = speakeasy.generateSecret({ name: `Notes Manager (${email})` });
    const qrCodeDataURL = await qrcode.toDataURL(secret.otpauth_url);

    const user = new User({ email, password: hashedPassword, mfaSecret: secret.base32 });
    await user.save();

    try {
      await sendMail(
        user.email,
        "Welcome to Notes Manager 🎉",
        "Thanks for signing up! Your account is now active. Scan the attached QR code in Google Authenticator."
      );
    } catch (mailErr) {
      console.error("Signup email failed:", mailErr.message);
    }

    res.json({
      message: "Signup successful. Scan this QR code with Google Authenticator.",
      qrCode: qrCodeDataURL,
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, token } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!verified) {
      return res.status(401).json({ message: "Invalid MFA code" });
    }

    try {
      await sendMail(
        user.email,
        "New Login Detected ✅",
        `Hi ${user.email}, you just logged in at ${new Date().toLocaleString()}.`
      );
    } catch (mailErr) {
      console.error("Login email failed:", mailErr.message);
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
