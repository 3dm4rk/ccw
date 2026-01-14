// =========================
// CARD BATTLER (SURVIVAL + GOLD + SHOP + FIXED ARMOR + FIXED DEFEAT FLOW)
// =========================

// --- Card definitions (playable cards) ---
const CARDS = [
  // ORIGINAL 3
  {
    id: "3dm4rk",
    name: "3dm4rk",
    img: "cards/3dm4rk.png",
    atk: 3, def: 2, hp: 5,
    skillName: "Freeze Time",
    skillDesc: "Skip the enemy's next turn (cooldown 2 turns).",
    skill: (me, foe) => {
      if (me.cooldown > 0) return { ok: false, msg: `Skill is on cooldown (${me.cooldown} turns).` };
      foe.frozen = 1;
      me.cooldown = 2;
      return { ok: true, msg: `${me.name} freezes time! Enemy loses their next turn.` };
    }
  },
  {
    id: "spacePatron",
    name: "Space Patron",
    img: "cards/space-patrol.png",
    atk: 1, def: 1, hp: 3,
    skillName: "Arrest Beam",
    skillDesc: "Stun the enemy (enemy deals -2 damage next attack). (cooldown 2)",
    skill: (me, foe) => {
      if (me.cooldown > 0) return { ok: false, msg: `Skill is on cooldown (${me.cooldown} turns).` };
      foe.stunned = 1;
      me.cooldown = 2;
      return { ok: true, msg: `${me.name} uses Arrest Beam! Enemy is stunned.` };
    }
  },
  {
    id: "luckyCat",
    name: "Lucky Cat",
    img: "cards/lucky-cat.png",
    atk: 2, def: 2, hp: 4,
    skillName: "Lucky Charm",
    skillDesc: "Heal 2 HP and gain +1 Shield. (cooldown 2)",
    skill: (me) => {
      if (me.cooldown > 0) return { ok: false, msg: `Skill is on cooldown (${me.cooldown} turns).` };
      me.hp = Math.min(me.maxHp, me.hp + 2);
      me.shield = Math.min(6, me.shield + 1);
      me.cooldown = 2;
      return { ok: true, msg: `${me.name} uses Lucky Charm! +2 HP, +1 Shield.` };
    }
  },

  // NEW 7
  {
    id: "cosmicGod",
    name: "Cosmic God",
    img: "cards/cosmic-god.png",
    atk: 10, def: 10, hp: 15,
    skillName: "Time Reboot",
    skillDesc: "Fully restore HP and remove Frozen/Stunned. (cooldown 3)",
    skill: (me) => {
      if (me.cooldown > 0) return { ok:false, msg:`Skill is on cooldown (${me.cooldown} turns).` };
      me.hp = me.maxHp;
      me.frozen = 0;
      me.stunned = 0;
      me.cooldown = 3;
      return { ok:true, msg:`${me.name} uses Time Reboot! Full restore!` };
    }
  },
  {
    id: "daysi",
    name: "Daysi",
    img: "cards/daysi.png",
    atk: 5, def: 0, hp: 1,
    skillName: "Rocket Rush",
    skillDesc: "Next attack deals +3 damage. (cooldown 2)",
    skill: (me) => {
      if (me.cooldown > 0) return { ok:false, msg:`Skill is on cooldown (${me.cooldown} turns).` };
      me.boost = 1;
      me.cooldown = 2;
      return { ok:true, msg:`${me.name} uses Rocket Rush! Next attack +3 dmg.` };
    }
  },
  {
    id: "patrickDestroyer",
    name: "Patrick the Destroyer",
    img: "cards/patrick-the-destroyer.png",
    atk: 4, def: 3, hp: 1,
    skillName: "Dual Slash",
    skillDesc: "Hit twice for 1 damage each (ignores Shield). (cooldown 2)",
    skill: (me, foe) => {
      if (me.cooldown > 0) return { ok:false, msg:`Skill is on cooldown (${me.cooldown} turns).` };
      // ignores shield intentionally
      foe.hp = Math.max(0, foe.hp - 1);
      foe.hp = Math.max(0, foe.hp - 1);
      me.cooldown = 2;
      return { ok:true, msg:`${me.name} uses Dual Slash! 2 hits ignoring Shield.` };
    }
  },
  {
    id: "spaceSkeletonPirate",
    name: "Space Skeleton Pirate",
    img: "cards/space-skeleton-pirate.png",
    atk: 3, def: 0, hp: 2,
    skillName: "Plasma Plunder",
    skillDesc: "Steal 1 Shield from enemy. (cooldown 2)",
    skill: (me, foe) => {
      if (me.cooldown > 0) return { ok:false, msg:`Skill is on cooldown (${me.cooldown} turns).` };
      if (foe.shield > 0) {
        foe.shield = Math.max(0, foe.shield - 1);
        me.shield = Math.min(6, me.shield + 1);
        me.cooldown = 2;
        return { ok:true, msg:`${me.name} steals 1 Shield!` };
      }
      me.cooldown = 2;
      return { ok:true, msg:`${me.name} tried to steal Shield... but enemy has none!` };
    }
  },
  {
    id: "tremo",
    name: "Tremo",
    img: "cards/tremo.png",
    atk: 8, def: 1, hp: 2,
    skillName: "Time Rewind",
    skillDesc: "Heal +3 HP and gain +1 Shield. (cooldown 2)",
    skill: (me) => {
      if (me.cooldown > 0) return { ok:false, msg:`Skill is on cooldown (${me.cooldown} turns).` };
      me.hp = Math.min(me.maxHp, me.hp + 3);
      me.shield = Math.min(6, me.shield + 1);
      me.cooldown = 2;
      return { ok:true, msg:`${me.name} rewinds time! +3 HP, +1 Shield.` };
    }
  },
  {
    id: "angelo",
    name: "Angelo",
    img: "cards/angelo.png",
    atk: 5, def: 5, hp: 5,
    skillName: "Divine Guard",
    skillDesc: "Gain +2 Shield (max 6). (cooldown 2)",
    skill: (me) => {
      if (me.cooldown > 0) return { ok:false, msg:`Skill is on cooldown (${me.cooldown} turns).` };
      me.shield = Math.min(6, me.shield + 2);
      me.cooldown = 2;
      return { ok:true, msg:`${me.name} uses Divine Guard! +2 Shield.` };
    }
  },
  {
    id: "baltrio",
    name: "Baltrio",
    img: "cards/baltrio.png",
    atk: 4, def: 4, hp: 2,
    skillName: "Void Burst",
    skillDesc: "Deal 2 damage and Stun enemy. (cooldown 2)",
    skill: (me, foe) => {
      if (me.cooldown > 0) return { ok:false, msg:`Skill is on cooldown (${me.cooldown} turns).` };
      // raw hp damage; still fine
      foe.hp = Math.max(0, foe.hp - 2);
      foe.stunned = 1;
      me.cooldown = 2;
      return { ok:true, msg:`${me.name} casts Void Burst! 2 dmg + Stun.` };
    }
  }
];

