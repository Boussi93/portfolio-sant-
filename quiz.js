// Questions du quiz
var questions = [
  {
    titre: "Posologie",
    question: "Que signifie la posologie d'un médicament ?",
    reponses: [
      "La couleur de la boîte",                                // 0
      "La dose, la fréquence et la durée de prise",            // 1 (bonne)
      "Le nom du laboratoire"                                  // 2
    ],
    bonneReponse: 1,
    explication:
      "La posologie correspond à une indication du dosage et de la fréquence de prise d'un médicament."
  },
  {
    titre: "Antibiotiques",
    question: "Pourquoi faut-il respecter la durée d'un traitement antibiotique ?",
    reponses: [
      "Pour finir la boîte uniquement",                        // 0
      "Pour éviter l'échec du traitement et les résistances",  // 1 (bonne)
      "Pour pouvoir prendre d'autres médicaments"              // 2
    ],
    bonneReponse: 1,
    explication:
      "Arrêter trop tôt un antibiotique peut laisser survivre des bactéries et favoriser les résistances."
  },
  {
    titre: "Notice",
    question: "À quoi sert principalement la notice d'un médicament ?",
    reponses: [
      "À décorer l'emballage",                                 // 0
      "À donner les informations d'utilisation et les effets indésirables", // 1 (bonne)
      "À remplacer totalement le médecin"                      // 2
    ],
    bonneReponse: 1,
    explication:
      "La notice explique comment utiliser le médicament, les précautions et les effets indésirables possibles."
  },
  {
    titre: "Paracétamol",
    question: "A quoi sert le paracétamol ?",
    reponses: [
      "Soigner une infection",                                 // 0
      "Diminuer la douleur et la fièvre",                      // 1 (bonne)
      "Faire dormir"                                           // 2
    ],
    bonneReponse: 1,
    explication:
      "Le paracétamol est utilisé pour soulager la douleur (maux de tête, courbatures…) et faire baisser la fièvre. Il ne traite pas les infections."
  }
];

// Variables d'état
var score = 0;
var questionIndex = 0;

// Mélange des questions pour avoir un ordre aléatoire
function shuffle(array) {
  var copie = array.slice();
  for (var i = copie.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = copie[i];
    copie[i] = copie[j];
    copie[j] = temp;
  }
  return copie;
}

var questionsMelangees = shuffle(questions);

// Récupération des éléments HTML
var questionTitle = document.getElementById("question-title");
var questionText = document.getElementById("question-text");
var answersContainer = document.getElementById("answers-container");
var feedback = document.getElementById("feedback");
var scoreSpan = document.getElementById("score");
var totalSpan = document.getElementById("total");
var nextButton = document.getElementById("next-question");

// Affiche une question
function afficherQuestion() {
  feedback.textContent = "";
  answersContainer.innerHTML = "";

  var q = questionsMelangees[questionIndex];
  questionTitle.textContent = q.titre;
  questionText.textContent = q.question;

  scoreSpan.textContent = score;
  totalSpan.textContent = questionsMelangees.length;

  q.reponses.forEach(function (texteReponse, index) {
    var bouton = document.createElement("button");
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
  var q = questionsMelangees[questionIndex];

  var boutons = answersContainer.querySelectorAll("button");
  boutons.forEach(function (btn, idx) {
    btn.disabled = true;
    btn.classList.remove("selected", "correct", "wrong");
    if (idx === indexChoisi) {
      btn.classList.add("selected");
    }
    if (idx === q.bonneReponse) {
      btn.classList.add("correct");
    }
  });

  if (indexChoisi === q.bonneReponse) {
    score++;
    feedback.textContent = "Bonne réponse. " + q.explication;
  } else {
    var bonne = q.reponses[q.bonneReponse];
    feedback.textContent =
      "Mauvaise réponse. La bonne réponse était : " +
      bonne +
      ". " +
      q.explication;
  }

  scoreSpan.textContent = score;
}

// Bouton "Question suivante"
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
