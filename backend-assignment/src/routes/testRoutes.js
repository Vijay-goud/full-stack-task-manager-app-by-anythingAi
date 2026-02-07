const express = require('express')
const verifyToken = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'Access granted',
    user: req.user,
  })
})

module.exports = router
