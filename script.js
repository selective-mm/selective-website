/*
  SELECTIVE V1
  -------------------------
  This is a static V1 website.
  Edit PRODUCTS below to change product information.

  IMPORTANT:
  - price is in MMK
  - stock: "available", "limited", or "out_of_stock"
  - orderUrl is the external ordering platform link
*/

const PRODUCTS = [
  {
    id: "CapCut-1-month-Full-warranty",
    name: "CapCut — 1 Month",
    price: 20000,
    stock: "available",
    description: "Professional video editing tools for creators and editors.",
    icon: "https://cdn.simpleicons.org/capcut",
    features: [
      "1 Month Access",
      "Premium editing tools",
      "Premium templates",
      "After-sales support"
    ],
    orderUrl: "YOUR_ORDER_LINK"
  },
  {
    id: "chatgpt-1-month-warranty",
    name: "ChatGPT — 1 Month",
    price: 75000,
    stock: "available",
    description: "AI-powered productivity, research, writing and creative assistance.",
    icon: "https://cdn.simpleicons.org/openai",
    features: [
      "1 Month Access",
      "25 Days Warranty",
      "Premium AI features",
      "Advanced productivity tools",
      "After-sales support"
    ],
    orderUrl: "YOUR_ORDER_LINK"
  },

  {
    id: "chatgpt-1-month-no-warranty",
    name: "ChatGPT — 1 Month",
    price: 55000,
    stock: "available",
    description: "AI-powered productivity, research, writing and creative assistance.",
    icon: "https://cdn.simpleicons.org/openai",
    features: [
      "1 Month Access",
      "No Warranty",
      "Premium AI features",
      "Advanced productivity tools"
    ],
    orderUrl: "YOUR_ORDER_LINK"
  },

  {
    id: "spotify-3-months",
    name: "Spotify — 3 Months",
    price: 45000,
    stock: "available",
    description: "Premium music streaming with an enhanced listening experience.",
    icon: "https://cdn.simpleicons.org/spotify",
    features: [
      "3 Months Access",
      "Premium music experience",
      "Ad-free listening",
      "Enhanced listening features"
    ],
    orderUrl: "YOUR_ORDER_LINK"
  },

  {
    id: "spotify-6-months",
    name: "Spotify — 6 Months",
    price: 90000,
    stock: "available",
    description: "Premium music streaming with an enhanced listening experience.",
    icon: "https://cdn.simpleicons.org/spotify",
    features: [
      "6 Months Access",
      "Premium music experience",
      "Ad-free listening",
      "Enhanced listening features"
    ],
    orderUrl: "YOUR_ORDER_LINK"
  },

  {
    id: "prime-video-1-month",
    name: "Prime Video — 1 Month",
    price: 15000,
    stock: "available",
    description: "Enjoy movies, series and premium entertainment content.",
    icon: "https://cdn.simpleicons.org/primevideo",
    features: [
      "1 Month Access",
      "30 Days Warranty",
      "Premium entertainment",
      "Movies and series"
    ],
    orderUrl: "YOUR_ORDER_LINK"
  },

  {
    id: "gemini-pro-18-months",
    name: "Gemini Pro — 18 Months",
    price: 50000,
    stock: "available",
    description: "Advanced AI assistance for research, productivity and creative work.",
    icon: "https://cdn.simpleicons.org/googlegemini",
    features: [
      "18 Months Access",
      "No Warranty",
      "Advanced AI features",
      "Research and productivity tools"
    ],
    orderUrl: "YOUR_ORDER_LINK"
  },

  {
    id: "alight-motion-6-months",
    name: "Alight Motion — 6 Months",
    price: 15000,
    stock: "available",
    description: "Professional motion graphics, effects and mobile video editing.",
    icon: "https://cdn.simpleicons.org/alightmotion",
    features: [
      "6 Months Access",
      "No Warranty",
      "Premium editing features",
      "Motion graphics tools",
      "Advanced effects"
    ],
    orderUrl: "YOUR_ORDER_LINK"
  },

  {
    id: "hma-vpn-1-month",
    name: "HMA VPN — 1 Month",
    price: 13000,
    stock: "available",
    description: "VPN service for private and secure internet access.",
    icon: "https://cdn.simpleicons.org/hidemyass",
    features: [
      "1 Month Access",
      "Secure internet access",
      "Privacy features",
      "VPN protection"
    ],
    orderUrl: "YOUR_ORDER_LINK"
  },

  {
    id: "nord-vpn-3-months",
    name: "Nord VPN — 3 Months",
    price: 45000,
    stock: "available",
    description: "Fast and secure VPN access for privacy and everyday browsing.",
    icon: "https://cdn.simpleicons.org/nordvpn",
    features: [
      "3 Months Access",
      "Secure browsing",
      "Privacy features",
      "VPN protection"
    ],
    orderUrl: "YOUR_ORDER_LINK"
  }
];

