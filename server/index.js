import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from './db.js';
import { sendApplicationNotification } from './email.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Submit application endpoint
app.post('/api/applications', async (req, res) => {
  try {
    const { name, email, instagram, niche, reason } = req.body;

    // Validate required fields
    if (!name || !email || !instagram || !niche || !reason) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }

    // Insert application into database
    const stmt = db.prepare(`
      INSERT INTO applications (name, email, instagram, niche, reason)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(name, email, instagram, niche, reason);
    const applicationId = result.lastInsertRowid;

    // Get the inserted application
    const application = db
      .prepare('SELECT * FROM applications WHERE id = ?')
      .get(applicationId);

    // Send email notification (non-blocking)
    sendApplicationNotification(application).catch((error) => {
      console.error('Failed to send email notification:', error);
      // Don't fail the request if email fails
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application: {
        id: application.id,
        name: application.name,
        email: application.email,
        submitted_at: application.submitted_at,
      },
    });
  } catch (error) {
    console.error('Error processing application:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process application. Please try again later.',
    });
  }
});

// Get all applications endpoint (for admin purposes, you might want to add authentication)
app.get('/api/applications', (req, res) => {
  try {
    const applications = db.prepare('SELECT * FROM applications ORDER BY submitted_at DESC').all();
    res.json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch applications',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

