const state = {
  sneakers: [],
  watchlist: JSON.parse(localStorage.getItem("sole-signal-watchlist") || "[]"),
  filters: {
    search: "",
    brand: "all",
    category: "all",
    sort: "release-soon",
  },
};

const sneakerImages = {
  "aj1-retro-high":
    {
      url: "https://static.nike.com/a/images/t_web_pdp_1728_v1/f_auto,q_auto:eco/351717ed-b77d-43cb-9f86-7f1f4f12899c/AIR+JORDAN+1+RETRO+HIGH+OG.png",
      position: "center 56%",
      scale: 1.18,
    },
  "dunk-low-shift":
    {
      url: "https://static.nike.com/a/images/t_web_pdp_1728_v1/f_auto,q_auto:eco/2f7d3402-1cb5-4c8a-b5f6-d4524a0b1942/W+NIKE+DUNK+LOW.png",
      position: "center 58%",
      scale: 1.18,
    },
  "993-core-shadow":
    {
      url: "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/101/555/281/original/750128_01.jpg.jpeg?action=crop&width=1200",
      position: "center center",
      scale: 1.14,
    },
  "gel-kayano-kulture":
    {
      url: "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/077/593/855/original/929504_01.jpg.jpeg?action=crop&width=1200",
      position: "center center",
      scale: 1.14,
    },
  "campus-00s-fade":
    {
      url: "https://assets.adidas.com/images/w_1200,f_auto,q_auto/5f45a7c1bb984c40bfc0c8e744d8861b_9366/campus-00s-shoes.jpg",
      position: "center center",
      scale: 1.16,
    },
  "vomero-vision":
    {
      url: "https://static.nike.com/a/images/t_web_pdp_1728_v1/f_auto,q_auto:eco/22c14844-e899-45ab-bca0-003511ea55f2/NIKE+ZOOM+VOMERO+5.png",
      position: "center 58%",
      scale: 1.18,
    },
  "samba-luxe":
    {
      url: "https://assets.adidas.com/images/w_1200,f_auto,q_auto/9b983d5bc09a4d4aba39a8bf011869ba_9366/Samba_OG_Shoes_White_B75806_00_plp_standard.jpg",
      position: "center center",
      scale: 1.16,
    },
  "1906r-future-grid":
    {
      url: "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/111/147/664/original/1621624_01.jpg.jpeg?action=crop&width=1200",
      position: "center center",
      scale: 1.14,
    },
};

const fallbackSneakers = [
  {
    id: "aj1-retro-high",
    name: "Air Jordan 1 Retro High",
    brand: "Jordan",
    category: "Basketball",
    colorway: "Sail / Crimson / Black",
    releaseDate: "2026-04-18",
    retailPrice: 190,
    resellPrice: 340,
    hypeScore: 94,
    palette: ["#f7b093", "#2b2b2b"],
  },
  {
    id: "dunk-low-shift",
    name: "Dunk Low Shift",
    brand: "Nike",
    category: "Lifestyle",
    colorway: "Ivory / Volt / Smoke",
    releaseDate: "2026-04-12",
    retailPrice: 125,
    resellPrice: 205,
    hypeScore: 83,
    palette: ["#edf7a6", "#b9d8df"],
  },
  {
    id: "993-core-shadow",
    name: "993 Core Shadow",
    brand: "New Balance",
    category: "Runner",
    colorway: "Grey / Silver / White",
    releaseDate: "2026-05-02",
    retailPrice: 210,
    resellPrice: 265,
    hypeScore: 78,
    palette: ["#d6d4cf", "#8fa0aa"],
  },
  {
    id: "gel-kayano-kulture",
    name: "Gel-Kayano Kulture",
    brand: "ASICS",
    category: "Runner",
    colorway: "Sand / Aqua / Navy",
    releaseDate: "2026-04-27",
    retailPrice: 180,
    resellPrice: 244,
    hypeScore: 80,
    palette: ["#d4c3af", "#8ad6e1"],
  },
  {
    id: "campus-00s-fade",
    name: "Campus 00s Fade",
    brand: "Adidas",
    category: "Skate",
    colorway: "Almond / Gum / Olive",
    releaseDate: "2026-04-09",
    retailPrice: 110,
    resellPrice: 170,
    hypeScore: 74,
    palette: ["#e6dcc7", "#9aa57d"],
  },
  {
    id: "vomero-vision",
    name: "Vomero Vision",
    brand: "Nike",
    category: "Runner",
    colorway: "Silver / Blue Tint / Peach",
    releaseDate: "2026-05-11",
    retailPrice: 160,
    resellPrice: 238,
    hypeScore: 86,
    palette: ["#c8d1dd", "#f3bf9f"],
  },
  {
    id: "samba-luxe",
    name: "Samba Luxe Studio",
    brand: "Adidas",
    category: "Lifestyle",
    colorway: "Cream / Espresso / Gum",
    releaseDate: "2026-04-21",
    retailPrice: 135,
    resellPrice: 198,
    hypeScore: 76,
    palette: ["#f1e4cf", "#4c362d"],
  },
  {
    id: "1906r-future-grid",
    name: "1906R Future Grid",
    brand: "New Balance",
    category: "Runner",
    colorway: "Ice Grey / Lime / Slate",
    releaseDate: "2026-04-30",
    retailPrice: 170,
    resellPrice: 252,
    hypeScore: 88,
    palette: ["#d8dbe0", "#cbff66"],
  },
];

