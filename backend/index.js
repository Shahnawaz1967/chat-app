const express = require('express');
const { server, app } = require('./socket/socket');
const cors = require('cors');
const mainRoutes = require('./routes/index.js');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser"); // Fixed typo
const connectDB = require('./config/database.js');
const path = require("path");

dotenv.config();
const PORT = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
    origin: process.env.MODE === 'production' 
        ? 'https://your-frontend-deployed-url.com' 
        : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use("/api/v1", mainRoutes);

// Serve Frontend in Production
if (process.env.MODE === 'production') {
    const frontendPath = path.join(__dirname, 'frontend', 'dist');
    app.use(express.static(frontendPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
}


// Start Server
server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at ${PORT}`);
});
