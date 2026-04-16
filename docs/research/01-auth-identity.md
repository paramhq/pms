# Part 1: Authentication & Identity

## Features

### 1.1 Registration
- Email + password signup
- Password strength meter (real-time feedback: weak/fair/strong)
- Password requirements: min 8 chars, 1 uppercase, 1 number, 1 special
- Terms of service + privacy policy checkbox
- Invite-only: workspace invite required (no public signup)
- Registration form: full name, email, password, confirm password

### 1.2 Email Verification
- Verification email sent on registration
- Verification link with 24-hour expiry
- Resend verification email button
- Unverified accounts: limited access until verified
- Verification success page with redirect to workspace

### 1.3 Login
- Email + password form
- "Remember me" checkbox (extends session to 30 days)
- Show/hide password toggle
- Login error: generic "Invalid email or password" (no enumeration)
- Redirect to originally requested page after login
- Rate limiting: 5 attempts per 15 minutes

### 1.4 Logout
- Logout from current session
- "Logout from all devices" option
- Clear local storage / session data
- Redirect to login page

### 1.5 Forgot Password / Reset
- "Forgot password?" link on login page
- Enter email → receive reset link (always show success, even if email not found)
- Reset link: single-use, 1-hour expiry
- New password form with strength meter
- Invalidate all existing sessions after reset

### 1.6 OAuth / Social Login
- Google Sign-In
- GitHub Sign-In
- Microsoft Sign-In
- Link/unlink OAuth accounts from settings
- Auto-create account if email matches workspace invite
- Handle: OAuth email differs from invite email

### 1.7 Magic Link Login
- Enter email → receive login link
- Single-use link, 15-minute expiry
- Opens directly into app (no password needed)
- Useful for infrequent users / guests

### 1.8 Two-Factor Authentication (2FA)
- TOTP-based (Google Authenticator, Authy, etc.)
- Setup: show QR code + manual key
- Generate 10 backup recovery codes (store hashed)
- Enforce 2FA at workspace level (admin setting)
- Recovery flow: use backup code → disable 2FA → re-setup
- "Remember this device for 30 days" option

### 1.9 Session Management
- View active sessions: device, browser, IP, last active
- Revoke individual sessions
- "Revoke all other sessions" button
- Session timeout: configurable (default: 24h inactive)
- Refresh token rotation on use

### 1.10 Account Security
- Account lockout: 5 failed login attempts → 15-min lock
- Progressive delay: 1s, 2s, 4s, 8s between attempts
- Security event log: login, password change, 2FA enable/disable
- Login notification email for new devices/locations

## Pages/Screens

1. **Login Page** — email, password, remember me, OAuth buttons, forgot password link
2. **Register Page** — name, email, password, confirm, terms checkbox
3. **Forgot Password Page** — email input, submit
4. **Reset Password Page** — new password, confirm, strength meter
5. **Email Verification Page** — success/expired/resend states
6. **2FA Setup Page** — QR code, manual key, verify code, backup codes
7. **2FA Challenge Page** — 6-digit code input, "use backup code" link
8. **Magic Link Sent Page** — confirmation + resend
9. **Session Management** (in user settings) — active sessions table

## Data Model

```
User {
  id: UUID
  email: string (unique)
  email_verified: boolean
  password_hash: string (nullable — OAuth users)
  full_name: string
  display_name: string
  avatar_url: string?
  totp_secret: string? (encrypted)
  totp_enabled: boolean
  backup_codes: string[] (hashed)
  locked_until: timestamp?
  failed_login_attempts: number
  created_at: timestamp
  updated_at: timestamp
}

Session {
  id: UUID
  user_id: FK → User
  refresh_token_hash: string
  device_info: string
  ip_address: string
  user_agent: string
  last_active_at: timestamp
  expires_at: timestamp
  created_at: timestamp
}

OAuthAccount {
  id: UUID
  user_id: FK → User
  provider: enum (google, github, microsoft)
  provider_user_id: string
  provider_email: string
  access_token: string (encrypted)
  refresh_token: string? (encrypted)
  created_at: timestamp
}

PasswordResetToken {
  id: UUID
  user_id: FK → User
  token_hash: string
  used: boolean
  expires_at: timestamp
  created_at: timestamp
}

EmailVerificationToken {
  id: UUID
  user_id: FK → User
  token_hash: string
  used: boolean
  expires_at: timestamp
  created_at: timestamp
}
```

## Zod Schemas (examples)

```typescript
const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

const registerSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/),
  confirmPassword: z.string(),
  acceptTerms: z.literal(true),
}).refine(d => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const resetPasswordSchema = z.object({
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const totpSchema = z.object({
  code: z.string().length(6).regex(/^\d+$/),
});
```
