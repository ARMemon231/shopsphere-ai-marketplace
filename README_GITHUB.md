# 🛍️ ShopSphere - Modern E-Commerce Platform

<div align="center">

![ShopSphere](https://img.shields.io/badge/ShopSphere-E--Commerce-blueviolet?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

**A feature-rich, AI-powered e-commerce platform built with modern web technologies**

[Live Demo](#) • [Documentation](#features) • [Report Bug](#) • [Request Feature](#)

</div>

---

## ✨ Features

### 🛒 **E-Commerce Essentials**
- 🎯 Full-featured shopping cart with persistent storage
- 💳 Seamless checkout process with multiple payment options
- 📦 Real-time order tracking and management
- 🔍 Advanced product search and filtering
- ⭐ Product reviews and ratings

### 💬 **AI-Powered Customer Support**
- 🤖 Intelligent chatbot with n8n integration
- 💬 Real-time customer support
- 📝 Conversation history and context awareness
- 🌙 Dark mode support
- 📱 Mobile-responsive chat widget

### 📊 **Business Intelligence**
- 📈 Automated order webhook integration
- 🔄 Real-time data synchronization with n8n
- 📧 Automated email notifications
- 📊 Order analytics and reporting

### 🎨 **Modern UI/UX**
- 🌈 Beautiful gradient designs
- ✨ Smooth animations and transitions
- 📱 Fully responsive (mobile, tablet, desktop)
- 🌙 Dark/Light mode support
- ♿ WCAG 2.1 AA accessibility compliant

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/ARMemon231/shopsphere-ai-marketplace.git

# Navigate to project directory
cd shopsphere-ai-marketplace

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

---

## 🛠️ Tech Stack

### **Frontend**
- ⚛️ **React 18.3** - UI library
- 📘 **TypeScript** - Type safety
- ⚡ **Vite** - Build tool
- 🎨 **TailwindCSS** - Styling
- 🧩 **shadcn/ui** - Component library
- 🎭 **Radix UI** - Headless UI components

### **State Management**
- 🔄 **React Query** - Server state management
- 🛒 **Context API** - Cart management

### **Routing**
- 🗺️ **React Router v6** - Client-side routing

### **Form Handling**
- 📝 **React Hook Form** - Form management
- ✅ **Zod** - Schema validation

### **Integrations**
- 🔗 **n8n Webhooks** - Order processing & chatbot
- 📧 **Email Notifications** - Order confirmations

---

## 📁 Project Structure

```
shopsphere-complete-main/
├── src/
│   ├── components/          # Reusable components
│   │   ├── chat/           # Chat widget
│   │   └── ui/             # UI components (shadcn)
│   ├── contexts/           # React contexts
│   ├── data/               # Static data & product catalog
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── services/           # API services
│   │   ├── webhook.ts      # Order webhooks
│   │   └── chatbot.ts      # Chat integration
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── docs/                   # Documentation files
└── tests/                  # Test utilities
```

---

## 🎯 Key Features Breakdown

### 1️⃣ **Shopping Experience**
```typescript
// Full cart functionality
- Add/Remove items
- Update quantities
- Apply discounts
- Calculate shipping
- Persistent cart (localStorage)
```

### 2️⃣ **Smart Checkout**
```typescript
// Comprehensive checkout flow
- Customer information
- Shipping address
- Payment method selection
- Order validation
- Order confirmation
```

### 3️⃣ **AI Chat Support**
```typescript
// Intelligent customer support
- Natural language processing
- Context-aware responses
- Conversation history
- Multi-language support (coming soon)
```

### 4️⃣ **Webhook Integration**
```typescript
// Automated order processing
- Real-time order sync to n8n
- Email notifications
- Inventory management
- Analytics tracking
```

---

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# n8n Webhook URLs
VITE_ORDER_WEBHOOK_URL=https://n8n.arverse.site/webhook-test/e-commerce
VITE_CHAT_WEBHOOK_URL=https://n8n.arverse.site/webhook-test/Costmersuppoer

# Optional: Analytics
VITE_GA_ID=your-google-analytics-id
```

### n8n Setup
1. Import workflows from `/n8n-workflows/` directory
2. Configure webhook URLs
3. Set up email notifications
4. Activate workflows

📚 **Full setup guide:** [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## 📸 Screenshots

<div align="center">

### 🏠 Homepage
![Homepage](screenshots/homepage.png)

### 🛒 Shopping Cart
![Cart](screenshots/cart.png)

### 💬 AI Chat Support
![Chat](screenshots/chat.png)

### 📱 Mobile Responsive
![Mobile](screenshots/mobile.png)

</div>

---

## 🎨 Component Library

Built with **shadcn/ui** components:

```bash
# Available components
✓ Button, Card, Dialog, Dropdown
✓ Input, Select, Checkbox, Radio
✓ Toast, Alert, Tabs, Accordion
✓ ... and 50+ more components
```

---

## 📚 Documentation

- 📘 [Full Documentation](./DOCUMENTATION.md)
- 🚀 [Setup Guide](./SETUP_GUIDE.md)
- 💬 [Chat Widget Guide](./CHAT_SETUP_GUIDE.md)
- 🔗 [Webhook Integration](./WEBHOOK_INTEGRATION.md)
- 🎨 [Design System](./DESIGN_SYSTEM.md)

---

## 🧪 Testing

### Run Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### Test Utilities
- `webhook-test.html` - Test order webhooks
- `chat-widget-test.html` - Test chat integration

---

## 🔄 Deployment

### Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Website: [yourwebsite.com](https://yourwebsite.com)

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - Component Library
- [n8n](https://n8n.io/) - Workflow Automation
- [Lucide Icons](https://lucide.dev/) - Icon Library

---

## 📞 Support

Need help? 

- 📧 Email: support@shopsphere.com
- 💬 Discord: [Join our server](#)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/shopsphere-ecommerce-platform/issues)

---

## 🗺️ Roadmap

### Phase 1 (Current) ✅
- [x] Core e-commerce functionality
- [x] AI chat support
- [x] Order webhook integration
- [x] Responsive design

### Phase 2 (In Progress) 🚧
- [ ] User authentication
- [ ] Product reviews system
- [ ] Wishlist functionality
- [ ] Advanced search filters

### Phase 3 (Planned) 📋
- [ ] Multi-language support
- [ ] Currency conversion
- [ ] Social media integration
- [ ] Progressive Web App (PWA)

### Phase 4 (Future) 🔮
- [ ] AR product preview
- [ ] Voice shopping assistant
- [ ] Personalized recommendations
- [ ] Subscription management

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/shopsphere-ecommerce-platform?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/shopsphere-ecommerce-platform?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/shopsphere-ecommerce-platform)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/shopsphere-ecommerce-platform)

---

<div align="center">

### ⭐ Star this repo if you find it useful!

**Made with ❤️ by [Ateeq Memon](https://github.com/ARMemon231)**

[⬆ Back to Top](#-shopsphere---modern-e-commerce-platform)

</div>
