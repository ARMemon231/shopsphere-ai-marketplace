# 💬 Customer Support Knowledge Base

This folder contains the knowledge base documents used by the AI-powered chatbot for intelligent customer support.

---

## 📚 Knowledge Base Files

### 1. **product-catalog.md**
Complete product information including:
- Product descriptions
- Specifications
- Pricing
- Availability
- Features and benefits

### 2. **shipping-policy.md**
Shipping information including:
- Shipping methods and costs
- Delivery timeframes
- International shipping
- Free shipping thresholds
- Tracking information

### 3. **return-policy.md**
Return and refund policies:
- Return eligibility
- Return timeframes
- Refund process
- Exchange procedures
- Conditions and exceptions

### 4. **customer-service-guide.md**
General customer service information:
- Contact methods
- Support hours
- FAQ responses
- Common issues resolution
- Escalation procedures

### 5. **combined_customer-service.md**
Consolidated knowledge base combining all documents for easier RAG processing.

### 6. **RAG_BOT_SETUP.md**
Setup guide for the RAG (Retrieval-Augmented Generation) chatbot system.

---

## 🤖 How It Works

### RAG System Flow:

```
Customer Question
       ↓
Chatbot Widget
       ↓
n8n Webhook
       ↓
RAG System:
  1. Analyzes question
  2. Searches knowledge base
  3. Retrieves relevant context
  4. Generates AI response
       ↓
Returns Answer
       ↓
Displays in Chat Widget
```

---

## 🔧 Setup Instructions

### 1. **Upload Knowledge Base to n8n**

In your n8n chatbot workflow:
1. Add "Vector Store" or "Document Loader" node
2. Upload all `.md` files from this folder
3. Configure embedding settings
4. Test retrieval accuracy

### 2. **Configure RAG Parameters**

Recommended settings:
- **Chunk Size:** 1000 characters
- **Chunk Overlap:** 200 characters
- **Top K Results:** 3-5
- **Similarity Threshold:** 0.7+

### 3. **Test Knowledge Retrieval**

Test with these sample questions:
- "What are your shipping options?"
- "How do I return a product?"
- "Tell me about your watches"
- "What payment methods do you accept?"
- "How long does delivery take?"

---

## 📝 Updating Knowledge Base

### To Update Policies:

1. **Edit the relevant `.md` file**
2. **Re-upload to n8n workflow**
3. **Clear vector store cache (if applicable)**
4. **Test with sample questions**
5. **Verify responses are updated**

### To Add New Topics:

1. **Create new `.md` file** in this folder
2. **Follow existing format**
3. **Upload to n8n**
4. **Update `combined_customer-service.md`**
5. **Test retrieval**

---

## 🎯 Best Practices

### Writing Knowledge Base Content:

1. **Use Clear Headers**
   ```markdown
   # Main Topic
   ## Subtopic
   ### Specific Question
   ```

2. **Write Conversationally**
   - Use natural language
   - Avoid jargon
   - Be concise but complete

3. **Include Examples**
   ```markdown
   Example: If you ordered on Monday, expect delivery by Friday.
   ```

4. **Use Lists for Options**
   ```markdown
   We offer:
   - Standard Shipping (3-5 days)
   - Express Shipping (2-3 days)
   - Next Day Delivery
   ```

5. **Add Context**
   - Explain "why" not just "what"
   - Provide helpful tips
   - Link related topics

---

## 📊 Content Structure

### Recommended Format:

```markdown
# Topic Title

## Overview
Brief introduction to the topic.

## Detailed Information
Comprehensive details with examples.

## Common Questions

### Question 1?
Answer with helpful details.

### Question 2?
Answer with helpful details.

## Additional Resources
- Link to related page
- Contact information
- Further reading
```

---

## 🔍 Sample Queries by Category

### Shipping Queries:
- "How much is shipping?"
- "Do you offer free shipping?"
- "How long does delivery take?"
- "Do you ship internationally?"
- "Can I track my order?"

### Return Queries:
- "What's your return policy?"
- "How do I return an item?"
- "Can I get a refund?"
- "How long do I have to return?"
- "What items can't be returned?"

### Product Queries:
- "Tell me about [product name]"
- "What features does [product] have?"
- "Is [product] in stock?"
- "What colors are available?"
- "What's the price of [product]?"

### General Queries:
- "How can I contact support?"
- "What payment methods do you accept?"
- "Do you have a warranty?"
- "When will my order arrive?"
- "How do I cancel my order?"

---

## 🧪 Testing

### Test Checklist:

- [ ] Upload all knowledge base files
- [ ] Configure RAG system
- [ ] Test each category of questions
- [ ] Verify answer accuracy
- [ ] Check response relevance
- [ ] Test edge cases
- [ ] Validate citations/sources

### Test with Chat Widget:
```bash
# Open test page
open ../chat-widget-test.html

# Or test in app
npm run dev
# Click chat button and ask questions
```

---

## 📈 Monitoring & Improvement

### Track Metrics:
- Question categories
- Answer accuracy
- Customer satisfaction
- Unanswered questions
- Response times

### Continuous Improvement:
1. Review chatbot conversations
2. Identify common questions
3. Add missing information
4. Clarify confusing answers
5. Update knowledge base regularly

---

## 🔒 Content Guidelines

### Do:
- ✅ Keep information accurate and up-to-date
- ✅ Use consistent terminology
- ✅ Be helpful and friendly
- ✅ Provide complete answers
- ✅ Include relevant examples

### Don't:
- ❌ Make promises you can't keep
- ❌ Use overly technical language
- ❌ Leave questions unanswered
- ❌ Provide outdated information
- ❌ Be vague or ambiguous

---

## 🗂️ File Organization

```
customer-support/
├── product-catalog.md           # Product information
├── shipping-policy.md           # Shipping details
├── return-policy.md             # Return policy
├── customer-service-guide.md   # General support
├── combined_customer-service.md # All combined
└── RAG_BOT_SETUP.md            # Setup guide
```

---

## 🔄 Maintenance Schedule

### Weekly:
- Review new customer questions
- Check for outdated information
- Update product availability

### Monthly:
- Comprehensive content review
- Add new FAQs
- Update policies if changed
- Analyze chatbot performance

### Quarterly:
- Major content refresh
- Reorganize if needed
- Update examples
- Review and improve structure

---

## 💡 Tips for Better Responses

### 1. Anticipate Follow-up Questions
```markdown
**Shipping:** We offer free shipping on orders over $50.
*Follow-up:* Standard delivery takes 3-5 business days.
```

### 2. Provide Multiple Options
```markdown
**Returns:** You can return items by:
1. Mail (we'll send you a label)
2. In-store (if applicable)
3. Pickup service (for large items)
```

### 3. Include Helpful Links
```markdown
For more details, see our complete [Shipping Policy](#).
```

### 4. Be Proactive
```markdown
**Tip:** Save your tracking number for easy status checks!
```

---

## 📞 Support

Questions about the knowledge base?
- 📧 Email: support@shopsphere.com
- 💬 Internal: Team Slack #customer-support
- 📖 Docs: [RAG_BOT_SETUP.md](./RAG_BOT_SETUP.md)

---

## 🤝 Contributing

To add or improve content:
1. Edit the relevant `.md` file
2. Follow existing format
3. Test with chatbot
4. Submit pull request
5. Update `combined_customer-service.md`

---

**Powered by 🤖 AI + 📚 Knowledge Base**
