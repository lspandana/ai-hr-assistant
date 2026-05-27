const { searchPolicies } = require('./vectorStore');
const { generateResponse } = require('./geminiService');

const chat = async (userMessage, conversationHistory = []) => {
    // Step 1 - Retrieve relevant policy documents
    const relevantPolicies = searchPolicies(userMessage, 3);

    // Step 2 - Build context from retrieved documents
    const context = relevantPolicies.length > 0
        ? relevantPolicies.map(p =>
            `[${p.id} - ${p.title}]\n${p.content}`
        ).join('\n\n---\n\n')
        : 'No specific policy documents found for this query.';

    // Step 3 - Build RAG prompt
    const ragPrompt = `Based on the following Optum HR Policy documents, please answer the employee's question accurately and helpfully.

POLICY CONTEXT:
${context}

EMPLOYEE QUESTION:
${userMessage}

Please provide a clear, accurate answer based strictly on the policy documents above.`;

    // Step 4 - Generate response
    const response = await generateResponse(ragPrompt, conversationHistory);

    // Step 5 - Return response with sources for explainability
    return {
        message: response,
        sources: relevantPolicies.map(p => ({
            id: p.id,
            title: p.title,
            category: p.category
        }))
    };
};

module.exports = { chat };