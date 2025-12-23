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

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/email', emailRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

app.use((req, res) => res.status(404).json({ message: 'Endpoint not found' }));

app.use(errorMiddleware);

module.exports = app;