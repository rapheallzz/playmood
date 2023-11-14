const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const { MongoClient } = require('mongodb');
const colors = require('colors'); // Moved import to this location

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Configuration
const uri = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(uri);

// Connect to the MongoDB database
connectDB()
  .then(() => {
    // Enable CORS
    app.use(cors());

    // Middleware for JSON and URL-encoded data
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Define your routes
    app.use('/api/top', require('./routes/topRoutes'));
    app.use('/api/users', require('./routes/userRoutes'));
    app.use('/api/fashion', require('./routes/fashionRoutes'));
    app.use('/api/interview', require('./routes/interviewRoutes'));
    app.use('/api/documentaries', require('./routes/documentariesRoutes'));
    app.use('/api/social', require('./routes/socialRoutes'));
    app.use('/api/film', require('./routes/filmRoutes'));
    app.use('/api/interfashion', require('./routes/interfashionRoutes'));

    // Example route for 'top' collection
    app.get('/api/top', async (req, res) => {
      try {
        const db = client.db('playmood');
        const collectionName = 'top';
        const collectionData = await db.collection(collectionName).find({}).toArray();
        return res.json(collectionData);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Add more routes as needed

    // Start the server
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });