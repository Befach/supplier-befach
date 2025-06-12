import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MobileNav } from '@/components/ui/mobile-nav';
import type { MobileNavItem } from '@/components/ui/mobile-nav';

export const PublicNavbar = () => {
  const location = useLocation();

  const navItems: MobileNavItem[] = [
    {
      label: 'Home',
      href: '/',
      isActive: location.pathname === '/',
    },
    {
      label: 'About',
      href: 'https://befach.com/pages/about-us',
      isExternal: true,
    },
    {
      label: 'Contact',
      href: 'https://befach.com/policies/contact-information',
      isExternal: true,
    },
    {
      label: 'Admin Login',
      href: '/admin/login',
      variant: 'primary',
    },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/195e0529-837e-47f4-9881-981f6d53e663.png" 
              alt="BEFACH INTERNATIONAL" 
              className="h-8 sm:h-10"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => {
              if (item.isExternal) {
                return (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium ${
                      item.isActive ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              }

              if (item.variant === 'primary') {
                return (
                  <Link
                    key={index}
                    to={item.href}
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 font-medium"
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={index}
                  to={item.href}
                  className={`font-medium ${
                    item.isActive ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <MobileNav items={navItems} />
        </div>
      </div>
    </nav>
  );
};
