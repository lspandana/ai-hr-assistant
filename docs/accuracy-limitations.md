# Accuracy & Limitations
## Optum Enterprise HR Knowledge Copilot

---

## 1. Accuracy Assessment

### What the System Does Well
- Answering direct questions about specific HR policies
- Summarizing leave entitlements and procedures
- Explaining step-by-step processes like onboarding
- Providing escalation paths for incidents
- Referencing exact policy document sources

### Known Accuracy Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Outdated policy information | Medium | Regular knowledge base updates |
| Incomplete answers for edge cases | Medium | Fallback to hr@optum.com |
| Misinterpreting ambiguous questions | Low | Suggested questions guide users |
| Hallucination | Low | RAG grounding + low temperature |

---

## 2. Limitations

### Technical Limitations
- Knowledge limited to 12 policy documents in current POC
- No real-time connection to HR systems
- Session history lost on browser refresh
- English language only
- Free tier API rate limits (15 RPM)

### Functional Limitations
- Cannot approve or process leave requests
- Cannot access individual employee records
- Cannot make binding HR decisions
- Cannot answer questions outside provided policies

---

## 3. Risk Discussion

### Incorrect Answers
The biggest risk is an employee acting on incorrect AI-generated information. Mitigated by source attribution showing exactly which policy was referenced and a persistent disclaimer directing employees to HR for important decisions.

### Over-Reliance on AI
Employees may trust AI responses without verification. Mitigated by the Responsible AI banner on every page and fallback responses directing users to human HR staff.

### UX Limitations
The current interface is optimized for desktop. Mobile experience needs improvement. Suggested questions help new users but may not cover all use cases.

---

*Last Updated: May 2026*
*Version: 1.0.0*