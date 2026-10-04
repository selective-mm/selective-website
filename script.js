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
    id: "capcut-pro-1-month",
    name: "CapCut Pro — 1 Month",
    price: 25000,
    stock: "available",
    description: "Professional video editing tools for creators and editors.",
    symbol: "C",
    features: [
      "Premium editing tools",
      "Advanced effects",
      "Premium templates",
      "Professional creative features",
      "After-sales support"
    ],
    orderUrl: "https://example.com/order"
  },

  // Add future products like this:
  /*
  {
    id: "product-two",
    name: "Your Product",
    price: 30000,
    stock: "limited",
    description: "Short product description.",
    symbol: "P",
    features: ["Feature one", "Feature two"],
    orderUrl: "https://example.com/order"
  }
  */
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
