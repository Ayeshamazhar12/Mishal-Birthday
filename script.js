/* ===== Sister.exe — script.js (vanilla JS, no dependencies) ===== */

/* ---------- 1. EASY CUSTOMIZATION ---------- */
const FULL_NAME  = "Mishasl Mazhar";           // used on the finale screen
const FIRST_NAME = "Mishasl";                  // used in the hero
// To use real photos: put images in an "images" folder and set src, e.g. "images/us1.jpg".
// Leave src empty ("") to show a cute placeholder.
const PHOTOS = [
  { src: "images/photo1.jpeg", caption: "Evidence that our parents created a drama." },
  { src: "images/photo2.jpeg", caption: "she thinks she is the main chracter. unfortunately, she is right." },
  { src: "images/photo3.jpeg", caption: "Steals my stuff, eats my food, still act innocent." },
  { src: "images/photo4.jpeg", caption: "50% beauty, 50% drama, 100% headache." }
];
// Quiz: each answer has points (0 = me, 1 = you, 2 = both). Edit freely.
const QUIZ = [
  { q: "Who is more dramatic?", a: [["Me, obviously 😇",0],["You, 100% 🎭",1],["We could win an Oscar together 🏆",2]] },
  { q: "Who steals whose things?", a: [["I borrow. Permanently. 💅",1],["You, you thief 🕵️",0],["It's a shared wardrobe, babe 👗",2]] },
  { q: "Who starts the arguments?", a: [["Not me. Never. 😌",0],["Me, but they deserved it 😈",1],["The WiFi did 📶",2]] },
  { q: "Who secretly loves the other one more?", a: [["Me, but don't tell 🤫",0],["You, but I'd deny it 🙄",1],["It's a tie, sadly 🥹",2]] },
  { q: "Who would survive a zombie apocalypse?", a: [["Me, I'd bring snacks 🍿",0],["You, zombies fear you 🧟",1],["Neither: we'd argue until they arrive 😂",2]] }
];
const RESULTS = [
  [0, 3, "🕊️ Suspiciously innocent! Either you're an angel or a very good liar. (Liar. Definitely liar.)"],
  [4, 6, "😏 Chaos Apprentice! You know me well enough to blame me for everything. Respect."],
  [7, 8, "💖 Certified Sister Expert! You've passed. Your reward is more of me."],
  [9, 10, "👑 Partner in Chaos, Level: Legendary. We're both doomed, and I wouldn't have it any other way."]
];

/* ---------- 2. HELPERS ---------- */
const $ = (id) => document.getElementById(id);
const COLORS = ["#FFB6D9","#CDB4FF","#FFC6A8","#FFF0A8","#54265E","#ffffff"];

/* ---------- 3. CONFETTI (canvas) ---------- */
const canvas = $("confetti"), ctx = canvas.getContext("2d");
let bits = [], raf = null;
function sizeCanvas(){ canvas.width = innerWidth; canvas.height = innerHeight; }
addEventListener("resize", sizeCanvas); sizeCanvas();

function confetti(count = 160, x = innerWidth / 2, y = innerHeight / 3){
  for (let i = 0; i < count; i++){
    bits.push({ x, y, vx: (Math.random() - .5) * 16, vy: Math.random() * -14 - 3,
      s: Math.random() * 8 + 4, c: COLORS[Math.floor(Math.random() * COLORS.length)],
      r: Math.random() * 6, vr: (Math.random() - .5) * .4, life: 140 + Math.random() * 80 });
  }
  if (!raf) raf = requestAnimationFrame(tick);
}
function tick(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bits = bits.filter(b => b.life-- > 0 && b.y < canvas.height + 20);
  bits.forEach(b => {
    b.vy += .35; b.x += b.vx; b.y += b.vy; b.r += b.vr; b.vx *= .99;
    ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r);
    ctx.fillStyle = b.c; ctx.fillRect(-b.s / 2, -b.s / 4, b.s, b.s / 2); ctx.restore();
  });
  raf = bits.length ? requestAnimationFrame(tick) : null;
  if (!raf) ctx.clearRect(0, 0, canvas.width, canvas.height);
}
let rainTimer = null;
function confettiRain(ms = 6000){
  clearInterval(rainTimer);
  const end = Date.now() + ms;
  rainTimer = setInterval(() => {
    confetti(14, Math.random() * innerWidth, -10);
    if (Date.now() > end) clearInterval(rainTimer);
  }, 150);
}

/* ---------- 4. FLOATING HEARTS & BALLOONS ---------- */
const floaters = $("floaters");
function spawnFloaters(n = 22){
  const set = ["💗","✨","🎈","💖","🎀","🌸","🎉"];
  for (let i = 0; i < n; i++){
    const s = document.createElement("span");
    s.className = "floater";
    s.textContent = set[i % set.length];
    s.style.left = Math.random() * 100 + "%";
    s.style.fontSize = 18 + Math.random() * 28 + "px";
    s.style.animationDuration = 9 + Math.random() * 12 + "s";
    s.style.animationDelay = -Math.random() * 15 + "s";
    floaters.appendChild(s);
  }
}
spawnFloaters();

