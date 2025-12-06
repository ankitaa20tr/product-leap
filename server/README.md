# Backend Server Setup

This backend server handles application submissions, stores them in a database, and sends email notifications.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

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

### 3. Email Setup

#### For Gmail:
1. Enable 2-factor authentication on your Google account
2. Go to Google Account settings > Security > App passwords
3. Generate an app password for "Mail"
4. Use this app password as `EMAIL_PASS`

#### For Other Email Providers:
- **Outlook/Hotmail**: Use `smtp-mail.outlook.com`, port `587`
- **Yahoo**: Use `smtp.mail.yahoo.com`, port `587` or `465`
- Check your email provider's SMTP settings

### 4. Running the Server

#### Development (Server only):
```bash
npm run dev:server
```

#### Development (Frontend + Backend):
```bash
npm run dev:all
```

The server will start on `http://localhost:3001` (or the PORT specified in .env).

## API Endpoints

### POST /api/applications
Submit a new application.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "instagram": "instagram.com/johndoe",
  "niche": "Fitness",
  "reason": "I want to monetize my content..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "application": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "submitted_at": "2024-01-01 12:00:00"
  }
}
```

### GET /api/applications
Get all applications (for admin purposes).

### GET /health
Health check endpoint.

## Database

Applications are stored in a SQLite database (`server/applications.db`). The database is automatically created on first run.

**Database Schema:**
- `id` - Primary key
- `name` - Applicant name
- `email` - Applicant email
- `instagram` - Instagram link
- `niche` - Applicant niche
- `reason` - Reason for monetization
- `submitted_at` - Timestamp of submission

## Email Notifications

When a new application is submitted:
1. The application is saved to the database
2. An email notification is sent to the address specified in `NOTIFICATION_EMAIL` (or `EMAIL_USER` if not set)
3. The email includes all application details

**Note:** If email credentials are not configured, the server will still work but will skip email notifications and log a warning.