function hydrateSneakers(sneakers) {
  return sneakers.map((item) => ({
    ...item,
    imageUrl: sneakerImages[item.id]?.url || "",
    imagePosition: sneakerImages[item.id]?.position || "center center",
    imageScale: sneakerImages[item.id]?.scale || 1.1,
  }));
}

const productGrid = document.querySelector("#productGrid");
const brandFilter = document.querySelector("#brandFilter");
const categoryFilter = document.querySelector("#categoryFilter");
const sortSelect = document.querySelector("#sortSelect");
const searchInput = document.querySelector("#searchInput");
const resultsLabel = document.querySelector("#resultsLabel");
const statsGrid = document.querySelector("#statsGrid");
const featuredPanel = document.querySelector("#featuredPanel");
const watchlistElement = document.querySelector("#watchlist");
const liveDate = document.querySelector("#liveDate");
const surpriseMeBtn = document.querySelector("#surpriseMeBtn");
const trendCard = document.querySelector("#trendCard");
const template = document.querySelector("#productCardTemplate");

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const prettyDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

async function loadSneakers() {
  try {
    const response = await fetch("./data/sneakers.json");

    if (!response.ok) {
      throw new Error(`Dataset request failed with status ${response.status}`);
    }

    const sneakers = hydrateSneakers(await response.json());
    state.sneakers = sneakers;

    populateFilters(sneakers);
    render();
  } catch (error) {
    console.warn("Falling back to bundled sneaker data:", error.message);
    state.sneakers = hydrateSneakers(fallbackSneakers);
    populateFilters(state.sneakers);
    render();
    resultsLabel.textContent = "Using bundled demo data because fetch could not complete";
  }
}

function populateFilters(sneakers) {
  const brands = [...new Set(sneakers.map((item) => item.brand))].sort();
  const categories = [...new Set(sneakers.map((item) => item.category))].sort();

  brands.forEach((brand) => {
    brandFilter.insertAdjacentHTML("beforeend", `<option value="${brand}">${brand}</option>`);
  });

  categories.forEach((category) => {
    categoryFilter.insertAdjacentHTML(
      "beforeend",
      `<option value="${category}">${category}</option>`
    );
  });
}

function getFilteredSneakers() {
  const searchTerm = state.filters.search.trim().toLowerCase();

  return state.sneakers
    .filter((item) => {
      const matchesSearch =
        !searchTerm ||
        [item.name, item.brand, item.colorway, item.category]
          .some((value) => value.toLowerCase().includes(searchTerm));
      const matchesBrand =
        state.filters.brand === "all" || item.brand === state.filters.brand;
      const matchesCategory =
        state.filters.category === "all" || item.category === state.filters.category;

      return matchesSearch && matchesBrand && matchesCategory;
    })
    .sort((first, second) => {
      switch (state.filters.sort) {
        case "resell-high":
          return second.resellPrice - first.resellPrice;
        case "retail-low":
          return first.retailPrice - second.retailPrice;
        case "hype-high":
          return second.hypeScore - first.hypeScore;
        case "release-soon":
        default:
          return new Date(first.releaseDate) - new Date(second.releaseDate);
      }
    });
}