// --- Future upcoming cards (shop only for now) ---
const FUTURE_CARDS = [
  { id:"novaEmpress", name:"Nova Empress", price:120, desc:"Upcoming card: cosmic ruler with massive shields + burst damage." },
  { id:"voidSamurai", name:"Void Samurai", price:160, desc:"Upcoming card: critical strikes and shield piercing combos." },
  { id:"astroWitch", name:"Astro Witch", price:200, desc:"Upcoming card: curses enemies and heals from their damage." }
];

// --- Storage keys ---
const GOLD_KEY = "cb_gold";
const OWNED_KEY = "cb_owned";

// --- Game State ---
const state = {
  phase: "pick",     // pick | battle | pause | over
  turn: "player",    // player | enemy
  round: 1,
  stage: 1,
  gold: 0,
  owned: {},         // { id: true }
  player: null,
  enemy: null
};

// --- Helpers ---
const $ = (id) => document.getElementById(id);

function loadProgress() {
  const g = parseInt(localStorage.getItem(GOLD_KEY) || "0", 10);
  state.gold = Number.isFinite(g) ? g : 0;

  try {
    state.owned = JSON.parse(localStorage.getItem(OWNED_KEY) || "{}") || {};
  } catch {
    state.owned = {};
  }
}

function saveProgress() {
  localStorage.setItem(GOLD_KEY, String(state.gold));
  localStorage.setItem(OWNED_KEY, JSON.stringify(state.owned));
}

