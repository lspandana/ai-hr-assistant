# Responsible AI & Governance Note
## Enterprise HR Knowledge Copilot

---

## 1. Intended Use

The HR Assistant is designed exclusively as an **internal employee-facing tool** to help Optum employees quickly access information about HR policies, benefits, leave management, compliance guidelines, and workplace procedures.

### Intended Users
- Full-time and part-time Optum employees
- HR department staff
- New joinees during onboarding

### Intended Use Cases
- Answering questions about leave entitlements and application processes
- Explaining onboarding steps and probation requirements
- Summarizing HR policies on demand
- Providing guidance on incident escalation procedures
- Clarifying HIPAA and compliance requirements

### Out of Scope
- Making HR decisions on behalf of management
- Approving or rejecting leave requests
- Providing legal or medical advice
- Accessing or processing real employee personal data

---

## 2. Limitations

### 2.1 Knowledge Boundaries
- The assistant can only answer questions based on the HR policy documents it has been trained on
- It does not have access to real-time HR systems, employee records, or live data
- Policy updates made after the dataset was created will not be reflected until the knowledge base is updated

### 2.2 AI Hallucination Risk
- Like all Large Language Models, Gemini may occasionally generate responses that sound plausible but are inaccurate
- The RAG (Retrieval-Augmented Generation) architecture significantly reduces this risk by grounding responses in actual policy documents
- However, employees should always verify critical decisions with the HR department directly

### 2.3 Context Limitations
- The assistant maintains conversation history for the current session only
- History is lost when the browser is refreshed or the session ends
- Complex multi-part questions may sometimes receive incomplete answers

### 2.4 Language and Accessibility
- Currently supports English language only
- Screen reader support is implemented via ARIA labels but not fully audited

---

## 3. Accuracy Considerations

### 3.1 How We Improve Accuracy
| Technique | Implementation |
|---|---|
| RAG Architecture | Responses grounded in actual HR policy documents |
| Source Attribution | Every response shows which policy documents were referenced |
| Low Temperature | Gemini is configured at temperature 0.2 for consistent factual responses |
| System Prompt | Strict instructions to only answer from provided context |
| Fallback Response | If no relevant policy found, directs user to hr@abc.com |

### 3.2 Known Accuracy Risks
- **Ambiguous queries** may retrieve less relevant policy documents
- **Very specific questions** (e.g. exact salary figures) may not be answerable from policy documents alone
- **Edge cases** not covered in policy documents will result in a "contact HR" response

### 3.3 Accuracy Disclaimer
Every response includes a visible notice:
> *"AI-generated responses are based on HR policies. Always verify important decisions with HR at hr@abc.com"*

---

## 4. User Feedback Handling

### 4.1 Feedback Mechanism
The application includes a thumbs up 👍 / thumbs down 👎 feedback system on every AI response.

### 4.2 How Feedback is Processed
| Step | Action |
|---|---|
| Collection | User clicks 👍 or 👎 on any AI response |
| Storage | Feedback logged server-side with session ID and message index |
| Review | HR team reviews negative feedback weekly |
| Improvement | Consistently poor responses trigger knowledge base updates |

### 4.3 Feedback Data Privacy
- Feedback is anonymous — no personally identifiable information is stored
- Session IDs are randomly generated UUIDs with no link to employee identity
- Feedback logs are retained for 90 days for quality improvement purposes

---

## 5. Governance Framework

### 5.1 Human Oversight
- All AI responses are advisory only — final decisions rest with human HR staff
- The system explicitly directs employees to human HR contacts for sensitive matters
- HR managers can review conversation logs for quality assurance

### 5.2 Data Privacy
- No employee personal data is processed or stored
- The knowledge base contains only publicly shareable HR policy documents
- No PHI (Protected Health Information) is used in any part of the system

### 5.3 Model Governance
- Uses Google Gemini via the official API with documented usage policies
- Model version is pinned to ensure consistent behavior
- Any model updates require testing before deployment

### 5.4 Audit Trail
- All API requests are logged with timestamps
- Response times are monitored for performance degradation
- Error rates are tracked and alerted on when exceeding 5%

---

## 6. Scale-Out and Enterprise Governance Considerations

When scaling this solution to production:

| Concern | Solution |
|---|---|
| More users | Add Redis caching for frequent queries |
| Larger datasets | Replace in-memory vector store with Pinecone or Weaviate |
| Authentication | Integrate with SSO/Active Directory |
| Audit compliance | Store all interactions in a HIPAA-compliant database |
| Model monitoring | Integrate LangSmith for LLM observability |
| Content filtering | Add input/output content moderation layer |

---

## 7. Contact and Escalation

If the HR Assistant provides incorrect or concerning information:

- **HR Direct Line**: hr@abc.com
- **IT Support**: support@abc.com
- **Ethics Hotline**: 1-800-abc-ETH
- **Privacy Officer**: privacy@abc.com

---

*Last Updated: May 2026*
*Version: 1.0.0*
*Owner: HR Technology Team*