function render() {
  const filtered = getFilteredSneakers();

  renderStats();
  renderFeatured(filtered);
  renderTrend(filtered);
  renderGrid(filtered);
  renderWatchlist();
}

function renderStats() {
  const totals = state.sneakers.reduce(
    (accumulator, sneaker) => {
      accumulator.count += 1;
      accumulator.resellTotal += sneaker.resellPrice;
      accumulator.brandCount[sneaker.brand] = (accumulator.brandCount[sneaker.brand] || 0) + 1;
      return accumulator;
    },
    { count: 0, resellTotal: 0, brandCount: {} }
  );

  const topBrand = Object.entries(totals.brandCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "--";
  const averageResell = totals.count ? currency.format(totals.resellTotal / totals.count) : "--";

  statsGrid.innerHTML = `
    <article class="stat-card">
      <span class="stat-card__label">Pairs tracked</span>
      <strong>${totals.count}</strong>
    </article>
    <article class="stat-card">
      <span class="stat-card__label">Average resale</span>
      <strong>${averageResell}</strong>
    </article>
    <article class="stat-card">
      <span class="stat-card__label">Top brand</span>
      <strong>${topBrand}</strong>
    </article>
    <article class="stat-card">
      <span class="stat-card__label">Watchlist</span>
      <strong>${state.watchlist.length}</strong>
    </article>
  `;
}

function renderFeatured(filtered) {
  const featuredItem = [...filtered].sort((a, b) => b.hypeScore - a.hypeScore)[0] || state.sneakers[0];

  if (!featuredItem) {
    return;
  }

  featuredPanel.innerHTML = `
    <p class="panel-label">Featured heat</p>
    <div
      class="featured-card__visual"
      style="background:
        radial-gradient(circle at 25% 20%, ${featuredItem.palette[0]}, transparent 28%),
        radial-gradient(circle at 78% 30%, ${featuredItem.palette[1]}, transparent 22%),
        linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.02)),
        #1d1d1d;"
    >
      <img
        class="featured-card__image"
        src="${featuredItem.imageUrl}"
        alt="${featuredItem.name}"
        style="--featured-image-position:${featuredItem.imagePosition};--featured-image-scale:${featuredItem.imageScale};"
      />
    </div>
    <div class="featured-card__body">
      <p class="featured-card__name">${featuredItem.name}</p>
      <p class="featured-card__meta">
        ${featuredItem.brand} • ${featuredItem.colorway} • Releases ${prettyDate.format(new Date(featuredItem.releaseDate))}
      </p>
    </div>
  `;
}

function renderTrend(filtered) {
  const bestDeal = [...state.sneakers]
    .sort((a, b) => a.resellPrice - a.retailPrice - (b.resellPrice - b.retailPrice))[0];
  const hottest = [...filtered].sort((a, b) => b.hypeScore - a.hypeScore)[0];

  trendCard.innerHTML = `
    <p class="panel-label">Trend note</p>
    <h3>${hottest ? `${hottest.brand} is leading the vibe shift.` : "No pairs match right now."}</h3>
    <p>
      ${hottest ? `${hottest.name} carries a hype score of ${hottest.hypeScore}/100 with resale at ${currency.format(hottest.resellPrice)}.` : "Try widening the filters to surface more pairs."}
      ${bestDeal ? `Best entry value in the full dataset: ${bestDeal.name} at just ${currency.format(bestDeal.resellPrice - bestDeal.retailPrice)} over retail.` : ""}
    </p>
  `;
}

function renderGrid(filtered) {
  resultsLabel.textContent = `${filtered.length} styles in the current view`;

  if (!filtered.length) {
    productGrid.innerHTML = `
      <article class="insight-card">
        <p class="panel-label">No match</p>
        <h3>No pairs found.</h3>
        <p>Adjust the search, brand, or category filters to widen the drop radar.</p>
      </article>
    `;
    return;
  }

  productGrid.innerHTML = "";

  filtered.forEach((item) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".product-card");
    const badge = fragment.querySelector(".product-card__badge");
    const brand = fragment.querySelector(".product-card__brand");
    const release = fragment.querySelector(".product-card__release");
    const name = fragment.querySelector(".product-card__name");
    const color = fragment.querySelector(".product-card__color");
    const retail = fragment.querySelector(".product-card__retail");
    const resell = fragment.querySelector(".product-card__resell");
    const hype = fragment.querySelector(".product-card__hype");
    const image = fragment.querySelector(".product-card__image");
    const saveButton = fragment.querySelector(".save-button");

    card.style.setProperty("--card-start", item.palette[0]);
    card.style.setProperty("--card-end", item.palette[1]);
    card.style.setProperty("--image-position", item.imagePosition);
    card.style.setProperty("--image-scale", item.imageScale);
    badge.textContent = item.category;
    brand.textContent = item.brand;
    release.textContent = prettyDate.format(new Date(item.releaseDate));
    name.textContent = item.name;
    color.textContent = item.colorway;
    retail.textContent = currency.format(item.retailPrice);
    resell.textContent = currency.format(item.resellPrice);
    hype.textContent = `Hype ${item.hypeScore}/100`;
    image.src = item.imageUrl;
    image.alt = item.name;
    saveButton.textContent = state.watchlist.includes(item.id) ? "Saved" : "Save";
    saveButton.classList.toggle("is-saved", state.watchlist.includes(item.id));

    saveButton.addEventListener("click", () => toggleWatchlist(item.id));

    productGrid.appendChild(fragment);
  });
}

