// Estado simulado y ruteo simple
const screens = ["login","dashboard","nft","services","calendar","statistics"];
const $ = (s,sc=document)=>sc.querySelector(s);
const $$ = (s,sc=document)=>sc.querySelectorAll(s);

const state = {
  user: { name: "Antonio Merez", email: "lombook@gmail.com" },
  auth: { logged: false, method: "password" },
  payment: {
    type: "card", // card | wallet
    card: {
      brand: "Mastercard",
      masked: "3******33***",
      number: "3424 2345 4524 4545",
      holder: "ANTONIO MEREZ"
    },
    wallet: {
      provider: "Metamask",
      address: "0x50E12E085189F1a272",
      balanceUSD: 21
    }
  },
  service: {
    id: "001010011010",
    worker: "Sonia Pilar Agudelo",
    start: new Date(Date.now() + 13 * 60 * 60 * 1000), // 13h adelante
    window: "08:00 AM a 06:00 PM"
  },
  favorites: [
    { name: "Alexandra Ramo", rating: 4.9, avatar: "https://via.placeholder.com/80" },
    { name: "Paola Ja", rating: 4.8, avatar: "https://via.placeholder.com/80" },
    { name: "Monica Aguirre", rating: 4.7, avatar: "https://via.placeholder.com/80" }
  ],
  nfts: [
    { id: 1, name: "American Ape x Boom", collection: "Queens", owners: 10, views: 961, favorites: 20, discount: 15, image: "https://via.placeholder.com/200" }
  ],
  notifications: [
    {
      id: "n1", title: "Felipe Andres Varga Lleras te ha solicitado",
      price: 180000, date: "02/05/2024", time: "8:00am a 4:00pm",
      address: "CL 63 B 54-30", tasks: ["Lavar la nevera","Lavar el baño"],
      distanceKm: 1.2, ago: "Hace 1 día"
    },
    {
      id: "n2", title: "Luisa Rendón Acosta, te ha solicitado",
      price: 220000, date: "05/05/2024", time: "9:00am a 1:00pm",
      address: "Calle 10 # 20-30", tasks: ["Cocina","Baño"],
      distanceKm: 9.7, ago: "Hace 3 horas"
    }
  ],
  chat: [],
  recording: { active: false, started: 0, maxMs: 120000 } // 2 min
};

function showScreen(id){
  screens.forEach(s => {
    const el = document.getElementById(s);
    if(!el) return;
    el.classList.toggle("active", s === id);
  });
  // activar ítems nav
  $$(".bottom-nav .nav-item").forEach(b=>{
    const target = b.getAttribute("data-target");
    b.classList.toggle("active", target === id);
  });
}

function renderWallet(){
  const box = $("#wallet-info");
  if(state.payment.type === "card"){
    box.innerHTML = `
      <div class="wallet-row"><strong>${state.payment.card.brand}</strong><span>${state.payment.card.masked}</span></div>
      <div class="wallet-row"><span>${state.payment.card.number}</span><span>${state.payment.card.holder}</span></div>
    `;
  } else {
    box.innerHTML = `
      <div class="wallet-row"><strong>${state.payment.wallet.provider}</strong><span>${state.payment.wallet.address}...</span></div>
      <div class="wallet-row"><span>${state.payment.wallet.balanceUSD} USD</span><button class="btn" id="change-currency">Cambiar moneda</button></div>
    `;
    $("#change-currency")?.addEventListener("click", ()=>{
      alert("Demo: cambio de moneda no implementado en mock.");
    });
  }
}

function renderFavorites(){
  const wrap = $("#favorites");
  wrap.innerHTML = "";
  state.favorites.forEach(f=>{
    const card = document.createElement("article");
    card.className = "card mini";
    card.innerHTML = `
      <div class="row center-v gap">
        <img class="avatar" src="${f.avatar}" alt="${f.name}" />
        <div>
          <h4>${f.name}</h4>
          <p class="muted">★ ${f.rating.toFixed(1)}</p>
        </div>
      </div>
      <div class="row gap" style="margin-top:.5rem">
        <button class="btn">Verificar</button>
        <button class="btn">Comunicación</button>
      </div>
    `;
    // Abrir chat al pulsar Comunicación
    card.querySelectorAll(".btn")[1].addEventListener("click", openChat);
    wrap.appendChild(card);
  });
}

