# 🤖 ShopSphere RAG Bot Setup Guide

## Overview

This folder contains comprehensive mock data for building a RAG (Retrieval Augmented Generation) chatbot for customer support.

---

## 📁 Knowledge Base Documents

### 1. **return-policy.md** (Main Policy Document)
**Content:** Complete return and refund policy
- Return eligibility and timeframes
- Non-returnable items
- Step-by-step return process
- Refund calculations and methods
- Exchange procedures
- Damaged/defective item handling
- International returns
- Warranty information
- FAQs

**Use Cases:**
- Customer asks: "What's your return policy?"
- "How do I return an item?"
- "Can I return this watch?"
- "How long do refunds take?"

### 2. **shipping-policy.md**
**Content:** Shipping methods and delivery information
- Domestic and international shipping rates
- Delivery timeframes
- Free shipping eligibility
- Order tracking
- Delivery issues (missing, damaged, delayed)
- Address changes
- Holiday shipping deadlines

**Use Cases:**
- "How much is shipping?"
- "When will my order arrive?"
- "Where is my package?"
- "Can I change my address?"

### 3. **product-catalog.md**
**Content:** Complete product information
- Luxury Watches (Men's, Women's, Kids')
- Wireless Earbuds (3 models)
- Phone Cases (iPhone, Samsung, Universal)
- Product specifications and features
- Pricing and warranty information
- Care and maintenance guides
- Size and compatibility guides
- FAQs per category

**Use Cases:**
- "Tell me about your watches"
- "What earbuds do you have?"
- "Does this case fit iPhone 15?"
- "How do I care for my watch?"

### 4. **customer-service.md**
**Content:** Customer service quick reference
- Contact methods and hours
- Account management
- Order tracking
- Return process summary
- Warranty info
- Satisfaction guarantee

**Use Cases:**
- "How do I contact support?"
- "What are your hours?"
- "How do I track my order?"

---

## 🎯 RAG Bot Implementation Guide

### Step 1: Document Preparation

**Option A: Use as Markdown**
```python
# Load documents directly
documents = [
    "customer-support/return-policy.md",
    "customer-support/shipping-policy.md",
    "customer-support/product-catalog.md",
    "customer-support/customer-service.md"
]
```

**Option B: Convert to PDF**
Use any markdown to PDF converter:
- Pandoc: `pandoc return-policy.md -o return-policy.pdf`
- Online tools: markdown2pdf.com
- VSCode extensions: Markdown PDF

### Step 2: Embedding Strategy

**Recommended Chunking:**
```python
chunk_size = 1000  # characters
chunk_overlap = 200  # overlap for context
```

**Section-Based Chunking:**
- Split by headers (##, ###)
- Maintain context within sections
- Keep FAQs as complete Q&A pairs

### Step 3: Vector Database Setup

**Recommended: Pinecone, Weaviate, or ChromaDB**

```python
# Example with LangChain
from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import MarkdownHeaderTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Pinecone

# Load documents
loader = DirectoryLoader('customer-support/', glob="**/*.md")
documents = loader.load()

# Split by headers
headers_to_split_on = [
    ("##", "Header 2"),
    ("###", "Header 3"),
]
splitter = MarkdownHeaderTextSplitter(headers_to_split_on)
splits = splitter.split_text(documents)

# Create embeddings
embeddings = OpenAIEmbeddings()
vectorstore = Pinecone.from_documents(splits, embeddings)
```

### Step 4: Retrieval Configuration

**Optimal Settings:**
```python
retriever_config = {
    "search_type": "similarity",
    "k": 4,  # return top 4 chunks
    "score_threshold": 0.7  # minimum relevance
}
```

### Step 5: Prompt Engineering

**System Prompt Template:**
```
You are ShopSphere's helpful customer support assistant. 
Use the provided context to answer customer questions accurately.

Key Guidelines:
- Be friendly and professional
- Provide accurate information from the knowledge base
- If unsure, offer to connect them with human support
- Always include relevant policy details
- Suggest related help topics when appropriate

Context from knowledge base:
{context}

Customer Question: {question}

Assistant Response:
```

---

## 🔧 Implementation Options

### Option 1: LangChain + OpenAI

```python
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

llm = ChatOpenAI(model="gpt-4", temperature=0.7)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever(),
    return_source_documents=True
)

response = qa_chain({"query": "What's your return policy?"})
```

### Option 2: LlamaIndex

```python
from llama_index import GPTVectorStoreIndex, SimpleDirectoryReader

documents = SimpleDirectoryReader('customer-support/').load_data()
index = GPTVectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()

response = query_engine.query("How do I return an item?")
```

### Option 3: Anthropic Claude

```python
from anthropic import Anthropic

client = Anthropic(api_key="your_api_key")

# Retrieve relevant context from vector DB
context = retrieve_context(user_question)

response = client.messages.create(
    model="claude-3-sonnet-20240229",
    system=f"Context: {context}",
    messages=[{"role": "user", "content": user_question}]
)
```

---

## 💬 Sample Conversations

### Example 1: Return Question
**User:** "Can I return my watch?"

**Bot:** "Yes! At ShopSphere, we offer a 30-day return policy for watches. Your watch must be:
- Unworn with all protective stickers intact
- In original packaging with all documentation
- Returned within 30 days of delivery

To start a return:
1. Log into your account
2. Go to 'My Orders'
3. Select the order and click 'Request Return'
4. You'll receive a return label via email

Would you like help starting your return?"

### Example 2: Shipping Question
**User:** "When will my order arrive?"

**Bot:** "Delivery time depends on your shipping method:
- Standard Shipping: 5-7 business days ($9.99 or FREE on orders $50+)
- Expedited Shipping: 2-3 business days ($19.99)
- Express Shipping: 1-2 business days ($34.99)

You can track your order at www.shopsphere.com/track with your order number. Did you receive a tracking number yet?"

### Example 3: Product Question
**User:** "Tell me about your wireless earbuds"

**Bot:** "We have 3 wireless earbud options:

1. **Pro Wireless Earbuds - $149.99**
   - Active Noise Cancellation
   - 30 hours battery life
   - IPX4 water resistant
   - Wireless charging

2. **Sport Wireless Earbuds - $99.99**
   - Secure fit ear hooks
   - IPX7 waterproof
   - 24 hours battery life

3. **Budget Wireless Earbuds - $49.99**
   - 20 hours battery life
   - IPX4 splash resistant
   - Great value

All come with 1-year warranty. Which features are most important to you?"

---

## 🎨 UI Integration Examples

### Web Chat Widget
```javascript
// Simple chat interface
function sendMessage(userMessage) {
  // Send to RAG bot API
  fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message: userMessage }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(data => {
    displayBotResponse(data.response);
  });
}
```

### React Component
```jsx
import { useState } from 'react';

function CustomerSupportChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const response = await fetch('/api/rag-bot', {
      method: 'POST',
      body: JSON.stringify({ query: input })
    });
    const data = await response.json();
    
    setMessages([...messages, 
      { role: 'user', content: input },
      { role: 'bot', content: data.answer }
    ]);
  };

  return (
    <div className="chat-interface">
      {/* Chat UI */}
    </div>
  );
}
```

---

## 📊 Testing Queries

Use these to test your RAG bot:

**Return Policy:**
- "What's your return policy?"
- "How do I return a defective item?"
- "Can I exchange my purchase?"
- "How long do refunds take?"

**Shipping:**
- "How much is shipping?"
- "Do you offer free shipping?"
- "When will my order arrive?"
- "Can I track my package?"

**Products:**
- "What watches do you sell?"
- "Tell me about your earbuds"
- "Do you have iPhone 15 cases?"
- "What's the warranty on watches?"

**General:**
- "What are your business hours?"
- "How do I contact support?"
- "Can I create an account?"
- "Do you ship internationally?"

---

## 🔍 Quality Assurance

### Evaluation Metrics

**Accuracy:**
- Does response match knowledge base?
- Are facts correct?
- Is policy information accurate?

**Completeness:**
- Does it answer the full question?
- Are all relevant details included?
- Are next steps provided?

**Tone:**
- Friendly and professional?
- Appropriate empathy?
- Clear and concise?

**Helpfulness:**
- Does it solve the problem?
- Are alternatives offered?
- Is escalation path clear?

---

## 🚀 Deployment Checklist

- [ ] Documents loaded into vector database
- [ ] Embeddings created successfully
- [ ] Retrieval tested with sample queries
- [ ] Prompt template optimized
- [ ] Response quality validated
- [ ] UI integrated
- [ ] Fallback to human support configured
- [ ] Analytics tracking implemented
- [ ] User feedback collection ready
- [ ] Load testing completed

---

## 📈 Future Enhancements

1. **Multi-language Support**
   - Translate knowledge base
   - Language detection
   - Locale-specific policies

2. **Order Integration**
   - Query order status directly
   - Initiate returns automatically
   - Track shipments in real-time

3. **Personalization**
   - Remember customer context
   - Personalized recommendations
   - Order history awareness

4. **Analytics**
   - Common question tracking
   - Response satisfaction ratings
   - Knowledge gap identification

---

## 💡 Best Practices

1. **Regular Updates:** Keep knowledge base current
2. **Monitor Performance:** Track bot accuracy
3. **User Feedback:** Collect and act on feedback
4. **Human Handoff:** Easy escalation to support
5. **Context Awareness:** Maintain conversation context
6. **Clear Limitations:** Be transparent about capabilities

---

## 📞 Need Help?

If you need assistance implementing the RAG bot:
- Review LangChain documentation
- Check OpenAI/Anthropic guides
- Join AI/ML communities
- Consider managed solutions (Voiceflow, Botpress)

---

**Your complete knowledge base is ready for RAG implementation!** 🎉

All documents are structured, comprehensive, and optimized for retrieval.
