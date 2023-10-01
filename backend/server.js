const express = require('express');
const colors = require('colors');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const { MongoClient } = require('mongodb'); // Add this line to import MongoClient
const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/top', require('./routes/topRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/fashion', require('./routes/fashionRoutes'));
app.use('/api/interview', require('./routes/interviewRoutes'));
app.use('/api/documentaries', require('./routes/documentariesRoutes'));
app.use('/api/social', require('./routes/socialRoutes'));
app.use('/api/film', require('./routes/filmRoutes'));
app.use('/api/interfashion', require('./routes/interfashionRoutes'));

app.use(errorHandler);

// MongoDB Configuration
const uri = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(uri);

app.get('/api/top', async (req, res) => {
  const db = client.db('playmood'); 
  const collectionName = 'top';

  const collectionData = await db.collection(collectionName).find({}).toArray();
  
  return res.json(collectionData);
})

app.get('/api/fashion', async (req, res) => {
    const db = client.db('playmood'); 
    const collectionName = 'fashion';
  
    const collectionData = await db.collection(collectionName).find({}).toArray();
    
    return res.json(collectionData);
  })

  app.get('/api/social', async (req, res) => {
    const db = client.db('playmood'); 
    const collectionName = 'social'; 
  
    const collectionData = await db.collection(collectionName).find({}).toArray();
    
    return res.json(collectionData);
  })

    app.get('/api/interview', async (req, res) => {
    const db = client.db('playmood'); 
    const collectionName = 'interview'; 
  
    const collectionData = await db.collection(collectionName).find({}).toArray();
    
    return res.json(collectionData);
  })

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`));
