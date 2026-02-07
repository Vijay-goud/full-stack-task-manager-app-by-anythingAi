const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const authRoutes = require('./routes/authRoutes')
const testRoutes = require('./routes/testRoutes')
const taskRoutes = require('./routes/taskRoutes')



const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

app.use('/api/v1/tasks', taskRoutes)
app.use('/api/v1/test', testRoutes)
app.use('/api/v1/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('API running')
})

module.exports = app
