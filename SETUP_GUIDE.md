# Complete Setup Guide

This guide will help you set up the application submission feature with database storage and email notifications.

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- An email account (Gmail, Outlook, etc.) for notifications

## 🚀 Quick Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3001

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Email address to receive application notifications
NOTIFICATION_EMAIL=your-email@gmail.com

# Frontend API URL (optional for development, required for production)
VITE_API_URL=http://localhost:3001
```

### Step 3: Email Setup

#### For Gmail:
1. Enable 2-factor authentication on your Google account
2. Go to [Google Account Settings](https://myaccount.google.com/) > Security
3. Under "2-Step Verification", click "App passwords"
4. Generate an app password for "Mail"
5. Use this app password as `EMAIL_PASS` in your `.env` file

#### For Other Providers:
See [ENV_SETUP.md](./ENV_SETUP.md) for detailed instructions for Outlook, Yahoo, and other providers.

**Note:** If you don't configure email, the server will still work and save applications to the database. You just won't receive email notifications.

### Step 4: Start the Application

#### Option A: Run Both Frontend and Backend Together
```bash
npm run dev:all
```

#### Option B: Run Separately

Terminal 1 (Backend):
```bash
npm run dev:server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:3001

## 📊 How It Works

1. **Form Submission:** When a user submits the application form, the data is sent to the backend API
2. **Database Storage:** The application is automatically saved to a SQLite database (`server/applications.db`)
3. **Email Notification:** An email is sent to the address specified in `NOTIFICATION_EMAIL` with all application details

## 🔍 Viewing Applications

You can view all submitted applications by:

1. **Via API:**
   ```bash
   curl http://localhost:3001/api/applications
   ```

2. **Direct Database Access:**
   - The database file is located at `server/applications.db`
   - You can use SQLite browser tools to view the data

## 🛠️ API Endpoints

- `POST /api/applications` - Submit a new application
- `GET /api/applications` - Get all applications (for admin)
- `GET /health` - Health check

## 📁 File Structure

```
├── server/
│   ├── index.js          # Express server
│   ├── db.js             # Database setup
│   ├── email.js          # Email notification service
│   └── README.md         # Detailed server documentation
├── src/
│   └── components/
│       └── ApplicationForm.tsx  # Form component (updated)
├── .env                  # Environment variables (create this)
├── ENV_SETUP.md          # Detailed environment setup
└── SETUP_GUIDE.md        # This file
```

## ❓ Troubleshooting

### Email not working?
- Check that all email environment variables are set correctly
- For Gmail, make sure you're using an app password, not your regular password
- Check server logs for error messages

### Database not creating?
- Make sure the `server/` directory exists
- Check file permissions on the server directory
- Look at server console for error messages

### Frontend can't connect to backend?
- Make sure the backend server is running on port 3001
- Check that CORS is enabled (it should be by default)
- Verify the API URL in your environment variables

## 🚢 Production Deployment

For production:

1. Set `VITE_API_URL` to your production API URL
2. Configure production email settings
3. Consider adding authentication to the GET endpoint
4. Set up proper database backups
5. Use environment-specific configuration files

## 📝 Additional Resources

- [Server Documentation](./server/README.md)
- [Environment Setup Details](./ENV_SETUP.md)

