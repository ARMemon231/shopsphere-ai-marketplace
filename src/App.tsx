import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import ScrollToTop from "@/utils/ScrollToTop";
import ChatWidget from "@/components/chat/ChatWidget";

// Pages
import Index from "./pages/Index";
import Products from "./pages/Products";
import Watches from "./pages/Watches";
import WatchesMen from "./pages/WatchesMen";
import WatchesWomen from "./pages/WatchesWomen";
import WatchesKids from "./pages/WatchesKids";
import Airbuds from "./pages/Airbuds";
import PhoneCases from "./pages/PhoneCases";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <ChatWidget />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/watches" element={<Watches />} />
            <Route path="/watches/men" element={<WatchesMen />} />
            <Route path="/watches/women" element={<WatchesWomen />} />
            <Route path="/watches/kids" element={<WatchesKids />} />
            <Route path="/airbuds" element={<Airbuds />} />
            <Route path="/phone-cases" element={<PhoneCases />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
