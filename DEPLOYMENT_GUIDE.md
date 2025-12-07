# Deployment Guide

This guide covers deploying both the frontend and backend of the Horizon application to production.

## Table of Contents

1. [Frontend Deployment](#frontend-deployment)
2. [Backend Deployment](#backend-deployment)
3. [Database Management](#database-management)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment Checklist](#post-deployment-checklist)

---

## Frontend Deployment

### Option 1: Vercel (Recommended for React/Vite)

#### Prerequisites
- GitHub account with repository pushed
- Vercel account (free tier available)

#### Steps

1. **Install Vercel CLI** (optional, can use web interface):
   ```bash
   npm i -g vercel
   ```

2. **Build the project locally** (to test):
   ```bash
   npm run build
   ```

3. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings:
     - **Framework Preset:** Vite
     - **Root Directory:** ./ (default)
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`

4. **Set Environment Variables** in Vercel:
   - Go to Project Settings > Environment Variables
   - Add: `VITE_API_URL` = your production backend URL
   - Example: `https://api.yourdomain.com`

5. **Deploy**:
   - Click "Deploy"
   - Your site will be live at `yourproject.vercel.app`

#### Custom Domain (Optional)
- Go to Project Settings > Domains
- Add your custom domain
- Update DNS records as instructed

---

### Option 2: Netlify

#### Steps

1. **Install Netlify CLI** (optional):
   ```bash
   npm install -g netlify-cli
   ```

2. **Create `netlify.toml`** in project root:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Deploy via Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

4. **Set Environment Variables**:
   - Site Settings > Build & Deploy > Environment
   - Add: `VITE_API_URL` = your backend URL

---

### Option 3: AWS S3 + CloudFront

#### Steps

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**:
   - Go to AWS S3 Console
   - Create bucket with public read access
   - Upload contents of `dist/` folder

3. **Enable Static Website Hosting**:
   - Bucket Properties > Static website hosting
   - Index document: `index.html`
   - Error document: `index.html` (for React Router)

4. **Create CloudFront Distribution**:
   - Point to S3 bucket
   - Set default root object to `index.html`
   - Configure custom domain (optional)

5. **Set Environment Variables**:
   - Rebuild with production API URL before deploying:
   ```bash
   VITE_API_URL=https://api.yourdomain.com npm run build
   ```

---

### Option 4: GitHub Pages

#### Steps

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `package.json`**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/your-repo-name"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Set Environment Variables**:
   - Build with production API URL before deploying:
   ```bash
   VITE_API_URL=https://api.yourdomain.com npm run build && npm run deploy
   ```

---

## Backend Deployment

### Option 1: Railway (Recommended - Easy Setup)

#### Steps

1. **Create Railway Account**:
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**:
   - Railway will auto-detect Node.js
   - **Root Directory:** Set to project root (not server/)
   - **Start Command:** `node server/index.js`

4. **Set Environment Variables**:
   - Go to Variables tab
   - Add all variables from `.env`:
     ```
     PORT=3001
     EMAIL_HOST=smtp.gmail.com
     EMAIL_PORT=587
     EMAIL_SECURE=false
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-app-password
     NOTIFICATION_EMAIL=your-email@gmail.com
     ```

5. **Deploy**:
   - Railway will automatically deploy
   - Get your backend URL (e.g., `https://your-app.railway.app`)

6. **Update Frontend**:
   - Set `VITE_API_URL` in frontend to Railway URL

---

### Option 2: Render

#### Steps

1. **Create Render Account**:
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**:
   - Click "New +" > "Web Service"
   - Connect your GitHub repository

3. **Configure Service**:
   - **Name:** horizon-backend (or your choice)
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server/index.js`
   - **Plan:** Free or Paid

4. **Set Environment Variables**:
   - Add all variables from your `.env` file

5. **Deploy**:
   - Click "Create Web Service"
   - Render will build and deploy
   - Get your backend URL

---

### Option 3: Heroku

#### Prerequisites
- Heroku CLI installed
- Heroku account

#### Steps

1. **Login to Heroku**:
   ```bash
   heroku login
   ```

2. **Create Heroku App**:
   ```bash
   heroku create your-app-name
   ```

3. **Create `Procfile`** in project root:
   ```
   web: node server/index.js
   ```

4. **Set Environment Variables**:
   ```bash
   heroku config:set PORT=3001
   heroku config:set EMAIL_HOST=smtp.gmail.com
   heroku config:set EMAIL_PORT=587
   heroku config:set EMAIL_SECURE=false
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   heroku config:set NOTIFICATION_EMAIL=your-email@gmail.com
   ```

5. **Deploy**:
   ```bash
   git push heroku main
   ```

6. **Check Logs**:
   ```bash
   heroku logs --tail
   ```

---

### Option 4: DigitalOcean App Platform

#### Steps

1. **Create DigitalOcean Account**
2. **Create New App**:
   - Connect GitHub repository
   - Select Node.js environment

3. **Configure**:
   - **Build Command:** `npm install`
   - **Run Command:** `node server/index.js`
   - **HTTP Port:** 3001

4. **Add Environment Variables**:
   - Add all variables from `.env`

5. **Deploy**:
   - Click "Create Resources"
   - App will deploy automatically

---

### Option 5: AWS EC2 / VPS (Self-Hosted)

#### Prerequisites
- Ubuntu server (20.04 or later)
- SSH access
- Domain name (optional)

#### Steps

1. **SSH into server**:
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install PM2** (Process Manager):
   ```bash
   sudo npm install -g pm2
   ```

4. **Clone Repository**:
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

5. **Install Dependencies**:
   ```bash
   npm install
   ```

6. **Create `.env` file**:
   ```bash
   nano .env
   # Add all environment variables
   ```

7. **Start with PM2**:
   ```bash
   pm2 start server/index.js --name horizon-backend
   pm2 save
   pm2 startup
   ```

8. **Setup Nginx Reverse Proxy** (optional):
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/default
   ```

   Add location block:
   ```nginx
   location /api {
       proxy_pass http://localhost:3001;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
   }
   ```

   Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

9. **Setup SSL with Let's Encrypt**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## Database Management

### SQLite Database Backup

For production, consider migrating to PostgreSQL or another managed database. For SQLite:

#### Backup Database
```bash
# On your server
cp server/applications.db server/applications.db.backup
# Or download the file
```

#### Automated Backups (Cron Job)
```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * cp /path/to/server/applications.db /path/to/backups/applications-$(date +\%Y\%m\%d).db
```

### Database Migration (Optional - PostgreSQL)

For better scalability, consider migrating to PostgreSQL:

1. **Install PostgreSQL** on your server
2. **Create database**:
   ```sql
   CREATE DATABASE horizon_applications;
   ```

3. **Update `server/db.js`** to use PostgreSQL:
   ```javascript
   import pg from 'pg';
   const { Pool } = pg;
   
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
   });
   ```

4. **Update queries** to use PostgreSQL syntax

---

## Environment Variables

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://api.yourdomain.com` |

**Important:** Vite environment variables must be prefixed with `VITE_` to be accessible in the browser.

### Backend Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 3001 |
| `EMAIL_HOST` | SMTP server host | Yes* | - |
| `EMAIL_PORT` | SMTP server port | No | 587 |
| `EMAIL_SECURE` | Use TLS/SSL | No | false |
| `EMAIL_USER` | SMTP username | Yes* | - |
| `EMAIL_PASS` | SMTP password | Yes* | - |
| `NOTIFICATION_EMAIL` | Email to receive notifications | No | EMAIL_USER |

*Required only if email notifications are needed

---

## Post-Deployment Checklist

### Frontend
- [ ] Set `VITE_API_URL` environment variable
- [ ] Test form submission end-to-end
- [ ] Verify all links work (Instagram, LinkedIn)
- [ ] Test on mobile devices
- [ ] Check browser console for errors
- [ ] Verify SSL certificate (HTTPS)

### Backend
- [ ] All environment variables set correctly
- [ ] Database file is accessible and writable
- [ ] Email notifications working (test submission)
- [ ] Health check endpoint responding (`/health`)
- [ ] CORS configured correctly
- [ ] Server logs monitored
- [ ] Database backups configured

### Security
- [ ] HTTPS enabled for both frontend and backend
- [ ] Environment variables not exposed in client code
- [ ] CORS configured to only allow your frontend domain
- [ ] Rate limiting considered (optional)
- [ ] API endpoint authentication (optional, for GET /api/applications)

### Monitoring
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Set up uptime monitoring (e.g., UptimeRobot)
- [ ] Configure log aggregation
- [ ] Set up email alerts for server errors

---

## Troubleshooting

### Frontend Can't Connect to Backend

**Issue:** CORS errors or connection refused

**Solutions:**
1. Check `VITE_API_URL` is set correctly
2. Verify backend is running and accessible
3. Check CORS configuration in `server/index.js`
4. Verify network/firewall rules

### Email Not Sending

**Issue:** Applications saved but no emails received

**Solutions:**
1. Check server logs for email errors
2. Verify all email environment variables are set
3. For Gmail, ensure app password is used (not regular password)
4. Check spam folder
5. Verify SMTP settings are correct

### Database Errors

**Issue:** Applications not saving

**Solutions:**
1. Check file permissions on `server/applications.db`
2. Verify database file location is accessible
3. Check server logs for specific error messages
4. Ensure sufficient disk space

### Build Errors

**Issue:** Frontend build fails

**Solutions:**
1. Clear `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`
2. Check for TypeScript errors
3. Verify all dependencies are in `package.json`
4. Check build logs for specific errors

---

## Quick Reference

### Frontend URLs by Platform
- **Vercel:** `https://your-project.vercel.app`
- **Netlify:** `https://your-project.netlify.app`
- **GitHub Pages:** `https://yourusername.github.io/repo-name`

### Backend URLs by Platform
- **Railway:** `https://your-app.railway.app`
- **Render:** `https://your-app.onrender.com`
- **Heroku:** `https://your-app.herokuapp.com`

### Useful Commands

```bash
# Build frontend
npm run build

# Test backend locally
npm run dev:server

# Run both locally
npm run dev:all

# Check backend health
curl https://your-backend-url/health

# View applications
curl https://your-backend-url/api/applications
```

---

## Support

For issues or questions:
1. Check server logs
2. Review environment variables
3. Test endpoints with curl or Postman
4. Check platform-specific documentation