/* ---------- 5. HERO ---------- */
$("heroName").textContent = FIRST_NAME;
$("finalName").textContent = FULL_NAME;
const surprise = $("surprise");

function openSurprise(){
  confetti(260);
  surprise.hidden = false;
  [...surprise.children].forEach(s => { if (s.id !== "finale") s.classList.add("reveal"); });
  setTimeout(() => $("review").scrollIntoView({ behavior: "smooth" }), 400);
}
$("openBtn").addEventListener("click", openSurprise);

// "Too Fabulous" button: it runs away, then gives up and opens the surprise
const fabLines = ["Nice try. 😏","Too slow! 💨","You can't escape the party! 🎉","Okay okay, you win... 😩"];
let fabTries = 0;
const fab = $("fabBtn");
function dodge(e){
  if (fabTries >= fabLines.length){ return; }
  e.preventDefault();
  $("fabMsg").textContent = fabLines[fabTries++];
  if (fabTries >= fabLines.length){ fab.classList.remove("run"); fab.style.left = fab.style.top = ""; setTimeout(openSurprise, 700); return; }
  fab.classList.add("run");
  fab.style.left = Math.random() * (innerWidth - fab.offsetWidth - 20) + 10 + "px";
  fab.style.top  = Math.random() * (innerHeight - 70) + 10 + "px";
}
fab.addEventListener("click", dodge);
fab.addEventListener("mouseenter", () => { if (fabTries > 0 && fabTries < fabLines.length) dodge(new Event("x")); });

/* ---------- 6. TILT CARDS (tap on mobile) ---------- */
document.querySelectorAll(".tilt").forEach(c => c.addEventListener("click", () => confetti(25, c.getBoundingClientRect().left + 60, c.getBoundingClientRect().top)));

/* ---------- 7. CAKE ---------- */
const candlesEl = $("candles");
for (let i = 0; i < 5; i++){
  const c = document.createElement("button");
  c.className = "candle lit"; c.setAttribute("aria-label", "Candle " + (i + 1) + ", click to blow out");
  c.innerHTML = "<i></i>";
  c.addEventListener("click", () => { if (c.classList.contains("lit")) { c.classList.remove("lit"); checkWish(); } });
  candlesEl.appendChild(c);
}
const allCandles = () => [...candlesEl.children];
function checkWish(){
  if (allCandles().some(c => c.classList.contains("lit"))) return;
  confetti(240); confettiRain(2500);
  $("wishMsg").textContent = "Wish granted! Terms and conditions apply. No refunds. 😂";
  $("relightBtn").hidden = false; stopMic();
}
$("blowBtn").addEventListener("click", () => { allCandles().forEach(c => c.classList.remove("lit")); checkWish(); });
$("relightBtn").addEventListener("click", () => {
  allCandles().forEach(c => c.classList.add("lit"));
  $("wishMsg").textContent = ""; $("relightBtn").hidden = true;
});

// Optional microphone blowing (falls back gracefully)
let micStream = null, micCtx = null;
async function startMic(){
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){ $("wishMsg").textContent = "Mic not supported here. Click the candles instead! 🕯️"; return; }
  try{
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micCtx = new (window.AudioContext || window.webkitAudioContext)();
    const an = micCtx.createAnalyser(); an.fftSize = 512;
    micCtx.createMediaStreamSource(micStream).connect(an);
    const data = new Uint8Array(an.frequencyBinCount);
    $("wishMsg").textContent = "Listening... blow into your mic! 🌬️";
    (function loop(){
      if (!micStream) return;
      an.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      if (avg > 60){ $("blowBtn").click(); return; }
      requestAnimationFrame(loop);
    })();
  }catch(err){ $("wishMsg").textContent = "No mic access. No problem, click the candles! 🕯️"; }
}
function stopMic(){
  if (micStream){ micStream.getTracks().forEach(t => t.stop()); micStream = null; }
  if (micCtx){ micCtx.close(); micCtx = null; }
}
$("micBtn").addEventListener("click", startMic);

