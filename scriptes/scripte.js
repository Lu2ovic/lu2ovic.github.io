let howModal = false;
//code du défillement

const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

//gestion du menu

document
  .querySelector("nav>ul>.iconeMenu")
  .addEventListener("click", function () {
    document.querySelector(".menuMobile").classList.toggle("afficheM");
    document.querySelector("nav>ul>.iconeMenu").classList.toggle("afficheM");
  });

//Spy scroll

window.onload = () => {
  let sections = document.querySelectorAll("section");
  let currentActive = null;

  // Fonction pour trouver la section la plus proche du haut de la page
  const findClosestSection = () => {
    let closestSection = null;
    let minDistance = Infinity;

    sections.forEach((section) => {
      let rect = section.getBoundingClientRect();
      let distance = Math.abs(rect.top);

      if (distance < minDistance) {
        minDistance = distance;
        closestSection = section;
      }
    });

    return closestSection;
  };

  // Fonction pour mettre à jour l'élément actif
  const updateActiveMenu = (activeSection) => {
    if (currentActive !== activeSection) {
      currentActive = activeSection;

      // Désactiver tous les menus
      let nomMenus = document.querySelectorAll("nav>ul>li>a");
      let nomMenusupr = document.querySelectorAll(".menuMobile>ul>li>a");

      for (let nomMenu of nomMenus) {
        nomMenu.classList.remove("active", "active-start");
      }

      for (let nomMenu of nomMenusupr) {
        nomMenu.classList.remove("active", "active-start");
      }

      // Activer le menu correspondant
      let nomMenus2 = document.querySelectorAll(
        `[data-id=${activeSection.id}]`
      );
      for (let nomMenu2 of nomMenus2) {
        nomMenu2.classList.add("active");
        setTimeout(() => {
          nomMenu2.classList.add("active-start");
        }, 10);
      }
    }
  };

  // IntersectionObserver pour détecter les changements de visibilité des sections
  let observer = new IntersectionObserver(
    (observables) => {
      let visibleSections = observables
        .filter((observable) => observable.intersectionRatio > 0.1)
        .map((observable) => observable.target);

      if (visibleSections.length > 0) {
        let activeSection = findClosestSection();
        updateActiveMenu(activeSection);
      }
    },
    {
      threshold: [0.1, 0.5, 0.75],
    }
  );

  // Observer les sections
  sections.forEach((section) => observer.observe(section));

  // Écouter l'événement de scroll pour gérer les cas où on défile vers le haut
  window.addEventListener("scroll", () => {
    let activeSection = findClosestSection();
    updateActiveMenu(activeSection);
  });
};

// animation des yeux                                    //////////////

document.addEventListener("DOMContentLoaded", function () {
  const pupilles = document.querySelectorAll(".pupille");

  document.addEventListener("mousemove", function (e) {
    pupilles.forEach((pupille) => {
      // Obtenir les coordonnées du centre de l'œil
      const eyeRect = pupille.parentElement.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      // Obtenir les coordonnées de la souris
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calculer les distances
      const deltaX = mouseX - eyeCenterX;
      const deltaY = mouseY - eyeCenterY;
      const angle = Math.atan2(deltaY, deltaX);

      // Calculer la distance maximale que la pupille peut se déplacer
      const eyeRadius = Math.min(eyeRect.width, eyeRect.height) / 2;
      const pupilRadius = 30 / 2; // La moitié de la taille de la pupille
      const maxDistance = eyeRadius - pupilRadius;

      // Calculer la nouvelle position de la pupille
      const distance = Math.min(
        Math.sqrt(deltaX * deltaX + deltaY * deltaY),
        maxDistance
      );
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      // Appliquer la transformation
      pupille.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    });
  });
});

//      curseur personalisé            /////////

const cursor = document.querySelector(".cursor");
cursor.style.display = "none";
const cursorSizeY = 35;
const cursorSizeX = 25;

document.addEventListener("mousemove", (e) => {
  if (isMobile()) return;
  let x = e.pageX;
  let y = e.pageY;

  // Limite la position à la largeur totale de la fenêtre moins la taille du curseur
  if (x + cursorSizeX > document.documentElement.clientWidth) {
    x = document.documentElement.clientWidth - cursorSizeX;
  }

  // Limite la position à la hauteur totale du document moins la taille du curseur
  if (y + cursorSizeY > document.documentElement.scrollHeight) {
    y = document.documentElement.scrollHeight - cursorSizeY;
  }

  cursor.setAttribute("style", "top:" + y + "px; left:" + x + "px;");
});

// Masquer le curseur personnalisé lorsque la souris quitte l'écran du site
document.addEventListener("mouseleave", () => {
  cursor.style.display = "none";
});

// Réafficher le curseur personnalisé lorsque la souris entre dans l'écran du site
document.addEventListener("mouseenter", () => {
  cursor.style.display = "block";
});

// Appliquer et retirer la classe grow lors du survol des liens et des boutons
document
  .querySelectorAll(
    "a, button, .iconeMenu, .boutonVoir, .close-button, .link-modal"
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("grow");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("grow");
    });
  });

//          loader

const loader = document.querySelector(".loader");

window.addEventListener("load", () => {
  loader.classList.add("fondu-out");
  setTimeout(() => {
    loader.classList.add("loader-out");
  }, 400);
});

//          rotation pour le contact

const h2Element = document.querySelector("#contact h2");

