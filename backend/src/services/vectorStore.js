const { getPolicies } = require('./dataLoader');

// Simple cosine similarity for in-memory vector search
const cosineSimilarity = (vecA, vecB) => {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
};

// Simple keyword-based search (no external embedding needed)
const tokenize = (text) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 2);
};

// TF-IDF inspired scoring
const scoreDocument = (query, document) => {
    const queryTokens = tokenize(query);
    const docTokens = tokenize(document.title + ' ' + document.content + ' ' + document.category);

    let score = 0;
    queryTokens.forEach(queryToken => {
        const count = docTokens.filter(t => t.includes(queryToken)).length;
        if (count > 0) {
            score += 1 + Math.log(count);
        }
    });

    // Boost score if query matches category exactly
    if (document.category.toLowerCase().includes(query.toLowerCase())) {
        score *= 1.5;
    }

    // Boost score if query matches title
    if (document.title.toLowerCase().includes(query.toLowerCase())) {
        score *= 2;
    }

    return score;
};

const searchPolicies = (query, topK = 3) => {
    const policies = getPolicies();

    const scored = policies.map(policy => ({
        ...policy,
        score: scoreDocument(query, policy)
    }));

    return scored
        .filter(p => p.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, topK);
};

module.exports = { searchPolicies };