function renderNFTs(){
  const list = $("#nft-list");
  list.innerHTML = "";
  state.nfts.forEach(n=>{
    const el = document.createElement("article");
    el.className = "nft-card";
    el.innerHTML = `
      <img class="nft-img" src="${n.image}" alt="${n.name}" />
      <div>
        <h4>${n.name}</h4>
        <p class="muted">${n.collection} • ${n.owners} owners • ${n.views} views • ${n.favorites} favorites</p>
        <div class="row between center-v" style="margin-top:.25rem">
          <span class="tag">Valor NFT: ${n.discount}%</span>
          <button class="btn primary use-nft" data-id="${n.id}">Usar</button>
        </div>
      </div>
    `;
    el.querySelector(".use-nft").addEventListener("click", ()=>{
      alert(`Se aplicó un ${n.discount}% de descuento con el NFT "${n.name}".`);
    });
    list.appendChild(el);
  });
}

function renderNotifications(){
  const list = $("#notifications");
  list.innerHTML = "";
  state.notifications.forEach(n=>{
    const item = document.createElement("article");
    item.className = "note";
    item.innerHTML = `
      <h4>${n.title}</h4>
      <p>$${n.price.toLocaleString("es-CO")}</p>
      <p class="meta">Fecha: ${n.date} • Hora: ${n.time}</p>
      <p class="meta">Ubicación: ${n.address}</p>
      <ul class="muted" style="margin:.25rem 0 .25rem 1rem; list-style: disc;">
        ${n.tasks.map(t=>`<li>${t}</li>`).join("")}
      </ul>
      <p class="meta">Distancia: ${n.distanceKm} Km • ${n.ago}</p>
      <div class="actions">
        <button class="btn primary" data-accept="${n.id}">Aceptar</button>
        <button class="btn" data-reject="${n.id}">Rechazar</button>
      </div>
    `;
    item.querySelector(`[data-accept="${n.id}"]`).addEventListener("click", ()=>{
      alert("Solicitud aceptada. Se agregó al calendario.");
    });
    item.querySelector(`[data-reject="${n.id}"]`).addEventListener("click", ()=>{
      item.remove();
    });
    list.appendChild(item);
  });
}

function initNav(){
  $$(".bottom-nav .nav-item").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const target = btn.getAttribute("data-target");
      if(!target) return;
      showScreen(target);
    });
  });
  $$(".back").forEach(b=>b.addEventListener("click", ()=>showScreen("dashboard")));
}

function openChat(){
  $("#chat-modal").classList.add("show");
  $("#chat-text").focus();
}
function closeChat(){ $("#chat-modal").classList.remove("show"); }

function initChat(){
  $("#chat-close").addEventListener("click", closeChat);
  $("#chat-send").addEventListener("click", ()=>{
    const val = $("#chat-text").value.trim();
    if(!val) return;
    appendMessage(val, true);
    $("#chat-text").value = "";
    // respuesta simulada
    setTimeout(()=>appendMessage("Recibido, ¡gracias!", false), 600);
  });
  $("#chat-rec").addEventListener("click", toggleRecording);
}

function appendMessage(text, me){
  const wrap = $("#chat-messages");
  const div = document.createElement("div");
  div.className = "msg" + (me ? " me" : "");
  div.textContent = text;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
}

