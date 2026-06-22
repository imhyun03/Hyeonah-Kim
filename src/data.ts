/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProgramItem, TrackRecordItem, DashboardMetric } from './types';

export const COMP_INFO = {
  name: '(주)엠피드',
  engName: 'MFeed Co., Ltd.',
  ceo: '이준형',
  philosophy: '실전 창업의 든든한 등대이자 동반자로서, 초기 창업자와 기관의 니즈를 명확히 진단하고 확실한 사업화 성과를 도출합니다.',
  vision: '창의적인 아이디어가 시장에서 인정받고 지속 가능한 성장 동력으로 안착할 수 있도록 정교한 경영 전략과 혁신적인 비즈니스 모델(BM)을 설계합니다.'
};

// Core 4 Services
export const CORE_PROGRAMS: ProgramItem[] = [
  {
    id: 'prog-1',
    title: '사업계획서 컨설팅',
    subtitle: '정부지원사업 공략 및 투자 유치',
    iconName: 'FileText',
    description: '예비창업패키지, 초기창업패키지는 물론 민간 투자 유치(IR) 및 금융 매칭을 위한 합격 중심의 사업계획서 작성 교육과 정밀 분석 실습 가이드를 제공합니다.',
    target: '정부지원사업 도전 예정 예비/초기 창업자 및 재창업 기업',
    features: [
      '정부지원사업(예창패·초창패·창도패) 맞춤형 구조 설계',
      '합격률을 높이는 강력한 혜택 및 공익적 가치 강조 가이던스',
      '차별성 넘치는 시장 침투 전략 및 마케팅 구조화 기술',
      '지자체 보조금 연계 및 후속 IR 피칭 시나리오 코칭'
    ],
    process: ['아이디어 분해 및 진단', '본문 핵심 메시지 구조화', '가시적 데이터/지표 시각화', '대면 피칭 모의 트레이닝']
  },
  {
    id: 'prog-2',
    title: '비즈니스 모델 고도화',
    subtitle: '시장 검증 및 BM 핵심 솔루션',
    iconName: 'Settings',
    description: '아이디어 단계의 아이템을 고품질 비즈니스 기회로 전환합니다. 핵심 고객 세그먼트를 발굴하고 리스크 요소를 사전 설계하여 최적의 수익 모델을 도출합니다.',
    target: '아이디어 구체화가 필요한 극초기 창업자 및 피벗 희망 기업',
    features: [
      '고객 페르소나 매핑 및 심층 통찰력 도출',
      '가치 제안(Value Proposition) 기반 솔루션 적합성 검증',
      'Lean Canvas 분석법을 활용한 핵심 역량 지표 설계',
      '수익 흐름 다변화 및 가격 정책 시뮬레이션'
    ],
    process: ['타겟 시장 심층 인터뷰', '핵심 장벽 분석 및 가설 설정', '수익 흐름 다중화 시나리오', '최종 BM 설계 검증']
  },
  {
    id: 'prog-3',
    title: '창업 전략 수립',
    subtitle: '트렌드 분석 및 맞춤형 사업화',
    iconName: 'TrendingUp',
    description: '급변하는 창업 환경과 최신 비즈니스 메가트렌드를 종합적으로 분석하여 기업별 강점에 맞춘 단계별 성장 로드맵 및 차별화된 포지셔닝 계획을 도출합니다.',
    target: '경쟁력 약화로 신성장 동력을 찾거나 스케일업을 도모하는 기관/대표자',
    features: [
      '국내외 산업 트렌드 분석 및 메가트렌드 매칭',
      '경쟁 구도 도출 및 중장기 SWOT/STP 세부 도출',
      '단계별 자금 조달 및 고용 로드맵 연계 기획',
      '신속한 실행력을 보장하는 핵심 성과 지표(KPI) 구성'
    ],
    process: ['대내외 환경 분석', '경쟁자 및 우위 요소 진단', '마일스톤/인적 자원 연계', '고객 획득 실행안 매뉴얼']
  },
  {
    id: 'prog-4',
    title: '맞춤형 멘토링',
    subtitle: '타깃 밀착 창업 교육 및 1:1 진단',
    iconName: 'Users',
    description: '청년, 여성, 제대군인, 시니어, 대학생 등 대상의 고유 특성을 입체적으로 고려한 눈높이 맞춤형 창업 특강 및 밀착형 진단 컨설팅을 수행합니다.',
    target: '지자체, 대학 창업지원단, 보훈 전문 기관 등의 연수 기획 부서',
    features: [
      '타깃 맞춤 전용 교안 설계 (눈높이 기초 용어 정리)',
      '1:1 심층 매칭을 통한 사업 아이템 핵심 약점 실시간 보완',
      '실패율 최소화를 위한 주 타겟군 리스크 맵 제공',
      '창업 네트워크 구성 및 지식재산 연동 교육'
    ],
    process: ['신청자 프로필 정밀 진단', '1:1 진단 및 문제 리프레임', '즉시 실행 액션 플랜 제공', '만족도 분석 및 후속 점검']
  }
];

