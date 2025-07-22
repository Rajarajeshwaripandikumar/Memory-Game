const termsAndDefinitions = [
  { term: "Phishing", definition: "A scam where attackers trick users into revealing sensitive information." },
  { term: "API", definition: "A set of rules that allow different software applications to communicate." },
  { term: "Cloud Computing", definition: "Delivery of computing services over the Internet." },
  { term: "Firewall", definition: "A network security device that monitors and filters traffic." },
  { term: "Encryption", definition: "Process of converting information into code to prevent unauthorized access." },
  { term: "AI", definition: "Simulation of human intelligence in machines." }
];

const gameBoard = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');

let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCard(content, type) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.content = content;
  card.dataset.type = type;
  card.textContent = "Click to Reveal";

  card.addEventListener('click', () => handleCardClick(card));
  return card;
}

function initializeGame() {
  gameBoard.innerHTML = '';
  flippedCards = [];
  matchedPairs = 0;

  const allCards = [];

  termsAndDefinitions.forEach(pair => {
    allCards.push(createCard(pair.term, "term"));
    allCards.push(createCard(pair.definition, "definition"));
  });

  shuffle(allCards).forEach(card => gameBoard.appendChild(card));
}

function handleCardClick(card) {
  if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length === 2) {
    return;
  }

  card.classList.add('flipped');
  card.textContent = card.dataset.content;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;

  const isMatch =
    (card1.dataset.type !== card2.dataset.type) &&
    (
      (card1.dataset.type === "term" && termsAndDefinitions.find(pair => pair.term === card1.dataset.content && pair.definition === card2.dataset.content)) ||
      (card2.dataset.type === "term" && termsAndDefinitions.find(pair => pair.term === card2.dataset.content && pair.definition === card1.dataset.content))
    );

  if (isMatch) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    flippedCards = [];
    matchedPairs++;

    if (matchedPairs === termsAndDefinitions.length) {
      setTimeout(() => alert("🎉 Congratulations! You matched all pairs!"), 500);
    }

  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = "Click to Reveal";
      card2.textContent = "Click to Reveal";
      flippedCards = [];
    }, 1000);
  }
}

restartBtn.addEventListener('click', initializeGame);
