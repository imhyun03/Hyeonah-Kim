/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Award } from 'lucide-react';
import { trackEvent } from '../utils/tracker';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showAdmin: boolean;
  setShowAdmin: (show: boolean) => void;
}

export default function Navbar({ activeTab, setActiveTab, showAdmin, setShowAdmin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'about', label: 'About Us (회사 소개)' },
    { id: 'programs', label: 'Programs (프로그램)' },
    { id: 'track', label: 'Track Record (주요 실적)' },
    { id: 'contact', label: 'Contact (문의하기)' }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setShowAdmin(false);
    setIsOpen(false);
    trackEvent('click', `/${tabId}`, `nav-link-${tabId}`, `Navigate to ${tabId}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#171717] border-b border-neutral-800 text-white shadow-xl backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo Brand portion */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleNavClick('about')}
              id="brand-logo"
              className="flex items-center space-x-3 focus:outline-none group text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-all">
                M
              </div>
              <div>
                <span className="font-extrabold text-lg sm:text-xl tracking-tight block">
                  (주)<span className="text-orange-500">엠피드</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-mono tracking-widest block uppercase -mt-1 font-semibold">
                  MFeed Corporation
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation links */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  !showAdmin && activeTab === item.id
                    ? 'text-orange-500 bg-neutral-800 font-semibold'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger menu */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#171717] border-b border-neutral-800 px-4 pt-2 pb-4 space-y-1 transition-all">
          {menuItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all ${
                !showAdmin && activeTab === item.id
                  ? 'text-orange-500 bg-neutral-800 font-semibold'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
