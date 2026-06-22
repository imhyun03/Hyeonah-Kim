/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import Programs from './components/Programs';
import TrackRecord from './components/TrackRecord';
import Contact from './components/Contact';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { trackEvent } from './utils/tracker';
import { 
  Building, Phone, Mail, Award, ArrowUp, Activity, CheckCircle, Flame, Star
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [showAdmin, setShowAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scrolling to show "Top Scroll" button elegantly
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    
    // Track Initial Entry Pageview
    trackEvent('pageview', '/home', 'app-load', 'Landing page initialized');
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('click', '/home', 'button-scroll-top', 'Scroll to top');
  };

  const handleFooterAdminClick = () => {
    setShowAdmin(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('click', '/admin', 'footer-nav-admin', 'Footer panel opened Analytics Desk');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-neutral-800 selection:bg-orange-500 selection:text-white font-sans antialiased">
      {/* Dynamic Header Navbar Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        showAdmin={showAdmin} 
        setShowAdmin={setShowAdmin} 
      />

      {/* Main Container Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <AnimatePresence mode="wait">
          {showAdmin ? (
            /* Admin Interactive Analytics Hub */
            <motion.div
              key="admin-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <AnalyticsDashboard />
            </motion.div>
          ) : (
            /* General Public Sections with beautiful page entry animation */
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="focus:outline-none"
            >
              {activeTab === 'about' && <AboutUs />}
              {activeTab === 'programs' && <Programs />}
              {activeTab === 'track' && <TrackRecord />}
              {activeTab === 'contact' && <Contact />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Corporate Footprint Footer Section */}
      <footer className="bg-[#171717] text-white border-t border-neutral-800 pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Column 1: Corporate Branding */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-white shadow shadow-orange-500/25">
                  M
                </div>
                <div>
                  <span className="font-extrabold text-lg tracking-tight block">
                    (주)<span className="text-orange-500">엠피드</span>
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono tracking-widest block uppercase -mt-0.5 font-semibold">
                    MFeed Corporation
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm font-sans font-normal">
                엠피드는 예비 및 초기 창업 기업의 비즈니스 안정성을 도모하고, 
                지속 가능성에 최적화된 경영 전략 매칭 가이드를 제공하는 신뢰 높은 컨설팅 파트너입니다.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">바로가기</h4>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li>
                  <button 
                    onClick={() => { setActiveTab('about'); setShowAdmin(false); }}
                    className="hover:text-orange-500 transition-colors"
                  >
                    About Us (회사 소개)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveTab('programs'); setShowAdmin(false); }}
                    className="hover:text-orange-500 transition-colors"
                  >
                    Programs (프로그램 안내)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveTab('track'); setShowAdmin(false); }}
                    className="hover:text-orange-500 transition-colors"
                  >
                    Track Record (주요 실적)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveTab('contact'); setShowAdmin(false); }}
                    className="hover:text-orange-500 transition-colors"
                  >
                    Contact (문의 및 출강 의뢰)
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Corporate Registration Spec */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">기업 정보 고시</h4>
              <div className="text-xs text-neutral-400 space-y-1.5 font-sans">
                <p><span className="text-neutral-500">공식명칭:</span> (주)엠피드</p>
                <p><span className="text-neutral-500">대표자:</span> 이준형</p>
                <p><span className="text-neutral-500">사업자등록번호:</span> 524-88-02831</p>
                <p><span className="text-neutral-500">이메일:</span> imhyun0401@naver.com</p>
                <p><span className="text-neutral-500">직통전화:</span> 010-8636-4034</p>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <div>
              <p>&copy; 2026 MFeed Co., Ltd. All Rights Reserved.</p>
              <p className="text-[10px] text-neutral-600 mt-1 font-sans">
                본 웹사이트에 기재된 일체의 내용, 성과, 브랜드 상표권은 관계 부처 및 당사에 무단 전재할 수 없습니다.
              </p>
            </div>

            {/* Admin Desk Link in footer */}
            <button
              onClick={handleFooterAdminClick}
              className={`text-[10px] px-3.5 py-1.5 rounded bg-neutral-900 border transition-all flex items-center space-x-1.5 ${
                showAdmin
                  ? 'border-orange-500 text-orange-400'
                  : 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              <Activity className="w-3 h-3" />
              <span>엠피드 분석 및 관제실 (Admin)</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Floating KakaoTalk Open Chat Button */}
      <a
        href="https://open.kakao.com/o/sPwL1jWf"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('click', '/home', 'kakaotalk-float-btn', 'Click Floating KakaoTalk OpenChat')}
        style={{ bottom: scrolled ? '82px' : '24px' }}
        className="fixed right-6 p-3 bg-[#FEE500] hover:bg-[#FEE500]/95 active:scale-95 text-[#191919] rounded-2xl shadow-2xl transition-all duration-300 z-40 focus:outline-none border border-yellow-400/20 flex items-center gap-2 font-bold text-xs sm:text-sm font-sans"
        title="카카오톡 1:1 상담"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span>실시간 카톡상담</span>
      </a>

      {/* Floating Scroll to top Button */}
      {scrolled && (
        <button
          onClick={scrollToTop}
          id="btn-scroll-top-fixed"
          className="fixed bottom-6 right-6 p-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-full shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all z-40 focus:outline-none border border-orange-400/20"
          title="위로 이동"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
