const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Configuration
const uri = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(uri);

// Connect to the MongoDB database
connectDB()
  .then(() => {
    // Enable CORS
    const corsOptions = {
      origin: 'http://localhost:5173', // Update with your frontend origin
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 204,
    };

    app.use(cors(corsOptions));

    // Middleware for JSON and URL-encoded data
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Routes
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

    // Start the server
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