const money = (amount) => new Intl.NumberFormat("en-US").format(amount);

function stockInfo(stock) {
  const map = {
    available: { label: "AVAILABLE", className: "" },
    limited: { label: "LIMITED", className: "limited" },
    out_of_stock: { label: "OUT OF STOCK", className: "out" }
  };
  return map[stock] || map.available;
}

function renderProducts() {
  const grid = document.getElementById("productGrid");

  if (!PRODUCTS.length) {
    grid.innerHTML = `<div class="empty-state">လက်ရှိ Product မရှိသေးပါ။</div>`;
    return;
  }

  grid.innerHTML = PRODUCTS.map((product) => {
    const status = stockInfo(product.stock);
    const disabled = product.stock === "out_of_stock";

    return `
      <article class="product-card">
        <div class="product-image">
          <div class="symbol">${escapeHtml(product.symbol || "S")}</div>
        </div>
        <div class="product-info">
          <div class="product-top">
            <h3 class="product-name">${escapeHtml(product.name)}</h3>
            <span class="status-badge ${status.className}">${status.label}</span>
          </div>
          <p class="product-description">${escapeHtml(product.description)}</p>
          <div class="product-bottom">
            <div class="price">${money(product.price)} <small>MMK</small></div>
            <button class="view-btn" data-product="${escapeHtml(product.id)}">View Details</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  grid.querySelectorAll(".view-btn").forEach((button) => {
    button.addEventListener("click", () => openProduct(button.dataset.product));
  });
}

function openProduct(id) {
  const product = PRODUCTS.find((item) => item.id === id);
  if (!product) return;

  const status = stockInfo(product.stock);
  const modal = document.getElementById("productModal");
  const modalImage = document.getElementById("modalImage");
  const modalStatus = document.getElementById("modalStatus");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const modalDescription = document.getElementById("modalDescription");
  const modalFeatures = document.getElementById("modalFeatures");
  const modalOrder = document.getElementById("modalOrder");

  modalImage.innerHTML = `<div class="symbol">${escapeHtml(product.symbol || "S")}</div>`;
  modalStatus.textContent = status.label;
  modalStatus.className = `status-badge ${status.className}`;
  modalTitle.textContent = product.name;
  modalPrice.innerHTML = `${money(product.price)} <small>MMK</small>`;
  modalDescription.textContent = product.description;

  modalFeatures.innerHTML = (product.features || [])
    .map((feature) => `<div>${escapeHtml(feature)}</div>`)
    .join("");

  if (product.stock === "out_of_stock") {
    modalOrder.textContent = "Currently Unavailable";
    modalOrder.removeAttribute("href");
    modalOrder.style.pointerEvents = "none";
    modalOrder.style.opacity = ".45";
  } else {
    modalOrder.innerHTML = `Order Now <span>↗</span>`;
    modalOrder.href = product.orderUrl;
    modalOrder.style.pointerEvents = "auto";
    modalOrder.style.opacity = "1";
  }

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProduct() {
  const modal = document.getElementById("productModal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  document.getElementById("year").textContent = new Date().getFullYear();

  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");

  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.getElementById("modalClose").addEventListener("click", closeProduct);
  document.getElementById("modalBackdrop").addEventListener("click", closeProduct);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProduct();
  });
});
