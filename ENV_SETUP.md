# Environment Variables Setup

Create a `.env` file in the root directory with the following configuration:

```env
# Server Configuration
PORT=3001

# Email Configuration
# For Gmail, use smtp.gmail.com
# For Outlook, use smtp-mail.outlook.com
# For custom SMTP, use your provider's SMTP server
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Email address to receive application notifications
# If not set, will default to EMAIL_USER
NOTIFICATION_EMAIL=your-email@gmail.com

# Frontend API URL (optional, defaults to http://localhost:3001)
VITE_API_URL=http://localhost:3001
```

## Email Setup Instructions

### Gmail Setup:
1. Enable 2-factor authentication on your Google account
2. Go to Google Account settings > Security > App passwords
3. Generate an app password for "Mail"
4. Use this app password as `EMAIL_PASS`

### Outlook/Hotmail Setup:
- `EMAIL_HOST=smtp-mail.outlook.com`
- `EMAIL_PORT=587`
- `EMAIL_SECURE=false`

### Yahoo Setup:
- `EMAIL_HOST=smtp.mail.yahoo.com`
- `EMAIL_PORT=587` or `465`
- `EMAIL_SECURE=true` (if using port 465)

**Note:** If email credentials are not configured, the server will still work but will skip email notifications and log a warning. Applications will still be saved to the database.

