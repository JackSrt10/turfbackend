const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const adminAuthRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Parse JSON request body
app.use(express.json());

// Define authentication routes
app.use('/auth', authRoutes);

// Define authentication routes
app.use('/admin_auth', adminAuthRoutes);


// Define user routes
app.use('/user', userRoutes);

// Define admin routes
app.use('/admin',adminRoutes)

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});