const products = [
  { id: 1, name: "Kahve", price: 5, count: 0, emoji: "☕" },
  { id: 2, name: "Bisiklet", price: 500, count: 0, emoji: "🚲" },
  { id: 3, name: "Akilli Telefon", price: 1200, count: 0, emoji: "📱" },
  { id: 4, name: "Oyun Bilgisayari", price: 3500, count: 0, emoji: "🖥️" },
  { id: 5, name: "Elektrikli Araba", price: 60000, count: 0, emoji: "🚗" },
  { id: 6, name: "Helikopter", price: 5000000, count: 0, emoji: "🚁" },
  { id: 7, name: "Yat", price: 30000000, count: 0, emoji: "🛥️" },
  { id: 8, name: "Ozel Jet", price: 45000000, count: 0, emoji: "✈️" },
  { id: 9, name: "Ada", price: 250000000, count: 0, emoji: "🏝️" },
  { id: 10, name: "Uzay Roketi", price: 900000000, count: 0, emoji: "🚀" }
];

let balance = 100000000000;

const productList = document.getElementById("productList");
const balanceElement = document.getElementById("balance");
const cartBody = document.getElementById("cartBody");
const cartTable = document.getElementById("cartTable");
const emptyMessage = document.getElementById("emptyMessage");

function formatMoney(value) {
  return "$" + value.toLocaleString("en-US");
}

function buyProduct(id) {
  const product = products.find((item) => item.id === id);

  if (!product || balance < product.price) {
    return;
  }

  product.count += 1;
  balance -= product.price;
  render();
}

function sellProduct(id) {
  const product = products.find((item) => item.id === id);

  if (!product || product.count === 0) {
    return;
  }

  product.count -= 1;
  balance += product.price;
  render();
}

function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    const isBuyDisabled = balance < product.price;
    const isSellDisabled = product.count === 0;

    card.innerHTML = `
      <div class="product-emoji" aria-label="${product.name}">${product.emoji}</div>
      <h3>${product.name}</h3>
      <div class="price">${formatMoney(product.price)}</div>
      <div class="controls">
        <button class="sell-btn" data-action="sell" data-id="${product.id}" ${isSellDisabled ? "disabled" : ""}>Sell</button>
        <span class="count">${product.count}</span>
        <button class="buy-btn" data-action="buy" data-id="${product.id}" ${isBuyDisabled ? "disabled" : ""}>Buy</button>
      </div>
    `;

    productList.appendChild(card);
  });
}

function renderCart() {
  const boughtProducts = products.filter((product) => product.count > 0);

  cartBody.innerHTML = "";

  if (boughtProducts.length === 0) {
    cartTable.classList.add("hidden");
    emptyMessage.classList.remove("hidden");
    return;
  }

  cartTable.classList.remove("hidden");
  emptyMessage.classList.add("hidden");

  boughtProducts.forEach((product) => {
    const row = document.createElement("tr");
    const total = product.count * product.price;

    row.innerHTML = `
      <td>
        <div class="cart-product">
          <span class="cart-emoji" aria-label="${product.name}">${product.emoji}</span>
          <span>${product.name}</span>
        </div>
      </td>
      <td>${product.count}</td>
      <td>${formatMoney(total)}</td>
    `;

    cartBody.appendChild(row);
  });
}

function renderBalance() {
  balanceElement.textContent = formatMoney(balance);
}

function render() {
  renderBalance();
  renderProducts();
  renderCart();
}

productList.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const id = Number(target.dataset.id);
  const action = target.dataset.action;

  if (!id || !action) {
    return;
  }

  if (action === "buy") {
    buyProduct(id);
  }

  if (action === "sell") {
    sellProduct(id);
  }
});

render();
