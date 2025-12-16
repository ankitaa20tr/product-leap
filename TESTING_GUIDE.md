# Testing Guide

This guide helps you verify that the application submission feature is working correctly.

## Pre-Testing Checklist

- [ ] Backend server is running (`npm run dev:server`)
- [ ] Frontend is running (`npm run dev`)
- [ ] Environment variables are configured (especially email settings)
- [ ] Database file location is accessible

## Manual Testing Steps

### 1. Test Backend Health Check

```bash
curl http://localhost:3001/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### 2. Test Application Submission

#### Using curl:
```bash
curl -X POST http://localhost:3001/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "instagram": "instagram.com/testuser",
    "niche": "Fitness",
    "reason": "I want to monetize my fitness content and help others achieve their goals."
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "application": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com",
    "submitted_at": "2024-01-01 12:00:00"
  }
}
```

#### Using Browser DevTools:

1. Open browser console (F12)
2. Navigate to the application form
3. Fill out the form with test data
4. Submit the form
5. Check Network tab for the API request
6. Verify response status is 200/201

### 3. Test Database Storage

Check that the application was saved:

```bash
# View all applications
curl http://localhost:3001/api/applications
```

Or check the database file directly:
```bash
# Using sqlite3 CLI (if installed)
sqlite3 server/applications.db "SELECT * FROM applications;"
```

### 4. Test Email Notifications

1. Submit an application through the form
2. Check your email inbox (and spam folder)
3. Verify you received a notification email with:
   - Applicant name
   - Email address
   - Instagram link
   - Niche
   - Reason for monetization
   - Submission timestamp

**Note:** If email is not configured, check server logs. The application will still be saved to the database.

### 5. Test Frontend Integration

1. Open http://localhost:8080
2. Scroll to the application form
3. Fill out all required fields:
   - Name
   - Email (valid email format)
   - Instagram Link
   - Niche
   - Reason for Monetization
4. Click "Submit Application"
5. Verify:
   - Loading state shows "Submitting..."
   - Success message appears
   - Form shows success screen
   - Toast notification appears

### 6. Test Error Handling

#### Test Missing Fields:
```bash
curl -X POST http://localhost:3001/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "error": "All fields are required"
}
```

#### Test Invalid Email:
```bash
curl -X POST http://localhost:3001/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "invalid-email",
    "instagram": "instagram.com/test",
    "niche": "Fitness",
    "reason": "Test reason"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "error": "Invalid email format"
}
```

## Automated Testing Script

Create a test script (`test-api.js`):

```javascript
const testApplication = async () => {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    instagram: 'instagram.com/testuser',
    niche: 'Fitness',
    reason: 'I want to monetize my content'
  };

  try {
    // Test health check
    console.log('Testing health check...');
    const healthRes = await fetch('http://localhost:3001/health');
    const healthData = await healthRes.json();
    console.log('✓ Health check passed:', healthData);

    // Test application submission
    console.log('\nTesting application submission...');
    const submitRes = await fetch('http://localhost:3001/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    const submitData = await submitRes.json();
    
    if (submitRes.ok) {
      console.log('✓ Application submitted successfully:', submitData);
      
      // Test retrieval
      console.log('\nTesting application retrieval...');
      const getRes = await fetch('http://localhost:3001/api/applications');
      const getData = await getRes.json();
      console.log('✓ Applications retrieved:', getData.count, 'applications');
    } else {
      console.error('✗ Application submission failed:', submitData);
    }
  } catch (error) {
    console.error('✗ Test failed:', error.message);
  }
};

testApplication();
```

Run with:
```bash
node test-api.js
```

## Common Issues and Solutions

### Issue: "Failed to fetch" Error

**Cause:** Backend server not running or CORS issue

**Solution:**
1. Check if backend is running: `curl http://localhost:3001/health`
2. Verify CORS configuration in `server/index.js`
3. Check browser console for CORS errors

### Issue: Email Not Sending

**Cause:** Email credentials not configured or incorrect

**Solution:**
1. Check `.env` file has all email variables set
2. Verify email credentials are correct
3. For Gmail, ensure app password is used (not regular password)
4. Check server logs for email errors

### Issue: Database Write Error

**Cause:** File permissions or disk space

**Solution:**
1. Check `server/` directory permissions
2. Verify disk space is available
3. Check server logs for specific error messages

### Issue: Form Submission Hangs

**Cause:** Backend not responding or network issue

**Solution:**
1. Check backend is running
2. Verify API URL in browser console
3. Check network tab for request status
4. Verify no firewall blocking connection

## Testing Checklist

Before deploying to production, verify:

- [ ] Backend health check works
- [ ] Application form submission works
- [ ] Data is saved to database
- [ ] Email notifications are received
- [ ] Error handling works (missing fields, invalid email)
- [ ] Success message displays correctly
- [ ] Form resets after submission
- [ ] All form fields are validated
- [ ] Instagram and LinkedIn links work in footer
- [ ] Mobile responsive design works
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari)

## Performance Testing

### Load Test

Test multiple simultaneous submissions:

```bash
# Using Apache Bench
ab -n 100 -c 10 -p test-data.json -T application/json \
  http://localhost:3001/api/applications

# Create test-data.json:
{
  "name": "Load Test User",
  "email": "loadtest@example.com",
  "instagram": "instagram.com/loadtest",
  "niche": "Testing",
  "reason": "Load testing"
}
```

## Security Testing

1. **SQL Injection Test:**
   ```json
   {
     "name": "Test'; DROP TABLE applications; --",
     ...
   }
   ```
   (Should be safe with parameterized queries)

2. **XSS Test:**
   ```json
   {
     "name": "<script>alert('XSS')</script>",
     ...
   }
   ```
   (Should be escaped in email)

3. **Email Validation:**
   - Test various email formats
   - Test with special characters

## Production Testing

After deployment:

1. Test with production URLs
2. Verify HTTPS is working
3. Check CORS allows only your frontend domain
4. Test email notifications in production
5. Verify database backups are working
6. Monitor server logs for errors


