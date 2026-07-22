import {
  animate,
  inView,
  scroll,
  stagger
} from "https://cdn.jsdelivr.net/npm/motion@12.42.2/+esm";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const animatedElements = new WeakSet();
const animatedModals = new WeakSet();

function elementsFrom(target) {
  if (!target) return [];
  if (typeof target === "string") return Array.from(document.querySelectorAll(target));
  if (target instanceof Element) return [target];
  return Array.from(target).filter(item => item instanceof Element);
}

function clearAnimationStyles(elements, properties = ["opacity", "transform", "filter", "will-change"]) {
  elements.forEach(element => {
    properties.forEach(property => element.style.removeProperty(property));
    element.removeAttribute("data-em-motion");
  });
}

function runAnimation(target, keyframes, options = {}, cleanupProperties) {
  const elements = elementsFrom(target);
  if (!elements.length) return null;

  elements.forEach(element => {
    element.setAttribute("data-em-motion", "");
    element.style.willChange = "opacity, transform, filter";
  });

  const controls = animate(elements, keyframes, options);
  controls.finished
    .then(() => clearAnimationStyles(elements, cleanupProperties))
    .catch(() => clearAnimationStyles(elements, cleanupProperties));

  return controls;
}

function revealElement(element, delay = 0) {
  if (!(element instanceof Element) || animatedElements.has(element)) return;
  animatedElements.add(element);

  element.setAttribute("data-em-motion", "");
  element.style.opacity = "0";
  element.style.transform = "translateY(20px)";
  element.style.willChange = "opacity, transform";

  inView(
    element,
    () => {
      const controls = animate(
        element,
        {
          opacity: [0, 1],
          transform: ["translateY(20px)", "translateY(0px)"]
        },
        {
          duration: 0.58,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }
      );

      controls.finished
        .then(() => clearAnimationStyles([element], ["opacity", "transform", "will-change"]))
        .catch(() => clearAnimationStyles([element], ["opacity", "transform", "will-change"]));
    },
    {
      amount: 0.12,
      margin: "0px 0px -8% 0px"
    }
  );
}

function revealSelector(selector, step = 0.045) {
  document.querySelectorAll(selector).forEach((element, index) => {
    revealElement(element, Math.min(index * step, 0.28));
  });
}

function animateModal(modal) {
  if (!(modal instanceof Element) || animatedModals.has(modal)) return;
  animatedModals.add(modal);

  const card = modal.querySelector(".product-modal-card");

  runAnimation(
    modal,
    { opacity: [0, 1] },
    { duration: 0.22, ease: "easeOut" },
    ["opacity", "will-change"]
  );

  if (card) {
    runAnimation(
      card,
      {
        opacity: [0, 1],
        transform: ["translateY(24px) scale(0.985)", "translateY(0px) scale(1)"]
      },
      {
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1]
      },
      ["opacity", "transform", "will-change"]
    );
  }
}

function createScrollProgress() {
  const progress = document.createElement("div");
  progress.className = "em-scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.appendChild(progress);

  scroll(value => {
    progress.style.transform = `scaleX(${value})`;
  }, { trackContentSize: true });
}

