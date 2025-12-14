import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Watch, Headphones, Smartphone, ChevronDown } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [watchesDropdown, setWatchesDropdown] = useState(false);
  const { getCartCount } = useCart();
  const location = useLocation();
  const cartCount = getCartCount();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl md:text-3xl font-bold text-gradient-gold">
              ShopSphere
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={cn("nav-link text-sm font-medium", isActive('/') && "text-accent")}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={cn("nav-link text-sm font-medium", isActive('/products') && "text-accent")}
            >
              All Products
            </Link>
            
            {/* Watches Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setWatchesDropdown(true)}
              onMouseLeave={() => setWatchesDropdown(false)}
            >
              <Link 
                to="/watches"
                className={cn(
                  "nav-link text-sm font-medium flex items-center gap-1",
                  location.pathname.includes('/watches') && "text-accent"
                )}
              >
                <Watch className="w-4 h-4" />
                Watches
                <ChevronDown className={cn(
                  "w-3 h-3 transition-transform",
                  watchesDropdown && "rotate-180"
                )} />
              </Link>
              
              {watchesDropdown && (
                <div className="absolute top-full left-0 pt-2 animate-fade-in">
                  <div className="bg-card rounded-lg shadow-lg border border-border py-2 min-w-[160px]">
                    <Link 
                      to="/watches" 
                      className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                    >
                      All Watches
                    </Link>
                    <Link 
                      to="/watches/men" 
                      className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                    >
                      Men
                    </Link>
                    <Link 
                      to="/watches/women" 
                      className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                    >
                      Women
                    </Link>
                    <Link 
                      to="/watches/kids" 
                      className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                    >
                      Kids
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/airbuds"
              className={cn(
                "nav-link text-sm font-medium flex items-center gap-1",
                isActive('/airbuds') && "text-accent"
              )}
            >
              <Headphones className="w-4 h-4" />
              Airbuds
            </Link>
            <Link 
              to="/phone-cases"
              className={cn(
                "nav-link text-sm font-medium flex items-center gap-1",
                isActive('/phone-cases') && "text-accent"
              )}
            >
              <Smartphone className="w-4 h-4" />
              Phone Cases
            </Link>
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link 
              to="/cart" 
              className="relative p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button 
              className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-sm font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-sm font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                All Products
              </Link>
              <div className="py-2">
                <span className="text-sm font-medium text-muted-foreground">Watches</span>
                <div className="mt-2 ml-4 flex flex-col gap-2">
                  <Link to="/watches" className="text-sm" onClick={() => setIsOpen(false)}>All Watches</Link>
                  <Link to="/watches/men" className="text-sm" onClick={() => setIsOpen(false)}>Men</Link>
                  <Link to="/watches/women" className="text-sm" onClick={() => setIsOpen(false)}>Women</Link>
                  <Link to="/watches/kids" className="text-sm" onClick={() => setIsOpen(false)}>Kids</Link>
                </div>
              </div>
              <Link 
                to="/airbuds" 
                className="text-sm font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Airbuds
              </Link>
              <Link 
                to="/phone-cases" 
                className="text-sm font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Phone Cases
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
