const fs = require('fs');
const path = require('path');

let policies = [];

const loadPolicies = () => {
    try {
        const dataPath = path.join(__dirname, '../../data/hr_policies.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        policies = JSON.parse(rawData);
        console.log(`✅ Loaded ${policies.length} HR policy documents`);
        return policies;
    } catch (error) {
        console.error('❌ Failed to load HR policies:', error.message);
        throw error;
    }
};

const getPolicies = () => {
    if (policies.length === 0) {
        return loadPolicies();
    }
    return policies;
};

module.exports = { loadPolicies, getPolicies };