function animateIndexPage() {
  runAnimation(
    ".topbar",
    { opacity: [0, 1] },
    { duration: 0.35, ease: "easeOut" },
    ["opacity", "will-change"]
  );

  runAnimation(
    ".header",
    {
      opacity: [0, 1],
      transform: ["translateY(-14px)", "translateY(0px)"]
    },
    {
      duration: 0.48,
      delay: 0.08,
      ease: [0.22, 1, 0.36, 1]
    },
    ["opacity", "transform", "will-change"]
  );

  runAnimation(
    ".menu",
    {
      opacity: [0, 1],
      transform: ["translateY(-10px)", "translateY(0px)"]
    },
    {
      duration: 0.42,
      delay: 0.14,
      ease: [0.22, 1, 0.36, 1]
    },
    ["opacity", "transform", "will-change"]
  );

  const heroCopy = document.querySelectorAll(".hero-copy > *");
  runAnimation(
    heroCopy,
    {
      opacity: [0, 1],
      transform: ["translateY(28px)", "translateY(0px)"]
    },
    {
      duration: 0.68,
      delay: stagger(0.09, { startDelay: 0.18 }),
      ease: [0.22, 1, 0.36, 1]
    },
    ["opacity", "transform", "will-change"]
  );

  runAnimation(
    ".hero-panel",
    {
      opacity: [0, 1],
      transform: ["translateX(34px)", "translateX(0px)"]
    },
    {
      duration: 0.72,
      delay: 0.28,
      ease: [0.22, 1, 0.36, 1]
    },
    ["opacity", "transform", "will-change"]
  );

  revealSelector(".section-head, .catalogo-sidebar, .catalogo-meta, .servicio-panel, .footer-col");
  revealSelector(".producto-card", 0.035);
}

function animateCategoryPage() {
  runAnimation(
    ".top .contenedor > *",
    {
      opacity: [0, 1],
      transform: ["translateY(-14px)", "translateY(0px)"]
    },
    {
      duration: 0.48,
      delay: stagger(0.07),
      ease: [0.22, 1, 0.36, 1]
    },
    ["opacity", "transform", "will-change"]
  );

  runAnimation(
    ".hero .contenedor > *",
    {
      opacity: [0, 1],
      transform: ["translateY(26px)", "translateY(0px)"]
    },
    {
      duration: 0.66,
      delay: stagger(0.11, { startDelay: 0.12 }),
      ease: [0.22, 1, 0.36, 1]
    },
    ["opacity", "transform", "will-change"]
  );

  revealSelector(".subcats .panel, .toolbar .panel, .footer-col");
  revealSelector("#productsGrid .card", 0.035);
}

function animateEditorPage() {
  runAnimation(
    ".top-inner > *",
    {
      opacity: [0, 1],
      transform: ["translateY(-14px)", "translateY(0px)"]
    },
    {
      duration: 0.46,
      delay: stagger(0.06),
      ease: [0.22, 1, 0.36, 1]
    },
    ["opacity", "transform", "will-change"]
  );

  runAnimation(
    ".hero > *",
    {
      opacity: [0, 1],
      transform: ["translateY(22px)", "translateY(0px)"]
    },
    {
      duration: 0.62,
      delay: stagger(0.08, { startDelay: 0.08 }),
      ease: [0.22, 1, 0.36, 1]
    },
    ["opacity", "transform", "will-change"]
  );

  revealSelector(".card, .help-box, .pdf-import, .payment-box");
  revealSelector(".item", 0.025);
}

function scanDynamicContent(root = document) {
  const selectors = [
    ".producto-card",
    "#productsGrid .card",
    ".list .item",
    ".combo-option"
  ];

  selectors.forEach(selector => {
    if (root instanceof Element && root.matches(selector)) revealElement(root);
    root.querySelectorAll?.(selector).forEach((element, index) => {
      revealElement(element, Math.min(index * 0.03, 0.2));
    });
  });

  if (root instanceof Element && root.matches(".product-modal")) animateModal(root);
  root.querySelectorAll?.(".product-modal").forEach(animateModal);
}

function observeDynamicContent() {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node instanceof Element) scanDynamicContent(node);
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function initializeMotion() {
  document.documentElement.classList.add("em-motion-ready");

  if (prefersReducedMotion) {
    document.documentElement.classList.add("em-reduced-motion");
    return;
  }

  createScrollProgress();

  if (document.querySelector(".hero-copy")) {
    animateIndexPage();
  } else if (document.getElementById("productsGrid")) {
    animateCategoryPage();
  } else if (document.querySelector(".layout")) {
    animateEditorPage();
  }

  scanDynamicContent(document);
  observeDynamicContent();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeMotion, { once: true });
} else {
  initializeMotion();
}