// Highlight portfolios (History)
export const TRACK_RECORDS: TrackRecordItem[] = [
  {
    id: 'rec-1',
    client: '울산지식재산센터 (울산상공회의소)',
    category: 'government',
    programTitle: '지식재산 창업교육 "사업전략 수립" 과정',
    activityType: '단독 출강 및 사업계획서 검토',
    year: '2025',
    achievement: '만족도 종합 4.9/5.0 달성 및 참여 기업 우수 BM 특허 연계 가이드 확보',
    logoInitial: '울'
  },
  {
    id: 'rec-2',
    client: '국가보훈부',
    category: 'government',
    programTitle: '제대군인 창업 워크숍 "정부지원사업 교육"',
    activityType: '정부지원사업 종류 분석 및 사업계획서 실전 작성 멘토링',
    year: '2025',
    achievement: '제대군인 역량 강화 훈련 수료 만족도 최우수 및 전원 모의 작성 완료',
    logoInitial: '보'
  },
  {
    id: 'rec-3',
    client: '경상북도',
    category: 'local',
    programTitle: '경북형 사회적경제 창업학교 사업계획서 실습',
    activityType: '실습 전담 퍼실리테이터 및 멘토 피드백',
    year: '2024',
    achievement: '7개 최종 선발 팀 전원 서류 심사 기준 적합률 100% 매칭 피드백 완수',
    logoInitial: '경'
  },
  {
    id: 'rec-4',
    client: '대구여성인력개발센터',
    category: 'local',
    programTitle: '대구여성창업융합패키지 "창업 아이템 점검" 특강',
    activityType: '여성 맞춤형 이커머스 및 창의 점검 훈련 강연',
    year: '2024',
    achievement: '수강생 98% "즉각적 아이템 개선에 유용했다" 호평 최우수 멘토 지정',
    logoInitial: '여'
  },
  {
    id: 'rec-5',
    client: '부산대학교 및 부산교육대학교',
    category: 'university',
    programTitle: '에듀테크 창업 캠프 멘토링 및 연수 강연',
    activityType: '대학생 기술창업 기획 컨설턴트 참여',
    year: '2025',
    achievement: '참가 5개 연합팀 최종 모의 IR 데모데이 수상 연계 기여',
    logoInitial: '부'
  }
];

// Dashboard statistics / Corporate metrics
export const METRIC_STATS: DashboardMetric[] = [
  {
    title: '누적 창업 교육 시수',
    value: '1,420+ 시간',
    change: '+18% 년간성장',
    subtext: '지자체·대학·공공기관 맞춤형 출강 시수 합산',
    iconName: 'Clock'
  },
  {
    title: '컨설팅 및 멘토링 수료율',
    value: '100 %',
    change: '만족도 98% 달성',
    subtext: '중도 이탈 없는 밀착 카운슬링 및 단계별 매칭',
    iconName: 'Award'
  },
  {
    title: '누적 보유 파트너 기관',
    value: '35+ 개소',
    change: '정부/지자체/공공 중심',
    subtext: '울산상공회의소, 국가보훈부, 경북도 등 신뢰 구축',
    iconName: 'Building'
  },
  {
    title: '정부지원사업 합격 연계',
    value: '124+ 건',
    change: '예창패 / 초창패 최적화',
    subtext: '컨설팅 수료생들의 최종 선정 및 합격 누적 성과',
    iconName: 'CheckCircle'
  }
];
