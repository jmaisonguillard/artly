<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Artly Account</title>
    <style>
        /* Reset styles */
        body, html {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #333;
            background-color: #f9fafb;
        }

        /* Container styles */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }

        /* Header styles */
        .email-header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #e5e7eb;
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #8b5cf6; /* Purple-600 from Tailwind */
            text-decoration: none;
        }

        /* Content styles */
        .email-content {
            padding: 30px 20px;
            line-height: 1.6;
        }

        h1 {
            color: #1f2937; /* Gray-800 from Tailwind */
            font-size: 22px;
            margin-bottom: 16px;
        }

        p {
            margin-bottom: 16px;
            color: #4b5563; /* Gray-600 from Tailwind */
        }

        /* Button styles */
        .button-container {
            text-align: center;
            margin: 30px 0;
        }

        .button {
            display: inline-block;
            background-color: #8b5cf6; /* Purple-600 from Tailwind */
            color: #ffffff;
            font-weight: 600;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            text-align: center;
        }

        .button:hover {
            background-color: #7c3aed; /* Purple-700 from Tailwind */
        }

        /* Verification code container */
        .verification-code {
            background-color: #f3f4f6; /* Gray-100 from Tailwind */
            border-radius: 8px;
            padding: 16px;
            text-align: center;
            margin: 20px 0;
        }

        .verification-code p {
            font-size: 14px;
            margin-bottom: 8px;
            color: #6b7280; /* Gray-500 from Tailwind */
        }

        .verification-code .code {
            font-family: monospace;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 2px;
            color: #1f2937; /* Gray-800 from Tailwind */
        }

        /* Footer styles */
        .email-footer {
            text-align: center;
            padding: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 12px;
            color: #6b7280; /* Gray-500 from Tailwind */
        }

        .social-links {
            margin: 16px 0;
        }

        .social-link {
            display: inline-block;
            margin: 0 8px;
            color: #8b5cf6; /* Purple-600 from Tailwind */
            text-decoration: none;
        }

        .help-text {
            margin-top: 24px;
            font-size: 14px;
            color: #6b7280; /* Gray-500 from Tailwind */
        }

        .help-text a {
            color: #8b5cf6; /* Purple-600 from Tailwind */
            text-decoration: none;
        }

        /* Responsive adjustments */
        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                padding: 10px !important;
            }

            .email-content {
                padding: 20px 15px !important;
            }

            .button {
                display: block !important;
                width: 100% !important;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Email Header -->
        <div class="email-header">
            <a href="{{ config('app.url') }}" class="logo">Artly</a>
        </div>

        <!-- Email Content -->
        <div class="email-content">
            <h1>Verify Your Email Address</h1>

            <p>Hi {{ $user->first_name }},</p>

            <p>Thank you for registering with Artly! We're excited to have you join our creative community.</p>

            <p>Please verify your email address to unlock all features of your account. Simply click the button below:</p>

            <div class="button-container">
                <a href="{{ $verificationUrl }}" class="button">Verify Email Address</a>
            </div>

            <p>This verification link will expire in 24 hours.</p>

            <p>
                If you did not create an account, no further action is required.
            </p>

            <p>
                Best regards,<br>
                The Artly Team
            </p>
        </div>

        <!-- Email Footer -->
        <div class="email-footer">
            <div class="social-links">
                <a href="#" class="social-link">Facebook</a>
                <a href="#" class="social-link">Instagram</a>
                <a href="#" class="social-link">Twitter</a>
            </div>

            <p>© {{ date('Y') }} Artly. All rights reserved.</p>

            <p>
                This email was sent to {{ $user->email }}.<br>
                If you'd prefer not to receive these types of emails, you can <a href="#">unsubscribe</a>.
            </p>

            <div class="help-text">
                Need help? <a href="#">Contact our support team</a>.
            </div>
        </div>
    </div>
</body>
</html>
