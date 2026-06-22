/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TRACK_RECORDS, METRIC_STATS } from '../data';
import { trackEvent } from '../utils/tracker';
import { Award, Briefcase, GraduationCap, Building, Star, Search, Flame } from 'lucide-react';

export default function TrackRecord() {
  const [filter, setFilter] = useState<'all' | 'government' | 'local' | 'university'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    trackEvent('pageview', '/track-record', 'track-record-page', 'Viewed Track Record Section');
  }, []);

  const handleFilterClick = (cat: typeof filter) => {
    setFilter(cat);
    trackEvent('click', '/track-record', `filter-${cat}`, `Filter records by ${cat}`);
  };

  const handleStatCardClick = (title: string, index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
    trackEvent('click', '/track-record', `stat-card-${index}`, `Interactive click on dashboard metric: ${title}`);
  };

  // Filtering records based on tab and search box term
  const filteredRecords = TRACK_RECORDS.filter(rec => {
    const matchesCategory = filter === 'all' || rec.category === filter;
    const matchesSearch = rec.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rec.programTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rec.achievement.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="track-record-section" className="space-y-16">
      {/* 2. Top-level KPIs Dashboard Section: "주요 성과를 강조하는 대시보드 형태의 섹션" */}
      <section className="space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block">Operational Dashboard</span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#171717] tracking-tight flex items-center gap-2">
            실전 성과 피드백 대시보드
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500">
            (주)엠피드는 수강생 한 분 한 분의 수료 성과와 실제 신뢰 지표를 정량적으로 계량화하여 최전선 품질을 고수합니다. 카드를 클릭하면 상세한 성과 요약이 표시됩니다.
          </p>
        </div>

        {/* 4 Dashboard Metric widgets in Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {METRIC_STATS.map((stat, idx) => {
            const isSelected = activeIndex === idx;
            
            return (
              <button
                key={stat.title}
                id={`metric-card-${idx}`}
                onClick={() => handleStatCardClick(stat.title, idx)}
                className={`text-left p-6 rounded-2xl border transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'bg-neutral-900 border-neutral-900 text-white shadow-xl scale-[1.01]'
                    : 'bg-white border-neutral-200 text-neutral-900 hover:border-orange-500/30 hover:shadow-lg'
                }`}
              >
                {/* Visual Accent bar */}
                <div className={`absolute top-0 left-0 w-full h-1 transition-all ${
                  isSelected ? 'bg-orange-500' : 'bg-transparent group-hover:bg-orange-500/40'
                }`}></div>

                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold tracking-wider uppercase ${
                    isSelected ? 'text-orange-400' : 'text-neutral-400'
                  }`}>
                    {stat.title}
                  </span>
                  
                  {/* Mock Interactive Icon based on item */}
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-orange-600/20 text-orange-400' : 'bg-orange-50 text-orange-600'
                  }`}>
                    <small className="font-mono text-[9px] font-extrabold uppercase">KPI 0{idx+1}</small>
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <h4 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                    isSelected ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {stat.value}
                  </h4>
                  <p className={`text-xs font-semibold ${
                    isSelected ? 'text-orange-300' : 'text-orange-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>

                <p className={`text-[11px] mt-3 leading-relaxed transition-all ${
                  isSelected ? 'text-neutral-300 border-t border-neutral-800 pt-2.5' : 'text-neutral-500'
                }`}>
                  {stat.subtext}
                </p>

                {/* Secret interactive click hint */}
                {!isSelected && (
                  <span className="absolute bottom-2 right-3 text-[9px] font-semibold text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    자세히 보기 &rarr;
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Grid breakdown list of Partnerships with dynamic filter */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              주요 협업 및 출강 레코드
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500">
              정부부처, 공공기관, 지자체, 그리고 국내 우수 대학들과 쌓아온 신뢰의 행보입니다.
            </p>
          </div>

          {/* Search box within Track Record */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="record-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="기관 혹은 교육명 검색..."
              className="w-full text-xs pl-9 pr-4 py-2 border rounded-xl border-neutral-200 outline-none focus:border-orange-500 bg-white"
            />
          </div>
        </div>

        {/* Tab Filter Button Row */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-100 rounded-xl max-w-sm sm:max-w-md">
          {[
            { id: 'all', label: '전체 보기' },
            { id: 'government', label: '정부 기관' },
            { id: 'local', label: '지자체 연계' },
            { id: 'university', label: '대학/캠프' }
          ].map((cat) => (
            <button
              key={cat.id}
              id={`filter-rec-tab-${cat.id}`}
              onClick={() => handleFilterClick(cat.id as any)}
              className={`flex-1 text-center py-2 px-3 rounded-lg text-xs font-semibold tracking-tight transition-all ${
                filter === cat.id
                  ? 'bg-white text-orange-500 shadow-sm font-bold'
                  : 'text-neutral-600 hover:text-[#171717]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Records Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((rec) => {
              // Custom category helper color mapping
              const isGov = rec.category === 'government';
              const isUniv = rec.category === 'university';
              
              return (
                <div
                  key={rec.id}
                  id={`track-item-card-${rec.id}`}
                  className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Client logo symbol and type badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sm shadow-orange-500/10 shrink-0 uppercase">
                          {rec.logoInitial}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-neutral-900 tracking-tight leading-tight">
                            {rec.client}
                          </h4>
                          <span className="text-[10px] text-neutral-400 font-medium font-mono">
                            YEAR: {rec.year}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isGov ? 'bg-indigo-50 text-indigo-600' : isUniv ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {isGov ? '정부·공공' : isUniv ? '대학 교육' : '지자체'}
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-1.5">
                      <p className="text-xs font-semibold text-orange-500 block">
                        {rec.programTitle}
                      </p>
                      <p className="text-sm text-neutral-800 leading-normal font-sans">
                        <span className="font-semibold text-neutral-500 text-xs mr-1">교육구조:</span> 
                        {rec.activityType}
                      </p>
                    </div>
                  </div>

                  {/* Core Outlined Achievement */}
                  <div className="mt-4 pt-3.5 border-t border-dashed border-neutral-200/80 flex items-start space-x-2">
                    <Star className="w-4 h-4 text-orange-500 fill-orange-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                      <strong className="text-neutral-900 font-bold block mb-0.5">최종 도출 및 검증 성과:</strong>
                      {rec.achievement}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full border-2 border-dashed border-neutral-200 rounded-2xl py-12 px-4 text-center">
              <span className="text-sm font-sans text-neutral-400 font-normal">
                검색하신 조건에 부합하는 협업 레코드가 존재하지 않습니다.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* 4. High-End visual illustration highlighting process validation */}
      <section className="bg-neutral-900 rounded-2xl p-6 sm:p-10 border border-neutral-800 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-10 blur-[80px] pointer-events-none"></div>
        
        <div className="space-y-3 z-10 max-w-2xl">
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded">
            TRUST FACTOR
          </span>
          <h4 className="text-lg sm:text-xl font-bold tracking-tight">수강 후 만족도 98.7% &amp; 정부지원 수료 완료율 100%</h4>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            (주)엠피드는 단순 일방향적인 주입식 강연을 단호히 거부합니다. 사전에 의뢰 기관 예산 한도와 교육생 프로필을 완벽히 데이터 시뮬레이션하여, 수강생이 실질적으로 자립할 수 있는 최고의 아웃풋을 증명해 드립니다.
          </p>
        </div>

        <button
          onClick={() => {
            const target = document.getElementById('nav-contact');
            if (target) target.click();
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all hover:scale-[1.02] shrink-0 active:scale-95 shadow-md shadow-orange-500/20"
        >
          멘토링 및 출강 일정 제안받기
        </button>
      </section>
    </div>
  );
}
