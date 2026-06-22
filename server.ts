/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';

// Define double-underscores for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for Analytics & Contact Submissions (initialized with high-quality, realistic seed data)
const db = {
  events: [] as Array<{
    id: string;
    timestamp: string;
    path: string;
    eventType: string;
    elementId?: string;
    elementText?: string;
    sessionToken: string;
    device: {
      browser: string;
      os: string;
      isMobile: boolean;
      screen: string;
    };
    referrer: string;
  }>,
  contacts: [] as Array<{
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
  }>
};

// Seed 30 days of high-quality realistic metrics for the stats dashboard
const seedAnalyticsData = () => {
  const browsers = ['Chrome', 'Safari', 'Edge', 'Firefox', 'Mobile Safari'];
  const osList = ['Windows', 'macOS', 'iOS', 'Android', 'Linux'];
  const referrers = ['Google Search', 'Naver', 'Direct', 'KakaoTalk', 'Facebook', 'Blog'];
  const paths = ['/about', '/programs', '/track-record', '/contact', '/home'];
  
  const now = new Date();
  
  // Seed ~150 visits distributed over the last 30 days
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    // Higher volume during weekdays, lower during weekends
    const dayOfWeek = date.getDay();
    const multiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 2 : 7;
    const count = Math.floor(Math.random() * 5) + multiplier;
    
    for (let j = 0; j < count; j++) {
      const eventTime = new Date(date.getTime() + Math.random() * 24 * 60 * 60 * 1000);
      const isMobile = Math.random() > 0.4;
      const browser = isMobile ? 'Mobile Safari' : browsers[Math.floor(Math.random() * 4)];
      const os = isMobile ? osList[Math.floor(Math.random() * 2) + 2] : osList[Math.floor(Math.random() * 2)];
      const pathSel = paths[Math.floor(Math.random() * paths.length)];
      
      db.events.push({
        id: `seed-${i}-${j}`,
        timestamp: eventTime.toISOString(),
        path: pathSel,
        eventType: 'pageview',
        sessionToken: `sess-${Math.floor(Math.random() * 100000)}`,
        device: {
          browser,
          os,
          isMobile,
          screen: isMobile ? '390x844' : '1920x1080'
        },
        referrer: referrers[Math.floor(Math.random() * referrers.length)]
      });
    }
  }

  // Prepopulate 4 realistic Korean contact submissions to show the dashboard works beautifully
  const seedContacts = [
    {
      id: 'contact-seed-1',
      timestamp: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      name: '김태균',
      organization: '스타트업허브 테크코리아',
      role: '총괄 매니저',
      email: 'tg.kim@startuphub.kr',
      phone: '010-4829-1928',
      category: 'lecture',
      message: '하반기 예비 창업 패키지 선정 기관들을 대상으로 실전 사업계획서 보완 특강(3시간 분량) 출강 의뢰 드립니다. 대표님 일정이 가능하신지 여쭤봅니다.',
      status: 'reviewed'
    },
    {
      id: 'contact-seed-2',
      timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      name: '한소희',
      organization: '글로벌 에듀 파이오니어',
      role: '기획팀 대리',
      email: 'sh.han@edupioneer.com',
      phone: '010-8291-7731',
      category: 'partnership',
      message: '부산/경남 지역 대학생 연합 창업 부트캠프를 공동 운영 제휴를 제안 드리고 싶습니다. 비즈니스 모델 고도화 솔루션을 엠피드와 함께 협업하고 싶습니다.',
      status: 'pending'
    },
    {
      id: 'contact-seed-3',
      timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      name: '이민규',
      organization: '크리에이티브 스튜디오',
      role: '대표',
      email: 'ceo@creativestu.net',
      phone: '010-3382-9901',
      category: 'consulting',
      message: '초기창업패키지 지원 사업을 준비 중인 1인 창업가입니다. 개발 중인 아이템의 시장 검증 및 BM 고도화 맞춤형 1:1 컨설팅을 신청하고자 문의 드립니다.',
      status: 'pending'
    }
  ];

  db.contacts.push(...seedContacts);
  console.log(`[Database Seed] Populated ${db.events.length} logs and ${db.contacts.length} inquiries.`);
};

// Seed immediately
seedAnalyticsData();