function applyTransforms() {
  const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

  // Link 1
  document.querySelectorAll("#contact div a:nth-child(1)").forEach((link) => {
    link.addEventListener("mouseover", () => {
      if (isSmallScreen) {
        h2Element.style.transform = "translate(-15px, 150px) rotate(40deg)";
      } else {
        h2Element.style.transform = "translate(-30px, 200px) rotate(60deg)";
      }
    });

    link.addEventListener("mouseout", () => {
      if (isSmallScreen) {
        h2Element.style.transform = "translate(0px, 150px) rotate(0deg)";
      } else {
        h2Element.style.transform = "translate(0px, 200px) rotate(0deg)";
      }
    });
  });

  // Mail Link (Middle)
  document.querySelectorAll("#contact .mail").forEach((link) => {
    link.addEventListener("mouseover", () => {
      if (isSmallScreen) {
        h2Element.style.transform = "translate(0px, 165px) rotate(0deg)";
      } else {
        h2Element.style.transform = "translate(0px, 230px) rotate(0deg)";
      }
    });

    link.addEventListener("mouseout", () => {
      if (isSmallScreen) {
        h2Element.style.transform = "translate(0px, 150px) rotate(0deg)";
      } else {
        h2Element.style.transform = "translate(0px, 200px) rotate(0deg)";
      }
    });
  });

  // Link 3
  document.querySelectorAll("#contact a:nth-child(3)").forEach((link) => {
    link.addEventListener("mouseover", () => {
      if (isSmallScreen) {
        h2Element.style.transform = "translate(15px, 150px) rotate(-40deg)";
      } else {
        h2Element.style.transform = "translate(30px, 200px) rotate(-60deg)";
      }
    });

    link.addEventListener("mouseout", () => {
      if (isSmallScreen) {
        h2Element.style.transform = "translate(0px, 150px) rotate(0deg)";
      } else {
        h2Element.style.transform = "translate(0px, 200px) rotate(0deg)";
      }
    });
  });
}

// Appliquer les transformations lors du chargement de la page
applyTransforms();

// Réappliquer les transformations lors du redimensionnement de la fenêtre
window.addEventListener("resize", applyTransforms);

// orientation des tablettes

const tablets = document.querySelectorAll(".orientationTab");

// ✅ Vérifie si c’est un appareil mobile
function isMobile() {
  return window.innerWidth <= 768;
}

function updateRotation(e) {
  if (isMobile()) return; // ⛔ Ne fait rien sur mobile
  //if (howModal) return;    > pour arrêter l'animation des tablettes lors de l'ouverture du modal

  tablets.forEach((tablet) => {
    const carouselItem = tablet.closest(".carousel-item");
    if (carouselItem && !carouselItem.classList.contains("visible")) return;

    const rect = tablet.getBoundingClientRect();

    const isVisibleInViewport =
      rect.bottom > 0 &&
      rect.right > 0 &&
      rect.top < window.innerHeight &&
      rect.left < window.innerWidth;
    if (!isVisibleInViewport) return;

    const xAxis = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const yAxis = (e.clientY - (rect.top + rect.height / 2)) / rect.height;

    const maxRotation = 20;
    const rotateX = Math.max(
      Math.min(yAxis * maxRotation, maxRotation),
      -maxRotation
    );
    const rotateY = Math.max(
      Math.min(-xAxis * maxRotation, maxRotation),
      -maxRotation
    );

    tablet.style.transform = `rotateX(${-rotateX}deg) rotateY(${-rotateY}deg)`;

    /*const shadowX = rotateY * 2;      --> utilise beaucoup de ressoures = lag
    const shadowY = -rotateX * 2;
    const shadowBlur = 20 + Math.abs(rotateX) + Math.abs(rotateY);

    tablet.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.3),
                                   ${shadowX / 2}px ${shadowY / 2}px ${shadowBlur / 1.5}px rgba(0, 0, 0, 0.15)`;*/
  });
}

let isRequesting = false;

document.addEventListener("mousemove", function (e) {
  if (isMobile()) return; // ⛔ Ignore complètement l’event sur mobile

  if (!isRequesting) {
    isRequesting = true;
    requestAnimationFrame(() => {
      updateRotation(e);
      isRequesting = false;
    });
  }
});

// carrousel

const carouselItems = document.querySelectorAll(".carousel-item");
const dotsContainer = document.querySelector(".carousel-dots");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let currentIndex = 0;

let positions = [
  { top: "10%", left: "0%" },
  { top: "19%", left: "33.3333%" },
  { top: "27%", left: "66.6666%" },
];

const updatePositions = () => {
  carouselItems.forEach((item, index) => {
    // Calcul du positionnement en boucle
    let posIndex =
      (index - currentIndex + carouselItems.length) % carouselItems.length;

    item.classList.remove("front", "center", "back");

    if (posIndex >= 0 && posIndex < 3) {
      // Réassigner les positions selon le tableau positions
      item.style.top = positions[posIndex].top;
      item.style.left = positions[posIndex].left;
      item.classList.add("visible");

      // Définir le z-index en fonction de la position
      if (posIndex === 0) {
        item.classList.add("back");
      } else if (posIndex === 1) {
        item.classList.add("center");
      } else if (posIndex === 2) {
        item.classList.add("front");
      }
    } else {
      item.classList.remove("visible");
    }
  });
};

