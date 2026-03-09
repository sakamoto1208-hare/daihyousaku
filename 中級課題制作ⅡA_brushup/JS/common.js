    /* =========================================================
    多言語テキスト（日本語 / 英語 / 中国語 / 韓国語）
    ========================================================= */
    const translations = {
        ja: {
            home: 'HOME',
            artists: 'ARTIST',
            timetable: 'TIMETABLE',
            ticket: 'TICKET',
            ticketBtn: 'チケット購入',
            countdownLabel: 'LIVEまであと',
            days: '日',
            hours: '時間',
            minutes: '分',
            seconds: '秒',
            news: '📢 出演者速報',
            featuredTitle: '⭐ 注目アーティスト',
            artistsTitle: '🎤 出演アーティスト一覧',
            timetableTitle: '🕐 タイムテーブル',
            ticketTitle: '🎟️ チケット情報',
            eventDate: '2027年08月10日 15:00 開演',
            accessTitle: '📍 会場案内',
            mapNote: '※本イベントは架空の会場です。',
            followUs: 'FOLLOW US',
            rights: '© 2025 FLASH BEAT. All rights reserved.',
            open: '開演',
            close: '閉演（21:30予定）',
            backToTop: 'トップへ戻る'
        },
        en: {
            home: 'HOME',
            artists: 'ARTISTS',
            timetable: 'TIMETABLE',
            ticket: 'TICKET',
            ticketBtn: 'Buy Ticket',
            countdownLabel: 'Time Until Live',
            days: 'Days',
            hours: 'Hours',
            minutes: 'Min',
            seconds: 'Sec',
            news: '📢 Artist News',
            featuredTitle: '⭐ Featured Artists',
            artistsTitle: '🎤 Artist Lineup',
            timetableTitle: '🕐 Timetable',
            ticketTitle: '🎟️ Ticket Info',
            eventDate: 'August 10, 2027 - 3:00 PM',
            accessTitle: '📍 Venue',
            mapNote: '※This is a fictional venue.',
            followUs: 'FOLLOW US',
            rights: '© 2025 FLASH BEAT. All rights reserved.',
            open: 'Doors Open',
            close: 'End (9:30 PM)',
            backToTop: 'Back to Top'
        },
        zh: {
            home: '首页',
            artists: '艺人',
            timetable: '时间表',
            ticket: '门票',
            ticketBtn: '购买门票',
            countdownLabel: '距离演出',
            days: '天',
            hours: '小时',
            minutes: '分',
            seconds: '秒',
            news: '📢 艺人快讯',
            featuredTitle: '⭐ 精选艺人',
            artistsTitle: '🎤 演出艺人列表',
            timetableTitle: '🕐 时间表',
            ticketTitle: '🎟️ 门票信息',
            eventDate: '2027年08月10日 15:00 开演',
            accessTitle: '📍 场地指南',
            mapNote: '※本活动为虚拟场地。',
            followUs: '关注我们',
            rights: '© 2025 FLASH BEAT. 版权所有。',
            open: '开场',
            close: '闭幕（21:30预定）',
            backToTop: '返回顶部'
        },
        ko: {
            home: '홈',
            artists: '아티스트',
            timetable: '타임테이블',
            ticket: '티켓',
            ticketBtn: '티켓 구매',
            countdownLabel: '라이브까지',
            days: '일',
            hours: '시간',
            minutes: '분',
            seconds: '초',
            news: '📢 출연자 속보',
            featuredTitle: '⭐ 주목 아티스트',
            artistsTitle: '🎤 출연 아티스트 목록',
            timetableTitle: '🕐 타임테이블',
            ticketTitle: '🎟️ 티켓 정보',
            eventDate: '2027년 08월 10일 15:00 개막',
            accessTitle: '📍 회장 안내',
            mapNote: '※본 이벤트는 가상 회장입니다.',
            followUs: '팔로우',
            rights: '© 2025 FLASH BEAT. All rights reserved.',
            open: '개막',
            close: '폐막（21:30예정）',
            backToTop: '맨 위로'
        }
    };

    let currentLang = 'ja';

    /* =========================================================
    言語適用
    ========================================================= */
    function applyLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) el.textContent = t[key];
        });

        document.querySelectorAll('.countdown-label').forEach(el => {
            el.textContent = t.countdownLabel;
        });

        const units = document.querySelectorAll('.countdown .unit');
        if (units.length >= 4) {
            units[0].textContent = t.days;
            units[1].textContent = t.hours;
            units[2].textContent = t.minutes;
            units[3].textContent = t.seconds;
        }

        document.documentElement.lang = lang;

        const backBtn = document.getElementById('backToTop');
        if (backBtn) backBtn.setAttribute('aria-label', t.backToTop || 'Back to Top');
    }

    /* =========================================================
    ニュースティッカー
    ========================================================= */
    const newsItems = [
        '🎤 LUMINA VIBEの新曲「Neon Dreams」が先行配信決定！',
        '⭐ KIRA☆NOVAのスペシャルコラボステージ開催！',
        '🔥 NEON RUSHが過去最大規模のステージセットで登場！',
        '🎵 Reflareの限定グッズが会場で販売開始！',
        '✨ MIDNIGHT echoのサプライズゲスト出演が決定！',
        '🎸 早期購入者限定特典：アーティストサイン会参加権プレゼント！'
    ];
    let currentNewsIndex = 0;

    function showNextNews() {
        const newsTicker = document.getElementById('newsTicker');
        if (!newsTicker) return;
        const item = document.createElement('div');
        item.className = 'news-item';
        item.textContent = newsItems[currentNewsIndex];
        newsTicker.innerHTML = '';
        newsTicker.appendChild(item);
        currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
    }

    /* =========================================================
    カウントダウン
    ========================================================= */
    const startDate = new Date("2025-12-31T18:00:00").getTime();
    const eventDate = new Date("2027-08-10T15:00:00").getTime();

    function formatDHs(ms) {
        const DAY = 86400000, HOUR = 3600000, MINUTE = 60000;
        return {
            days: Math.floor(ms / DAY),
            hours: Math.floor((ms % DAY) / HOUR),
            minutes: Math.floor((ms % HOUR) / MINUTE),
            seconds: Math.floor((ms % MINUTE) / 1000)
        };
    }

    function updateCountdown() {
        const now = Date.now();

        if (now < startDate) {
            const r = formatDHs(startDate - now);
            document.querySelectorAll('.days').forEach(el => el.textContent = r.days);
            document.querySelectorAll('.hours').forEach(el => el.textContent = String(r.hours).padStart(2, '0'));
            document.querySelectorAll('.minutes').forEach(el => el.textContent = String(r.minutes).padStart(2, '0'));
            document.querySelectorAll('.seconds').forEach(el => el.textContent = String(r.seconds).padStart(2, '0'));
            return;
        }

        if (now <= eventDate) {
            const r = formatDHs(eventDate - now);
            document.querySelectorAll('.days').forEach(el => el.textContent = r.days);
            document.querySelectorAll('.hours').forEach(el => el.textContent = String(r.hours).padStart(2, '0'));
            document.querySelectorAll('.minutes').forEach(el => el.textContent = '');
            document.querySelectorAll('.seconds').forEach(el => el.textContent = String(r.seconds).padStart(2, '0'));
            return;
        }

        document.querySelectorAll('.countdown').forEach(el => el.textContent = "イベントは終了しました！");
    }

    /* =========================================================
    FV 背景クロスフェード
    ========================================================= */
    

    /* =========================================================
    スクロールフェードイン
    ========================================================= */
    function initFadeIn() {
        const items = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver(entries => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('visible'), i * 100);
                }
            });
        }, { threshold: 0.1 });

        items.forEach(el => observer.observe(el));
    }

    /* =========================================================
    ヘッダー スクロールエフェクト
    ========================================================= */
    function initHeaderScroll() {
        const header = document.getElementById('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });
    }

    /* =========================================================
    モバイルメニュー
    ========================================================= */
    function initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeMenu = document.getElementById('closeMenu');

        if (!hamburger || !mobileMenu || !closeMenu) return;

        hamburger.addEventListener('click', () => mobileMenu.classList.add('active'));
        closeMenu.addEventListener('click', () => mobileMenu.classList.remove('active'));
    }

    /* =========================================================
    スムーススクロール
    ========================================================= */
    function initSmoothScroll() {
        document.querySelectorAll('[data-scroll]').forEach(el => {
            el.addEventListener('click', e => {
                e.preventDefault();
                const id = el.getAttribute('data-scroll');
                const target = document.querySelector(id);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    /* =========================================================
    ビート音トグル
    ========================================================= */
    function initBeatToggle() {
        const audio = document.getElementById('bgBeat');
        const btn = document.getElementById('beatToggle');
        const icon = document.getElementById('beatIcon');

        if (!audio || !btn || !icon) return;

        let playing = false;

        btn.addEventListener('click', () => {
            if (playing) {
                audio.pause();
                icon.textContent = '🔇';
            } else {
                audio.play().catch(()=>{});
                icon.textContent = '🔊';
            }
            playing = !playing;
        });
    }

    /* =========================================================
    FV キューブ（自動回転, ドラッグ回転, クリックで発光）
    ========================================================= */
    

    /* =========================================================
    トップへ戻るボタン
    ========================================================= */
    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) btn.classList.add('visible');
            else btn.classList.remove('visible');
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =========================================================
    DOM READY
    ========================================================= */
    document.addEventListener('DOMContentLoaded', () => {
        initLanguage();
        showNextNews();
        setInterval(showNextNews, 12000);

        updateCountdown();
        setInterval(updateCountdown, 1000);

        initFadeIn();
        initHeaderScroll();
        initMobileMenu();
        initSmoothScroll();
        initBeatToggle();
        initCube();
        initBackToTop();
    });
