# 🔄 n8n Backend Workflows

This folder contains production-ready n8n workflows for complete e-commerce automation.

---

## 📦 Workflow Files

### 1. **E-commmerce project.json** - Order Processing
**Main order automation workflow**

**Features:**
- ✅ Receives orders via webhook
- ✅ AI Agent validates and processes orders
- ✅ Real-time stock checking
- ✅ Automated inventory updates
- ✅ Professional HTML email generation
- ✅ Customer data management

**Webhook Path:** `/webhook/e-commerce`

### 2. **E-Commerce response.json** - AI Chatbot
**RAG-powered customer support chatbot**

**Features:**
- ✅ Natural language understanding
- ✅ Knowledge base integration
- ✅ Context-aware responses
- ✅ Product information queries
- ✅ Policy explanations

**Webhook Path:** `/webhook/Costmersuppoer`

### 3. **send mail mcp.json** - Email System
**Automated email notification system**

**Features:**
- ✅ Order confirmations
- ✅ Admin notifications
- ✅ Stock alerts
- ✅ Professional HTML templates

---

## 🚀 Quick Setup

### Step 1: Import Workflows

1. Open your n8n instance
2. Go to **Workflows** → **Import from File**
3. Import each JSON file:
   - `E-commmerce project.json`
   - `E-Commerce response.json`
   - `send mail mcp.json`

### Step 2: Configure Credentials

#### Email Service
- SMTP credentials or SendGrid API key
- Sender email and name
- Test email delivery

#### AI Service (for chatbot)
- OpenAI API key
- Or other AI provider credentials

#### Google Sheets (optional)
- Service account credentials
- Sheet ID for inventory
- Read/Write permissions

### Step 3: Update Webhook URLs

In your frontend `.env`:
```env
VITE_ORDER_WEBHOOK_URL=https://your-n8n-instance.com/webhook/e-commerce
VITE_CHAT_WEBHOOK_URL=https://your-n8n-instance.com/webhook/Costmersuppoer
```

### Step 4: Activate Workflows

1. Open each workflow
2. Click the **Active** toggle
3. Verify webhook URLs are accessible

---

## 📊 Order Processing Workflow

### Workflow Logic:

```
Webhook Receives Order
        ↓
AI Agent Processes Request
        ↓
Get Stock Data (from Google Sheets or DB)
        ↓
Check Stock Availability
        ↓
   ┌────┴────┐
   ↓         ↓
Stock > 0   Stock = 0
   ↓         ↓
Confirm    Reject
Order      Order
   ↓         ↓
Send       Send
Customer   Apology
Email      Email
   ↓         ↓
Send       Notify
Admin      Admin
Email
   ↓
Update
Stock
   ↓
Save
Customer
Details
```

### AI Agent System Prompt:

The workflow includes an intelligent AI agent with these capabilities:

**Actions:**
1. **get_data** - Fetches product stock from database
2. **send_to_customer** - Sends HTML email to customer
3. **send_to_owner** - Sends HTML email to admin
4. **update_tool** - Updates inventory levels
5. **add_costmer_details** - Records customer information

**Decision Logic:**
- IF stock > 0: Confirm order → Send emails → Update stock → Save data
- IF stock = 0: Reject order → Send apology → Notify admin → Save inquiry

---

## 💬 Chatbot Workflow

### RAG System Components:

1. **Knowledge Base Documents:**
   - Product catalog
   - Shipping policy
   - Return policy
   - Customer service guidelines

2. **Workflow Steps:**
```
User Question
     ↓
Webhook Receives
     ↓
RAG System Processes:
  - Analyzes question
  - Searches knowledge base
  - Generates context
     ↓
AI Generates Response
     ↓
Returns Answer to Chat Widget
```

### Supported Queries:

- ✅ Product information
- ✅ Shipping details
- ✅ Return policies
- ✅ Order status
- ✅ General inquiries

---

## 📧 Email System

### Email Templates:

#### Customer Emails:
1. **Order Confirmation** (Stock Available)
   - Greeting with customer name
   - Order ID and details
   - Product list with quantities
   - Total amount
   - Shipping information
   - Contact support link