/* ---------- 8. QUIZ ---------- */
const quiz = $("quiz");
let qi = 0, pts = 0;
function renderQuiz(){
  if (qi >= QUIZ.length){
    const r = RESULTS.find(r => pts >= r[0] && pts <= r[1]) || RESULTS[RESULTS.length - 1];
    quiz.innerHTML = `<div class="big">🎉</div><h3>Result:</h3><p>${r[2]}</p><br><button class="glow-btn" id="quizAgain">Take it again 🔁</button>`;
    confetti(160);
    $("quizAgain").addEventListener("click", () => { qi = 0; pts = 0; renderQuiz(); });
    return;
  }
  const q = QUIZ[qi];
  quiz.innerHTML = `<div class="bar"><b style="width:${qi / QUIZ.length * 100}%"></b></div><h3>${q.q}</h3><div class="opts"></div>`;
  q.a.forEach(([label, p]) => {
    const b = document.createElement("button");
    b.className = "opt"; b.textContent = label;
    b.addEventListener("click", () => { pts += p; confetti(30, b.getBoundingClientRect().left + 40, b.getBoundingClientRect().top); qi++; renderQuiz(); });
    quiz.querySelector(".opts").appendChild(b);
  });
}
renderQuiz();

/* ---------- 9. FAKE GIFT ---------- */
let giftOpened = false;
$("giftBtn").addEventListener("click", () => {
  const gift = $("gift"), prize = $("prize");
  if (giftOpened){ gift.classList.remove("open"); giftOpened = false; $("giftBtn").textContent = "Claim Your Extremely Expensive Gift"; return; }
  giftOpened = true; gift.classList.add("open");
  $("giftBtn").textContent = "Try Again? 🎁";
  prize.textContent = "Congratulations! You've won... absolutely NOTHING! 😂";
  confetti(60);
  setTimeout(() => {
    if (!giftOpened) return;
    prize.textContent = "Just kidding! Your real gift is having the world's most annoying but loving sibling. You're stuck with me FOREVER. ❤️";
    confetti(220);
  }, 3200);
});

/* ---------- 10. GALLERY ---------- */
// Cute SVG placeholder (data URI so there are no broken paths)
function placeholder(i){
  const bg = ["#FFB6D9","#CDB4FF","#FFC6A8","#FFF0A8"][i % 4], e = ["","🤪","👯","💃"][i % 4];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='400' height='400' fill='${bg}'/><text x='200' y='215' font-size='110' text-anchor='middle'>${e}</text><text x='200' y='330' font-size='24' fill='#54265E' text-anchor='middle' font-family='sans-serif'>Your photo here</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
PHOTOS.forEach((p, i) => {
  const f = document.createElement("figure"); f.className = "photo";
  const img = document.createElement("img");
  img.alt = p.caption; img.loading = "lazy";
  img.src = p.src || placeholder(i);
  img.onerror = () => { img.onerror = null; img.src = placeholder(i); }; // safety net for bad paths
  const cap = document.createElement("figcaption"); cap.textContent = p.caption;
  f.append(img, cap); $("grid").appendChild(f);
  f.addEventListener("click", () => confetti(30, f.getBoundingClientRect().left + 80, f.getBoundingClientRect().top));
});

/* ---------- 11. FINALE ---------- */
$("finalBtn").addEventListener("click", () => {
  $("finale").hidden = false; $("finale").classList.add("reveal");
  confetti(300); confettiRain(9000); spawnFloaters(14);
  setTimeout(() => $("finale").scrollIntoView({ behavior: "smooth" }), 200);
});
$("replayBtn").addEventListener("click", () => {
  $("finale").hidden = true;
  surprise.hidden = true; fabTries = 0; $("fabMsg").textContent = "";
  $("relightBtn").click(); $("wishMsg").textContent = "";
  qi = 0; pts = 0; renderQuiz();
  $("gift").classList.remove("open"); giftOpened = false;
  scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => { confetti(200); }, 500);
});

/* ---------- 12. MUSIC (generated with Web Audio, no file needed; never autoplays) ---------- */
let actx = null, musicTimer = null, playing = false, step = 0;
const NOTES = [523,659,784,659, 587,740,880,740, 523,659,784,1047, 988,784,659,523]; // original cheery loop
function playNote(f){
  const o = actx.createOscillator(), g = actx.createGain();
  o.type = "triangle"; o.frequency.value = f;
  g.gain.setValueAtTime(.001, actx.currentTime);
  g.gain.exponentialRampToValueAtTime(.12, actx.currentTime + .03);
  g.gain.exponentialRampToValueAtTime(.001, actx.currentTime + .35);
  o.connect(g).connect(actx.destination); o.start(); o.stop(actx.currentTime + .4);
}
$("musicBtn").addEventListener("click", function(){
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC){ this.textContent = "🔇 Audio unsupported"; return; }
  if (!actx) actx = new AC();
  playing = !playing;
  if (playing){
    actx.resume();
    musicTimer = setInterval(() => playNote(NOTES[step++ % NOTES.length]), 280);
  } else { clearInterval(musicTimer); }
  this.textContent = playing ? "⏸️ Pause music" : "🎵 Play music";
  this.setAttribute("aria-pressed", playing);
});