function updateGoldUI() {
  const goldStr = `Gold: ${state.gold}`;
  if ($("goldTag")) $("goldTag").textContent = goldStr;
  if ($("homeGoldTag")) $("homeGoldTag").textContent = goldStr;
  if ($("shopGoldTag")) $("shopGoldTag").textContent = goldStr;
}

function addGold(amount) {
  state.gold += amount;
  saveProgress();
  updateGoldUI();
}

function showView(view) {
  const ids = ["home", "gallery", "setup", "game", "shop"];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = (id === view) ? "block" : "none";
  });
  updateGoldUI();
}

function cloneCard(card) {
  return {
    id: card.id,
    name: card.name,
    img: card.img,
    atk: card.atk,
    def: card.def,
    maxHp: card.hp,
    hp: card.hp,
    shield: card.def,
    cooldown: 0,
    frozen: 0,
    stunned: 0,
    boost: 0,
    passiveEnabled: false,
    passiveChance: 0.35,
    base: card
  };
}

function log(msg, cls="") {
  const el = document.createElement("p");
  if (cls) el.className = cls;
  el.textContent = msg;
  $("log").appendChild(el);
  $("log").scrollTop = $("log").scrollHeight;
}

/*
  ✅ FIXED DAMAGE:
  - Damage is NOT reduced by defender shield anymore.
  - Shield/Armor ONLY absorbs inside applyDamage().
*/
function dmgCalc(attacker) {
  const rng = Math.floor(Math.random() * 2); // 0 or 1
  let dmg = attacker.atk + rng;

  if (attacker.boost > 0) {
    dmg += 3;
    attacker.boost = 0;
  }

  if (attacker.stunned > 0) {
    dmg = Math.max(1, dmg - 2);
  }

  return Math.max(1, dmg);
}

/* ✅ ARMOR FIRST, THEN HP */
function applyDamage(defender, dmg) {
  const absorbed = Math.min(defender.shield, dmg);
  defender.shield -= absorbed;

  const remaining = dmg - absorbed;
  defender.hp = Math.max(0, defender.hp - remaining);

  updateUI();
}

function tickStatuses(f) {
  if (f.cooldown > 0) f.cooldown -= 1;
  if (f.frozen > 0) f.frozen -= 1;
  if (f.stunned > 0) f.stunned -= 1;
}

function tryEnemyPassive() {
  const e = state.enemy;
  const p = state.player;
  if (!e || !p) return;
  if (!e.passiveEnabled || state.phase !== "battle") return;

  const roll = Math.random();
  if (roll > e.passiveChance) {
    log(`Stage ${state.stage} • Round ${state.round}: ${e.name}'s passive did not trigger.`, "warn");
    return;
  }

  if (e.id === "3dm4rk") {
    p.frozen = 1;
    log(`Stage ${state.stage} • Round ${state.round}: ${e.name}'s passive — Time Freeze! You lose your next turn.`, "bad");
  } else if (e.id === "spacePatron") {
    p.stunned = 1;
    log(`Stage ${state.stage} • Round ${state.round}: ${e.name}'s passive — Arrest Beam! Your next attack is weaker.`, "bad");
  } else if (e.id === "luckyCat") {
    e.hp = Math.min(e.maxHp, e.hp + 2);
    e.shield = Math.min(6, e.shield + 1);
    log(`Stage ${state.stage} • Round ${state.round}: ${e.name}'s passive — Lucky Charm! Enemy heals +2 HP and gains +1 Shield.`, "bad");
  }

  updateUI();
}

