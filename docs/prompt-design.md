# Prompt Design & AI Interaction Note
## Enterprise HR Knowledge Copilot

---

## 1. Overview

This document describes the prompt engineering strategy, RAG pipeline design, and AI interaction improvements implemented in the HR Assistant.

---

## 2. RAG Pipeline Design

The system uses a **Retrieval-Augmented Generation (RAG)** architecture to ensure responses are grounded in actual HR policy documents rather than relying solely on the LLM's general knowledge.

### Pipeline Flow
User Question
│
▼
Keyword Extraction & Scoring
│
▼
Vector Store Search (Top 3 policies)
│
▼
Context Building
│
▼
Prompt Construction
│
▼
Gemini LLM (gemini-1.5-flash)
│
▼
Response + Source Attribution
│
▼
User Interface

---

## 3. Prompt Design

### 3.1 System Prompt

The system prompt establishes the assistant's persona, constraints, and behavior:

###Example Prompt
You are an intelligent HR Assistant for Optum Healthcare.
Your role is to help employees find accurate information about
HR policies, benefits, leave, compliance, and workplace guidelines.
Always base your answers strictly on the provided policy context.
If the answer is not in the provided context, clearly state that
you don't have that information and suggest contacting HR directly
at hr@abc.com.
Be professional, empathetic, and concise.
Format your responses clearly with bullet points or numbered
lists where appropriate.
### 3.2 Key Design Decisions

| Decision | Rationale |
|---|---|
| **Strict context grounding** | Prevents hallucination by limiting responses to retrieved documents |
| **Low temperature (0.2)** | Ensures consistent, factual responses rather than creative ones |
| **Fallback instruction** | Directs users to HR when answer not found — prevents guessing |
| **Professional tone** | Matches Optum's enterprise communication standards |
| **Formatting instruction** | Bullet points improve readability for policy information |

### 3.3 RAG Prompt Template
Based on the following Optum HR Policy documents, please answer
the employee's question accurately and helpfully.
POLICY CONTEXT:
[Retrieved policy documents]
EMPLOYEE QUESTION:
[User's question]
Please provide a clear, accurate answer based strictly on
the policy documents above.
---

## 4. Retrieval Strategy

### 4.1 Document Scoring Algorithm

The system uses a TF-IDF inspired keyword scoring approach:

```javascript
Score = Σ (1 + log(term_frequency)) for each query term found
      × 1.5 if category matches query
      × 2.0 if title matches query
```

### 4.2 Why Not Embeddings?

| Approach | Pros | Cons |
|---|---|---|
| **Keyword scoring (used)** | No API cost, instant, no rate limits | Less semantic understanding |
| **Embedding vectors** | Better semantic search | Costs API calls, rate limited |

For this POC, keyword scoring provides sufficient accuracy for HR policy retrieval where queries typically contain domain-specific terms.

### 4.3 Top-K Retrieval

- Retrieves top **3** most relevant policy documents
- Balances context quality vs token usage
- Each document includes ID, title, category, and full content

---

## 5. Conversation Context Management

### 5.1 History Management

```javascript
// Last 10 messages kept per session
if (history.length > 10) {
    history.splice(0, 2); // Remove oldest pair
}
```

### 5.2 Why 10 Messages?

| Factor | Consideration |
|---|---|
| Token limits | Gemini free tier has TPM limits |
| Relevance | Older messages rarely relevant to current query |
| Performance | Shorter context = faster responses |

---

## 6. AI Interaction Improvements

### 6.1 Suggested Questions
Pre-built question chips help users discover capabilities:
- "What is the leave policy?"
- "How do I escalate an incident?"
- "What are the onboarding steps?"
- "Explain the HIPAA policy"

### 6.2 Source Attribution (Explainability)
Every AI response shows which policy documents were referenced, color-coded by category, allowing users to verify the source of information.

### 6.3 Retry with Exponential Backoff
```javascript
// Handles rate limits gracefully
Wait times: 10s → 20s → 30s (3 attempts)
```

### 6.4 Response Streaming Ready
Architecture supports streaming responses for better perceived performance in future iterations.

---

## 7. What I Would Improve With More Time

| Improvement | Impact |
|---|---|
| Semantic embeddings via Gemini | Better retrieval accuracy |
| Response streaming | Faster perceived response time |
| Query reformulation | Handle ambiguous questions better |
| Multi-language support | Serve non-English speaking employees |
| Fine-tuned model | Domain-specific Optum HR model |
| Feedback-driven reranking | Use 👍👎 data to improve retrieval |

---

*Last Updated: May 2026*
*Version: 1.0.0*