// API endpoint to log interaction and page visits
app.post('/api/analytics/track', (req, res) => {
  try {
    const { path, eventType, elementId, elementText, sessionToken, device, referrer } = req.body;
    
    const newEvent = {
      id: `live-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      path: path || '/',
      eventType: eventType || 'pageview',
      elementId,
      elementText,
      sessionToken: sessionToken || 'unknown-session',
      device: device || {
        browser: 'Unknown',
        os: 'Unknown',
        isMobile: false,
        screen: 'Unknown'
      },
      referrer: referrer || 'Direct'
    };
    
    db.events.push(newEvent);
    res.status(200).json({ success: true, eventId: newEvent.id });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// API endpoint to retrieve full analytics metrics (structured for our dashboard)
app.get('/api/analytics/data', (req, res) => {
  try {
    // 1. Total Summary
    const totalViews = db.events.length;
    const uniqueSessions = new Set(db.events.map(e => e.sessionToken)).size;
    const totalContacts = db.contacts.length;
    
    // 2. Browser & OS breakdowns
    const browserCounts: Record<string, number> = {};
    const osCounts: Record<string, number> = {};
    const pathCounts: Record<string, number> = {};
    const referrerCounts: Record<string, number> = {};
    let mobileCount = 0;
    
    db.events.forEach(e => {
      const b = e.device.browser || 'Unknown';
      const o = e.device.os || 'Unknown';
      const p = e.path || '/';
      const r = e.referrer || 'Direct';
      
      browserCounts[b] = (browserCounts[b] || 0) + 1;
      osCounts[o] = (osCounts[o] || 0) + 1;
      pathCounts[p] = (pathCounts[p] || 0) + 1;
      referrerCounts[r] = (referrerCounts[r] || 0) + 1;
      if (e.device.isMobile) mobileCount++;
    });

    // 3. Traffic timeline over last 14 days
    const dailyViews: Record<string, { date: string; views: number; visitors: Set<string> }> = {};
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateString = `${d.getMonth() + 1}/${d.getDate()}`;
      dailyViews[dateString] = { date: dateString, views: 0, visitors: new Set() };
    }

    db.events.forEach(e => {
      const eDate = new Date(e.timestamp);
      const dateString = `${eDate.getMonth() + 1}/${eDate.getDate()}`;
      if (dailyViews[dateString]) {
        dailyViews[dateString].views += 1;
        dailyViews[dateString].visitors.add(e.sessionToken);
      }
    });

    const chartTimeline = Object.values(dailyViews).map(item => ({
      date: item.date,
      views: item.views,
      visitors: item.visitors.size
    }));

    // Formatting categorical arrays
    const browsersChart = Object.entries(browserCounts).map(([name, value]) => ({ name, value }));
    const osChart = Object.entries(osCounts).map(([name, value]) => ({ name, value }));
    const pathsChart = Object.entries(pathCounts).map(([name, value]) => ({ name, value }));
    const referrersChart = Object.entries(referrerCounts).map(([name, value]) => ({ name, value }));

    res.json({
      summary: {
        totalViews,
        uniqueSessions,
        totalContacts,
        mobileRatio: totalViews > 0 ? Math.round((mobileCount / totalViews) * 100) : 0
      },
      timeline: chartTimeline,
      browsers: browsersChart,
      operatingSystems: osChart,
      paths: pathsChart,
      referrers: referrersChart,
      contacts: db.contacts
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// API endpoint to handle Contact Form Submissions
app.post('/api/contact', (req, res) => {
  try {
    const { name, organization, role, email, phone, category, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: '이름, 이메일, 내용은 필수 입력사항입니다.' });
    }

    const newContact = {
      id: `contact-${Date.now()}`,
      timestamp: new Date().toISOString(),
      name,
      organization: organization || '개인',
      role: role || '창업자',
      email,
      phone: phone || '없음',
      category: category || 'consulting',
      message,
      status: 'pending'
    };

    db.contacts.unshift(newContact);

    // Also record this as a tracking event!
    db.events.push({
      id: `track-contact-${Date.now()}`,
      timestamp: new Date().toISOString(),
      path: '/contact',
      eventType: 'contact_submit',
      elementId: 'contact-form-submit',
      elementText: `${name} (${organization || '개인'}) contact submit`,
      sessionToken: `sess-${Math.floor(Math.random() * 100000)}`,
      device: {
        browser: 'Client POST',
        os: 'System',
        isMobile: false,
        screen: 'headless'
      },
      referrer: 'Web Application Interaction'
    });

    res.status(201).json({ success: true, contact: newContact });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// API endpoint to change submission status (admin)
app.patch('/api/contacts/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const contact = db.contacts.find(c => c.id === id);
    if (!contact) {
      return res.status(404).json({ success: false, error: 'No inquiry found' });
    }
    
    contact.status = status;
    res.json({ success: true, contact });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Clear tracking database
app.post('/api/analytics/clear', (req, res) => {
  db.events = [];
  db.contacts = [];
  res.json({ success: true });
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("[Vite] Middleware injected successfully");
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting on port ${PORT}...`);
  });
}

startServer();
