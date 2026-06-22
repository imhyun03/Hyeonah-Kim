/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { trackEvent } from '../utils/tracker';
import { 
  Activity, Eye, Users, Mail, Compass, HelpCircle, 
  Smartphone, Monitor, Globe, ChevronRight, RefreshCw, Trash2, Check, Clock
} from 'lucide-react';

interface AnalyticsData {
  summary: {
    totalViews: number;
    uniqueSessions: number;
    totalContacts: number;
    mobileRatio: number;
  };
  timeline: Array<{
    date: string;
    views: number;
    visitors: number;
  }>;
  browsers: Array<{ name: string; value: number }>;
  operatingSystems: Array<{ name: string; value: number }>;
  paths: Array<{ name: string; value: number }>;
  referrers: Array<{ name: string; value: number }>;
  contacts: Array<{
    id: string;
    timestamp: string;
    name: string;
    organization: string;
    role: string;
    email: string;
    phone: string;
    category: string;
    message: string;
    status: string;
  }>;
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeLogTab, setActiveLogTab] = useState<'funnel' | 'inquiries' | 'systems'>('funnel');

  const fetchStats = async () => {
    try {
      setRefreshing(true);
      const res = await fetch('/api/analytics/data');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('[Fetch Stats Error]', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
    trackEvent('pageview', '/admin', 'admin-analytics-view', 'Inspector viewed Admin Analytics board');
  }, []);

  const handleUpdateContactStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        // Optimistically update or re-fetch
        fetchStats();
        trackEvent('click', '/admin', 'update-contact-status', `Updated contact ${id} to ${newStatus}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearDatabase = async () => {
    if (!window.confirm('정말 모든 추적 방문 로그 및 접수 문의사항을 영구 삭제하시겠습니까?')) return;
    try {
      await fetch('/api/analytics/clear', { method: 'POST' });
      fetchStats();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 text-center text-neutral-400 font-sans space-y-4">
        <RefreshCw className="w-8 h-8 animate-spin text-orange-500 mx-auto" />
        <p className="text-sm">엠피드 분석관제 시스템의 로깅 하이퍼바이저 데이터를 가공하고 있습니다...</p>
      </div>
    );
  }

  if (!data) return null;

  // Custom SVG Area Chart Helper
  const maxVal = Math.max(...data.timeline.map(t => Math.max(t.views, 1)), 15);
  const pointsViews = data.timeline.map((item, index) => {
    const x = (index / (data.timeline.length - 1)) * 100;
    const y = 90 - (item.views / maxVal) * 70; // Map views into chart bound
    return `${x},${y}`;
  }).join(' ');

  const pointsVisitors = data.timeline.map((item, index) => {
    const x = (index / (data.timeline.length - 1)) * 100;
    const y = 90 - (item.visitors / maxVal) * 70;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 sm:p-8 text-neutral-100 space-y-10 relative shadow-2xl">
      {/* 1. Controller Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-800">
        <div className="flex items-start space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase font-semibold">
                SYSTEM AGENT ACTIVE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-sans text-white">
              엠피드 <span className="text-orange-500">실시간 분석관제 통계 센터</span>
            </h2>
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center space-x-2 self-start sm:self-center">
          <button
            onClick={fetchStats}
            disabled={refreshing}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 transition-all border border-neutral-700/50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-orange-500' : ''}`} />
            <span>갱신</span>
          </button>
          
          <button
            onClick={handleClearDatabase}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/40 text-xs font-semibold text-red-400 transition-all border border-red-900/30"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>로그 청소</span>
          </button>
        </div>
      </div>

      {/* 2. Top-Level Core Traffic Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Hits Card */}
        <div className="bg-neutral-900 border border-neutral-800 px-5 py-4.5 rounded-2xl space-y-1 hover:border-neutral-700 transition-all">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">누적 총 조회수</span>
            <Eye className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{data.summary.totalViews} 회</p>
          <p className="text-[10px] text-neutral-500">클릭, 화면 이동 등 로깅 합산</p>
        </div>

        {/* Unique Sessions Card */}
        <div className="bg-neutral-900 border border-neutral-800 px-5 py-4.5 rounded-2xl space-y-1 hover:border-neutral-700 transition-all">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">고유 순방문 세션</span>
            <Users className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{data.summary.uniqueSessions} 명</p>
          <p className="text-[10px] text-neutral-500 font-sans">브라우저 쿠키 기준 분석 고유 타겟</p>
        </div>

        {/* Contact Conversion Card */}
        <div className="bg-neutral-900 border border-neutral-800 px-5 py-4.5 rounded-2xl space-y-1 hover:border-neutral-700 transition-all">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">접수 문의 건수</span>
            <Mail className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{data.summary.totalContacts} 건</p>
          <p className="text-[10px] text-neutral-500">BM 검증 및 강연 제의 컨버전 목록</p>
        </div>

        {/* Mobile Device Ratio */}
        <div className="bg-neutral-900 border border-neutral-800 px-5 py-4.5 rounded-2xl space-y-1 hover:border-neutral-700 transition-all">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">모바일 이용 비율</span>
            <Smartphone className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{data.summary.mobileRatio}%</p>
          <p className="text-[10px] text-neutral-500">스마트폰 진입 세그먼트 가늠지수</p>
        </div>
      </div>

      {/* 3. Interactive Web Traffic Timeline Vector Area Chart */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-neutral-200">일별 조회 트렌드 및 고유 방문자수 (14일간 추이)</h3>
          <p className="text-[11px] text-neutral-500">
            서버 백엔드 메모리 하이퍼바이저 로그 추척. <span className="text-orange-500 font-semibold">• 주황: 조회수</span>, <span className="text-amber-500 font-semibold">• 금색: 순방문자</span>
          </p>
        </div>

        <div className="w-full h-48 bg-[#18181b] border border-neutral-800 rounded-xl relative p-2">
          {/* Custom Responsive SVG Chart */}
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Horizontal Grid lines */}
            <line x1="0" y1="20" x2="100" y2="20" stroke="#27272a" strokeWidth="0.25" />
            <line x1="0" y1="55" x2="100" y2="55" stroke="#27272a" strokeWidth="0.25" strokeDasharray="1,1" />
            <line x1="0" y1="90" x2="100" y2="90" stroke="#27272a" strokeWidth="0.35" />

            {/* Area Path Views */}
            <polygon
              points={`0,90 ${pointsViews} 100,90`}
              fill="url(#viewsGradient)"
              opacity="0.12"
            />
            {/* Area Path Visitors */}
            <polygon
              points={`0,90 ${pointsVisitors} 100,90`}
              fill="url(#visitorsGradient)"
              opacity="0.08"
            />

            {/* Line Views */}
            <polyline
              fill="none"
              stroke="#EA580C"
              strokeWidth="1.2"
              strokeLinecap="round"
              points={pointsViews}
            />

            {/* Line Visitors */}
            <polyline
              fill="none"
              stroke="#F59E0B"
              strokeWidth="0.9"
              strokeDasharray="1,1"
              points={pointsVisitors}
            />

            {/* Definition for gradients */}
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EA580C" />
                <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Timeline labels at the bottom */}
          <div className="absolute bottom-1.5 left-2 right-2 flex justify-between text-[8px] font-mono font-bold text-neutral-500">
            {data.timeline.map((t) => (
              <span key={t.date}>{t.date}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Categorical Breakdowns Grid Layout (Left: Subpages & Referrers, Right: Submissions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Aspect: Funnel Breakdown Lists */}
        <div className="lg:col-span-5 space-y-6">
          {/* Section 1: Most viewed domains */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center space-x-2">
              <Compass className="w-3.5 h-3.5" />
              <span>가장 붐비는 서브페이지</span>
            </h4>
            <div className="space-y-3">
              {data.paths.slice(0, 5).map((path, idx) => {
                const total = Math.max(...data.paths.map(p => p.value), 1);
                const percent = Math.round((path.value / total) * 100);
                
                return (
                  <div key={path.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-mono text-neutral-300 font-semibold">{path.name}</span>
                      <span className="text-neutral-400 font-semibold">{path.value}회 ({percent}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Referral Sites */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center space-x-2">
              <Globe className="w-3.5 h-3.5" />
              <span>유입 레퍼러 (Referral Traffic)</span>
            </h4>
            <div className="space-y-3">
              {data.referrers.slice(0, 5).map((ref) => {
                const total = Math.max(...data.referrers.map(r => r.value), 1);
                const percent = Math.round((ref.value / total) * 100);
                
                return (
                  <div key={ref.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-300 font-sans">{ref.name}</span>
                      <span className="text-neutral-400 font-semibold">{ref.value}세션</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-600/60 rounded-full" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Aspect: Incoming Clients Form Inquiries Management Drawer */}
        <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>실시간 수령 문의사항 관리자 패널</span>
                <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-mono">
                  {data.contacts.length} INBOX
                </span>
              </h3>
              <p className="text-[11px] text-neutral-400 font-sans">
                클릭시 즉시 상태를 전환합니다.
              </p>
            </div>

            {/* List of custom consultations fetched programmatically */}
            <div className="space-y-4.5 max-h-[360px] overflow-y-auto pr-1">
              {data.contacts.length > 0 ? (
                data.contacts.map((contact) => (
                  <div
                    key={contact.id}
                    id={`contact-admin-card-${contact.id}`}
                    className="p-4 bg-[#1a1a1a] border border-neutral-800 hover:border-neutral-700/80 rounded-xl space-y-3 transition-colors text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <strong className="text-neutral-200 text-sm font-bold">{contact.name}</strong>
                          <span className="text-[10px] text-neutral-400">{contact.role}</span>
                          <span className="text-[10px] bg-[#27272a] text-neutral-300 px-1.5 py-0.5 rounded font-mono">
                            {contact.organization}
                          </span>
                        </div>
                        <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
                          {contact.email} | {contact.phone}
                        </p>
                      </div>

                      {/* Status toggle button */}
                      <button
                        onClick={() => handleUpdateContactStatus(contact.id, contact.status === 'pending' ? 'reviewed' : 'pending')}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-tight transition-all flex items-center space-x-1 uppercase ${
                          contact.status === 'reviewed'
                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                            : 'bg-orange-500/10 border border-orange-500/20 text-orange-400'
                        }`}
                        title="상태 전환하기"
                      >
                        {contact.status === 'reviewed' ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>상담 완료</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 animate-pulse" />
                            <span>접수 검토중</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-3 bg-[#202020] rounded-lg border border-neutral-800/80 text-neutral-300 font-sans leading-relaxed text-xs">
                      <span className="text-[10px] text-orange-500 font-bold tracking-tight block mb-1">
                        [분야: {contact.category === 'consulting' ? 'BM컨설팅' : contact.category === 'lecture' ? '강연출강' : contact.category === 'partnership' ? '파트너십' : '기타문의'}]
                      </span>
                      {contact.message}
                    </div>

                    <p className="text-[10px] text-neutral-500 text-right font-mono">
                      접수시각: {new Date(contact.timestamp).toLocaleString('ko-KR')}
                    </p>
                  </div>
                ))
              ) : (
                <div className="border border-dashed border-neutral-800 rounded-xl p-8 text-center text-neutral-400">
                  <p className="text-xs">현재 인박스에 도착한 접수 문의가 없습니다.</p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-800/60 text-[10px] text-neutral-500 font-sans leading-snug">
            * '접수 검토중' 상태의 문의 버튼을 누르면 '상담 완료' 로 손쉽게 보드 상태가 갱신됩니다. 저장 정보가 관리자 화면에 즉시 보존 처리됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}
