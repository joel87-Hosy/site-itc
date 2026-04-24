/* ============================================================
   ITC AI Chat Widget - Base de connaissances ITC + Telecom
   ============================================================ */
(function () {
  'use strict';

  /* ── Base de connaissances ─────────────────────────────── */
  const KB = [
    // ITC - Présentation
    {
      patterns: ['qui êtes vous','c\'est quoi itc','qu\'est ce que itc','présente itc','présentation','ivoire techno com','à propos','about','histoire itc','company'],
      response: '🏢 <strong>Ivoire Techno Com (ITC)</strong> est une entreprise spécialisée dans les télécommunications et les réseaux en Côte d\'Ivoire. Basée à Abidjan, ITC réalise l\'installation de fibre optique, la maintenance des réseaux télécom et le déplacement de réseaux pour les opérateurs et entreprises.'
    },
    // Services
    {
      patterns: ['service','prestations','que faites vous','offre','activité'],
      response: '🔧 Nos principaux services :\n• <strong>Installation Fibre Optique</strong> – pose et raccordement de réseaux FO\n• <strong>Maintenance Réseaux</strong> – préventive et curative\n• <strong>Déplacement Réseau</strong> – planification et mise en œuvre\n• <strong>Bureau d\'Études</strong> – conception et audit de réseaux\n\nVous souhaitez en savoir plus sur l\'un de ces services ?'
    },
    // Fibre optique
    {
      patterns: ['fibre optique','fiber','fibre','optique','fo','installation fibre'],
      response: '💡 La <strong>fibre optique</strong> est un câble de verre ou de plastique qui transmet des données à la vitesse de la lumière. ITC maîtrise :\n• Le tirage et la pose de câbles FO\n• La soudure optique\n• Les tests de réflectométrie (OTDR)\n• Le raccordement sur armoires et nœuds optiques.'
    },
    // Maintenance
    {
      patterns: ['maintenance','entretien','panne','dépannage','curatif','préventif'],
      response: '🛠️ Notre service de <strong>Maintenance Réseaux</strong> comprend :\n• Maintenance préventive (inspection régulière)\n• Maintenance curative (réparation après incident)\n• Surveillance des infrastructures\n• Intervention rapide sur toute la région d\'Abidjan.'
    },
    // Déplacement réseau
    {
      patterns: ['déplacement','déplacement réseau','déplace','migration','relocalisation'],
      response: '🚚 Le <strong>Déplacement Réseau</strong> consiste à relocaliser une infrastructure télécom existante (lors de travaux routiers, de construction, etc.). ITC gère la planification, la coordination avec les opérateurs et la mise en œuvre technique.'
    },
    // Bureau d'études
    {
      patterns: ['bureau d\'étude','étude','audit réseau','conception réseau','ingénierie','plan réseau'],
      response: '📐 Notre <strong>Bureau d\'Études</strong> propose :\n• Audit et diagnostic de réseaux existants\n• Conception de plans d\'infrastructure\n• Études de faisabilité\n• Assistance à maîtrise d\'ouvrage (AMO)'
    },
    // Contact
    {
      patterns: ['contact','joindre','appeler','téléphone','email','mail','adresse','localisation','où êtes vous','nous contacter'],
      response: '📞 Pour contacter ITC :\n• <strong>Email :</strong> <a href="mailto:siteweb@ivoiretechnocom.ci" style="color:#dfb162">siteweb@ivoiretechnocom.ci</a>\n• <strong>Horaires :</strong> Lun–Ven 8h–17h | Sam 8h–13h\n• <strong>Page contact :</strong> <a href="contact.html" style="color:#dfb162">Formulaire de contact</a>'
    },
    // Devis
    {
      patterns: ['devis','tarif','prix','coût','combien','estimation','budget'],
      response: '💰 Pour obtenir un <strong>devis personnalisé</strong>, contactez-nous via notre <a href="contact.html" style="color:#dfb162">formulaire de contact</a> ou envoyez-nous un email à <a href="mailto:siteweb@ivoiretechnocom.ci" style="color:#dfb162">siteweb@ivoiretechnocom.ci</a>. Nos experts analyseront vos besoins et vous proposeront une offre adaptée.'
    },
    // Partenaires
    {
      patterns: ['partenaire','client','opérateur','orange','moov','mtn','telecel'],
      response: '🤝 ITC collabore avec les grands opérateurs télécom de Côte d\'Ivoire (Orange CI, Moov CI, MTN CI) ainsi qu\'avec des entreprises privées, des institutions publiques et des organismes de formation. <a href="partenaires.html" style="color:#dfb162">Voir nos partenaires →</a>'
    },
    // Équipe
    {
      patterns: ['équipe','team','personnel','technicien','employé','effectif','ressource humaine'],
      response: '👷 L\'équipe ITC est composée d\'ingénieurs et techniciens spécialisés en télécommunications, fibre optique et réseaux. Tous certifiés et régulièrement formés aux nouvelles technologies télécom. <a href="team.html" style="color:#dfb162">Découvrir l\'équipe →</a>'
    },
    // Réalisations / projets
    {
      patterns: ['réalisation','projet','travaux','chantier','référence','portefeuille'],
      response: '🏗️ ITC a réalisé de nombreux projets à Abidjan et en Côte d\'Ivoire : installation de réseaux FO, maintenance d\'infrastructures télécom, déplacements lors de grands travaux. <a href="projects-classic.html" style="color:#dfb162">Voir nos réalisations →</a>'
    },
    // Télécom général
    {
      patterns: ['télécommunication','telecom','réseau','network','internet','haut débit','adsl','4g','5g','wifi','lan','wan'],
      response: '📡 Les <strong>télécommunications</strong> regroupent l\'ensemble des technologies permettant la transmission d\'informations (voix, données, vidéo) sur des distances variables via des câbles (fibre optique, cuivre) ou sans fil (radio, satellite). ITC est votre expert local pour les infrastructures fixes en Côte d\'Ivoire.'
    },
    // Soudure optique
    {
      patterns: ['soudure','souder','épissure','fusion'],
      response: '🔬 La <strong>soudure optique par fusion</strong> est la technique qui consiste à assembler deux fibres optiques en les chauffant avec un arc électrique. ITC dispose des équipements de pointe (soudeuses Fujikura, OTDR Anritsu) pour garantir des soudures de qualité avec de faibles pertes.'
    },
    // OTDR / test
    {
      patterns: ['otdr','réflectomètre','test fibre','mesure fibre','perte optique','atténuation'],
      response: '📊 L\'<strong>OTDR (Optical Time Domain Reflectometer)</strong> est un appareil qui teste une fibre optique en envoyant des impulsions lumineuses et en analysant les réflexions. Il permet de localiser les défauts et de mesurer les pertes. ITC l\'utilise pour certifier chaque installation.'
    },
    // Zone d'intervention
    {
      patterns: ['zone','couverture','abidjan','daloa','korhogo','intervenir','où','localité','région'],
      response: '📍 ITC intervient principalement à <strong>Abidjan</strong> et dans plusieurs villes de Côte d\'Ivoire. Contactez-nous pour vérifier la disponibilité dans votre zone : <a href="contact.html" style="color:#dfb162">nous contacter</a>.'
    },
    // Urgence
    {
      patterns: ['urgence','urgent','immédiat','rapidement','dès que possible','vite'],
      response: '🚨 Pour une demande urgente, contactez-nous directement par email : <a href="mailto:siteweb@ivoiretechnocom.ci" style="color:#dfb162">siteweb@ivoiretechnocom.ci</a>. Mentionnez "URGENCE" dans l\'objet de votre message et notre équipe reviendra vers vous dans les plus brefs délais.'
    },
    // Bonjour / salutations
    {
      patterns: ['bonjour','salut','bonsoir','hello','bonne journée','hey','coucou'],
      response: '👋 Bonjour ! Je suis l\'assistant virtuel d\'<strong>Ivoire Techno Com (ITC)</strong>. Je suis là pour répondre à vos questions sur nos services télécom et sur notre entreprise. Comment puis-je vous aider ?'
    },
    // Merci
    {
      patterns: ['merci','thank','super','excellent','parfait','nickel'],
      response: '😊 Avec plaisir ! N\'hésitez pas si vous avez d\'autres questions. L\'équipe ITC est toujours disponible pour vous accompagner dans vos projets télécom.'
    },
    // Au revoir
    {
      patterns: ['au revoir','bye','bonne journée','à bientôt','à plus'],
      response: '👋 Au revoir et à bientôt ! N\'hésitez pas à revenir si vous avez des questions. L\'équipe ITC reste à votre disposition.'
    }
  ];

  const SUGGESTIONS = [
    'Nos services',
    'Fibre optique',
    'Contacter ITC',
    'Obtenir un devis',
    'Zone d\'intervention'
  ];

  const DEFAULT_RESPONSE = '🤔 Je n\'ai pas bien compris votre question. Voici ce que je peux vous aider :\n• Nos <strong>services</strong> (fibre optique, maintenance, déplacement réseau)\n• Nos <strong>coordonnées</strong> et horaires\n• Des informations sur les <strong>télécommunications</strong>\n• Un <strong>devis</strong> ou prise de contact\n\nReformulation possible ?';

  /* ── Logique de matching ───────────────────────────────── */
  function getResponse(text) {
    const normalized = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    for (const entry of KB) {
      for (const pat of entry.patterns) {
        const normPat = pat.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (normalized.includes(normPat)) {
          return entry.response;
        }
      }
    }
    return DEFAULT_RESPONSE;
  }

  /* ── Helpers ───────────────────────────────────────────── */
  function timeStr() {
    return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  function nl2br(str) {
    return str.replace(/\n/g, '<br>');
  }

  /* ── Build HTML ────────────────────────────────────────── */
  function buildWidget() {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = getRootPath() + 'css/itc-ai-chat.css';
    document.head.appendChild(style);

    const btnHTML = `
      <button id="itc-chat-btn" aria-label="Ouvrir l'assistant ITC" title="Assistant ITC">
        <span class="chat-tooltip">Assistant ITC</span>
        <svg class="icon-chat" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2z"/>
        </svg>
        <svg class="icon-close" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
        <span id="itc-chat-badge" style="display:none">1</span>
      </button>`;

    const winHTML = `
      <div id="itc-chat-window" role="dialog" aria-label="Assistant virtuel ITC" aria-modal="true">
        <div class="itc-chat-header">
          <div class="chat-avatar">🤖</div>
          <div class="chat-info">
            <h4>Assistant ITC</h4>
            <span>En ligne</span>
          </div>
        </div>
        <div class="itc-chat-messages" id="itc-chat-messages"></div>
        <div class="itc-chat-suggestions" id="itc-chat-suggestions"></div>
        <div class="itc-chat-input-area">
          <input type="text" id="itc-chat-input" placeholder="Posez votre question..." autocomplete="off" aria-label="Message pour l'assistant ITC" maxlength="300"/>
          <button id="itc-chat-send" aria-label="Envoyer">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>`;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = btnHTML + winHTML;
    document.body.appendChild(wrapper);
  }

  /* ── Detect root path ──────────────────────────────────── */
  function getRootPath() {
    // Use the script's own src attribute to compute the path to the site root.
    // This works correctly regardless of the deployment subdirectory (e.g. GitHub Pages).
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute('src') || '';
      var m = src.match(/^(.*?)js\/itc-ai-chat\.js/);
      if (m) return m[1]; // '' for root-level pages, '../' for one level deep, etc.
    }
    // Fallback: derive from pathname (strips the filename and any deployment prefix)
    var segs = window.location.pathname.split('/').filter(function(s){ return s && s.indexOf('.') === -1; });
    return segs.length > 0 ? '../'.repeat(segs.length) : '';
  }

  /* ── Message rendering ─────────────────────────────────── */
  function appendMessage(type, html) {
    const msgs = document.getElementById('itc-chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-msg ' + type;
    div.innerHTML = `<div class="chat-bubble">${nl2br(html)}</div><div class="chat-time">${timeStr()}</div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const msgs = document.getElementById('itc-chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.id = 'itc-typing';
    div.innerHTML = `<div class="chat-typing"><span></span><span></span><span></span></div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  function removeTyping() {
    const el = document.getElementById('itc-typing');
    if (el) el.remove();
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    const input = document.getElementById('itc-chat-input');
    input.value = '';
    appendMessage('user', text);
    const typing = showTyping();
    setTimeout(() => {
      removeTyping();
      const resp = getResponse(text);
      appendMessage('bot', resp);
    }, 800 + Math.random() * 400);
  }

  /* ── Suggestions ───────────────────────────────────────── */
  function buildSuggestions() {
    const container = document.getElementById('itc-chat-suggestions');
    SUGGESTIONS.forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'chat-suggestion-btn';
      btn.textContent = s;
      btn.addEventListener('click', () => {
        sendMessage(s);
        container.style.display = 'none';
      });
      container.appendChild(btn);
    });
  }

  /* ── Init ──────────────────────────────────────────────── */
  function init() {
    buildWidget();

    const chatBtn = document.getElementById('itc-chat-btn');
    const chatWin = document.getElementById('itc-chat-window');
    const chatInput = document.getElementById('itc-chat-input');
    const chatSend = document.getElementById('itc-chat-send');
    const badge = document.getElementById('itc-chat-badge');

    buildSuggestions();

    // Welcome message after delay
    setTimeout(() => {
      appendMessage('bot', '👋 Bonjour ! Je suis l\'assistant virtuel d\'<strong>Ivoire Techno Com (ITC)</strong>.<br>Comment puis-je vous aider aujourd\'hui ? Posez-moi une question sur nos services télécom ou sur ITC.');
      badge.style.display = 'flex';
    }, 1500);

    // Toggle window
    chatBtn.addEventListener('click', () => {
      const isOpen = chatWin.classList.toggle('open');
      chatBtn.classList.toggle('open', isOpen);
      badge.style.display = 'none';
      if (isOpen) {
        setTimeout(() => chatInput.focus(), 300);
      }
    });

    // Send on button click
    chatSend.addEventListener('click', () => {
      sendMessage(chatInput.value);
      document.getElementById('itc-chat-suggestions').style.display = 'none';
    });

    // Send on Enter
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendMessage(chatInput.value);
        document.getElementById('itc-chat-suggestions').style.display = 'none';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && chatWin.classList.contains('open')) {
        chatWin.classList.remove('open');
        chatBtn.classList.remove('open');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
