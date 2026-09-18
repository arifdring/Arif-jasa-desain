const nomorWhatsApp = "628888050678";

const products = [
  // GAME
  {id:1, section:"game", type:"topup", icon:"💎", name:"Mobile Legends Diamond", desc:"Top Up Diamond", price:10000, old:12000, badge:"POPULER"},
  {id:2, section:"game", type:"topup", icon:"🔥", name:"Free Fire Diamond", desc:"Top Up Diamond", price:15000, old:18000, badge:"HOT"},
  {id:3, section:"game", type:"topup", icon:"⚔️", name:"Valorant Points", desc:"Top Up VP", price:25000, old:30000, badge:""},
  {id:4, section:"game", type:"topup", icon:"🟦", name:"PUBG Mobile UC", desc:"Top Up UC", price:18000, old:22000, badge:""},
  {id:5, section:"game", type:"topup", icon:"🌟", name:"Genshin Genesis Crystal", desc:"Top Up Crystal", price:30000, old:35000, badge:""},
  {id:6, section:"game", type:"skin", icon:"🧥", name:"Skin Mobile Legends", desc:"Skin / Item Game", price:35000, old:40000, badge:"NEW"},
  {id:7, section:"game", type:"skin", icon:"🔫", name:"Skin Valorant", desc:"Skin / Item Game", price:75000, old:85000, badge:""},
  {id:8, section:"game", type:"skin", icon:"👑", name:"Bundle Free Fire", desc:"Bundle / Skin", price:50000, old:60000, badge:"HOT"},
  {id:9, section:"game", type:"voucher", icon:"🎟️", name:"Voucher Steam", desc:"Gift Card / Voucher", price:50000, old:55000, badge:""},
  {id:10, section:"game", type:"voucher", icon:"🎮", name:"Roblox Gift Card", desc:"Gift Card / Robux", price:60000, old:65000, badge:""},
  // DESIGN
  {id:11, section:"design", type:"graphic", icon:"🪧", name:"Desain Spanduk", desc:"Desain Banner / Spanduk", price:35000, old:50000, badge:"POPULER"},
  {id:12, section:"design", type:"graphic", icon:"🪪", name:"Desain ID Card", desc:"Kartu Identitas", price:25000, old:35000, badge:""},
  {id:13, section:"design", type:"graphic", icon:"📄", name:"Desain Flyer", desc:"Flyer Promosi", price:30000, old:45000, badge:""},
  {id:14, section:"design", type:"branding", icon:"✒️", name:"Desain Logo", desc:"Logo & Brand Identity", price:75000, old:100000, badge:"BEST"},
  {id:15, section:"design", type:"branding", icon:"💼", name:"Paket Branding UMKM", desc:"Logo + Banner + Kartu", price:150000, old:200000, badge:"HEMAT"},
  {id:16, section:"design", type:"graphic", icon:"📱", name:"Desain Feed Instagram", desc:"1 Postingan", price:25000, old:35000, badge:""},
  {id:17, section:"design", type:"graphic", icon:"🎬", name:"Desain Thumbnail", desc:"YouTube / Konten", price:30000, old:40000, badge:""},
  {id:18, section:"design", type:"graphic", icon:"📋", name:"Desain Brosur", desc:"Brosur 1–2 Halaman", price:45000, old:60000, badge:""},
  {id:19, section:"design", type:"graphic", icon:"🏷️", name:"Desain Poster", desc:"Poster Digital / Cetak", price:40000, old:55000, badge:""},
  {id:20, section:"design", type:"branding", icon:"📦", name:"Desain Kemasan", desc:"Packaging Product", price:85000, old:110000, badge:""}
];

let currentSection = "game";
let currentFilter = "all";
let cart = [];

const rupiah = n => "Rp" + n.toLocaleString("id-ID");

function productClass(p) {
  if (p.section === "design") return "design";
  if (p.type === "branding") return "orange";
  if (p.type === "graphic") return "design";
  return "";
}

