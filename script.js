const receiveBtn = document.getElementById("receiveBtn");
const shareBtn = document.getElementById("shareBtn");
const sharePanel = document.getElementById("sharePanel");
const flowerLayer = document.getElementById("flowerLayer");
const hint = document.getElementById("hint");
const shareLink = document.getElementById("shareLink");
const copyBtn = document.getElementById("copyBtn");
const copyStatus = document.getElementById("copyStatus");

const flowerImages = [
  "assets/flower-red.png",
  "assets/flowers-colorful.png",
  "assets/flowers-pastel.png",
  "assets/flower-small.png"
];
let flowerTimer = null;

function launchFlower() {
  const flower = document.createElement("img");
  flower.className = "flying-flower";
  flower.src = flowerImages[Math.floor(Math.random() * flowerImages.length)];
  flower.alt = "";
  const size = 18 + Math.random() * 25; 
  flower.style.width = `${size}px`;
  flower.style.height = `${size}px`;
  flower.style.left = `${Math.random() * 100}%`;
  flower.style.setProperty("--duration", `${3.3 + Math.random() * 2.8}s`);
  flower.style.setProperty("--drift", `${Math.round(Math.random() * 180 - 90)}px`);
  flower.style.setProperty("--spin", `${Math.round(Math.random() * 600 - 300)}deg`);
  flowerLayer.appendChild(flower);
  flower.addEventListener("animationend", () => flower.remove(), { once: true });
}

function startFlowerShower() {
 
  for (let i = 0; i < 38; i++) {
    setTimeout(launchFlower, i * 55);
  }
  let count = 0;
  const interval = setInterval(() => {
    for (let i = 0; i < 5; i++) launchFlower();
    count++;
    if (count >= 8) clearInterval(interval);
  }, 280);
}

receiveBtn.addEventListener("click", () => {
  startFlowerShower();
  hint.textContent = "Những bông hoa nhỏ dành riêng cho bạn ♡";
});

shareBtn.addEventListener("click", () => {
  sharePanel.hidden = !sharePanel.hidden;
  if (!sharePanel.hidden) {
    shareLink.value = window.location.href;
    copyStatus.textContent = "";
  }
});

copyBtn.addEventListener("click", async () => {
  shareLink.select();
  try {
    await navigator.clipboard.writeText(shareLink.value);
    copyStatus.textContent = "Đã sao chép link ♡";
  } catch {
    document.execCommand("copy");
    copyStatus.textContent = "Đã chọn link — nếu chưa sao chép, hãy nhấn giữ để copy.";
  }
});
