const { chat } = require('../services/ragService');
const { loadPolicies } = require('../services/dataLoader');

// Load policies on startup
loadPolicies();

// In-memory session store
const sessions = new Map();

const handleChat = async (req, res, next) => {
    try {
        const { message, sessionId } = req.body;

        if (!message || message.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Message cannot be empty'
            });
        }

        // Get or create session
        const sid = sessionId || require('uuid').v4();
        if (!sessions.has(sid)) {
            sessions.set(sid, []);
        }

        const history = sessions.get(sid);

        // Get RAG response
        const result = await chat(message, history);

        // Update conversation history
        history.push({ role: 'user', content: message });
        history.push({ role: 'assistant', content: result.message });

        // Keep last 10 messages to avoid token limits
        if (history.length > 10) {
            history.splice(0, 2);
        }

        sessions.set(sid, history);

        return res.status(200).json({
            success: true,
            sessionId: sid,
            message: result.message,
            sources: result.sources,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        next(error);
    }
};

const handleFeedback = async (req, res, next) => {
    try {
        const { sessionId, messageIndex, feedback } = req.body;

        // Log feedback (in production this would go to a database)
        console.log(`[FEEDBACK] Session: ${sessionId}, Message: ${messageIndex}, Rating: ${feedback}`);

        return res.status(200).json({
            success: true,
            message: 'Feedback recorded. Thank you!'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { handleChat, handleFeedback };