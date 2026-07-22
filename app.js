// ==========================================
// SmartlyEarn Blog - Core Dynamic Application Logic
// ==========================================

let articlesDatabase = {};
let rawPostsArray = [];

// Fetch posts dynamically from posts/posts.json
async function loadDynamicPosts() {
    try {
        const response = await fetch("posts/posts.json?v=" + Date.now());
        if (response.ok) {
            const posts = await response.json();
            if (Array.isArray(posts) && posts.length > 0) {
                // Ensure latest posts are placed at the very top (sorted by date or ID index)
                rawPostsArray = [...posts].sort((a, b) => {
                    const dateA = new Date(a.date || '2026-07-20');
                    const dateB = new Date(b.date || '2026-07-20');
                    return dateB - dateA;
                });

                articlesDatabase = {};
                rawPostsArray.forEach(post => {
                    articlesDatabase[post.id] = post;
                });

                renderDashboardFeed(rawPostsArray);
                initCategoryFilter();
                router(); // Re-trigger router state update
            }
        }
    } catch (e) {
        console.log("Error loading dynamic posts:", e);
    }
}

// Dynamically Render Dashboard Feed Grid (Latest Post First)
function renderDashboardFeed(posts) {
    const gridContainer = document.querySelector(".dashboard-feed-grid");
    if (!gridContainer) return;

    let html = "";
    
    posts.forEach((post, index) => {
        const imageStyle = post.image.startsWith("linear-gradient") || post.image.startsWith("hsl") || post.image.startsWith("rgb")
            ? `<div class="card-placeholder-gradient" style="background: ${post.image};"><span>⚡</span></div>`
            : `<img src="${post.image}" alt="${post.title}">`;

        // Highlight latest post badge on homepage
        const latestBadge = index === 0 ? '<span class="latest-post-tag">🔥 LATEST ARTICLE</span>' : '';

        html += `
            <article class="feed-card ${index === 0 ? 'hero-feed-card' : ''}" data-category="${post.category}">
                <div class="card-image-wrap" onclick="openArticle('${post.id}')" style="cursor: pointer;">
                    ${imageStyle}
                    <div class="card-badge">${post.category}</div>
                    ${latestBadge}
                </div>
                <div class="card-body">
                    <h3><a href="#${post.id}" onclick="event.preventDefault(); openArticle('${post.id}');">${post.title}</a></h3>
                    <p>${post.excerpt}</p>
                    <div class="card-footer">
                        <a href="#${post.id}" onclick="event.preventDefault(); openArticle('${post.id}');" class="read-link">Read Guide &rarr;</a>
                        <span class="read-time">${post.readTime || '15 min read'}</span>
                    </div>
                </div>
            </article>
        `;

        if (index === 0) {
            html += `
                <div class="feed-ad-card">
                    <span class="ad-tag-badge">SPONSORED</span>
                    <div class="ad-card-banner" style="background-image: url('assets/ad_native.png');"></div>
                    <div class="ad-card-body">
                        <h4>Start Your Business with $100: 5 Steps to Earn $5,000/Month</h4>
                        <p class="ad-source-domain">FinGrow.com</p>
                        <a href="#" onclick="triggerAdClick(event, 'In-Feed Native Card 1')" class="ad-card-cta">Get Free Guide</a>
                    </div>
                </div>
            `;
        } else if (index === 2) {
            html += `
                <div class="feed-ad-card text-ad">
                    <span class="ad-tag-badge">SPONSORED DEALS</span>
                    <div class="ad-text-card-content">
                        <span>🪙</span>
                        <h4>This Under-The-Radar Crypto Coin is Slated to Grow 1,000% in 2026!</h4>
                        <p>Financial institutions are quietly accumulating this utility asset.</p>
                        <a href="#" onclick="triggerAdClick(event, 'In-Feed Native Crypto Card')" class="ad-text-cta">Reveal Ticker Symbol</a>
                    </div>
                </div>
            `;
        }
    });

    html += `
        <div class="feed-trending-card">
            <h3>Trending Analytics</h3>
            <ul class="trending-dashboard-list">
                <li>
                    <span class="trend-rank">01</span>
                    <div>
                        <a href="#how-to-create-a-10000-emergency-fund" onclick="event.preventDefault(); openArticle('how-to-create-a-10000-emergency-fund');">$10k Emergency Fund T-Bill Blueprint</a>
                        <span class="trend-views">12.4k readers this week</span>
                    </div>
                </li>
                <li>
                    <span class="trend-rank">02</span>
                    <div>
                        <a href="#credit-card" onclick="event.preventDefault(); openArticle('credit-card');">Credit card point transfer arbitrage</a>
                        <span class="trend-views">9.8k readers this week</span>
                    </div>
                </li>
                <li>
                    <span class="trend-rank">03</span>
                    <div>
                        <a href="#70-20-10-wealth-accumulation-rule" onclick="event.preventDefault(); openArticle('70-20-10-wealth-accumulation-rule');">70/20/10 Wealth automation rule</a>
                        <span class="trend-views">7.1k readers this week</span>
                    </div>
                </li>
            </ul>
        </div>
    `;

    gridContainer.innerHTML = html;
}

