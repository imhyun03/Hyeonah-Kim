/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Helper to get or generate a unique session token
export function getSessionToken(): string {
  if (typeof window === 'undefined') return '';
  let token = sessionStorage.getItem('mfeed_session_token');
  if (!token) {
    token = 'sess-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('mfeed_session_token', token);
  }
  return token;
}

// Gather client metadata
export function getClientSpecs() {
  if (typeof window === 'undefined') {
    return {
      browser: 'Unknown',
      os: 'Unknown',
      isMobile: false,
      screen: 'Unknown'
    };
  }

  const ua = navigator.userAgent;
  let browser = 'Unknown Browser';
  let os = 'Unknown OS';

  // Basic Browser Detection
  if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
  else if (ua.indexOf('Safari') > -1) browser = 'Safari';
  else if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
  else if (ua.indexOf('Edge') > -1) browser = 'Edge';
  else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1) browser = 'IE';

  if (ua.indexOf('Mobi') > -1) {
    if (browser === 'Safari') browser = 'Mobile Safari';
    else if (browser === 'Chrome') browser = 'Mobile Chrome';
  }

  // Basic OS Detection
  if (ua.indexOf('Win') > -1) os = 'Windows';
  else if (ua.indexOf('Mac') > -1) os = 'macOS';
  else if (ua.indexOf('Linux') > -1) os = 'Linux';
  else if (ua.indexOf('Android') > -1) os = 'Android';
  else if (ua.indexOf('like Mac') > -1) os = 'iOS';

  const isMobile = ua.indexOf('Mobi') > -1 || ua.indexOf('Android') > -1 || ua.indexOf('iPhone') > -1;
  const screen = `${window.innerWidth}x${window.innerHeight}`;

  return { browser, os, isMobile, screen };
}

// Async tracker posting events to backend
export async function trackEvent(
  eventType: 'pageview' | 'click' | 'hover' | 'contact_submit',
  path: string,
  elementId?: string,
  elementText?: string
) {
  try {
    const sessionToken = getSessionToken();
    const device = getClientSpecs();
    const referrer = document.referrer || 'Direct Entry';

    const payload = {
      path,
      eventType,
      elementId,
      elementText: elementText?.trim().substring(0, 50),
      sessionToken,
      device,
      referrer
    };

    // Fire-and-forget fetch call
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn('[Tracking Failed]', err);
  }
}
