const express = require('express')
const { getConnection} = require('./db/connect-mongoose')
const cors = require('cors');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
require('dotenv').config()

const app = express()
const port = process.env.PORT;

app.use(cors());

getConnection();

app.use(express.json());

app.use('/genre', require('./routes/genre'))
app.use('/director', require('./routes/director'))
app.use('/producer', require('./routes/producer'))
app.use('/type', require('./routes/type'))
app.use('/media', require('./routes/media'))
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})