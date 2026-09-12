/* Portfolio — bilingual static site, no build step, no dependencies. */
(function () {
  'use strict';

  var GH = 'https://github.com/';
  var DEFAULT_OWNER = 'Wasabules';

  /* Sources polled once for live star counts, keyed by "owner/name". */
  var STAR_SOURCES = [
    'https://api.github.com/users/Wasabules/repos?per_page=100&type=owner',
    'https://api.github.com/orgs/SnmpLens/repos?per_page=100'
  ];

  /* ---------------------------------------------------------------- data */

  var FEATURED = [
    {
      repo: 'SnmpLens',
      owner: 'SnmpLens',
      stack: 'Go · Svelte · Wails',
      meta: ['MIT', 'Windows', 'macOS', 'Linux'],
      links: [
        { href: 'https://snmplens.com/', label: { en: 'Website', fr: 'Site' } },
        { href: 'https://snmplens.com/demo.html', label: { en: 'Live demo', fr: 'Démo en ligne' } },
        { href: 'https://snmplens.com/documentation.html', label: { en: 'Docs', fr: 'Documentation' } }
      ],
      desc: {
        en: 'A cross-platform SNMP MIB browser, MIB editor and monitoring application — an open-source alternative to iReasoning MIB Browser and Paessler SNMP Tester. SNMPv1/v2c/v3, a searchable MIB tree, an editor that reports unknown types and duplicate OIDs by line and column, dashboards drawn from shareable presets, polling charted as values, deltas, rates or latency, a trap receiver that resolves trap OIDs through your own MIBs, and alerts routed to syslog, a webhook or email. A built-in device simulator lets you try the whole thing without hardware.',
        fr: "Navigateur de MIB, éditeur de MIB et application de supervision SNMP cross-platform — une alternative open source à iReasoning MIB Browser et Paessler SNMP Tester. SNMPv1/v2c/v3, arbre de MIB cherchable, éditeur qui signale types inconnus et OID dupliqués à la ligne et à la colonne près, tableaux de bord construits depuis des presets partageables, polling tracé en valeurs, deltas, taux ou latence, récepteur de traps qui résout les OID via vos propres MIB, et alertes routées vers syslog, un webhook ou un e-mail. Un simulateur d’équipements intégré permet de tout essayer sans matériel."
      }
    },
    {
      repo: 'SyslogStudio',
      stack: 'Go · Svelte · Wails',
      meta: ['MIT', 'Windows', 'macOS', 'Linux'],
      desc: {
        en: 'A lightweight cross-platform syslog viewer and analyser. Receives over UDP, TCP and TLS, filters in real time, searches with SQLite FTS5, raises alerts, and encrypts its store at rest. Ships with a PKI assistant for the certificate part, and a signed auto-updater.',
        fr: "Visionneuse et analyseur syslog cross-platform et léger. Réception en UDP, TCP et TLS, filtrage temps réel, recherche en SQLite FTS5, alertes, et chiffrement du stock au repos. Livré avec un assistant PKI pour la partie certificats et un updater signé."
      }
    },
    {
      repo: 'OpenPeats',
      stack: 'Go · Kotlin · Svelte',
      meta: ['MIT', 'Desktop', 'Android'],
      desc: {
        en: 'Control for SoundPEATS earbuds without the manufacturer’s mobile app — ANC, parametric equaliser, multipoint, battery levels. The protocol was reverse-engineered over RFCOMM and verified on the wire, then written up in PROTOCOL.md and implemented twice from that single spec: once in Go for the desktop app, once in Kotlin for Android.',
        fr: "Contrôle des écouteurs SoundPEATS sans passer par l’application du constructeur — ANC, égaliseur paramétrique, multipoint, niveaux de batterie. Le protocole a été rétro-conçu sur RFCOMM et vérifié sur le fil, puis consigné dans PROTOCOL.md et implémenté deux fois depuis cette unique spécification : en Go pour le desktop, en Kotlin pour Android."
      }
    },
    {
      repo: 'picoscope-libusb',
      stack: 'C · Go · Svelte',
      meta: ['Linux', 'Android'],
      desc: {
        en: 'An open-source libusb driver and GUI for the PicoScope 2204A oscilloscope, built from scratch by reverse-engineering the USB protocol — no proprietary PicoSDK runtime needed. A plain C core, a Wails desktop front-end linked through cgo, and an Android AAR packaging the same driver via NDK/JNI.',
        fr: "Driver libusb et interface graphique libres pour l’oscilloscope PicoScope 2204A, écrits de zéro par rétro-ingénierie du protocole USB — sans le runtime propriétaire PicoSDK. Un cœur en C pur, une interface Wails liée en cgo, et un AAR Android empaquetant le même driver via NDK/JNI."
      }
    },
    {
      repo: 'MinestratorTerminal',
      stack: 'Rust · Svelte 5 · Tauri 2',
      meta: ['GPL-3.0', 'Desktop', 'Android'],
      desc: {
        en: 'A desktop and Android client for game servers (Minecraft, Satisfactory, Factorio, Valheim, Rust…): live console, full native SFTP, NBT inspector, multi-game mod marketplace, backups, and an AI copilot that diagnoses and repairs. One Rust core for both platforms; the API key lives in the OS secure storage.',
        fr: "Client desktop et Android pour serveurs de jeu (Minecraft, Satisfactory, Factorio, Valheim, Rust…) : console temps réel, SFTP natif complet, inspecteur NBT, marketplace de mods multi-jeux, sauvegardes, et un copilote IA capable de diagnostiquer et réparer. Un seul cœur Rust pour les deux plateformes ; la clé d’API vit dans le stockage sécurisé de l’OS."
      }
    },
    {
      repo: 'esp32-crypto-tls-benchmark',
      stack: 'C · ESP-IDF',
      meta: ['MIT', 'Embedded'],
      desc: {
        en: 'A measurement bench answering one question: what can an ESP32 actually sustain in cryptography, TLS, 802.1X and SNMPv3 — and at what cost? Covers AES across seven modes, SHA-2/SHA-3, RSA up to 4096, ECDSA P-256/384/521, key exchange, WPA2/WPA3, EAP-TLS/TTLS/PEAP, TLS 1.2 and 1.3, RFC 5425 syslog, and a full SNMPv3 USM agent. Written straight on ESP-IDF, no Arduino layer.',
        fr: "Un banc de mesure qui répond à une question précise : qu’est-ce qu’un ESP32 sait réellement soutenir en chiffrement, TLS, 802.1X et SNMPv3, et à quel prix ? AES sur sept modes, SHA-2/SHA-3, RSA jusqu’à 4096, ECDSA P-256/384/521, échange de clés, WPA2/WPA3, EAP-TLS/TTLS/PEAP, TLS 1.2 et 1.3, syslog RFC 5425, et un agent SNMPv3 USM complet. Écrit directement sur ESP-IDF, sans couche Arduino."
      }
    }
  ];

  var MORE = [
    {
      repo: 'MinestratorHelper',
      stack: 'Java · Fabric · NeoForge',
      meta: [],
      desc: {
        en: 'Client-side Minecraft mod bringing hosted servers in-game — live console, monitoring overlay, power actions. One codebase for 4 Minecraft versions across 2 mod loaders.',
        fr: "Mod Minecraft client-side qui amène les serveurs hébergés dans le jeu — console temps réel, overlay de monitoring, actions d’alimentation. Une seule base de code pour 4 versions de Minecraft sur 2 loaders."
      }
    },
    {
      repo: 'OpenInvader',
      stack: 'TypeScript · three.js',
      meta: ['MIT'],
      desc: {
        en: 'Neon Descent — a vertical 3D shoot-’em-up with a bit-exact deterministic core (no clock, no Math.random) and zero binary game assets: every model, texture and explosion is generated in code.',
        fr: "Neon Descent — shoot-em-up vertical 3D à simulation déterministe au bit près (pas d’horloge, pas de Math.random) et zéro asset binaire : modèles, textures et explosions sont générés en code."
      }
    },
    {
      repo: 'deluxe-pacman-3',
      stack: 'TypeScript · PixiJS · C',
      meta: ['WebGL', 'PWA'],
      desc: {
        en: 'Web rewrite of Neil Roy’s Deluxe Pacman 2 — 2.5D WebGL, 31 tools, 3 game modes, level editor. Deterministic core covered by unit tests; the original C source is kept as reference.',
        fr: "Réécriture web de Deluxe Pacman 2 de Neil Roy — WebGL 2.5D, 31 outils, 3 modes de jeu, éditeur de niveaux. Cœur déterministe couvert par des tests unitaires ; la source C d’origine est conservée en référence."
      }
    },
    {
      repo: 'McNetworkChecker',
      stack: 'Go · Svelte · Wails',
      meta: ['MIT'],
      desc: {
        en: 'One-click connectivity diagnostics for Minecraft servers: DNS/SRV, ICMP, traceroute, TCP traceroute and a full Server List Ping implementation, gathered into a shareable report.',
        fr: "Diagnostic de connectivité en un clic pour serveurs Minecraft : DNS/SRV, ICMP, traceroute, traceroute TCP et implémentation complète du Server List Ping, rassemblés dans un rapport partageable."
      }
    }
  ];

  var PRIVATE = [
    {
      name: 'VoxelBench',
      stack: 'Java · Next.js · TypeScript',
      desc: {
        en: 'A benchmarking platform for Minecraft servers: a Java plugin running instrumented workloads across Paper, Spigot and Folia, and a web app to collect and compare the runs.',
        fr: "Plateforme de benchmark pour serveurs Minecraft : un plugin Java qui exécute des charges instrumentées sur Paper, Spigot et Folia, et une application web pour collecter et comparer les campagnes."
      }
    },
    {
      name: 'PVPFACTION',
      stack: 'Java · Folia · TypeScript',
      desc: {
        en: 'A game-server network built as around 40 Folia/Paper plugins on a shared core (schedulers, i18n, theming, GUI), plus its website, mobile app and desktop client.',
        fr: "Un réseau de serveurs de jeu construit comme une quarantaine de plugins Folia/Paper sur un socle commun (schedulers, i18n, thème, GUI), avec son site, son application mobile et son client desktop."
      }
    },
    {
      name: { en: 'Professional tooling', fr: 'Outillage professionnel' },
      stack: 'Go · Svelte · Kotlin · C++',
      desc: {
        en: 'Cross-platform desktop applications for network and time-synchronisation equipment: NTP, SNMP/MIB browsing, syslog, u-blox and Trimble GPS receivers, device configuration and firmware updates.',
        fr: "Applications desktop cross-platform pour du matériel réseau et de synchronisation temps : NTP, navigation SNMP/MIB, syslog, récepteurs GPS u-blox et Trimble, configuration d’équipements et mises à jour de firmware."
      }
    }
  ];

  var I18N = {
    en: {
      'skip': 'Skip to content',
      'nav.about': 'About',
      'nav.projects': 'Projects',
      'nav.more': 'More',
      'nav.private': 'Private work',
      'hero.eyebrow': 'Developer · France',
      'hero.tagline': 'I build cross-platform desktop tools — Go, Rust, Svelte — from the USB driver up to the UI.',
      'hero.cta.github': 'GitHub profile',
      'hero.cta.projects': 'See the projects',
      'about.title': 'What I do',
      'about.p1': 'Most of my projects start the same way: a device or a service does something useful, but the only way in is the vendor’s own app. So I put the protocol on the wire, read it, write the specification down, and build a free tool on top.',
      'about.p2': 'That usually means crossing the whole stack inside a single project — C for the driver, Go or Rust for the core, Svelte for the interface, shipped as one cross-platform binary through Wails or Tauri.',
      'about.s1.t': 'Reverse engineering',
      'about.s1.d': 'USB (libusb), Bluetooth RFCOMM/SPP, GPS receivers, game-server APIs',
      'about.s2.t': 'Network & security',
      'about.s2.d': 'syslog over TLS, SNMPv3, 802.1X, PKI, X.509, at-rest encryption',
      'about.s3.t': 'Desktop & mobile',
      'about.s3.d': 'Wails, Tauri, Svelte, Kotlin / Jetpack Compose',
      'about.s4.t': 'Game servers',
      'about.s4.d': 'Paper / Folia plugins, Fabric & NeoForge mods, benchmarking',
      'featured.title': 'Featured projects',
      'featured.lede': 'Open source, built end to end — protocol, core, interface, packaging.',
      'more.title': 'More public work',
      'private.title': 'Also working on',
      'private.lede': 'Not public, but a large share of the work.',
      'private.tag': 'Private',
      'footer.repos': 'All repositories',
      'doc.title': 'Geoffrey Lecoq — Cross-platform desktop tools',
      'lang.other': 'FR'
    },
    fr: {
      'skip': 'Aller au contenu',
      'nav.about': 'À propos',
      'nav.projects': 'Projets',
      'nav.more': 'Autres',
      'nav.private': 'Côté privé',
      'hero.eyebrow': 'Développeur · France',
      'hero.tagline': 'Je construis des outils desktop cross-platform — Go, Rust, Svelte — du driver USB jusqu’à l’interface.',
      'hero.cta.github': 'Profil GitHub',
      'hero.cta.projects': 'Voir les projets',
      'about.title': 'Ce que je fais',
      'about.p1': 'La plupart de mes projets commencent pareil : un appareil ou un service fait quelque chose d’utile, mais la seule porte d’entrée est l’application du constructeur. Alors je mets le protocole sur le fil, je le lis, j’en écris la spécification, et je construis un outil libre par-dessus.',
      'about.p2': 'Ça veut généralement dire traverser toute la pile dans un même projet — C pour le driver, Go ou Rust pour le cœur, Svelte pour l’interface, le tout livré en un seul binaire cross-platform via Wails ou Tauri.',
      'about.s1.t': 'Rétro-ingénierie',
      'about.s1.d': 'USB (libusb), Bluetooth RFCOMM/SPP, récepteurs GPS, API de serveurs de jeu',
      'about.s2.t': 'Réseau & sécurité',
      'about.s2.d': 'syslog sur TLS, SNMPv3, 802.1X, PKI, X.509, chiffrement au repos',
      'about.s3.t': 'Desktop & mobile',
      'about.s3.d': 'Wails, Tauri, Svelte, Kotlin / Jetpack Compose',
      'about.s4.t': 'Serveurs de jeu',
      'about.s4.d': 'plugins Paper / Folia, mods Fabric & NeoForge, benchmarking',
      'featured.title': 'Projets phares',
      'featured.lede': 'Open source, construits de bout en bout — protocole, cœur, interface, packaging.',
      'more.title': 'Autres projets publics',
      'private.title': 'En cours, côté privé',
      'private.lede': 'Non publics, mais une bonne part du travail.',
      'private.tag': 'Privé',
      'footer.repos': 'Tous les dépôts',
      'doc.title': 'Geoffrey Lecoq — Outils desktop cross-platform',
      'lang.other': 'EN'
    }
  };

  /* ------------------------------------------------------------- storage */

  function load(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function save(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  /* ------------------------------------------------------------ rendering */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function pick(value, lang) {
    return (value && typeof value === 'object') ? value[lang] : value;
  }

  function metaList(items) {
    var ul = el('ul', 'card-meta');
    items.forEach(function (item) { ul.appendChild(el('li', null, item)); });
    return ul;
  }

  function repoCard(project, lang) {
    var card = el('article', 'card');
    var owner = project.owner || DEFAULT_OWNER;
    card.dataset.repo = owner + '/' + project.repo;

    var head = el('div', 'card-head');
    var title = el('h3', 'card-title');
    var link = el('a', null, project.repo);
    link.href = GH + owner + '/' + project.repo;
    link.rel = 'noopener';
    title.appendChild(link);
    head.appendChild(title);
    head.appendChild(el('span', 'card-stack', project.stack));
    card.appendChild(head);

    card.appendChild(el('p', 'card-desc', pick(project.desc, lang)));

    var foot = el('div', 'card-foot');
    foot.appendChild(metaList(project.meta));
    if (project.links) {
      var extra = el('div', 'card-links');
      project.links.forEach(function (item) {
        var anchor = el('a', null, pick(item.label, lang));
        anchor.href = item.href;
        anchor.rel = 'noopener';
        extra.appendChild(anchor);
      });
      foot.appendChild(extra);
    }
    card.appendChild(foot);
    return card;
  }

  function privateCard(project, lang) {
    var card = el('article', 'card');

    var head = el('div', 'card-head');
    head.appendChild(el('h3', 'card-title', pick(project.name, lang)));
    head.appendChild(el('span', 'tag-private', I18N[lang]['private.tag']));
    card.appendChild(head);

    card.appendChild(el('p', 'card-desc', pick(project.desc, lang)));
    card.appendChild(metaList([project.stack]));
    return card;
  }

  function fill(container, projects, lang, builder) {
    container.textContent = '';
    projects.forEach(function (project) {
      container.appendChild(builder(project, lang));
    });
  }

  function applyLanguage(lang) {
    var strings = I18N[lang];

    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
    document.title = strings['doc.title'];

    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      var value = strings[node.getAttribute('data-i18n')];
      if (value != null) node.textContent = value;
    });

    fill(document.getElementById('featured-cards'), FEATURED, lang, repoCard);
    fill(document.getElementById('more-cards'), MORE, lang, repoCard);
    fill(document.getElementById('private-cards'), PRIVATE, lang, privateCard);

    document.getElementById('lang-label').textContent = strings['lang.other'];
    applyStars();
  }

  /* ---------------------------------------------------------- live stars */

  var stars = null;

  function applyStars() {
    if (!stars) return;
    document.querySelectorAll('.card[data-repo]').forEach(function (card) {
      var count = stars[card.dataset.repo];
      if (!count) return;
      var list = card.querySelector('.card-meta');
      if (!list || list.querySelector('.is-star')) return;
      list.insertBefore(el('li', 'is-star', '★ ' + count), list.firstChild);
    });
  }

  function fetchStars() {
    if (!window.fetch) return;
    STAR_SOURCES.forEach(function (url) {
      fetch(url)
        .then(function (response) {
          return response.ok ? response.json() : Promise.reject(response.status);
        })
        .then(function (repos) {
          if (!stars) stars = {};
          repos.forEach(function (repo) {
            stars[repo.full_name] = repo.stargazers_count;
          });
          applyStars();
        })
        .catch(function () { /* offline or rate-limited: the page stays as it is */ });
    });
  }

  /* ------------------------------------------------------------- startup */

  function initialLanguage() {
    var saved = load('lang');
    if (saved === 'fr' || saved === 'en') return saved;
    var browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return browser === 'fr' ? 'fr' : 'en';
  }

  function applyTheme(theme) {
    if (theme) document.documentElement.setAttribute('data-theme', theme);
    else document.documentElement.removeAttribute('data-theme');

    var dark = theme
      ? theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.getElementById('theme-icon').textContent = dark ? '☀' : '☽';
  }

  var lang = initialLanguage();
  applyLanguage(lang);
  applyTheme(load('theme'));
  fetchStars();

  document.getElementById('lang-toggle').addEventListener('click', function () {
    lang = lang === 'en' ? 'fr' : 'en';
    save('lang', lang);
    applyLanguage(lang);
  });

  document.getElementById('theme-toggle').addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme');
    if (!current) {
      current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    var next = current === 'dark' ? 'light' : 'dark';
    save('theme', next);
    applyTheme(next);
  });
})();
