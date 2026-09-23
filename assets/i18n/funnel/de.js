/* Traducciones DE — páginas del funnel (/upsell1/, /downsell1/).
 * Se cargan DESPUÉS de /assets/i18n/de.js y se suman a su diccionario, así las
 * páginas del funnel reutilizan las claves de la página principal (planes, bonus, FAQ...). */
(function () {
  var all = window.PTH_I18N = window.PTH_I18N || {};
  var dict = all.de = all.de || {};
  var t = {
    "fn.basic_cta": "Mit dem Basisangebot weitermachen",
    "fn.basic_desc": "Über 3.000 ausgewählte Projekte, darunter Tore, Zäune und Anhänger. Sofortiger digitaler Zugang.",
    "fn.basic_label": "Dein Basisangebot",
    "fn.bonus_title": "Die 4 Boni der Premium-Combo",
    "fn.bonus1_alt": "Leitfaden zur Präsentation von Blechmöbeln",
    "fn.bonus1_name": "Leitfaden zur Präsentation von Blechmöbeln",
    "fn.bonus2_alt": "Vollständiger Preisleitfaden für Industriemöbel",
    "fn.bonus2_name": "Vollständiger Preisleitfaden für Industriemöbel",
    "fn.bonus3_alt": "Die 10 größten Fehler eines Schmiede-Anfängers",
    "fn.bonus3_name": "Die 10 größten Fehler eines Schmiede-Anfängers",
    "fn.bonus4_alt": "Stahlarten und ihre Anwendungen",
    "fn.bonus4_name": "Stahlarten und ihre Anwendungen",
    "fn.card_ribbon": "Empfohlen",
    "fn.cta_pre": "Ich will die Premium-Combo für",
    "fn.deal_kicker": "Hol dir die <span class=\"accent\">Premium-Combo</span> jetzt für nur:",
    "fn.decline_pre": "Nein, ich bleibe beim Basis-Kit für",
    "fn.faq_title": "Fragen zu diesem Angebot",
    "fn.microcopy": "Einmalzahlung · Sofortiger digitaler Zugang per E-Mail",
    "fn.price_regular": "Auf der Hauptseite",
    "fn.sticky_cta": "Ich will es",
    "fn.tag_projects": "Über 4.000 Projekte",
    "fn.w1_d": "Statt der über 3.000 im Basis-Kit. Alle mit Maßen, Schnitten und empfohlenem Preis.",
    "fn.w2_d": "Industriemöbel, Strukturen und Hallen, Grills, Fitnessgeräte, Plattformen und Karosserie.",
    "fn.w2_t": "Mehr Kategorien",
    "fn.w3_d": "Leitfäden zu Preisen und Präsentation, Anfängerfehler und Stahlarten.",
    "fn.why_title": "Warum die Premium-Combo?",
    "up.badge": "Ein besseres Angebot!",
    "up.choice": "Aber die Entscheidung liegt bei dir: Wenn du möchtest, kannst du mit deinem Basisangebot weitermachen.",
    "up.ctx_bonus": "4 Boni inklusive",
    "up.deal_text": "Wir möchten, dass du das komplette Paket hast. Deshalb schalten wir, bevor du nur mit dem Basisangebot weitermachst, diese Sonderkondition frei. Heute ist der letzte Tag, sie zu nutzen.",
    "up.fa1": "Nein. Wenn du annimmst, gehst du zur Zahlung der Premium-Combo statt des Basis-Kits. Die Combo enthält bereits Tore, Zäune und Anhänger und alles andere.",
    "up.fa2": "Weil wir möchten, dass du die Premium-Combo und alle Materialien bekommst, die wir vorbereitet haben. Bevor du nur mit der Basisoption weitermachst, haben wir diese Sonderkondition freigeschaltet.",
    "up.fq1": "Zahle ich das Basis-Kit zusätzlich, wenn ich annehme?",
    "up.fq2": "Warum bieten wir diese Kondition an?",
    "up.meta_desc": "Ein besseres Angebot: die komplette Premium-Combo zu einer Sonderkondition.",
    "up.meta_title": "Besseres Angebot: Premium-Combo — Pack Arsenal des Schmieds",
    "dn.badge": "Letzte Chance!",
    "dn.choice": "Nach diesem Schritt hast du keine weitere Gelegenheit, die Premium-Combo zu diesen Konditionen zu bekommen.",
    "dn.deal_text": "Wir möchten, dass du Zugang zum kompletten Paket hast. Deshalb schalten wir diese letzte Kondition frei, bevor du mit dem Basisangebot weitermachst.",
    "dn.fa2": "Weil wir dir, bevor du mit der Basisoption weitermachst, eine letzte Gelegenheit geben möchten, die komplette Premium-Combo zu einer Sonderkondition zu bekommen.",
    "dn.fq2": "Warum bekomme ich dieses Angebot?",
    "dn.meta_desc": "Letzte Gelegenheit in dieser Bestellung, die Premium-Combo zu einer Sonderkondition zu bekommen.",
    "dn.meta_title": "Letzte Chance: Premium-Combo — Pack Arsenal des Schmieds"
  };
  for (var k in t) dict[k] = t[k];
  // Título y descripción propios de cada página del funnel (i18n.js usa meta.title / meta.description).
  var p = document.documentElement.getAttribute("data-funnel-page") === "downsell" ? "dn" : "up";
  dict["meta.title"] = t[p + ".meta_title"];
  dict["meta.description"] = t[p + ".meta_desc"];
})();
