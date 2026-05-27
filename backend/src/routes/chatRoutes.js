const express = require('express');
const router = express.Router();
const { handleChat, handleFeedback } = require('../controllers/chatController');

// POST /api/chat - Send a message
router.post('/', handleChat);

// POST /api/chat/feedback - Submit feedback
router.post('/feedback', handleFeedback);

module.exports = router;