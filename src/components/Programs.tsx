/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CORE_PROGRAMS } from '../data';
import { FileText, Settings, TrendingUp, Users, Check, ArrowRight, ClipboardCheck, BookOpen } from 'lucide-react';
import { trackEvent } from '../utils/tracker';

const iconMap: Record<string, React.ComponentType<any>> = {
  FileText: FileText,
  Settings: Settings,
  TrendingUp: TrendingUp,
  Users: Users
};

export default function Programs() {
  const [selectedId, setSelectedId] = useState<string>(CORE_PROGRAMS[0].id);

  useEffect(() => {
    trackEvent('pageview', '/programs', 'programs-page', 'Viewed Programs Section');
  }, []);

  const handleProgramTabSelect = (id: string, name: string) => {
    setSelectedId(id);
    trackEvent('click', '/programs', `tab-program-${id}`, `Select program tab: ${name}`);
  };

  const handleInquiryRelay = (title: string) => {
    trackEvent('click', '/programs', `button-inquire-${selectedId}`, `Pressed Inquire for ${title}`);
    const targetElement = document.getElementById('nav-contact') || document.getElementById('contact-form-anchor');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      // Triggers custom component selection if attached
      const selectCategory = document.getElementById('inquiry-category') as HTMLSelectElement;
      if (selectCategory) {
        if (selectedId === 'prog-1') selectCategory.value = 'consulting';
        else if (selectedId === 'prog-4') selectCategory.value = 'lecture';
        else selectCategory.value = 'consulting';
      }
    }
  };

  const activeProgram = CORE_PROGRAMS.find(p => p.id === selectedId) || CORE_PROGRAMS[0];
  const ActiveIcon = iconMap[activeProgram.iconName] || FileText;

  return (
    <div id="programs-section" className="space-y-12">
      {/* 1. Introductory heading block */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block">Main Services</span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] tracking-tight">
          (주)엠피드의 <span className="text-orange-500">핵심 비즈니스 역량</span>
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans font-normal">
          아이디어 구축부터 시장 실전 분석, 디테일한 사업계획서 탈바꿈, 맞춤형 강연 출강까지 
          초기 성장을 도출하는 엠피드만의 시그니처 4대 솔루션을 제안합니다.
        </p>
      </div>

      {/* 2. Responsive Side-by-side Layout with program list and detailed panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Service Selector Cards */}
        <div className="lg:col-span-5 space-y-3">
          {CORE_PROGRAMS.map((prog) => {
            const ItemIcon = iconMap[prog.iconName] || FileText;
            const isSelected = prog.id === selectedId;

            return (
              <button
                key={prog.id}
                id={`prog-selector-${prog.id}`}
                onClick={() => handleProgramTabSelect(prog.id, prog.title)}
                className={`w-full text-left p-5 rounded-2xl border transition-all flex items-start space-x-4 group ${
                  isSelected
                    ? 'bg-neutral-900 border-neutral-900 text-white shadow-xl'
                    : 'bg-white border-neutral-200 text-neutral-900 hover:border-orange-300 hover:bg-neutral-50/50'
                }`}
              >
                <div className={`p-3 rounded-xl transition-all ${
                  isSelected ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-500 group-hover:scale-105'
                }`}>
                  <ItemIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base sm:text-lg tracking-tight truncate">
                      {prog.title}
                    </h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-orange-600/30 text-orange-400' : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {prog.id === 'prog-4' ? '특강/멘토링' : '컨설팅'}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 line-clamp-1 ${isSelected ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {prog.subtitle}
                  </p>
                </div>
              </button>
            );
          })}

          {/* Elegant E-book product purchase link directly underneath the buttons */}
          <a
            href="https://smartstore.naver.com/moneyclass/products/12822056224"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('click', '/programs', 'ebook-purchase-banner', 'Click E-book Purchase Banner')}
            className="relative overflow-hidden w-full text-left p-5 rounded-2xl border border-neutral-200 bg-white text-neutral-900 shadow-lg flex items-start space-x-4 group hover:border-orange-500 hover:shadow-orange-500/5 transition-all duration-300 block"
          >
            {/* Background glowing ambient light */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-orange-500/5 rounded-full blur-xl group-hover:bg-orange-500/10 transition-all duration-300"></div>

            <div className="p-3 rounded-xl bg-orange-500 text-white shadow-md group-hover:scale-110 transition-all duration-300">
              <BookOpen className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase font-bold tracking-widest bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded">
                  E-Book / 실전 가이드
                </span>
                <span className="text-[9px] bg-amber-500 text-neutral-950 font-extrabold px-1.5 py-0.5 rounded uppercase">
                  BEST
                </span>
              </div>
              <h3 className="font-extrabold text-base tracking-tight mt-2 text-neutral-900 group-hover:text-orange-600 transition-colors">
                '사업계획서 작성하기' 전자책 구매
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed font-sans">
                정부지원사업 합격 노하우와 실전 핵심 뼈대 템플릿 완벽 제공
              </p>
              <div className="mt-3.5 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:text-orange-700">
                <span>네이버 스마트스토어 구매 바로가기</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        </div>

        {/* Right Side: High-End Interactive Detail Display Panel */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden min-h-[480px] flex flex-col justify-between">
          <div className="p-6 sm:p-8 space-y-6">
            {/* Visual Icon and Header info */}
            <div className="flex items-start space-x-4 pb-6 border-b border-neutral-100">
              <div className="p-4 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/15">
                <ActiveIcon className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-semibold bg-neutral-100 text-neutral-700 px-2 py-1 rounded">
                  PROGRAM ID: {activeProgram.id.toUpperCase()}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
                  {activeProgram.title}
                </h3>
                <p className="text-sm font-semibold text-orange-500 mt-0.5">
                  {activeProgram.subtitle}
                </p>
              </div>
            </div>

            {/* General Description */}
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
                {activeProgram.description}
              </p>
              
              {/* Target Users */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/50">
                <span className="text-xs font-bold text-neutral-500 block uppercase mb-1">상담 권장 대상</span>
                <p className="text-xs sm:text-sm text-neutral-800 font-semibold">
                  {activeProgram.target}
                </p>
              </div>
            </div>

            {/* Core Features list with checks */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">대표 컨설팅 영역 및 핵심역량</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activeProgram.features.map((feat, index) => (
                  <div key={index} className="flex items-start space-x-2 text-xs text-neutral-600 font-sans leading-tight">
                    <div className="mt-0.5 rounded-full bg-orange-100 text-orange-600 p-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* High level operational process */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">수행 절차 (MFeed Framework)</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center font-sans">
                {activeProgram.process.map((step, idx) => (
                  <div key={idx} className="bg-orange-50 border border-orange-100 rounded-xl p-2.5 relative">
                    <span className="absolute top-1 left-2 text-[9px] font-mono font-bold text-orange-400">0{idx + 1}</span>
                    <p className="text-xs font-bold text-orange-800 mt-1 leading-tight">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Triggering section */}
          <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-neutral-500 font-medium">
              * 출강료 및 개인 보조금 멘토링 연계 단가는 미팅 후 협의 조정됩니다.
            </span>
            <button
              id={`submit-interest-${activeProgram.id}`}
              onClick={() => handleInquiryRelay(activeProgram.title)}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider bg-neutral-900 text-white rounded-lg hover:bg-orange-600 transition-all flex items-center justify-center space-x-2 hover:shadow-lg"
            >
              <span>이 과정 의뢰/문의하기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