/* ===== SURVIVAL MODAL ===== */
function openModal({ title, text, stageLabel, hint, goldReward, mode }) {
  $("resultTitle").textContent = title;
  $("resultText").textContent = text;
  $("resultStage").textContent = stageLabel;

  $("modalHP").textContent = `${state.player.hp}/${state.player.maxHp}`;
  $("modalShield").textContent = `${state.player.shield}`;

  $("modalGoldReward").textContent = goldReward != null ? `+${goldReward}` : "+0";
  $("modalGoldTotal").textContent = `${state.gold}`;

  $("modalHint").textContent = hint || "";

  // ✅ Defeat: hide Next Enemy button
  if (mode === "lose") {
    $("btnNextEnemy").style.display = "none";
    $("btnPlayAgain").textContent = "🔁 Restart Run";
  } else {
    $("btnNextEnemy").style.display = "inline-block";
    $("btnPlayAgain").textContent = "🔁 Restart Run";
  }

  $("resultModal").style.display = "flex";
}

function closeModal() {
  $("resultModal").style.display = "none";
}

/* Spawn next enemy but keep player stats */
function spawnNextEnemy() {
  const playerId = state.player.id;
  const pool = CARDS.filter(c => c.id !== playerId);
  const enemyBase = pool[Math.floor(Math.random() * pool.length)];

  state.enemy = cloneCard(enemyBase);
  state.enemy.passiveEnabled = true;

  // keep player stats (survival), but clear temporary effects
  state.player.frozen = 0;
  state.player.stunned = 0;
  state.player.boost = 0;

  state.turn = "player";
  state.round = 1;
  state.phase = "battle";

  $("log").innerHTML = "";
  log(`🔥 Stage ${state.stage}: Enemy is ${state.enemy.name}.`, "warn");

  tryEnemyPassive();
  updateUI();
}

function updateUI() {
  const p = state.player, e = state.enemy;
  if (!p || !e) return;

  $("turnTag").textContent = `Turn: ${state.turn === "player" ? "Player" : "Enemy"}`;
  $("roundTag").textContent = `Round: ${state.round}`;
  $("stageTag").textContent = `Stage: ${state.stage}`;
  $("enemyPassiveTag").textContent = `Enemy Passive: ${Math.round((state.enemy?.passiveChance ?? 0.35) * 100)}%`;
  updateGoldUI();

  $("pName").textContent = p.name;
  $("pImg").src = p.img;
  $("pSkillTag").textContent = `${p.base.skillName}`;

  $("eName").textContent = e.name;
  $("eImg").src = e.img;
  $("eSkillTag").textContent = `${e.base.skillName}`;

  $("pHP").textContent = `${p.hp}/${p.maxHp}`;
  $("pATK").textContent = p.atk;
  $("pDEF").textContent = p.def;
  $("pShield").textContent = p.shield;

  $("eHP").textContent = `${e.hp}/${e.maxHp}`;
  $("eATK").textContent = e.atk;
  $("eDEF").textContent = e.def;
  $("eShield").textContent = e.shield;

  $("pHpBar").style.width = `${Math.round((p.hp / p.maxHp) * 100)}%`;
  $("eHpBar").style.width = `${Math.round((e.hp / e.maxHp) * 100)}%`;

  $("pShieldBar").style.width = `${Math.round((p.shield / 6) * 100)}%`;
  $("eShieldBar").style.width = `${Math.round((e.shield / 6) * 100)}%`;

  $("pStatus").textContent =
    (p.frozen ? "Frozen" : (p.stunned ? "Stunned" : "None")) +
    (p.cooldown ? ` • Skill CD: ${p.cooldown}` : "");

  $("eStatus").textContent =
    (e.frozen ? "Frozen" : (e.stunned ? "Stunned" : "None")) +
    (e.cooldown ? ` • Skill CD: ${e.cooldown}` : "");

  const playerTurn = state.turn === "player" && state.phase === "battle";
  $("btnAttack").disabled = !playerTurn;
  $("btnSkill").disabled = !playerTurn;
  $("btnEnd").disabled = !playerTurn;
}

