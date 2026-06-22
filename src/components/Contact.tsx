/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { trackEvent } from '../utils/tracker';
import { Mail, Phone, MapPin, CheckCircle, Send, ShieldCheck, HelpCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    role: '',
    email: '',
    phone: '',
    category: 'consulting',
    message: '',
    agreeToTerms: false
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    trackEvent('pageview', '/contact', 'contact-page', 'Viewed Contact Section');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Verification
    if (!formData.name.trim()) {
      setErrorMsg('이름/담당자명을 정확히 입력해 주세요.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('올바른 이메일 주소를 입력해 주세요.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg('문의 사항 내용을 입력해 주세요.');
      return;
    }
    if (!formData.agreeToTerms) {
      setErrorMsg('개인정보 수집 및 동의에 체크해 주셔야 접수 가능합니다.');
      return;
    }

    setLoading(true);
    trackEvent('click', '/contact', 'submit-contact-form', `Submit form category: ${formData.category}`);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        trackEvent('contact_submit', '/contact', 'contact-success', `Successful submission from ${formData.name}`);
      } else {
        setErrorMsg(data.error || '접수 중 일시적인 오류가 발생했습니다.');
      }
    } catch (err: any) {
      setErrorMsg('서버와 연결을 할 수 없습니다. 네트워크 상태를 확인 제안 부탁합니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      organization: '',
      role: '',
      email: '',
      phone: '',
      category: 'consulting',
      message: '',
      agreeToTerms: false
    });
    setSubmitted(false);
  };

  return (
    <div id="contact-form-anchor" className="space-y-12">
      {/* 1. Header Portion */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block">Get In touch</span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] tracking-tight">
          창업 성공의 동반자를 <span className="text-orange-500">문의해 보세요</span>
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
          창업팀 일대일 멘토링, 지자체/대학 기업 맞춤형 출강 제안, BM 고도화 검증 솔루션 등 
          신뢰할 수 있고 디테일함이 가득 담긴 전문 답변을 영업일 기준 24시간 이내에 발송해 드립니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Corporate office coordinate info cards */}
        <div className="lg:col-span-5 bg-neutral-900 rounded-2xl p-6 sm:p-8 text-white border border-neutral-800 flex flex-col justify-between space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-[0.08] blur-[80px] pointer-events-none"></div>
          
          <div className="space-y-6">
            <span className="text-xs font-mono font-bold bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded inline-block uppercase tracking-wider">
              MFeed Office
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-sans">경영 전략의 명확한 길잡이</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              (주)엠피드는 전국 주요 창업 기관, 대학 창업넷, 제대군인센터 및 지식재산센터 출강 협업을 활발히 소화하고 있습니다.
            </p>
          </div>

          {/* Icon Contacts Block */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-orange-500 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-semibold text-neutral-500 block">유선 연락처</span>
                <p className="text-sm font-bold text-white font-mono mt-0.5">010-8636-4034</p>
                <span className="text-[10px] text-neutral-400">이준형 대표이사 직통</span>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-orange-500 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-semibold text-neutral-500 block">이메일 인콰이어</span>
                <p className="text-sm font-bold text-white font-mono mt-0.5">imhyun0401@naver.com</p>
                <span className="text-[10px] text-neutral-400">제안서 송부 및 교육 조율 전용</span>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-orange-500 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-semibold text-neutral-500 block">본사 소재지</span>
                <p className="text-xs font-semibold text-white mt-0.5 leading-snug">
                  인천 청라신도시 비즈니스 클러스터 협업 영역
                </p>
                <span className="text-[10px] text-neutral-400">전국 출장 및 줌(Zoom) 미팅 지원</span>
              </div>
            </div>

            <a 
              href="https://open.kakao.com/o/sPwL1jWf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('click', '/contact', 'kakaotalk-openchat-icon-link', 'Click KakaoTalk OpenChat from Contact Info')}
              className="flex items-center space-x-3.5 p-3 rounded-xl bg-[#FEE500]/10 hover:bg-[#FEE500]/20 transition-all border border-[#FEE500]/20 group/kakao text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FEE500] flex items-center justify-center text-[#191919] shrink-0 group-hover/kakao:scale-105 transition-transform">
                <span className="font-extrabold text-[11px] tracking-tight">TALK</span>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-semibold text-orange-400 block font-mono">Real-time Inquiry</span>
                <p className="text-sm font-bold text-white mt-0.5 group-hover/kakao:text-[#FEE500] transition-colors flex items-center gap-1.5">
                  카카오톡 1:1 오픈채팅
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block"></span>
                </p>
                <span className="text-[10px] text-neutral-300">실시간 문의 및 빠른 답변 제공</span>
              </div>
            </a>
          </div>

          <div className="pt-4 border-t border-neutral-800">
            <p className="text-[11px] text-neutral-500 font-sans leading-tight">
              * 전국 모든 국공립 대학, 보훈청, 상공회의소 멘토 풀(Pool) 등록용 증빙 서류 지참 및 공용 나라장터 행정 영수증 보장합니다.
            </p>
          </div>
        </div>

        {/* Right Side: Professional submission form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xl">
          {submitted ? (
            /* Successful card */
            <div className="h-full flex flex-col justify-center items-center text-center space-y-6 py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 text-emerald-500 flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold font-sans text-neutral-900">
                  성공적으로 협업 의뢰가 접수되었습니다!
                </h3>
                <p className="text-sm text-neutral-500 max-w-md mx-auto">
                  대표님이 직접 작성해주신 이메일 및 유선 번호를 통해 정성 어린 제안 요약 문서 및 
                  출강 가능 여부를 신속하게 안내해 드리겠습니다. 감사합니다.
                </p>
              </div>

              <div className="pt-4 flex items-center space-x-3">
                <button
                  onClick={handleResetForm}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl transition-all"
                >
                  새로운 문의 작성하기
                </button>
                <button
                  onClick={() => {
                    // Refresh view
                    const navBtn = document.getElementById('nav-about');
                    if (navBtn) navBtn.click();
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-all"
                >
                  메인 화면으로 이동
                </button>
              </div>
            </div>
          ) : (
            /* Active Form inputs */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Status Alert for errors */}
              {errorMsg && (
                <div className="bg-orange-50 border border-orange-200 text-orange-800 rounded-xl p-3.5 text-xs flex items-center space-x-2">
                  <span className="font-extrabold shrink-0">⚠️ 확인 필요:</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name / Representative */}
                <div className="space-y-1.5ClassName">
                  <label htmlFor="name" className="text-xs font-bold text-neutral-700 block">
                    성명 또는 담당자명 <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="예: 이준형"
                    className="w-full text-xs px-3.5 py-2.5 border rounded-xl border-neutral-200 outline-none focus:border-orange-500 transition-all font-sans bg-neutral-50/50"
                  />
                </div>

                {/* Organization name */}
                <div className="space-y-1.5 select-container">
                  <label htmlFor="organization" className="text-xs font-bold text-[#171717] block">
                    기관 또는 소속 기업명
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="예: (주)엠피드 파트너"
                    className="w-full text-xs px-3.5 py-2.5 border rounded-xl border-neutral-200 outline-none focus:border-orange-500 transition-all font-sans bg-neutral-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Role */}
                <div className="space-y-1.5">
                  <label htmlFor="role" className="text-xs font-bold text-neutral-700 block">
                    직함 또는 소속 직책
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="예: 매니저 / 예비 창업 대표"
                    className="w-full text-xs px-3.5 py-2.5 border rounded-xl border-neutral-200 outline-none focus:border-orange-500 transition-all font-sans bg-neutral-50/50"
                  />
                </div>

                {/* Phone number */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-bold text-neutral-700 block">
                    연락 가능한 전화번호 <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="예: 010-XXXX-XXXX"
                    className="w-full text-xs px-3.5 py-2.5 border rounded-xl border-neutral-200 outline-none focus:border-orange-500 transition-all font-mono bg-neutral-50/50"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-bold text-neutral-700 block">
                  견적 답변을 수령할 이메일 주소 <span className="text-orange-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com (네이버, 메일주소 모두 가능)"
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl border-neutral-200 outline-none focus:border-orange-500 transition-all font-mono bg-neutral-50/50"
                />
              </div>

              {/* Selection Category */}
              <div className="space-y-1.5">
                <label htmlFor="category" className="text-xs font-bold text-neutral-700 block">
                  문의 컨설팅 분야 선택
                </label>
                <select
                  id="inquiry-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl border-neutral-200 outline-none focus:border-orange-500 transition-all font-sans bg-neutral-50/50 cursor-pointer"
                >
                  <option value="consulting">BM 고도화 및 일대일 창업 패키지 컨설팅</option>
                  <option value="lecture">지자체, 창업 지원센터 강연 및 출강 요청</option>
                  <option value="partnership">기관 운영 공동 제휴 및 비즈니스 협력 제안</option>
                  <option value="other">기타 창업 관련 맞춤 요청 사항</option>
                </select>
              </div>

              {/* Detail Content message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-bold text-neutral-700 block">
                  사업 아이템 점검 목적 및 문의 세부 요청 내용 <span className="text-orange-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="예: 강연 희망 일자, 타겟 수강 대상 수, 컨설팅을 통한 주요 성과 목표 등을 간략히 적어 주시면 최선의 대응이 가능해집니다."
                  className="w-full text-xs px-3.5 py-2.5 border rounded-xl border-neutral-200 outline-none focus:border-orange-500 transition-all font-sans bg-neutral-50/50"
                ></textarea>
              </div>

              {/* Security terms consensus checkbox */}
              <div className="flex items-start space-x-3 pt-1">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 border-neutral-300 mt-0.5 cursor-pointer accent-orange-500"
                />
                <label htmlFor="agreeToTerms" className="text-xs text-neutral-600 select-none cursor-pointer leading-relaxed">
                  (주)엠피드 창업지원팀은 상담을 수령하고 기록하기 위한 개인정보 활용 정책 수집(성명, 이메일, 전화번호 소유 내역)에 동의합니다. <span className="text-orange-500 font-semibold">[동의 필수]</span>
                </label>
              </div>

              <button
                type="submit"
                id="submit-contact"
                disabled={loading}
                className={`w-full py-4 text-xs font-extrabold uppercase tracking-widest text-white rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 ${
                  loading
                    ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 active:scale-[0.99] shadow-orange-500/15 hover:shadow-orange-500/25'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                    <span>접수 정보를 송출하고 있습니다...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>(주)엠피드 수석 멘토단에 접수 요청하기</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2.5 text-[10px] text-neutral-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                <span>접수된 모든 메디에이션 정보는 SSL 보안 프로토콜 및 비공개 처리로 안전하게 보호됩니다.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
