const utilisateurs = [];
let utilisateurConnecte = null;

// Récupération des éléments HTML
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const authMessage = document.getElementById("auth-message");
const zonePrivee = document.getElementById("zone-privee");
const logoutButton = document.getElementById("logout-button");

// Met à jour l'affichage selon l'état de connexion
function mettreAJourAffichage() {
  if (!zonePrivee || !authMessage) {
    return;
  }

  if (utilisateurConnecte) {
    zonePrivee.style.display = "block";
    authMessage.textContent =
      "Connecté en tant que : " + utilisateurConnecte.email;
  } else {
    zonePrivee.style.display = "none";
    authMessage.textContent = "";
  }
}

// Gestion de la création de compte
if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nom = document.getElementById("register-name").value.trim();
    const email = document
      .getElementById("register-email")
      .value.trim()
      .toLowerCase();
    const password = document.getElementById("register-password").value;

    if (!nom || !email || !password) {
      authMessage.textContent =
        "Veuillez remplir tous les champs pour créer un compte.";
      return;
    }

    const deja = utilisateurs.find(function (u) {
      return u.email === email;
    });

    if (deja) {
      authMessage.textContent =
        "Un compte existe déjà avec cet email.";
      return;
    }

    utilisateurs.push({ nom: nom, email: email, password: password });
    authMessage.textContent =
      "Compte créé pour " + nom + ". Vous pouvez maintenant vous connecter.";
    registerForm.reset();
  });
}

// Gestion de la connexion
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document
      .getElementById("login-email")
      .value.trim()
      .toLowerCase();
    const password = document.getElementById("login-password").value;

    const trouve = utilisateurs.find(function (u) {
      return u.email === email && u.password === password;
    });

    if (!trouve) {
      authMessage.textContent =
        "Identifiants incorrects ou compte inexistant.";
      return;
    }

    utilisateurConnecte = trouve;
    loginForm.reset();
    mettreAJourAffichage();
  });
}

// Déconnexion
if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    utilisateurConnecte = null;
    mettreAJourAffichage();
  });
}

// Initialisation
mettreAJourAffichage();