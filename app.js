const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
require('./config/db')
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(cors({
    origin: ["http://localhost:3000", "https://instaclone0507.netlify.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', require('./routes/auth'))
app.use('/private', require('./routes/private'))

if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'))
    const path = require('path');
  	app.get('*', (req, res) => {
    	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  	});
}

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is Running at PORT: ${PORT}`)
})