function renderProducts(list = products) {
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");

  if (!list.length) {
    grid.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  grid.innerHTML = list.map(p => `
    <article class="product">
      <div class="product-visual ${productClass(p)}">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        <span>${p.icon}</span>
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <div class="product-type">${p.desc}</div>
        <div>
          <span class="price">${rupiah(p.price)}</span>
          <span class="old-price">${rupiah(p.old)}</span>
        </div>
        <div class="product-actions">
          <button class="detail" onclick="showDetail(${p.id})">Detail</button>
          <button class="buy" onclick="beliViaWhatsApp(${p.id})">Beli</button>
        </div>
      </div>
    </article>
  `).join("");
}

function openSection(section) {
  currentSection = section;
  currentFilter = "all";

  const isGame = section === "game";
  document.getElementById("sectionKicker").textContent = isGame ? "PRODUK GAME" : "JASA DESAIN";
  document.getElementById("sectionTitle").textContent = isGame ? "Game Favorit" : "Jasa Desain Kreatif";
  document.getElementById("sectionDesc").textContent = isGame
    ? "Pilih kebutuhan game kamu, mulai dari diamond, skin sampai voucher."
    : "Pesan desain profesional untuk kebutuhan bisnis, organisasi, dan konten.";

  document.querySelectorAll(".category-item").forEach((el, i) => el.classList.toggle("active", i === (isGame ? 0 : 1)));

  const list = products.filter(p => p.section === section);
  renderProducts(list);
  document.querySelector(".main-content").scrollIntoView({behavior:"smooth", block:"start"});
}

function filterType(type) {
  currentFilter = type;
  const list = products.filter(p => p.type === type);
  document.getElementById("sectionKicker").textContent = "KATEGORI";
  document.getElementById("sectionTitle").textContent = typeLabel(type);
  document.getElementById("sectionDesc").textContent = `Menampilkan produk kategori ${typeLabel(type)}.`;
  document.querySelectorAll(".category-item").forEach(el => el.classList.remove("active"));
  renderProducts(list);
  document.querySelector(".main-content").scrollIntoView({behavior:"smooth", block:"start"});
}

function typeLabel(type) {
  const labels = {
    topup:"Top Up Game",
    skin:"Skin & Item Game",
    graphic:"Graphic Design",
    branding:"Branding"
  };
  return labels[type] || type;
}

function showAllCurrent() {
  if (currentFilter !== "all") {
    openSection(currentSection);
  } else {
    renderProducts(products.filter(p => p.section === currentSection));
  }
}

function searchProducts() {
  const q = document.getElementById("searchInput").value.toLowerCase().trim();
  if (!q) {
    showAllCurrent();
    return;
  }
  const list = products.filter(p =>
    `${p.name} ${p.desc} ${p.type} ${p.section}`.toLowerCase().includes(q)
  );
  document.getElementById("sectionKicker").textContent = "HASIL PENCARIAN";
  document.getElementById("sectionTitle").textContent = `"${q}"`;
  document.getElementById("sectionDesc").textContent = `${list.length} produk ditemukan.`;
  renderProducts(list);
}

function showDetail(id) {
  const p = products.find(x => x.id === id);
  document.getElementById("detailContent").innerHTML = `
    <div class="detail-top">
      <div class="detail-visual ${productClass(p)}">${p.icon}</div>
      <div>
        <p>${p.section === "game" ? "GAME" : "JASA DESAIN"} • ${typeLabel(p.type)}</p>
        <h2>${p.name}</h2>
        <p>${p.desc}</p>
        <div class="detail-price">${rupiah(p.price)}</div>
      </div>
    </div>
    <hr style="border:0;border-top:1px solid #e6ebf2;margin:22px 0">
    <p class="muted">
      ${p.section === "game"
        ? "Produk game diproses setelah data akun/game ID dan pembayaran terkonfirmasi."
        : "Setelah order, kirim brief, ukuran, teks, logo, dan referensi desain. File final diberikan setelah proses revisi."}
    </p>
    <button class="primary-btn full" onclick="addToCart(${p.id}); closeModal('detailModal')">Tambah ke Keranjang</button>
  `;
  document.getElementById("detailModal").classList.add("show");
}

function addToCart(id) {
  const p = products.find(x => x.id === id);
  cart.push(p);
  updateCartCount();
  alert(`${p.name} ditambahkan ke keranjang.`);
}
function beliViaWhatsApp(id) {
  const p = products.find(x => x.id === id);

  const pesan = `Halo Admin 👋

Saya ingin membeli:

🎮 Produk: ${p.name}
📦 Kategori: ${p.desc}
💰 Harga: ${rupiah(p.price)}

Mohon informasi untuk proses pembelian dan pembayarannya.

Terima kasih.`;

  const url = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;

  window.open(url, "_blank");
}

function updateCartCount() {
  document.getElementById("cartCount").textContent = cart.length;
}

function openCart() {
  const box = document.getElementById("cartItems");
  if (!cart.length) {
    box.innerHTML = `<div class="empty-state" style="padding:35px 0"><div>🛒</div><h3>Keranjang masih kosong</h3><p>Yuk pilih produk terlebih dahulu.</p></div>`;
  } else {
    box.innerHTML = cart.map((p, i) => `
      <div class="cart-row">
        <div class="mini-icon">${p.icon}</div>
        <div class="cart-info">
          <h4>${p.name}</h4>
          <small>${rupiah(p.price)}</small>
        </div>
        <button class="cart-remove" onclick="removeCart(${i})">Hapus</button>
      </div>
    `).join("");
  }
  document.getElementById("cartTotal").textContent = rupiah(cart.reduce((sum,p) => sum + p.price, 0));
  document.getElementById("cartModal").classList.add("show");
}

function removeCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  openCart();
}

function checkout() {
  if (!cart.length) {
    alert("Keranjang masih kosong.");
    return;
  }

  let daftarProduk = "";

  cart.forEach((produk, index) => {
    daftarProduk += `${index + 1}. ${produk.name} - ${rupiah(produk.price)}\n`;
  });

  const total = cart.reduce((sum, produk) => sum + produk.price, 0);

  const pesan = `Halo Admin 👋

Saya ingin melakukan pemesanan:

${daftarProduk}
💰 Total: ${rupiah(total)}

Mohon informasi mengenai proses pembayaran dan penyelesaian pesanan.

Terima kasih.`;

  const url = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;

  window.open(url, "_blank");
}
function openLogin() {
  document.getElementById("loginModal").classList.add("show");
}

function demoLogin() {
  alert("Demo login: form berhasil dikirim. Hubungkan ke backend untuk autentikasi nyata.");
  closeModal("loginModal");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("show");
}

function closeModalOutside(event, id) {
  if (event.target.id === id) closeModal(id);
}

function showHome(event) {
  event.preventDefault();
  currentSection = "game";
  currentFilter = "all";
  document.getElementById("searchInput").value = "";
  openSection("game");
  window.scrollTo({top:0, behavior:"smooth"});
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products.filter(p => p.section === "game"));
});
