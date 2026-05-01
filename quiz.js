// Banque de questions
const questions = [
  {
    titre: "Posologie",
    question: "Que signifie la posologie d'un médicament ?",
    reponses: [
      "La couleur de la boîte",
      "La dose, la fréquence et la durée de prise",
      "Le nom du laboratoire"
    ],
    bonneReponse: 1,
    explication:
      "La posologie correspond à une indication du dosage et de la fréquence de prise d'un médicament."
  },
  {
    titre: "Antibiotiques",
    question: "Pourquoi faut-il respecter la durée d'un traitement antibiotique ?",
    reponses: [
      "Pour finir la boîte uniquement",
      "Pour éviter l'échec du traitement et les résistances",
      "Pour pouvoir prendre d'autres médicaments"
    ],
    bonneReponse: 2,
    explication:
      "Arrêter trop tôt un antibiotique peut laisser survivre des bactéries et favoriser les résistances."
  },
  {
    titre: "Notice",
    question: "À quoi sert principalement la notice d'un médicament ?",
    reponses: [
      "À décorer l'emballage",
      "À donner les informations d'utilisation et les effets indésirables",
      "À remplacer totalement le médecin"
    ],
    bonneReponse: 1,
    explication:
      "La notice explique comment utiliser le médicament, les précautions et les effets indésirables possibles."
  },
  {
    titre: "A quoi sert le paracétamol ?",
    question: "Que faire en cas d'oubli de prise d'un médicament ?",
    reponses: [
      "Soigner une infection",
      "Diminuer la douleur et la fièvre",
      "Faire dormir"
    ],
    bonneReponse: 2,
    explication:
      "Le paracétamol est utilisé pour soulager la douleur (maux de tête, courbatures…) et faire baisser la fièvre. Il ne traite pas les infections."
  },
];

// Variables d'état
let score = 0;
let questionIndex = 0;

// Mélange des questions pour avoir un ordre aléatoire
function shuffle(array) {
  const copie = array.slice();
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copie[i];
    copie[i] = copie[j];
    copie[j] = temp;
  }
  return copie;
}

const questionsMelangees = shuffle(questions);

// Récupération des éléments HTML
const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const feedback = document.getElementById("feedback");
const scoreSpan = document.getElementById("score");
const totalSpan = document.getElementById("total");
const nextButton = document.getElementById("next-question");

// Affiche une question
function afficherQuestion() {
  feedback.textContent = "";
  answersContainer.innerHTML = "";

  const q = questionsMelangees[questionIndex];
  questionTitle.textContent = q.titre;
  questionText.textContent = q.question;

  scoreSpan.textContent = score;
  totalSpan.textContent = questionsMelangees.length;

  q.reponses.forEach(function (texteReponse, index) {
    const bouton = document.createElement("button");
    bouton.textContent = texteReponse;
    bouton.style.display = "block";
    bouton.style.marginBottom = "6px";
    bouton.addEventListener("click", function () {
      verifierReponse(index);
    });
    answersContainer.appendChild(bouton);
  });
}

// Vérifie la réponse choisie
function verifierReponse(indexChoisi) {
  const q = questionsMelangees[questionIndex];

  // On désactive les boutons après le choix
  const boutons = answersContainer.querySelectorAll("button");
  boutons.forEach(function (btn) {
    btn.disabled = true;
  });

  if (indexChoisi === q.bonneReponse) {
    score++;
    feedback.textContent = "Bonne réponse. " + q.explication;
  } else {
    const bonne = q.reponses[q.bonneReponse];
    feedback.textContent =
      "Mauvaise réponse. La bonne réponse était : " +
      bonne +
      ". " +
      q.explication;
  }

  scoreSpan.textContent = score;
}

// Gestion du bouton "Question suivante"
if (nextButton) {
  nextButton.addEventListener("click", function () {
    questionIndex++;

    if (questionIndex >= questionsMelangees.length) {
      feedback.textContent =
        "Quiz terminé. Votre score est de " +
        score +
        " / " +
        questionsMelangees.length +
        ".";
      answersContainer.innerHTML = "";
      nextButton.disabled = true;
    } else {
      afficherQuestion();
    }
  });
}

// Affiche la première question au chargement
if (
  questionTitle &&
  questionText &&
  answersContainer &&
  feedback &&
  scoreSpan &&
  totalSpan
) {
  afficherQuestion();
}