/* ✅ SURVIVAL WIN/LOSE + GOLD REWARD */
function checkWin() {
  const p = state.player, e = state.enemy;

  // LOSE
  if (p.hp <= 0) {
    state.phase = "over";
    updateUI();

    openModal({
      title: "💀 Defeat",
      text: `Your run ended at Stage ${state.stage}.`,
      stageLabel: `Stage ${state.stage}`,
      hint: "You have no life left. Restart the run to play again.",
      goldReward: 0,
      mode: "lose"
    });

    return true;
  }

  // WIN -> reward gold then continue
  if (e.hp <= 0) {
    state.phase = "pause";
    updateUI();

    const reward = Math.floor(Math.random() * 20) + 1; // 1-20
    addGold(reward);

    openModal({
      title: "🏆 Victory!",
      text: `You defeated ${e.name}. You earned +${reward} gold.`,
      stageLabel: `Stage ${state.stage} Complete`,
      hint: "Next enemy incoming...",
      goldReward: reward,
      mode: "win"
    });

    // auto next enemy (only on win)
    setTimeout(() => {
      if ($("resultModal").style.display !== "flex") return;
      closeModal();
      state.stage += 1;
      spawnNextEnemy();
    }, 1800);

    return true;
  }

  return false;
}

function nextTurn() {
  if (state.phase !== "battle") return;

  if (state.turn === "player") tickStatuses(state.player);
  else tickStatuses(state.enemy);

  state.turn = state.turn === "player" ? "enemy" : "player";
  updateUI();

  if (state.turn === "player") {
    state.round += 1;
    tryEnemyPassive();
  }

  if (state.turn === "enemy") {
    setTimeout(enemyAI, 450);
  }
}

function enemyAI() {
  if (state.phase !== "battle") return;

  const e = state.enemy, p = state.player;

  if (e.frozen > 0) {
    log(`${e.name} is frozen and skips the turn!`, "warn");
    nextTurn();
    return;
  }

  const dmg = dmgCalc(e);
  log(`${e.name} attacks for ${dmg} damage!`, "bad");
  applyDamage(p, dmg);

  if (!checkWin()) nextTurn();
}

/* Player actions */
function playerAttack() {
  const p = state.player, e = state.enemy;

  if (p.frozen > 0) {
    log(`${p.name} is frozen and cannot act!`, "warn");
    nextTurn();
    return;
  }

  const dmg = dmgCalc(p);
  log(`${p.name} attacks for ${dmg} damage!`, "good");
  applyDamage(e, dmg);

  if (!checkWin()) nextTurn();
}

function playerSkill() {
  const p = state.player, e = state.enemy;
  const res = p.base.skill(p, e, state);

  if (!res.ok) {
    log(res.msg, "warn");
    return;
  }

  log(res.msg, "good");
  updateUI();
  if (!checkWin()) nextTurn();
}

function playerEndTurn() {
  log("You ended your turn.", "warn");
  nextTurn();
}

/* Picking */
function renderPick() {
  const grid = $("pickGrid");
  grid.innerHTML = "";

  CARDS.forEach(card => {
    const div = document.createElement("div");
    div.className = "cardPick";
    div.innerHTML = `
      <img src="${card.img}" alt="${card.name}" />
      <div class="titleRow" style="margin-top:10px;">
        <strong>${card.name}</strong>
        <span class="pill">ATK ${card.atk} • DEF ${card.def} • HP ${card.hp}</span>
      </div>
      <div class="muted" style="margin-top:6px;">
        <b>${card.skillName}:</b> ${card.skillDesc}
      </div>
    `;
    div.onclick = () => startGame(card.id);
    grid.appendChild(div);
  });
}

function renderGallery() {
  const grid = $("galleryGrid");
  if (!grid) return;
  grid.innerHTML = "";

  CARDS.forEach(card => {
    const div = document.createElement("div");
    div.className = "cardPick";
    div.innerHTML = `
      <img src="${card.img}" alt="${card.name}" />
      <div class="titleRow" style="margin-top:10px;">
        <strong>${card.name}</strong>
        <span class="pill">ATK ${card.atk} • DEF ${card.def} • HP ${card.hp}</span>
      </div>
      <div class="muted" style="margin-top:6px;">
        <b>${card.skillName}:</b> ${card.skillDesc}
      </div>
      <div class="muted" style="margin-top:8px;">
        <b>Enemy passive:</b> Can trigger automatically each round if this card is the enemy.
      </div>
    `;
    grid.appendChild(div);
  });
}

