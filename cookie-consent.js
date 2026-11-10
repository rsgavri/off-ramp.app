// Cookie Consent Banner for Global Payment Solutions
// This script creates and manages a cookie consent banner

(function () {
    'use strict';

    // Check if user has already consented
    const COOKIE_CONSENT_KEY = 'ex_financial_cookie_consent';
    const COOKIE_CONSENT_EXPIRY = 365; // days

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
    }

    function hasConsent() {
        return getCookie(COOKIE_CONSENT_KEY) === 'accepted';
    }

    function loadMarketingTags() {
        if (window.__exMarketingLoaded) return;
        window.__exMarketingLoaded = true;
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17779747081';
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', 'AW-17779747081');
        window.gtag('config', 'G-SQ73WY8WMV');
    }

    function acceptCookies() {
        setCookie(COOKIE_CONSENT_KEY, 'accepted', COOKIE_CONSENT_EXPIRY);
        loadMarketingTags();
        hideBanner();
    }

    function declineCookies() {
        setCookie(COOKIE_CONSENT_KEY, 'declined', COOKIE_CONSENT_EXPIRY);
        hideBanner();
    }

    function hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.style.opacity = '0';
            banner.style.transform = 'translateY(100%)';
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    function createBanner() {
        // Don't show banner if user has already made a choice
        if (getCookie(COOKIE_CONSENT_KEY)) {
            return;
        }

        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.98) 0%, rgba(147, 51, 234, 0.98) 100%);
            backdrop-filter: blur(10px);
            padding: 1.5rem;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            transform: translateY(0);
            opacity: 1;
            transition: all 0.3s ease-in-out;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        `;

        banner.innerHTML = `
            <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; align-items: start; gap: 1rem; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 300px;">
                        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                                <path d="M8.5 8.5v.01"></path>
                                <path d="M16 15.5v.01"></path>
                                <path d="M12 12v.01"></path>
                                <path d="M11 17v.01"></path>
                                <path d="M7 14v.01"></path>
                            </svg>
                            <h3 style="color: white; font-size: 1.125rem; font-weight: 700; margin: 0;">We Value Your Privacy</h3>
                        </div>
                        <p style="color: rgba(255, 255, 255, 0.95); font-size: 0.875rem; line-height: 1.5; margin: 0;">
                            Essential cookies remember this choice. The Google advertising tag loads only if you press Accept All. Decline leaves that tag off. 
                            <a href="/cookie-policy" style="color: white; text-decoration: underline; font-weight: 600;">Learn more</a>
                        </p>
                    </div>
                    <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
                        <button id="cookie-settings-btn" style="
                            padding: 0.625rem 1.25rem;
                            background: rgba(255, 255, 255, 0.15);
                            border: 1px solid rgba(255, 255, 255, 0.3);
                            color: white;
                            border-radius: 0.5rem;
                            font-weight: 600;
                            font-size: 0.875rem;
                            cursor: pointer;
                            transition: all 0.2s;
                            white-space: nowrap;
                        ">
                            Decline
                        </button>
                        <button id="cookie-accept-btn" style="
                            padding: 0.625rem 1.5rem;
                            background: white;
                            border: none;
                            color: #2563eb;
                            border-radius: 0.5rem;
                            font-weight: 700;
                            font-size: 0.875rem;
                            cursor: pointer;
                            transition: all 0.2s;
                            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                            white-space: nowrap;
                        ">
                            Accept All Cookies
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Add event listeners
        const acceptButton = document.getElementById('cookie-accept-btn');
        const declineButton = document.getElementById('cookie-settings-btn');
        acceptButton.addEventListener('click', acceptCookies);
        declineButton.addEventListener('click', declineCookies);
        declineButton.addEventListener('mouseenter', () => { declineButton.style.background = 'rgba(255, 255, 255, 0.25)'; });
        declineButton.addEventListener('mouseleave', () => { declineButton.style.background = 'rgba(255, 255, 255, 0.15)'; });
        acceptButton.addEventListener('mouseenter', () => {
            acceptButton.style.transform = 'translateY(-2px)';
            acceptButton.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });
        acceptButton.addEventListener('mouseleave', () => {
            acceptButton.style.transform = 'translateY(0)';
            acceptButton.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        });

        // Animate in
        setTimeout(() => {
            banner.style.transform = 'translateY(0)';
        }, 100);
    }

    // Initialize when DOM is ready
    function startConsent() {
        if (hasConsent()) loadMarketingTags();
        createBanner();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startConsent);
    } else {
        startConsent();
    }
})();
