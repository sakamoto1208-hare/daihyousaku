/* 体験ブース検索*/
    const regionSelect = document.getElementById('region');
        const prefSelect = document.getElementById('pref');

        const prefData = {
            "北海道": ["北海道"],
            "東北": ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
            "関東": ["東京都", "神奈川県", "千葉県", "埼玉県", "茨城県", "栃木県", "群馬県"],
            "中部": ["新潟県", "長野県", "山梨県", "静岡県", "愛知県", "岐阜県", "三重県"],
            "近畿": ["大阪府", "京都府", "兵庫県", "滋賀県", "奈良県", "和歌山県"],
            "中国": ["岡山県", "広島県", "山口県", "鳥取県", "島根県"],
            "四国": ["徳島県", "香川県", "愛媛県", "高知県"],
            "九州・沖縄": ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"]
        };

        regionSelect.addEventListener('change', () => {
            const region = regionSelect.value;
            prefSelect.innerHTML = '';

            if (!region || !prefData[region]) {
            prefSelect.innerHTML = '<option>地域を先に選択してください</option>';
            return;
            }

            prefData[region].forEach(pref => {
            const option = document.createElement('option');
            option.value = pref;
            option.textContent = pref;
            prefSelect.appendChild(option);
            });
        });

/* SNS投稿キャンペーン*/
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
        if(entry.isIntersecting){ entry.target.classList.add('active'); }
        });
    }, {threshold:0.1});
    reveals.forEach(el=>observer.observe(el));
    

// SPナビ制御
    const hamburger = document.querySelector('.hamburger');
    const spNav = document.querySelector('.sp-nav');

    // ハンバーガークリックでSPナビ表示切替とアイコン切替
    const hamburgerIcon = hamburger.querySelector('i');

    // 初期のaria属性
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('aria-expanded', 'false');

    hamburger.addEventListener('click', () => {
        const opened = spNav.classList.toggle('active');
        // Font Awesome のクラスを切り替えて × アイコンを表示
        if (hamburgerIcon) {
            hamburgerIcon.classList.toggle('fa-bars', !opened);
            hamburgerIcon.classList.toggle('fa-xmark', opened);
        }
        // aria-expanded を更新
        hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');
        // ハンバーガー自体にも状態用クラスを付与（必要ならCSSでアニメ可）
        hamburger.classList.toggle('open', opened);
    });