/* ===== SHOP ===== */
function renderShop() {
  const grid = $("shopGrid");
  grid.innerHTML = "";

  FUTURE_CARDS.forEach(item => {
    const owned = !!state.owned[item.id];
    const canBuy = state.gold >= item.price;

    const div = document.createElement("div");
    div.className = "shopItem";
    div.innerHTML = `
      <div class="shopItemTop">
        <div>
          <h3 class="shopName">${item.name}</h3>
          <div class="shopMeta">
            <span class="badge">Price: ${item.price} Gold</span>
            ${owned ? `<span class="badge badgeOwned">Owned</span>` : `<span class="badge">Upcoming</span>`}
          </div>
        </div>
      </div>

      <p class="shopDesc">${item.desc}</p>

      <div class="shopActions">
        <button class="btn btnPrimary" ${owned ? "disabled" : (!canBuy ? "disabled" : "")} data-buy="${item.id}">
          ${owned ? "✅ Owned" : (canBuy ? "Buy" : "Not Enough Gold")}
        </button>
      </div>
    `;
    grid.appendChild(div);
  });

  grid.querySelectorAll("button[data-buy]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-buy");
      buyFutureCard(id);
    });
  });
}

function buyFutureCard(id) {
  const item = FUTURE_CARDS.find(x => x.id === id);
  if (!item) return;

  if (state.owned[id]) return;
  if (state.gold < item.price) return;

  state.gold -= item.price;
  state.owned[id] = true;
  saveProgress();
  updateGoldUI();
  renderShop();

  alert(`Purchased: ${item.name} ✅ (Saved as Owned)`);
}

function startGame(playerCardId) {
  state.stage = 1;

  const playerBase = CARDS.find(c => c.id === playerCardId);
  const pool = CARDS.filter(c => c.id !== playerCardId);
  const enemyBase = pool[Math.floor(Math.random() * pool.length)];

  state.player = cloneCard(playerBase);
  state.enemy = cloneCard(enemyBase);
  state.enemy.passiveEnabled = true;

  state.phase = "battle";
  state.turn = "player";
  state.round = 1;

  showView("game");
  $("log").innerHTML = "";
  log(`🔥 Stage ${state.stage}: You picked ${state.player.name}. Enemy is ${state.enemy.name}.`, "warn");

  tryEnemyPassive();
  updateUI();
}

function resetAll() {
  closeModal();

  state.phase = "pick";
  state.turn = "player";
  state.round = 1;
  state.stage = 1;
  state.player = null;
  state.enemy = null;

  renderPick();
  showView("setup");
}

/* Modal buttons */
$("btnNextEnemy").addEventListener("click", () => {
  // ✅ if defeated, button is hidden anyway; but this extra safety prevents weird bugs
  if (state.phase === "over") return;

  closeModal();
  state.stage += 1;
  spawnNextEnemy();
});

$("btnPlayAgain").addEventListener("click", () => {
  closeModal();
  resetAll();
});

/* Bind battle buttons */
$("btnAttack").addEventListener("click", playerAttack);
$("btnSkill").addEventListener("click", playerSkill);
$("btnEnd").addEventListener("click", playerEndTurn);
$("btnReset").addEventListener("click", resetAll);

/* Navigation */
const safeOn = (id, fn) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("click", fn);
};

safeOn("btnBattleNow", () => { resetAll(); });
safeOn("btnOpenGallery", () => { renderGallery(); showView("gallery"); });
safeOn("btnBackHomeFromGallery", () => { showView("home"); });
safeOn("btnGalleryToBattle", () => { resetAll(); });
safeOn("btnBackHomeFromSetup", () => { showView("home"); });
safeOn("btnSetupGallery", () => { renderGallery(); showView("gallery"); });
safeOn("btnExitToHome", () => { showView("home"); });

/* Shop nav */
safeOn("btnOpenShop", () => { renderShop(); showView("shop"); });
safeOn("btnHomeShop", () => { renderShop(); showView("shop"); });
safeOn("btnShopBackHome", () => { showView("home"); });
safeOn("btnShopToBattle", () => { resetAll(); });

/* init */
loadProgress();
updateGoldUI();
renderPick();
renderGallery();
renderShop();
showView("home");