// Open Article Handler (Fail-proof with Dynamic Layout Patterning)
function openArticle(id) {
    if (!id) return;
    
    const homeView = document.getElementById("home-view");
    const articleView = document.getElementById("article-view");
    
    if (!homeView || !articleView) return;

    window.location.hash = '#' + id;
    
    let post = articlesDatabase[id];
    
    if (!post && Array.isArray(rawPostsArray)) {
        post = rawPostsArray.find(p => p.id === id || p.id.includes(id) || id.includes(p.id));
    }
    
    if (!post) {
        post = articlesDatabase["how-to-create-a-10000-emergency-fund"] || Object.values(articlesDatabase)[0];
    }
    
    if (post) {
        homeView.classList.remove("active");
        articleView.classList.add("active");
        
        document.getElementById("article-category").textContent = post.category || "Financial Masterclass";
        document.getElementById("article-title").textContent = post.title || "Financial Guide";
        document.getElementById("article-read-time").textContent = post.readTime || "20 min read";

        // Assign dynamic layout style pattern class to container
        const postIndex = rawPostsArray.findIndex(p => p.id === post.id);
        const layoutPatternClass = `layout-pattern-${(postIndex % 4) + 1}`;
        articleView.className = `view-section active ${layoutPatternClass}`;

        document.getElementById("article-content").innerHTML = post.contentPart1 || "";
        document.getElementById("article-content-part2").innerHTML = post.contentPart2 || "";
        
        document.title = `${post.title} | SmartlyEarn`;

        // Active navigation indicator update
        setNavActive(id);

        // Initialize embedded calculators if matching post
        if (id.includes("saving") || id.includes("50/30/20")) {
            calculateBudget();
        } else if (id.includes("micro") || id.includes("investing")) {
            calculateGrowth();
        } else if (id.includes("credit") || id.includes("reward")) {
            calculateRewards();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Navigation Active state helper
function setNavActive(target) {
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    sidebarLinks.forEach(link => {
        if (link.getAttribute("data-target") === target) link.classList.add("active");
        else link.classList.remove("active");
    });
    mobileLinks.forEach(link => {
        if (link.getAttribute("data-target") === target) link.classList.add("active");
        else link.classList.remove("active");
    });
}

// JavaScript Router Implementation
function router() {
    const hash = window.location.hash.substring(1);
    
    const homeView = document.getElementById("home-view");
    const articleView = document.getElementById("article-view");
    
    if (!homeView || !articleView) return;

    if (hash === "" || hash === "home") {
        homeView.classList.add("active");
        articleView.classList.remove("active");
        
        setNavActive("home");
        document.title = "SmartlyEarn | Fintech Dashboard & Finance Masterclasses";
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        openArticle(hash);
    }
}

// Ad Click Tracking Handler
function triggerAdClick(e, adName) {
    e.preventDefault();
    showAdNotification(adName);
}

let toastTimeout = null;
function showAdNotification(adName) {
    const toast = document.getElementById("ad-notification-toast");
    const titleEl = document.getElementById("toast-ad-title");
    const targetUrl = "https://smartlyearn.vercel.app/";

    if (titleEl) titleEl.textContent = adName || "Partner Offer";
    if (toast) {
        toast.classList.add("active");
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove("active");
        }, 4000);
    }

    if (targetUrl && targetUrl !== "#") {
        window.open(targetUrl, "_blank");
    }
}

function closeToast() {
    document.getElementById("ad-notification-toast").classList.remove("active");
}

// Interactive Calculator Functions
function calculateBudget() {
    const incomeInput = document.getElementById("monthly-income");
    if (!incomeInput) return;
    const income = parseFloat(incomeInput.value) || 0;

    const needs = income * 0.5;
    const wants = income * 0.3;
    const savings = income * 0.2;

    const symbol = "$";

    document.getElementById("res-needs").textContent = `${symbol}${needs.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})}`;
    document.getElementById("res-wants").textContent = `${symbol}${wants.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})}`;
    document.getElementById("res-savings").textContent = `${symbol}${savings.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})}`;
}

function calculateGrowth() {
    const weeklyInput = document.getElementById("weekly-amount");
    if (!weeklyInput) return;
    const weeklyAmount = parseFloat(weeklyInput.value) || 0;
    const annualRate = parseFloat(document.getElementById("interest-rate").value) || 0;
    const years = parseFloat(document.getElementById("invest-years").value) || 0;

    const totalWeeks = years * 52;
    const principal = weeklyAmount * totalWeeks;

    const r = (annualRate / 100) / 52;
    let total = 0;

    if (r > 0) {
        total = weeklyAmount * (((Math.pow(1 + r, totalWeeks) - 1) / r) * (1 + r));
    } else {
        total = principal;
    }

    const interest = total - principal;
    const symbol = "$";

    document.getElementById("res-principal").textContent = `${symbol}${Math.round(principal).toLocaleString()}`;
    document.getElementById("res-interest").textContent = `${symbol}${Math.round(interest).toLocaleString()}`;
    document.getElementById("res-total").textContent = `${symbol}${Math.round(total).toLocaleString()}`;
}

function calculateRewards() {
    const groceryInput = document.getElementById("grocery-spend");
    if (!groceryInput) return;
    const grocery = parseFloat(groceryInput.value) || 0;
    const dining = parseFloat(document.getElementById("dining-spend").value) || 0;
    const other = parseFloat(document.getElementById("other-spend").value) || 0;

    const groceryPoints = grocery * 3;
    const diningPoints = dining * 2;
    const otherPoints = other * 1;

    const monthlyPoints = groceryPoints + diningPoints + otherPoints;
    const yearlyPoints = Math.round(monthlyPoints * 12);

    const cashVal = Math.round(yearlyPoints * 0.01);
    const airMiles = Math.round(yearlyPoints * 0.8);

    const symbol = "$";

    document.getElementById("res-total-points").textContent = `${yearlyPoints.toLocaleString()} Points`;
    document.getElementById("res-cash-val").textContent = `${symbol}${cashVal.toLocaleString()}`;
    document.getElementById("res-air-miles").textContent = `${airMiles.toLocaleString()} Miles`;
}

// Category Filtering Action
function initCategoryFilter() {
    const tabs = document.querySelectorAll(".filter-tab");
    const cards = document.querySelectorAll(".feed-card");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const filter = tab.getAttribute("data-filter");

            cards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

// Theme Switcher Action
function updateThemeButton(theme) {
    const btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;
    const icon = btn.querySelector(".toggle-icon");
    const text = btn.querySelector(".toggle-text");
    if (theme === "dark-theme") {
        if (icon) icon.textContent = "☀️";
        if (text) text.textContent = "Light Mode";
    } else {
        if (icon) icon.textContent = "🌙";
        if (text) text.textContent = "Dark Mode";
    }
}

function initThemeSwitcher() {
    const btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;
    const body = document.body;

    const savedTheme = localStorage.getItem("dashboard-theme") || "light-theme";
    body.className = savedTheme;
    updateThemeButton(savedTheme);
    
    btn.addEventListener("click", () => {
        if (body.classList.contains("dark-theme")) {
            body.className = "light-theme";
            localStorage.setItem("dashboard-theme", "light-theme");
            updateThemeButton("light-theme");
        } else {
            body.className = "dark-theme";
            localStorage.setItem("dashboard-theme", "dark-theme");
            updateThemeButton("dark-theme");
        }
    });
}

function initSocialAdClose() {
    const closeBtn = document.getElementById("close-social-ad");
    if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const adBar = document.getElementById("sticky-social-ad-bar");
            if (adBar) {
                adBar.classList.remove("active");
                adBar.style.display = "none";
            }
        });
    }
}

function initNavigation() {
    const backBtn = document.getElementById("back-to-feed-btn");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.hash = "#home";
        });
    }
}

// Global Event Listeners & Bootstrapping
window.addEventListener("hashchange", router);

document.addEventListener("DOMContentLoaded", () => {
    loadDynamicPosts();
    initThemeSwitcher();
    initSocialAdClose();
    initNavigation();
});


