const express = require('express')
const colors = require ('colors')
const bodyParser = require('body-parser')
const dotenv = require ('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require ('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/top', require ('./routes/topRoutes'))
app.use('/api/users', require ('./routes/userRoutes'))
app.use('/api/fashion', require ('./routes/fashionRoutes'))
app.use('/api/interview', require ('./routes/interviewRoutes'))
app.use('/api/documentaries', require ('./routes/documentariesRoutes'))
app.use('/api/social', require ('./routes/socialRoutes'))
app.use('/api/film', require ('./routes/filmRoutes'))
app.use('/api/interfashion', require ('./routes/interfashionRoutes'))


 app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