const updateDots = () => {
  dotsContainer.innerHTML = "";

  carouselItems.forEach((item, index) => {
    const dot = document.createElement("span");
    if (index === currentIndex) {
      dot.classList.add("active");
    } else if (
      index ===
        (currentIndex - 1 + carouselItems.length) % carouselItems.length ||
      index === (currentIndex + 1) % carouselItems.length
    ) {
      dot.classList.add("middle");
    }
    dotsContainer.appendChild(dot);
  });
};

const updateCarousel = () => {
  updatePositions();
  updateDots();
};

prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
});

// Initialisation
updateDots();
updateCarousel();

// Fonction pour ajuster les positions en fonction de la taille de l'écran
const adjustPositionsForScreenSize = () => {
  if (window.innerWidth <= 630) {
    positions = [
      { top: "10%", left: "-30%" },
      { top: "19%", left: "33.3333%" },
      { top: "27%", left: "96%" },
    ];
  } else {
    positions = [
      { top: "10%", left: "0%" },
      { top: "19%", left: "33.3333%" },
      { top: "27%", left: "66.6666%" },
    ];
  }

  updateCarousel();
};

adjustPositionsForScreenSize();
window.addEventListener("resize", adjustPositionsForScreenSize);

//        canva des logos de compétences
// Fonction pour générer des positions aléatoires
function getRandomPosition(canvasWidth, canvasHeight, logoWidth, logoHeight) {
  const x = Math.random() * (canvasWidth - logoWidth);
  const y = Math.random() * (canvasHeight - logoHeight);
  return { x, y };
}

// Fonction pour initialiser un canvas avec des logos
function initializeCanvas(canvasId, logos, infoBulleId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    if (window.innerWidth <= 768) {
      canvas.width = window.innerWidth / 1.2;
    } else {
      canvas.width = window.innerWidth / 2.2;
    }
    canvas.height = window.innerHeight / 1.5;

    // Réinitialiser les positions des logos
    logos.forEach((logo) => {
      const { x, y } = getRandomPosition(
        canvas.width,
        canvas.height,
        logo.width,
        logo.height
      );
      logo.x = x;
      logo.y = y;
    });
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  logos.forEach((logo) => {
    const image = new Image();
    image.src = logo.img;
    logo.image = image;
    logo.width = logo.width || 50; // Définit la largeur par défaut à 50 si non spécifié
    logo.height = logo.height || 50;
  });

  let currentHoveredLogo = null;

  function drawLogos() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    logos.forEach((logo) => {
      ctx.drawImage(logo.image, logo.x, logo.y, logo.width, logo.height);
      logo.x += logo.dx;
      logo.y += logo.dy;

      // Collision
      if (logo.x + logo.width > canvas.width || logo.x < 0) {
        logo.dx *= -1;
      }
      if (logo.y + logo.height > canvas.height || logo.y < 0) {
        logo.dy *= -1;
      }
    });

    requestAnimationFrame(drawLogos);
  }

  function handleMouseMove(event) {
    const infoB = document.getElementById(infoBulleId);
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    let newHoveredLogo = null;

    logos.forEach((logo) => {
      if (
        mouseX > logo.x &&
        mouseX < logo.x + logo.width &&
        mouseY > logo.y &&
        mouseY < logo.y + logo.height
      ) {
        newHoveredLogo = logo;
      }
    });

    if (newHoveredLogo !== currentHoveredLogo) {
      currentHoveredLogo = newHoveredLogo;
      if (currentHoveredLogo) {
        infoB.style.display = "block";
        infoB.innerHTML = `<strong>${currentHoveredLogo.name}</strong><br>${currentHoveredLogo.description}`;
        document.querySelector(".cursor").classList.add("grow");
      } else {
        document.querySelector(".cursor").classList.remove("grow");
      }
    }
  }

  canvas.addEventListener("mousemove", handleMouseMove);
  drawLogos();
}

// Initialisation des canvases avec positions aléatoires
initializeCanvas(
  "logoCanvas",
  [
    {
      img: "../images/HTML5_logo_and_wordmark.svg.png",
      dx: 1.05,
      dy: 1.05,
      width: 80,
      height: 80,
      name: "HTML",
      description: "",
    },
    {
      img: "../images/LogoCss.png",
      dx: 1.05,
      dy: -1.05,
      width: 50,
      height: 80,
      name: "CSS",
      description: "",
    },
    {
      img: "../images/JavaScript-Logo.png",
      dx: 1.05,
      dy: 1.05,
      width: 140,
      height: 80,
      name: "JavaScript",
      description: "",
    },
    {
      img: "../images/LogoPhp.png",
      dx: 1.05,
      dy: -1.05,
      width: 80,
      height: 50,
      name: "PHP",
      description: "",
    },
    {
      img: "../images/Sql_logo.png",
      dx: 1.05,
      dy: -1.05,
      width: 80,
      height: 50,
      name: "SQL",
      description: "",
    },
    {
      img: "../images/Wordpress_Blue_logo.png",
      dx: -1.05,
      dy: 1.05,
      width: 80,
      height: 80,
      name: "Wordpress",
      description: "→ Utilisation du plugin Elementor",
    },
    {
      img: "../images/Visual_Studio_Code.png",
      dx: 1.05,
      dy: -1.05,
      width: 60,
      height: 60,
      name: "Visual Studio Code",
      description: "",
    },
    {
      img: "../images/Figma-logo.png",
      dx: 1.05,
      dy: -1.05,
      width: 80,
      height: 70,
      name: "Figma",
      description: "→ Création de maquette",
    },
    {
      img: "../images/react.png",
      dx: -1.05,
      dy: -1.05,
      width: 70,
      height: 70,
      name: "React",
      description: "",
    },
    {
      img: "../images/tailwind.png",
      dx: 1.05,
      dy: 1.05,
      width: 60,
      height: 50,
      name: "Tailwind",
      description: "→ Framework CSS",
    },
    {
      img: "../images/Typescript.png",
      dx: 1.05,
      dy: -1.05,
      width: 60,
      height: 60,
      name: "Typescript",
      description: "",
    },
    {
      img: "../images/logo-threejs.png",
      dx: -1.05,
      dy: 1.05,
      width: 60,
      height: 60,
      name: "Three.js",
      description: "→ 3D pour le web",
    },
    {
      img: "../images/prestashop.png",
      dx: 1.05,
      dy: -1.05,
      width: 60,
      height: 60,
      name: "Prestashop",
      description: "",
    },
  ],
  "infoBulle"
);

