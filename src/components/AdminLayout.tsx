import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MobileNav } from '@/components/ui/mobile-nav';
import type { MobileNavItem } from '@/components/ui/mobile-nav';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems: MobileNavItem[] = [
    {
      label: 'Dashboard',
      href: '/admin',
      isActive: location.pathname === '/admin',
    },
    {
      label: 'Suppliers',
      href: '/admin/suppliers',
      isActive: location.pathname === '/admin/suppliers',
    },
    {
      label: 'CSV Upload',
      href: '/admin/upload',
      isActive: location.pathname === '/admin/upload',
    },
    {
      label: 'Logout',
      href: '#',
      onClick: logout,
      variant: 'destructive',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/admin" className="text-xl font-bold text-blue-600">
              SupplierHub Admin
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <nav className="flex items-center space-x-6">
                {navItems.slice(0, -1).map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      item.isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>

            {/* Mobile Navigation */}
            <MobileNav items={navItems} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};