// --- Compare box hover image swap ---
(function(){
    const compareBoxes = document.querySelectorAll('.compare-box');
    compareBoxes.forEach(box => {
        const img = box.querySelector('img');
        if(!img) return;
        const hoverSrc = img.dataset.hoverSrc;
        if(!hoverSrc) return; // no hover image provided

        // store original src
        img.dataset.originalSrc = img.src;
        // ensure box is focusable for keyboard users
        if(!box.hasAttribute('tabindex')) box.setAttribute('tabindex','0');

        const swapToHover = () => { img.src = hoverSrc; };
        const swapToOriginal = () => { img.src = img.dataset.originalSrc || img.src; };

        box.addEventListener('mouseenter', swapToHover);
        box.addEventListener('mouseleave', swapToOriginal);
        box.addEventListener('focus', swapToHover);
        box.addEventListener('blur', swapToOriginal);

        // basic touch support
        let touchActive = false;
        box.addEventListener('touchstart', (e)=>{ touchActive = true; swapToHover(); }, {passive:true});
        box.addEventListener('touchend', ()=>{ if(touchActive){ swapToOriginal(); touchActive=false; } }, {passive:true});
    });
})();
    /* ============================
    店舗検索：複数件表示（PC:3列 / SP:1件＋詳しく見る）
    ============================ */
    (function(){
    const btn = document.getElementById('booth-search-btn');
    const resultsEl = document.getElementById('store-results');
    const regionSelect = document.getElementById('region');
    const prefSelect = document.getElementById('pref');
    if(!btn || !resultsEl) return;

    // ✅ 同じ県で最大3店舗まで表示、それ以上はSP版と同様に詳しく見るで一覧表示
    const MAX_DISPLAY = 3;  
    const STORE_DATA = [
        { region:"北海道", pref:"北海道", name:"MAGICLACE2.0 体験ブース 札幌店（仮）", image:"https://picsum.photos/seed/ml_hokkaido_1/640/360", lat:43.061811, lng:141.354376 },
        { region:"東北", pref:"宮城県", name:"MAGICLACE2.0 体験ブース 仙台店（仮）", image:"https://picsum.photos/seed/ml_miyagi_1/640/360", lat:38.268215, lng:140.869356 },
        { region:"東北", pref:"福島県", name:"MAGICLACE2.0 体験ブース 福島店（仮）", image:"https://picsum.photos/seed/ml_fukushima_1/640/360", lat:37.760833, lng:140.474717 },
        { region:"関東", pref:"東京都", name:"MAGICLACE2.0 体験ブース 渋谷店（仮）", image:"https://picsum.photos/seed/ml_tokyo_1/640/360", lat:35.658034, lng:139.701636 },
        { region:"関東", pref:"東京都", name:"MAGICLACE2.0 体験ブース 新宿店（仮）", image:"https://picsum.photos/seed/ml_tokyo_2/640/360", lat:35.689592, lng:139.700413 },
        { region:"関東", pref:"東京都", name:"MAGICLACE2.0 体験ブース 池袋店（仮）", image:"https://picsum.photos/seed/ml_tokyo_3/640/360", lat:35.729503, lng:139.710900 },
        { region:"関東", pref:"東京都", name:"MAGICLACE2.0 体験ブース 秋葉原店（仮）", image:"https://picsum.photos/seed/ml_tokyo_4/640/360", lat:35.698353, lng:139.773114 },
        { region:"関東", pref:"千葉県",
        name:"国際理工カレッジ 千葉市稲毛区穴川町236-2（テスト表示）",
        image:"https://picsum.photos/seed/kic_chiba/640/360",
        lat:35.636123,
        lng:140.126755 },
        { region:"関東", pref:"千葉県", name:"MAGICLACE2.0 体験ブース 船橋店（仮）", image:"https://picsum.photos/seed/ml_chiba_1/640/360", lat:35.694003, lng:139.982451 },
        { region:"関東", pref:"神奈川県", name:"MAGICLACE2.0 体験ブース 横浜店（仮）", image:"https://picsum.photos/seed/ml_kanagawa_1/640/360", lat:35.443708, lng:139.638026 },
        { region:"中部", pref:"愛知県", name:"MAGICLACE2.0 体験ブース 名古屋店（仮）", image:"https://picsum.photos/seed/ml_aichi_1/640/360", lat:35.170915, lng:136.881537 },
        { region:"中部", pref:"静岡県", name:"MAGICLACE2.0 体験ブース 静岡店（仮）", image:"https://picsum.photos/seed/ml_shizuoka_1/640/360", lat:34.975560, lng:138.382812 },
        { region:"近畿", pref:"大阪府", name:"MAGICLACE2.0 体験ブース 梅田店（仮）", image:"https://picsum.photos/seed/ml_osaka_1/640/360", lat:34.705493, lng:135.498302 },
        { region:"近畿", pref:"大阪府", name:"MAGICLACE2.0 体験ブース 難波店（仮）", image:"https://picsum.photos/seed/ml_osaka_2/640/360", lat:34.665498, lng:135.501215 },
        { region:"近畿", pref:"京都府", name:"MAGICLACE2.0 体験ブース 京都駅前店（仮）", image:"https://picsum.photos/seed/ml_kyoto_1/640/360", lat:34.985849, lng:135.758766 },
        { region:"四国", pref:"愛媛県", name:"MAGICLACE2.0 体験ブース 松山店（仮）", image:"https://picsum.photos/seed/ml_ehime_1/640/360", lat:33.839153, lng:132.765528 },
        { region:"九州・沖縄", pref:"福岡県", name:"MAGICLACE2.0 体験ブース 天神店（仮）", image:"https://picsum.photos/seed/ml_fukuoka_1/640/360", lat:33.590355, lng:130.401716 }
    ];

    const escapeHTML = (s) => String(s)
        .replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
        .replaceAll('"',"&quot;").replaceAll("'","&#39;");

    const isSP = () => window.matchMedia("(max-width: 640px)").matches;

    function cardHTML(store){
        const mapUrl = `https://www.google.com/maps?q=${store.lat},${store.lng}`;
        return `
        <article class="store-card">
            <div class="store-thumb">
            <img src="${store.image}" alt="${escapeHTML(store.name)} の店舗イメージ" loading="lazy">
            </div>
            <div class="store-body">
            <h3 class="store-name">${escapeHTML(store.name)}</h3>
            <div class="store-meta">
                <div>地域：${escapeHTML(store.region)} / ${escapeHTML(store.pref)}</div>
                <div>位置：lat ${store.lat} / lng ${store.lng}</div>
                <div>URL：<a href="${mapUrl}" target="_blank" rel="noopener">Googleマップで開く</a></div>
            </div>
            <div class="store-actions">
                <a class="btn btn-outline" href="${mapUrl}" target="_blank" rel="noopener">
                <i class="fa-solid fa-location-dot"></i> 地図で見る
                </a>
            </div>
            </div>
        </article>
        `;
    }

    function renderPC(stores){
        resultsEl.innerHTML = `<div class="store-grid">${stores.map(cardHTML).join("")}</div>`;
    }

    function renderSP(stores){
        const first = stores[0];
        const rest = stores.slice(1);

        const listHtml = rest.map(s => {
        const mapUrl = `https://www.google.com/maps?q=${s.lat},${s.lng}`;
        return `<a href="${mapUrl}" target="_blank" rel="noopener">
            ${escapeHTML(s.name)}
            <small>${escapeHTML(s.pref)} / lat ${s.lat} / lng ${s.lng}</small>
        </a>`;
        }).join("");

        resultsEl.innerHTML = `
        <div class="store-grid">${cardHTML(first)}</div>
        ${rest.length ? `
            <div class="store-more">
            <button class="btn btn-outline" type="button" id="store-more-btn">
                詳しく見る（${rest.length}件）
            </button>
            <div class="store-list" id="store-list" style="display:none;">
                ${listHtml}
            </div>
            </div>
        ` : ``}
        `;

        const moreBtn = document.getElementById("store-more-btn");
        const listEl = document.getElementById("store-list");
        if(moreBtn && listEl){
        moreBtn.addEventListener("click", () => {
            const isOpen = listEl.style.display === "block";
            listEl.style.display = isOpen ? "none" : "block";
            moreBtn.textContent = isOpen ? `詳しく見る（${rest.length}件）` : "閉じる";
        });
        }
    }

    function render(stores){
        if(!stores.length){
        resultsEl.innerHTML = `<p style="color:#bbb; text-align:center; margin: 10px 0 0;">該当する店舗がありません</p>`;
        return;
        }
        if(isSP()) renderSP(stores);
        else renderPC(stores);
    }

    function filterStores(){
        const region = regionSelect ? regionSelect.value : "";
        const pref = prefSelect ? prefSelect.value : "";
        
        // 地域と都道府県が両方未選択の場合は空配列を返す
        if(!region && !pref) return [];
        
        return STORE_DATA.filter(s => {
        if(pref) return s.pref === pref;
        if(region) return s.region === region;
        return true;
        });
    }

    function openResults(){
        resultsEl.classList.add("is-open");
    }

    btn.addEventListener("click", () => {
        const stores = filterStores();
        render(stores);
        openResults();
        resultsEl.scrollIntoView({ behavior:"smooth", block:"start" });
    });

    // ✅ 画面回転・リサイズでPC/SP表示を作り直す（結果が出てる時だけ）
    window.addEventListener("resize", () => {
        if(!resultsEl.classList.contains("is-open")) return;
        const stores = filterStores();
        render(stores);
    });
    })();
