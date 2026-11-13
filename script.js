const potions = [
  {
    id: 1, name: "Elixir Restaurador", category: "Cura", icon: "✚", glow: "#4d9b78",
    short: "Uma preparação conhecida por auxiliar na recuperação de energia.",
    description: "Um elixir de tonalidade verde, tradicionalmente associado à restauração e ao equilíbrio das forças vitais.",
    purpose: "Auxilia na recuperação de energia após atividades mágicas intensas.",
    difficulty: "Intermediária", duration: "Efeito temporário",
    sideEffects: "Cansaço leve quando usado em excesso, segundo os registros fictícios.",
    ingredients: ["Orvalho de folhas antigas", "Pétalas de lírio branco", "Essência verdejante", "Água da fonte lunar"]
  },
  {
    id: 2, name: "Poção da Clarividência", category: "Percepção", icon: "✧", glow: "#9b68bd",
    short: "Associada a vislumbres simbólicos de possibilidades futuras.",
    description: "Uma mistura violeta estudada por aprendizes que desejam compreender sinais, presságios e possibilidades.",
    purpose: "Permite vislumbrar imagens simbólicas de possíveis acontecimentos.",
    difficulty: "Avançada", duration: "Alguns minutos",
    sideEffects: "Visões fragmentadas e dificuldade temporária de concentração.",
    ingredients: ["Artemísia prateada", "Pétalas de lótus lunar", "Pó de ametista", "Essência de névoa"]
  },
  {
    id: 3, name: "Elixir de Proteção", category: "Proteção", icon: "⬡", glow: "#5b91b9",
    short: "Um preparado simbólico para reforçar barreiras mágicas.",
    description: "Mantido nos arquivos de defesa alquímica, este elixir representa a criação de uma camada protetora ao redor de seu portador.",
    purpose: "Reforça temporariamente escudos e barreiras mágicas.",
    difficulty: "Intermediária", duration: "Até uma hora",
    sideEffects: "Pode tornar outras conjurações menos precisas durante sua duração.",
    ingredients: ["Sal de prata", "Casca de carvalho", "Pó de quartzo", "Gotas de chuva"]
  },
  {
    id: 4, name: "Poção da Vitalidade", category: "Fortalecimento", icon: "✺", glow: "#c18a50",
    short: "Relacionada ao vigor e à disposição durante práticas mágicas.",
    description: "Um líquido âmbar que aparece em antigos registros de alquimia como símbolo de vigor e determinação.",
    purpose: "Amplifica temporariamente a disposição e a energia mágica.",
    difficulty: "Básica", duration: "Cerca de trinta minutos",
    sideEffects: "Agitação e dificuldade para relaxar após o efeito.",
    ingredients: ["Raiz dourada", "Mel silvestre", "Pólen solar", "Casca de canela"]
  },
  {
    id: 5, name: "Elixir Onírico", category: "Percepção", icon: "☾", glow: "#6489b7",
    short: "Vinculado ao estudo dos sonhos e da memória onírica.",
    description: "De brilho azulado, é descrito em manuscritos como uma poção ligada ao território dos sonhos e aos símbolos do inconsciente.",
    purpose: "Favorece sonhos lúcidos e recordação de imagens oníricas.",
    difficulty: "Avançada", duration: "Durante um ciclo de sono",
    sideEffects: "Sonhos intensos e sensação de desorientação ao despertar.",
    ingredients: ["Lavanda azul", "Pétalas de flor-da-noite", "Pó de pedra da lua", "Essência de névoa"]
  },
  {
    id: 6, name: "Poção da Metamorfose", category: "Transformação", icon: "❋", glow: "#b56b83",
    short: "Um registro raro sobre alterações temporárias de aparência.",
    description: "Uma poção de estudo avançado, cercada de restrições nos arquivos da academia por envolver transformações temporárias.",
    purpose: "Altera aspectos superficiais da aparência por um período limitado.",
    difficulty: "Especialista", duration: "Varia conforme a fórmula fictícia",
    sideEffects: "A transformação pode apresentar instabilidade e se desfazer antes do esperado.",
    ingredients: ["Essência camaleônica", "Pétalas de rosa escura", "Pó de madrepérola", "Orvalho da meia-noite"]
  }
];

const grid = document.querySelector("#potion-grid");
const searchInput = document.querySelector("#search-input");
const filters = [...document.querySelectorAll(".filter")];
const emptyState = document.querySelector("#empty-state");
const resultCount = document.querySelector("#result-count");
const modal = document.querySelector("#potion-modal");
const closeButton = document.querySelector("#modal-close");
let activeFilter = "Todas";

function renderPotions() {
  const search = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  const filtered = potions.filter(potion => {
    const matchesCategory = activeFilter === "Todas" || potion.category === activeFilter;
    const matchesSearch = `${potion.name} ${potion.category} ${potion.short}`.toLocaleLowerCase("pt-BR").includes(search);
    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = filtered.map(potion => `
    <button class="potion-card" type="button" data-id="${potion.id}" style="--glow:${potion.glow}" aria-label="Ver detalhes de ${potion.name}">
      <div class="card-art"><span class="potion-icon">${potion.icon}</span></div>
      <div class="card-info">
        <span class="card-category">${potion.category}</span>
        <h3>${potion.name}</h3>
        <p>${potion.short}</p>
        <span class="card-link">CONSULTAR REGISTRO ↗</span>
      </div>
    </button>
  `).join("");

  resultCount.textContent = String(filtered.length).padStart(2, "0");
  emptyState.hidden = filtered.length !== 0;
}

function openPotion(id) {
  const potion = potions.find(item => item.id === Number(id));
  if (!potion) return;

  document.querySelector("#modal-category").textContent = `REGISTRO ALQUÍMICO • ${potion.category}`;
  document.querySelector("#modal-title").textContent = potion.name;
  document.querySelector("#modal-description").textContent = potion.description;
  document.querySelector("#modal-purpose").textContent = potion.purpose;
  document.querySelector("#modal-difficulty").textContent = potion.difficulty;
  document.querySelector("#modal-duration").textContent = potion.duration;
  document.querySelector("#modal-side-effects").textContent = potion.sideEffects;
  document.querySelector("#modal-ingredients").innerHTML = potion.ingredients.map(item => `<li>${item}</li>`).join("");
  const visual = document.querySelector("#modal-visual");
  visual.style.setProperty("--modal-glow", potion.glow);
  visual.querySelector("span").textContent = potion.icon;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeButton.focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

grid.addEventListener("click", event => {
  const card = event.target.closest(".potion-card");
  if (card) openPotion(card.dataset.id);
});

searchInput.addEventListener("input", renderPotions);
filters.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach(item => item.classList.toggle("active", item === button));
    renderPotions();
  });
});

closeButton.addEventListener("click", closeModal);
modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
});

renderPotions();