function toggleRecording(){
  if(!state.recording.active){
    state.recording.active = true;
    state.recording.started = Date.now();
    $("#chat-rec").classList.add("primary");
    const tick = setInterval(()=>{
      if(!state.recording.active) return clearInterval(tick);
      if(Date.now() - state.recording.started >= state.recording.maxMs){
        state.recording.active = false;
        $("#chat-rec").classList.remove("primary");
        appendMessage("[Audio 2:00 enviado]", true);
        clearInterval(tick);
      }
    }, 300);
  } else {
    state.recording.active = false;
    $("#chat-rec").classList.remove("primary");
    const ms = Date.now() - state.recording.started;
    const sec = Math.min(Math.round(ms/1000), 120);
    appendMessage(`[Audio ${String(Math.floor(sec/60)).padStart(1,"0")}:${String(sec%60).padStart(2,"0")} enviado]`, true);
  }
}

function initLogin(){
  // Splash corto
  setTimeout(()=>{ $("#splash").style.display = "none"; }, 800);

  $("#wallet-login").addEventListener("click", ()=>{
    $("#wallet-modal").classList.add("show");
  });
  $("#wallet-close").addEventListener("click", ()=>{
    $("#wallet-modal").classList.remove("show");
  });
  $$(".wallet-item").forEach(w=>{
    w.addEventListener("click", ()=>{
      const val = w.getAttribute("data-wallet");
      state.auth.logged = true;
      state.auth.method = "wallet";
      state.payment.type = "wallet";
      state.payment.wallet.provider = (val==="metamask"?"Metamask": val==="bybit"?"BYBIT": val==="binance"?"Binance":"Bitcoin");
      $("#wallet-modal").classList.remove("show");
      afterLogin();
    });
  });

  $("#google-login").addEventListener("click", ()=>{
    // Diálogo simulado Google OAuth
    alert("Autorización Google simulada: elija una cuenta.");
    state.auth.logged = true;
    state.auth.method = "google";
    afterLogin();
  });

  $("#login-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = $("#email").value.trim();
    const pass = $("#password").value;
    if(email !== state.user.email || pass.length < 4){
      $("#login-error").classList.remove("hidden");
      return;
    }
    $("#login-error").classList.add("hidden");
    state.auth.logged = true;
    state.auth.method = "password";
    afterLogin();
  });

  $("#forgot-link").addEventListener("click", (e)=>{
    e.preventDefault();
    alert("Restablecimiento de credenciales (flujo demo).");
  });
}

function hoursToService(){
  const ms = state.service.start - Date.now();
  return ms / 36e5;
}

function afterLogin(){
  $("#user-name").textContent = state.user.name;
  renderWallet();
  renderFavorites();
  renderNotifications();
  renderNFTs();
  showScreen("dashboard");
}

function initServiceCancellation(){
  $("#cancel-service").addEventListener("click", ()=>{
    const hours = hoursToService();
    const text = (hours < 12)
      ? "En este momento no es posible cancelar el servicio sin costo, ya que faltan menos de 12 horas. Si cancela ahora, se realizará el cobro total del servicio. ¿Desea continuar?"
      : "Se cancelará el servicio sin costo porque faltan más de 12 horas. ¿Desea continuar?";
    $("#cancel-text").textContent = text;
    $("#cancel-dialog").classList.add("show");
  });
  $("#cancel-close").addEventListener("click", ()=>$("#cancel-dialog").classList.remove("show"));
  $("#cancel-no").addEventListener("click", ()=>$("#cancel-dialog").classList.remove("show"));
  $("#cancel-yes").addEventListener("click", ()=>{
    $("#cancel-dialog").classList.remove("show");
    alert("Servicio cancelado.");
  });
}

function initWalletSwitch(){
  $("#change-wallet").addEventListener("click", ()=>{
    state.payment.type = state.payment.type === "card" ? "wallet" : "card";
    renderWallet();
  });
  $("#add-card").addEventListener("click", ()=>alert("Agregar nueva tarjeta (demo)."));
  $("#pay-now").addEventListener("click", ()=>alert("Ejecutar pagos (demo)."));
}

function init(){
  initLogin();
  initNav();
  initChat();
  initServiceCancellation();
  initWalletSwitch();
}

document.addEventListener("DOMContentLoaded", init);

// Registrar SW
if("serviceWorker" in navigator){
  window.addEventListener("load", ()=>{
    navigator.serviceWorker.register("service-worker.js").catch(()=>{});
  });
}
