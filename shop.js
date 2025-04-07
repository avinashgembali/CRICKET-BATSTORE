const bats = [];

const brands = ["MRF", "SG", "SS", "TON", "GN"];
const willowTypes = ["Kashmir-Willow", "English Willow", "Poplar Willow"];

for (let i = 0; i < 50; i++) {
  const brand = brands[i % brands.length];
  const type = willowTypes[Math.floor(Math.random() * willowTypes.length)];
  const rating = parseFloat((Math.random() * 2 + 3).toFixed(1)); // 3.0 to 5.0
  const price = Math.floor(Math.random() * 24000 + 1000); // ₹1,000 to ₹25,000

  bats.push({
    name: brand,
    type: type,
    rating: rating,
    price: price,
    img: `${brand.toLowerCase()}.jpg` // No need to repeat ./images/shop/ later
  });
}

function displayFilteredBats() {
  let selectedBrand = "none";
  let priceRange = "none";
  let rating = "none";
  let sort = "none";

  const brandInput = document.querySelector('[name="brand"]:checked');
  if (brandInput) selectedBrand = brandInput.value;

  const priceInput = document.querySelector('[name="priceRange"]:checked');
  if (priceInput) priceRange = priceInput.value;

  const ratingInput = document.querySelector('[name="rating"]:checked');
  if (ratingInput) rating = ratingInput.value;

  const selectedSort = document.querySelector('[name="sort"]:checked');
  sort = selectedSort ? selectedSort.value : "none";

  let filteredBats = bats.filter((bat) => {
    // Brand Filter
    if (selectedBrand !== "none" && bat.name.toLowerCase() !== selectedBrand) {
      return false;
    }

    // Price Range Filter
    const p = Number(bat.price);
    if (priceRange === "<1500" && p >= 1500) return false;
    if (priceRange === "1500-2000" && (p < 1500 || p > 2000)) return false;
    if (priceRange === "2000-2500" && (p < 2000 || p > 2500)) return false;
    if (priceRange === "2500-3000" && (p < 2500 || p > 3000)) return false;
    if (priceRange === ">3000" && p <= 3000) return false;

    // Rating Filter
    const r = bat.rating;
    if (rating === "4.5+" && r <= 4.5) return false;
    if (rating === "4-4.5" && (r < 4 || r > 4.5)) return false;
    if (rating === "3.5-4" && (r < 3.5 || r > 4)) return false;
    if (rating === "3-3.5" && (r < 3 || r > 3.5)) return false;
    if (rating === "<3" && r >= 3) return false;

    return true;
  });

  // Sort logic
  if (sort === "low-high") {
    filteredBats.sort((a, b) => a.price - b.price);
  } else if (sort === "high-low") {
    filteredBats.sort((a, b) => b.price - a.price);
  }

  const container = document.getElementById("product-display");
  container.innerHTML = "";

  if (filteredBats.length === 0) {
    container.innerHTML = "<p>No bats match your filters.</p>";
    return;
  }

  for (let i = 0; i < filteredBats.length; i++) {
    let bat = filteredBats[i];
    container.innerHTML += `
      <div class="bat-card">
        <img src="./images/shop/${bat.img}" alt="${bat.name} bat" style="width:150px; height:150px; object-fit:cover;">
        <div class="bat-info">
          <p><strong>Name:</strong> ${bat.name}</p>
          <p><strong>Type:</strong> ${bat.type}</p>
          <p><strong>Rating:</strong> ${bat.rating}⭐</p>
          <p><strong>Price:</strong> ₹${bat.price.toLocaleString()}</p>
          <button 
            class="add-to-cart"
            data-name="${bat.name}"
            data-img="${bat.img}"
            data-type="${bat.type}"
            data-rating="${bat.rating}"
            data-price="${bat.price}"
          >🛒</button>
        </div>
      </div>
    `;
  }
}

const allInputs = document.querySelectorAll('input[type="radio"]');
allInputs.forEach(input => {
  input.addEventListener("change", displayFilteredBats);
});

displayFilteredBats();

function addToCart(bat) {
  let userEmail = localStorage.getItem("loggedInUserEmail");
  if (!userEmail) {
    alert("Please login to add items to cart.");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  if (!cart[userEmail]) {
    cart[userEmail] = [];
  }

  cart[userEmail].push(bat);
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const btn = e.target;
    const bat = {
      name: btn.dataset.name,
      img: btn.dataset.img,
      type: btn.dataset.type,
      rating: parseFloat(btn.dataset.rating),
      price: parseInt(btn.dataset.price)
    };
    addToCart(bat);
    alert("Added to cart!");
  }
});
