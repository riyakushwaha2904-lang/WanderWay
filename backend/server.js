
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Booking = require('./models/Booking');
const Contact = require('./models/Contact');

const app = express();



aconst allowedOrigins = [
  'http://localhost:4200',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the WanderWay API!'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'WanderWay backend is running!',
    database: mongoose.connection.readyState === 1
      ? 'connected'
      : 'disconnected'
  });
});

// Save booking details
app.post('/api/bookings', async (req, res) => {
    console.log('Booking request received:', req.body);
  try {
    const booking = await Booking.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      destination: req.body.destination,
      date: req.body.date,
      travelers: req.body.travelers,
      requirements: req.body.requirements || ''
    });

    res.status(201).json({
      status: 'success',
      message: 'Booking saved successfully!',
      bookingId: booking._id
    });
  } catch (error) {
    if (
      error.name === 'ValidationError' ||
      error.name === 'CastError'
    ) {
      return res.status(400).json({
        status: 'error',
        message: 'Please check the booking details and try again.'
      });
    }

    console.error('Booking error:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Could not save booking.'
    });
  }
});

// Save contact messages
app.post('/api/contact', async (req, res) => {
  try {
    const contact = await Contact.create({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message
    });

    res.status(201).json({
      status: 'success',
      message: 'Contact message saved successfully!',
      contactId: contact._id
    });
  } catch (error) {
    if (
      error.name === 'ValidationError' ||
      error.name === 'CastError'
    ) {
      return res.status(400).json({
        status: 'error',
        message: 'Please check your contact form details.'
      });
    }

    console.error('Contact save failed:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Could not save your contact message.'
    });
  }
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected successfully!');

    app.listen(PORT, () => {
      console.log(`WanderWay backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

startServer();