initializeCanvas(
  "logoCanvasBis",
  [
    {
      img: "../images/adobe-after-effects-logo-0.png",
      dx: 1.2,
      dy: -1.2,
      width: 80,
      height: 80,
      name: "AfterEffect",
      description: "→ Motion design",
    },
    {
      img: "../images/adobe-photoshop-logo-0.png",
      dx: -1.2,
      dy: 1.2,
      width: 80,
      height: 80,
      name: "Photoshop",
      description: "→ Création d'affiches",
    },
    {
      img: "../images/Illustrator-Logo.png",
      dx: -1.2,
      dy: 1.2,
      width: 100,
      height: 60,
      name: "Illustrator",
      description: "→ Création de logos/illustrations",
    },
    {
      img: "../images/3ds-max-logo.png",
      dx: -1.2,
      dy: -1.2,
      width: 60,
      height: 60,
      name: "3DS Max",
      description: "→ Initié au logiciel",
    },
    {
      img: "../images/logo_lottiefiles.webp",
      dx: 1.2,
      dy: -1.2,
      width: 60,
      height: 60,
      name: "LottieFiles",
      description: "→ Creation de loader",
    },
  ],
  "infoBulleBis"
);

// pages des projets

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".boutonVoir");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close-button");

  // Données pour les modals
  const modalData = {
    modal1: {
      title: "Site SPA",
      link: "",
      tabletSrc: { src: "/images/MiniaSPA.png", class: "coucher" },
      contexte:
        "Lors de ma seconde année en BUT Métier du Multimédia et de l’Internet, j’ai été amené à créer un site de SPA, avec un autre étudiant. <br>Le but du site est de permettre aux différentes SPA de France de présenter son refuge, et les animaux proposés à l'adoption. L'utilisateur pourra alors contacter le refuge pour rencontrer l'animal. Il était demandé pour ce projet était une bonne expérience utilisateur, et la création de fonctionnalités faites \"à la main\", en essayant de présenter une fonctionnalité novatrice, pour se démarquer. Nous avons à réaliser le logo pour la SPA, conçu la maquette du site, la base de données et coder le site.",
      realisation:
        "J'ai conçu le logo, participé à la création de la maquette sur Figma, et développé le back-end du site. Le logo, réalisé avec Illustrator, combine une police lisible à une icône de cœur avec une patte, reflétant l'identité de la SPA. Nous avons choisi une palette de couleurs incluant le jaune, une couleur chaleureuse adaptée pour un site de SPA, et le rouge pour les appels à l'action, symbolisant l'amour et l'adoption. <br/><br>La base de données, hébergée sur PhpMyAdmin, gère les informations sur les animaux, les refuges et les utilisateurs. Le site est développé en MVC avec HTML, PHP, CSS, JavaScript et SQL. Lorsqu'un utilisateur n'est pas connecté, il peut accéder aux animaux, aux refuges, aux articles, et à la page \"Comment aider ?\", mais sans possibilité de liker. Sur la page \"Adopter\", un filtre permet de trier les animaux par sexe, taille, espèce, etc. Les races sont affichées dynamiquement en fonction de l'espèce sélectionnée. La page \"Nos refuges\" propose une carte interactive et une barre de recherche pour trouver facilement un refuge. <br><br>Une fois connecté, l'utilisateur peut liker des animaux, avec les informations enregistrées en AJAX pour une expérience fluide. La page \"Favoris\" regroupe les animaux likés. J'ai également imaginé et conçu une fonctionnalité innovante appelée \"Tu préfères\", qui permet de comparer et de sélectionner des animaux, le préféré étant marqué d'un coup de cœur. <br><br>L'administrateur peut, de son côté, gérer les refuges, ajouter ou supprimer des animaux, et télécharger des photos pour leur profil.",
      carousel: [
        { type: "image", src: "/images/projets/siteSPA.png", alt: "site spa" },
        {
          type: "iframe",
          src: "https://www.youtube.com/embed/_etCFp5-Y80",
          alt: "presentation site SPA",
        },
        {
          type: "iframe",
          src: "https://www.youtube.com/embed/gfc7KRO3-K4",
          alt: "siteAdmin",
        },
        {
          type: "image",
          src: "/images/projets/FigmaSPA.png",
          alt: "figma site spa",
        },
      ],
    },
    modal2: {
      title: "Site Mairie",
      link: "fulleren.net",
      tabletSrc: { src: "/images/MiniaMairie.png", class: "" },
      contexte:
        "Dans le cadre de ma deuxième année en BUT MMI, j'ai eu 2 mois de stage à la mairie de Fulleren. Au cours de mon stage, j'ai été chargé de la refonte complète du site web communal. Le site précédent, développé sur JIMDO, avait un design dépassé. <br>L'objectif principal était de concevoir un site représentant Fulleren et fonctionnel en utilisant WordPress, tout en assurant une gestion simplifiée. <br><br>Ce projet visait à améliorer le design du site de la mairie, faciliter la publication d'actualités, et optimiser la gestion des informations pour le personnel de la mairie.<br>Le nouveau site n'est pas encore publié, mais devrait l'être dans les mois prochains.",
      realisation:
        "J'ai conçu un design sur mesure pour le site web de la mairie de Fulleren, en respectant l’identité visuelle de la commune. Pour cette tâche, j'ai utilisé un thème enfant et le plugin Elementor sur WordPress. <br>J'ai proposé plusieurs designs à la mairie. Ces propositions ont été discutées avec le personnel pour choisir celle qui correspondait le mieux à l'image de Fulleren.<br><br>J'ai mis en place un système d'articles facile à gérer, permettant au personnel de publier des articles avec les catégories pour organiser les articles par date et type. Pour l'accueil, j'ai intégré des shortcodes et du JavaScript afin d'afficher automatiquement les informations les plus récentes et les journaux communaux numérique, sans modifications manuelles répétés.<br><br>Les photos du site ont été sélectionnées et optimisées. J'ai également pris de nouvelles photos pour compléter celles de la mairie, notamment pour les nouvelles pages comme celle de la journée citoyenne.<br>J'ai mis à jour les informations obsolètes en collaboration avec la secrétaire de la mairie et rédigé de nouveaux contenus adaptés pour le web. Enfin, j'ai réalisé un guide d'utilisation du site avec InDesign, offrant des explications claires et des captures d’écran pour faciliter la gestion du site par le personnel.",
      carousel: [
        {
          type: "image",
          src: "/images/projets/Mairie1.png",
          alt: "site de mairie",
        },
        {
          type: "iframe",
          src: "https://www.youtube.com/embed/RGA4yBK4Fx0",
          alt: "presentation site de mairie",
        },
        {
          type: "image",
          src: "/images/projets/Mairie2.png",
          alt: "site de mairie",
        },
        {
          type: "image",
          src: "/images/projets/Mairie3.png",
          alt: "site de mairie",
        },
        {
          type: "image",
          src: "/images/projets/Mairie4.png",
          alt: "site de mairie",
        },
      ],
    },
    modal3: {
      title: "Site astronaute",
      link: "",
      tabletSrc: { src: "/images/MiniaAstronaute.png", class: "" },
      contexte:
        "Lors de ma deuxième année de BUT MMI, j'ai réalisé un site dédié à la datavisualisation. L'objectif était de rendre les données plus compréhensibles en les présentant sous forme de graphiques, d'illustrations, et d'autres éléments visuels. J'ai choisi pour thème \"L'Homme dans l'espace\". Le site explore les différentes missions spatiales habitées depuis Youri Gagarine, le premier homme à voyager dans l'espace en 1961. Les données utilisées proviennent principalement d'articles de l'Agence spatiale européenne (ESA).",
      realisation:
        "Avec les informations à ma disposition, j'ai structuré le site de la manière suivante : les dates clé en premier, suivies d'une visualisation du nombre d'hommes envoyés dans l'espace par année, et enfin, une représentation des astronautes par pays et par genre. J'ai commencé par convertir une partie des données au format JSON, puis utilisé la fonction fetch en JavaScript pour les récupérer et les exploiter.<br><br>Pour illustrer le nombre d'astronautes dans l'espace par année, j'ai conçu une fusée dont la taille varie en fonction du nombre d'astronautes envoyés. Sur le tableau de bord, j'ai intégré une carte interactive avec Leaflet, permettant de visualiser le nombre d'astronautes par pays. <br><br>Pour rendre le site plus dynamique, j'ai ajouté diverses animations et interactions. Par exemple, en survolant les astronautes, leur visage apparaît, et en passant la souris sur les fusées, elles s'élèvent légèrement avec une animation de flammes. D'autres petites animations, comme l'arrivée des images à l'écran, ajoutent du mouvement au site.",
      carousel: [
        {
          type: "image",
          src: "/images/projets/espace1.png",
          alt: "site espace",
        },
        {
          type: "iframe",
          src: "https://www.youtube.com/embed/7xtpyEOKbAU",
          alt: "presentation site espace",
        },
        {
          type: "image",
          src: "/images/projets/espace2.png",
          alt: "site espace",
        },
        {
          type: "image",
          src: "/images/projets/espace3.png",
          alt: "site espace",
        },
        {
          type: "image",
          src: "/images/projets/espace4.png",
          alt: "site espace",
        },
      ],
    },
    modal4: {
      title: "Petit jeu",
      link: "",
      tabletSrc: { src: "/images/MiniaJeux.png", class: "" },
      contexte:
        "Lors de ma seconde année de BUT MMI, avec 2 autres étudiant, nous avons réalisé un projet qui consistait à créer un escape game sur le web qui interagisse avec le réel permettent de découvrir la ville de Mulhouse. Chacun de nous était responsable de la création d'un mini-jeu.<br><br>Pour ma part, j'ai conçu un jeu basé sur une lyre présente sur une statue du parc Steinbach à Mulhouse. Inspiré du jeu \"Simon\", ce mini-jeu demande aux joueurs de reproduire une mélodie jouée par la lyre.",
      realisation:
        "J'ai d'abord créé la base de la lyre sur Illustrator, puis l'ai intégrée au site à l'aide d'un canvas, où j'ai dessiné les cordes. J'ai ensuite développé un code pour faire vibrer les cordes lorsqu'une note est jouée. <br><br>Pendant la lecture de la mélodie, les notes sont enregistrées dans une variable. Si le joueur reproduit incorrectement la mélodie, le jeu est perdu. J'ai également ajouté les sons correspondant aux notes lorsque les cordes sont touchées.",
      carousel: [
        { type: "image", src: "/images/projets/jeuLyre.png", alt: "jeu lyre" },
        {
          type: "iframe",
          src: "https://youtube.com/embed/ilm7Ofedvqk",
          alt: "presentation jeu lyre",
        },
      ],
    },
    modal5: {
      title: "Motion design",
      link: "",
      tabletSrc: { src: "/images/MiniaTurnip.png", class: "" },
      contexte:
        "Dans le cadre de ma première année en BUT Métiers du Multimédia et de l’Internet, j’ai travaillé en groupe sur un projet visant à promouvoir un service de mobilité écologique. Avec trois autres étudiants, nous avons imaginé \"Turnip9\", des navettes électriques alimentées par l’énergie hydraulique. Le slogan de notre produit, “Ne tournez pas autour du pot”, reflète l'idée que la navette ne s’arrête qu’aux arrêts nécessaires pour optimiser les trajets.<br><br>J’ai contribué à la création du logo en proposant le concept du visage avec la flèche et la forme des personnages. Ensuite, j’ai réalisé le logo dans Illustrator et préparé les éléments pour l'animation en les organisant en calques distincts.",
      realisation:
        "Pour l’animation du logo, j’ai utilisé le logiciel After Effect.<br>Dans mon animation, j’ai voulu transmettre et renforcer les messages que renvoie le logo. Pour faire référence à l’idée d'aller du point A au point B, j’ai fait apparaître les flèches vers les points représentant les yeux. Pour faire référence au “Turn” présent dans le nom de l’entreprise, j’ai fait arriver les personnages avec une rotation.<br><br>De plus, pour donner un côté plus vivant aux personnages, j’ai ajouté un petit délai entre l'arrivée des deux yeux, et j’ai ajouté du mouvement aux feuilles du personnage. Pour l’animation de sortie, j'ai retourné le logo pour voir le visage de l’autre personnage à l’endroit.<br>Pour finir, j'ai réalisé le son design, avec des bruits de feuilles et des bruitages pour les mouvements.",
      carousel: [
        {
          type: "image",
          src: "/images/projets/frameInGameFichier 1.svg",
          alt: "logoTurnip",
        },
        {
          type: "iframe",
          src: "https://www.youtube.com/embed/vg-Py1p5yrg",
          alt: "Logo Turnip9 animation",
        },
      ],
    },
    modal6: {
      title: "Portfolio MMI",
      link: "",
      tabletSrc: { src: "/images/MiniaPortFolioMMI.png", class: "coucher" },
      contexte:
        "Dans le cadre de ma première année en BUT Métier du Multimédia et de l’Internet, j’ai réalisé un site portfolio de compétences.Le but du site est d’avoir des traces des différents projets réalisés lors du BUT.<br>Pour chaque projet, il y a une description avec d'autres informations présentant le projet, et une explication de comment j'ai réalisé le projet.",
      realisation:
        "Pour créer mon site, j'ai d'abord planifié les pages nécessaires, définies le style, et identifié les données essentielles. J'ai ensuite réalisé une maquette sur Figma avant de coder le site avec Visual Studio Code, en utilisant le code HTML, CSS, JavaScript, et PHP. J'ai conçu le filtre de projet en CSS et intégré des animations avec CSS et JavaScript pour améliorer l'expérience utilisateur.<br><br>Le site repose sur une base de données, que j'ai d'abord modélisée en créant un MCD et un MLD, puis développée via PHPMyAdmin. J'ai intégré les données dans les pages HTML en utilisant la méthode MVC (Modèle Vue Contrôleur), en gérant la connexion à la base de données et les requêtes SQL dans la partie \"Modèle\".",
      carousel: [
        {
          type: "image",
          src: "/images/projets/site.png",
          alt: "site portfolio mmi",
        },
        {
          type: "image",
          src: "/images/projets/Capturefiltre.PNG",
          alt: "site portfolio mmi",
        },
        {
          type: "image",
          src: "/images/projets/CaptureSAE.PNG",
          alt: "site portfolio mmi",
        },
      ],
    },
    modal7: {
      title: "Poster",
      link: "",
      tabletSrc: { src: "/images/miniaPoster.png", class: "" },
      contexte:
        "Ce projet consistait en une analyse en anglais du film \"The Green Knight\", accompagnée de la création d'un poster qui capture l'essence et l'atmosphère du film.",
      realisation:
        "J'ai d'abord visionné le film en prenant des notes, puis j'ai analysé différents aspects comme les décors, les costumes et les couleurs. Après avoir rédigé l'analyse, j'ai esquissé des croquis pour l'affiche. <br><br>Ensuite, j'ai réalisé l'affiche sur Photoshop, en utilisant l'IA du logiciel pour créer les contours feuillus des images. Pour rester fidèle au thème, j'ai choisi une police médiévale anglaise, identique à celle utilisée dans le film.",
      carousel: [
        {
          type: "image",
          src: "/images/projets/PosterTheGreenKnight.png",
          alt: "poter the green knight",
        },
      ],
    },
    modal8: {
      title: "Site Nos courses",
      link: "nos-courses.fr",
      tabletSrc: { src: "/images/MiniaNos_courses.png", class: "" },
      contexte:
        "Dans le cadre de mon BUT Métier du Multimédia et de l’Internet, lors de ma troisième année, nous avions un projet libre, où nous pouvions faire ce que l’on souhaitait. C’est dans ce contexte, que j’ai réalisé un site de gestion de liste de courses en collaboration, une idée que j’avais mise dans mes notes et dont j’avais déjà commencé à réfléchir. <br><br>Il y avait 66 heures prévues pour faire le projet, cependant j’ai aussi avancé sur ce projet en dehors des heures prévues. <br>Avec ce projet réalisé seul, mon objectif était de consolider ma pratique des langages abordés en cours comme React et Symfony, tout en explorant de nouvelles technologies comme TypeScript et les WebSockets.",
      realisation:
        "J’ai commencé ce projet en déterminant les fonctionnalités de mon site. Les fonctionnalités principales sont la création, la construction et l’utilisation de la liste de courses, avec la possibilité qu’elle soit collaborative. <br><br>J’ai commencé par créer le design de mon site sur Figma. Après avoir trouvé le nom “Nos courses”, j’ai créé un logo et des icônes avec Illustrator pour représenter chaque catégorie de produits. De plus, j’ai créé une animation de chargement sur After Effect. J’ai intégré l’animation grâce à LottieFiles. <br><br>Pour le côté front, j’ai utilisé React avec TypeScript, et aussi Tailwind pour le style. Pour la partie backend, j’ai créé une api Symfony. <br><br>La gestion de la collaboration était nouvelle pour moi. J’ai d’abord géré le partage d’une liste à un autre utilisateur. Pour ce faire, je crée un lien avec un jeton JWT, qui me permettra à celui qui est invité d'accéder à une page qui lui permet de rejoindre la liste. Pour partager le lien, j’ai utilisé Web Share API. <br><br>Pour une meilleure expérience utilisateur, j’ai mis en place des WebSockets pour que tous les utilisateurs d’une liste puissent voir en temps réel les produits qui sont cochés ou décochés par les autres. <br><br>Enfin, j’ai acheté un VPS (serveur privé virtuel) et le nom de domaine nos-courses.fr, puis j’ai mis mon site en ligne pour pouvoir l'utiliser. Du fait du temps assez court pour réaliser ce projet, il y a pas mal de choses qui pourraient être améliorées, ou des fonctionnalités ajoutées. Malgré ceci de mon côté perfectionniste, je suis plutôt fier du résultat.",
      carousel: [
        {
          type: "iframe",
          src: "https://youtube.com/embed/NM-0xMHSH3g",
          alt: "presentation du site nos-courses.fr",
        },
        {
          type: "image",
          src: "/images/projets/Nos_courses1.png",
          alt: "page de connexion site nos courses",
        },
        {
          type: "image",
          src: "/images/projets/Nos_courses2.png",
          alt: "home du site nos courses",
        },
        {
          type: "image",
          src: "/images/projets/Nos_courses3.png",
          alt: "page de modification de liste du site nos courses",
        },
        {
          type: "image",
          src: "/images/projets/Nos_courses4.png",
          alt: "partage de liste du site nos courses",
        },
        {
          type: "image",
          src: "/images/projets/Nos_courses5.png",
          alt: "modification d'un produit du site nos courses",
        },
        {
          type: "iframe",
          src: "https://youtube.com/embed/igwi44qBxx0",
          alt: "animation du loader nos courses, des produits qui entre dans un sachet",
        },
      ],
    },
    modal9: {
      title: "Site Prestashop BEHH",
      link: "",
      tabletSrc: { src: "/images/MiniaBEHH.png", class: "coucher" },
      contexte:
        "Lors de ma troisième année de mon BUT Métier du Multimédia et de l’Internet, avec deux autres étudiants, nous devions créer un site de e-commerce avec Prestashop, sur un sujet au choix. Une des autres contraintes était que l’on devait créer un programme pour créer et ajouter automatiquement des produits en utilisant des IA de génération.<br><br>Comme nous n’étions pas limités par la contrainte de devoir créer réellement les produits, nous avons choisi de vendre des céréales. Avec comme fonctionnalité phare, permettre aux utilisateurs de créer leur propre paquet de céréales via un formulaire. Le paquet est créé en temps réel (3 à 5 minutes) et directement ajouté au produit du site. <br><br>Le nom BEHH provient des initiales de nos noms de famille. C’est pour cela que nous avons choisi une chèvre comme mascotte.",
      realisation:
        "J’ai été à l’origine des idées de design, en proposant un style sobre avec des bordures noires, rehaussé de couleurs vives pour apporter du contraste, notamment avec les dégradés. <br>Pour créer notre thème enfant, nous sommes partis du thème Prestashop de base. Malgré les difficultés à trouver où modifier le code de certains éléments (comme les étoiles de notation ou les éléments de filtre), nous avons réussi à modifier le style du thème. Je me suis occupé de faire le design de toute la partie produits ce qui comprend aussi la partie notation et du filtre. Pour le style, nous avons mis en place un environnement Node.js au sein du Prestashop, pour faire le design avec Tailwind.<br><br>Sur la home, j’ai créé une petite scène avec un bol, du lait et des céréales, pour ajouter de l’interactivité au site. Quand on passe la souris sur la bouteille, elle verse du lait dans le bol, on peut aussi ajouter les céréales, ou faire de la pagaille. J’ai réalisé cette partie avec matter.js, et l’effet lait/liquide a été réalisé avec un filtre svg.<br><br>J’ai utilisé du python pour faire un script qui génère et ajoute des produits au site, en fonction du nombre que l’on veut. Pour ce faire, mon programme choisit un à trois goûts et formes. Puis mon programme python communique avec l’api de GEMINI pour générer un nom, une description, une méta description, ... Puis j’utilise une ia de Stable diffusion pour générer une image du paquet et une image des céréales. Ensuite, j’utilise l’api de mon Prestashop, pour ajouter les produits au site.<br><br>Pour permettre aux clients de créer leurs propres céréales, j’utilise le même principe. Je crée un formulaire avec flask. Je l'intègre au Prestashop avec un iframe. Par rapport à avant, j’ai ajouté une vérification des goûts et des formes que les clients ajoutes, pour éviter les céréales au goût inhumain.<br><br>Parmi les autres petites créations annexes, j’ai créé une carte de visite avec un mockup.",
      carousel: [
        {
          type: "iframe",
          src: "https://youtube.com/embed/XqIxW-t_JNc",
          alt: "presentation du site BEHH",
        },
        {
          type: "iframe",
          src: "https://youtube.com/embed/7k4DaC9DcLU",
          alt: "presentation de la création de céreales en temps réel grace à l'ia",
        },
        {
          type: "image",
          src: "/images/projets/produitsBEHH.png",
          alt: "produits site BEHH",
        },
        {
          type: "image",
          src: "/images/projets/porduitBEHH.png",
          alt: "produit site BEHH",
        },
        {
          type: "image",
          src: "/images/projets/interactionLait.png",
          alt: "scène lait et céreales site BEHH",
        },
        {
          type: "image",
          src: "/images/projets/formulaireMélangeMagique.png",
          alt: "formulaire de mélange magique site BEHH",
        },
        {
          type: "image",
          src: "/images/projets/CarteDeVisite.png",
          alt: "cartes de visites BEHH",
        },
      ],
    },
  };

  // Fonction pour ouvrir le modal
  function openModal(modalId) {
    const modal = document.getElementById("modal-template");
    howModal = true;
    if (modal) {
      const data = modalData[modalId];
      if (data) {
        // Remplir le modal avec le contenu
        modal.querySelector(".modal-title").textContent = data.title;
        modal.querySelector(".modal-contexte").innerHTML = data.contexte;
        modal.querySelector(".modal-realisation").innerHTML = data.realisation;
        modal.querySelector(".modal-tablet").src = data.tabletSrc.src;
        if (data.tabletSrc.class === "coucher") {
          modal.querySelector(".modal-tablet").classList.add("coucher");
        } else {
          modal.querySelector(".modal-tablet").classList.remove("coucher");
        }

        const linkElement = modal.querySelector(".link-modal");

        if (data.link && data.link.trim() !== "") {
          if (linkElement) {
            linkElement.remove();
          }
          modal.querySelector(".modal-content").innerHTML += `
                        <a href="https://${data.link}" class="link-modal">
                            <p>${data.link}</p>
                            <img loading="lazy" src="/images/rowLink.svg" alt="row link" class="rowLink" />
                        </a>`;
        } else if (linkElement) {
          linkElement.remove();
        }

        // Remplir le carousel
        const carousel = modal.querySelector(".custom-carousel");
        carousel.innerHTML = ""; // Vider le contenu existant du carousel
        data.carousel.forEach((item) => {
          let slide;
          if (item.type === "image") {
            slide = `<div class="custom-slide"><img loading="lazy" src="${item.src}" alt="${item.alt}"></div>`;
          } else if (item.type === "iframe") {
            slide = `<div class="custom-slide"><iframe width="100%" height="100%" src="${item.src}" title="${item.alt}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
          }
          carousel.innerHTML += slide;
        });

        modal.style.display = "block"; // Afficher le modal
        document.body.style.overflow = "hidden"; // Désactiver le défilement
      }
    }
  }

  // Fonction pour fermer le modal
  function closeModal() {
    const modal = document.getElementById("modal-template");
    howModal = false;
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Réactiver le défilement
    }
  }

  // Attacher les événements de clic aux boutons
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal");
      openModal(modalId);
    });
  });

  // Attacher l'événement de clic au bouton de fermeture
  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  // Fermer le modal en cliquant en dehors du contenu
  window.addEventListener("click", function (event) {
    modals.forEach((modal) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  });
});

// carrousel

let customCurrentIndex = 0;

function showCustomSlide(index) {
  const slides = document.querySelectorAll(".custom-slide");
  const totalSlides = slides.length;

  if (index >= totalSlides) {
    customCurrentIndex = 0;
  } else if (index < 0) {
    customCurrentIndex = totalSlides - 1;
  } else {
    customCurrentIndex = index;
  }

  const newTransformValue = -customCurrentIndex * 100;
  document.querySelector(
    ".custom-carousel"
  ).style.transform = `translateX(${newTransformValue}%)`;
}

function customNextSlide() {
  showCustomSlide(customCurrentIndex + 1);
}

function customPrevSlide() {
  showCustomSlide(customCurrentIndex - 1);
}