function renderWatchlist() {
  const savedPairs = state.watchlist
    .map((id) => state.sneakers.find((item) => item.id === id))
    .filter(Boolean);

  if (!savedPairs.length) {
    watchlistElement.innerHTML = `
      <div class="watchlist-empty">
        <strong>No saved pairs yet</strong>
        <span>Tap Save on any sneaker card to build your shortlist.</span>
      </div>
    `;
    return;
  }

  watchlistElement.innerHTML = savedPairs
    .map(
      (item) => `
        <div class="watchlist-item">
          <div>
            <strong>${item.name}</strong>
            <span>${item.brand} • ${currency.format(item.resellPrice)}</span>
          </div>
          <button class="save-button is-saved" type="button" data-watch-remove="${item.id}">Saved</button>
        </div>
      `
    )
    .join("");

  watchlistElement.querySelectorAll("[data-watch-remove]").forEach((button) => {
    button.addEventListener("click", () => toggleWatchlist(button.dataset.watchRemove));
  });
}

function toggleWatchlist(id) {
  state.watchlist = state.watchlist.includes(id)
    ? state.watchlist.filter((entry) => entry !== id)
    : [...state.watchlist, id];

  localStorage.setItem("sole-signal-watchlist", JSON.stringify(state.watchlist));
  render();
}

function syncControls() {
  brandFilter.addEventListener("change", (event) => {
    state.filters.brand = event.target.value;
    render();
  });

  categoryFilter.addEventListener("change", (event) => {
    state.filters.category = event.target.value;
    render();
  });

  sortSelect.addEventListener("change", (event) => {
    state.filters.sort = event.target.value;
    render();
  });

  searchInput.addEventListener("input", (event) => {
    state.filters.search = event.target.value;
    render();
  });

  surpriseMeBtn.addEventListener("click", () => {
    const randomPair = state.sneakers[Math.floor(Math.random() * state.sneakers.length)];

    if (!randomPair) {
      return;
    }

    searchInput.value = randomPair.name;
    state.filters.search = randomPair.name;
    render();
    document.querySelector("#tracker").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function setDateStamp() {
  liveDate.textContent = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

setDateStamp();
syncControls();
loadSneakers();
