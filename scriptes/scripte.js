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
//cursor.style.display = "none";
window.addEventListener("load", () => {
  cursor.classList.remove("dissip");
});
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

  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
});

// Masquer le curseur personnalisé lorsque la souris quitte l'écran du site
document.addEventListener("mouseleave", () => {
  //cursor.style.display = "none";
  cursor.classList.add("dissip");
});

// Réafficher le curseur personnalisé lorsque la souris entre dans l'écran du site
document.addEventListener("mouseenter", () => {
  //cursor.style.display = "block";
  cursor.classList.remove("dissip");
});

// Appliquer et retirer la classe grow lors du survol des liens et des boutons
document
  .querySelectorAll(
    "a, button, .iconeMenu, .boutonVoir, .close-button, link-modal"
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
  let modalData = {};

  // Charger les données depuis le JSON
  fetch("/data/modalData.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Impossible de charger modalData.json");
      }
      return response.json();
    })
    .then((data) => {
      modalData = data;
    })
    .catch((err) => console.error(err));

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
          const link = document.createElement("a");
          link.href = "https://" + data.link;
          link.classList.add("link-modal");
          link.innerHTML = `<p>${data.link}</p><img src="/images/rowLink.svg" alt="row link" class="rowLink" />`;

          modal.querySelector(".modal-content").appendChild(link);
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
