/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { COMP_INFO } from '../data';
import { Award, Target, Compass, Sparkles, Smile, ArrowRight, BookOpen } from 'lucide-react';
import { trackEvent } from '../utils/tracker';

export default function AboutUs() {
  useEffect(() => {
    trackEvent('pageview', '/about', 'about-page', 'Viewed About Us section');
  }, []);

  const coreValues = [
    {
      icon: Target,
      tag: '창업의 정량화',
      title: '현실적인 BM 검증',
      desc: '추상적인 구상을 시장 침투 가능한 비즈니스 캔버스로 분해 및 구체화하여, 리스크를 감안한 정량적 성장 지표를 선제적으로 설계합니다.'
    },
    {
      icon: Compass,
      tag: '성공의 이정표',
      title: '정부지원 연계 특화',
      desc: '예비창업패키지, 초기창업패키지 등의 평가 프레임을 정밀 분석하여, 공고 심사위원이 즉각 납득할 수 있는 고단가 해결책 서술 기법을 전수합니다.'
    },
    {
      icon: Award,
      tag: '진정성 있는 동행',
      title: '타깃별 밀착 교육',
      desc: '단순한 이론 주입이 아닌, 수강생 맞춤형 1:1 디렉팅으로 창업자가 가진 고유 강점을 극대화하여 실제 비즈니스 주체로 거듭나도록 돕습니다.'
    }
  ];

  const handleConsultClick = () => {
    trackEvent('click', '/about', 'call-to-action-about', 'Click Consult from About-Us Header');
    const contactBtn = document.getElementById('nav-contact');
    if (contactBtn) contactBtn.click();
  };

  return (
    <div id="about-section" className="space-y-16">
      {/* 1. Hero Introduction Banner with Orange Accents */}
      <section className="relative overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 text-white min-h-[380px] sm:min-h-[460px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-6 sm:px-12 md:px-16 py-12 shadow-2xl">
        <div className="absolute inset-0 bg-radial-gradient from-orange-500/10 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500 opacity-20 blur-[130px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>실전 창업 교육의 등대</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            아이디어가 눈에 보이는 <br />
            <span className="text-orange-500">지속 가능한 비즈니스</span>로
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base sm:text-lg text-neutral-300 leading-relaxed font-sans max-w-2xl"
          >
            (주)엠피드는 풍부한 현장 지식과 실전 컨설팅 역량을 기반으로 
            초기/예비 창업자들이 마주하는 자금 조달, BM 설계, 사업 기획의 장벽을 
            정교하고 확실한 전략으로 정복해 드립니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="pt-4 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={handleConsultClick}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 flex items-center space-x-2 border border-orange-400/20"
            >
              <span>1:1 온라인 문의하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://open.kakao.com/o/sPwL1jWf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('click', '/about', 'kakaotalk-openchat-btn', 'Click KakaoTalk OpenChat')}
              className="bg-[#FEE500] hover:bg-[#FEE500]/90 text-[#191919] font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#FEE500]/10 hover:shadow-[#FEE500]/20 flex items-center space-x-2 border border-yellow-400/10"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>카카오톡 1:1 실시간 상담</span>
            </a>

            <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400 py-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>2026 하반기 사업계획서 접수중</span>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Image frame matching the user's request */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 lg:col-span-5 flex justify-center items-center w-full"
        >
          <div className="relative w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden border border-neutral-850 bg-neutral-955/50 backdrop-blur-sm shadow-2xl transform hover:rotate-1 hover:scale-[1.02] transition-all duration-300">
            <img
              src="https://postfiles.pstatic.net/MjAyNjA2MDNfMjY2/MDAxNzgwNDY0NzE3NjUx.By_PTCyXKszaMXp8lhedYv4vpXryy3qTHblqDWB-2K8g.ipK86IBvx0Ytgdq8lk3ooYH7CKH0vVyXBk6pFtxj89Qg.JPEG/KakaoTalk_20240510_143254378_07.jpg?type=w966"
              alt="엠피드 교육 전경"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-550 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Ambient vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            {/* Elegant orange accent footer border strip */}
            <div className="absolute h-1.5 w-full bg-orange-500 bottom-0 left-0"></div>
          </div>
        </motion.div>
      </section>

      {/* 2. Core Pillars & Business Philosophy */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coreValues.map((value, idx) => {
          const IconComponent = value.icon;
          return (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * idx, duration: 0.5 }}
              className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-orange-500/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 group-hover:scale-105 transition-transform">
                <IconComponent className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-orange-500 tracking-wider uppercase mb-1 block">
                {value.tag}
              </span>
              <h3 className="text-lg font-bold text-neutral-900 mb-2 font-sans">
                {value.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {value.desc}
              </p>
            </motion.div>
          );
        })}
      </section>

      {/* 3. Executive Director's Deep Greeting Form (대표자 이준형) */}
      <section className="bg-neutral-50 rounded-2xl p-6 sm:p-12 border border-neutral-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
          <div className="relative w-36 h-36 rounded-2xl overflow-hidden bg-neutral-900 flex items-center justify-center border-4 border-white shadow-xl">
            <img
              src="https://postfiles.pstatic.net/MjAyNjA2MDNfMjQ0/MDAxNzgwNDU1NTAxMjQ5.LI_cyPai4Dj3xGNX2fq__Aurkbud7x6GgqXDolw4YEMg.GC5_xqXHBEP6xMVbm5usS8YafaKfItx8Ko0_6N2ROFIg.JPEG/%EC%88%98%EC%A0%95L92A5151.jpg?type=w966"
              alt="이준형 대표이사"
              className="absolute inset-0 w-full h-full object-cover object-top transition-all hover:scale-105 duration-300"
              referrerPolicy="no-referrer"
            />
            {/* Visual aesthetic element overlay */}
            <div className="absolute h-1.5 w-full bg-neutral-950 bottom-0 left-0"></div>
          </div>
          <div>
            <span className="text-xs text-orange-500 font-bold tracking-widest uppercase block mb-1">Representative</span>
            <h4 className="text-xl font-bold text-neutral-900 font-sans">이준형 대표이사</h4>
            <p className="text-xs text-neutral-500 font-medium">실전 창업 및 비즈니스 고도화 수석 멘토</p>
          </div>
          
          <div className="w-full h-px bg-neutral-200 lg:hidden my-2"></div>
        </div>

        <div className="lg:col-span-8 space-y-5">
          <span className="text-xs font-mono font-bold bg-neutral-200 text-neutral-700 px-2.5 py-1 rounded">CEO MESSAGE</span>
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-snug">
            &ldquo;창업은 끝없는 안개 속을 항해하는 과정과 같습니다. 
            엠피드가 성공적인 상륙을 돕는 정교한 지도가 되겠습니다.&rdquo;
          </h3>
          <div className="space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed font-sans font-normal">
            <p>
              안녕하십니까, (주)엠피드 대표 이준형입니다. <br />
              창업 생태계가 고도화됨에 따라 단순한 열정만으로는 정부지원의 관문을 넘거나 투자를 유치하는 것이 불가능해졌습니다. 창업 아이디어가 시장에서 날개를 펼치기 위해서는 <strong>데이터가 뒷받침된 시장성 검증</strong>과 <strong>심사위원이 공감하는 사업계획서</strong>가 필수적입니다.
            </p>
            <p>
              엠피드는 지적재산권(IP) 연동전략, 대상자별 세분화된 맞춤형 교육, 그리고 1,400시간 이상 축적된 필드 멘토링 노하우를 바탕으로 창업자와 함께 발을 디디며 호흡하고 있습니다. 실시간 창업 특강부터 깊이 있는 일대일 수정 멘토링까지, 실효성 없는 이론 방식을 전면 지양하고 <strong>'당장 실행에 옮길 수 있는 비즈니스 전술'</strong>만을 도출합니다.
            </p>
          </div>
          <div className="pt-2 flex flex-wrap gap-2 text-xs text-neutral-500 font-medium">
            <span className="bg-white border border-neutral-200 inline-block px-3 py-1 rounded-full">#울산지식재산센터 출강</span>
            <span className="bg-white border border-neutral-200 inline-block px-3 py-1 rounded-full">#국가보훈부 창업특강</span>
            <span className="bg-white border border-neutral-200 inline-block px-3 py-1 rounded-full">#경북창업학교 파트너십</span>
          </div>
        </div>
      </section>

      {/* 4. Strategic Mission & Support Philosophy Summary */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="border border-neutral-200 bg-white rounded-2xl p-8 space-y-4">
          <div className="inline-flex p-3 rounded-xl bg-orange-100 text-orange-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-neutral-900">MFeed의 예비 창업자 지원 철학</h4>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {COMP_INFO.philosophy} 우리는 서류상으로만 그럴듯해 보이는 사업계획서를 절대 작성하지 않습니다. 기술의 독창성과 실제 지출할 고객 세그먼트를 매핑하여 생명력을 불어넣는 것이 우리의 고유 소명입니다.
          </p>
        </div>

        <div className="border border-neutral-200 bg-white rounded-2xl p-8 space-y-4">
          <div className="inline-flex p-3 rounded-xl bg-orange-100 text-orange-600">
            <Smile className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-neutral-900">지속 성장을 향한 Vision</h4>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {COMP_INFO.vision} 사회적경제 기업, 청년 혁신 기술팀, 제대군인 소상공인 등 다양한 스펙트럼의 예비 사업가들이 지역 경제의 초석이자 글로벌 강소기업으로 성장하도록 튼튼한 다리를 놓아 드리겠습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