2. **Order Not Confirmed** (Out of Stock)
   - Apologetic tone
   - Explanation of stock issue
   - Restock notification offer
   - Alternative product suggestions
   - Contact information

#### Admin Emails:
1. **New Order Alert**
   - Customer details
   - Order information
   - Stock levels before update
   - Action required (if any)

2. **Stock Alert**
   - Product out of stock
   - Customer inquiry details
   - Restock recommendation

---

## 🔧 Configuration Details

### Order Processing Webhook

**Receives:**
```json
{
  "orderId": "ShopSphere-1234567890-ABC123",
  "customerInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "orderDetails": {
    "items": [...],
    "total": 299.99
  }
}
```

**AI Agent Processes and:**
- Validates order
- Checks inventory
- Generates HTML emails
- Updates stock
- Saves customer data

### Chatbot Webhook

**Receives:**
```json
{
  "question": "What are your shipping options?",
  "conversationId": "conv-1234567890",
  "timestamp": 1234567890
}
```

**Returns:**
```json
{
  "answer": "We offer FREE shipping on orders over $50...",
  "success": true
}
```

---

## 🧪 Testing

### Test Order Processing:
```bash
# Use the test page
open ../webhook-test.html

# Or use curl:
curl -X POST https://your-n8n.com/webhook/e-commerce \
  -H "Content-Type: application/json" \
  -d @test-order.json
```

### Test Chatbot:
```bash
# Use the test page
open ../chat-widget-test.html

# Or use curl:
curl -X POST https://your-n8n.com/webhook/Costmersuppoer \
  -H "Content-Type: application/json" \
  -d '{"question": "What are your shipping options?"}'
```

### Test Email System:
1. Open workflow in n8n
2. Click "Execute Workflow"
3. Check email inbox
4. Verify HTML rendering

---

## 🔒 Security

### Webhook Security:
- Use authentication headers (recommended)
- Whitelist IP addresses
- Rate limiting
- Input validation

### API Keys:
- Store in n8n credentials
- Never commit to version control
- Rotate regularly
- Use environment variables

---

## 📊 Monitoring

### Check Workflow Execution:
1. Go to **Executions** tab in n8n
2. View success/failure rate
3. Check execution logs
4. Monitor response times

### Email Delivery:
- Monitor bounce rates
- Check spam scores
- Track open rates
- Verify delivery logs

---

## 🐛 Troubleshooting

### Workflow Not Executing:
- [ ] Workflow is activated
- [ ] Webhook URL is correct
- [ ] Credentials are configured
- [ ] n8n instance is running

### Emails Not Sending:
- [ ] SMTP credentials correct
- [ ] Sender email verified
- [ ] Recipient email valid
- [ ] Check spam folder

### Chatbot Not Responding:
- [ ] AI credentials configured
- [ ] Knowledge base uploaded
- [ ] Webhook returns JSON
- [ ] Check execution logs

---

## 📚 Resources

### n8n Documentation:
- [Official Docs](https://docs.n8n.io/)
- [Workflow Examples](https://n8n.io/workflows/)
- [Community Forum](https://community.n8n.io/)

---

## 🔄 Updates & Maintenance

### Updating Workflows:
1. Export current workflow (backup)
2. Make changes in n8n
3. Test thoroughly
4. Export updated version
5. Replace JSON file
6. Document changes

### Version Control:
- Keep workflow files in version control
- Document major changes
- Tag releases
- Maintain changelog

---

## 💡 Tips

1. **Always test workflows** before activating
2. **Monitor execution logs** regularly
3. **Keep credentials secure** and updated
4. **Backup workflows** before making changes
5. **Document customizations** for team members

---

## 🤝 Contributing

To contribute workflow improvements:
1. Export your modified workflow
2. Test thoroughly
3. Update this README
4. Submit a pull request

---

## 📞 Support

Need help with n8n workflows?
- 📧 Email: armemon695@gmail.com
- 💬 n8n Community: [community.n8n.io](https://community.n8n.io/)
- 🐛 Issues: [GitHub Issues](https://github.com/ARMemon231/shopsphere-ai-marketplace/issues)

---

**Made with 🔄 by n8n automation**
