const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // Security headers
const morgan = require('morgan'); // Logging
const errorMiddleware = require('./middleware/error.middleware');

// Route Imports
const authRoutes = require('./modules/auth/auth.routes');
const productRoutes = require('./modules/products/product.routes');
const emailRoutes = require('./modules/emails/email.routes');

const app = express();

// Global Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased limit for bulk file simulation
app.use(morgan('dev'));

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/email', emailRoutes);

// Health Check
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// 404 Handler
app.use((req, res) => res.status(404).json({ message: 'Endpoint not found' }));

// Global Error Handler (Must be last)
app.use(errorMiddleware);

module.exports = app;