/* Traducciones FR — páginas del funnel (/upsell1/, /downsell1/).
 * Se cargan DESPUÉS de /assets/i18n/fr.js y se suman a su diccionario, así las
 * páginas del funnel reutilizan las claves de la página principal (planes, bonus, FAQ...). */
(function () {
  var all = window.PTH_I18N = window.PTH_I18N || {};
  var dict = all.fr = all.fr || {};
  var t = {
    "fn.basic_cta": "Continuer avec l'offre basique",
    "fn.basic_desc": "Plus de 3 000 projets sélectionnés, dont portails, grilles et remorques. Accès numérique immédiat.",
    "fn.basic_label": "Votre offre basique",
    "fn.bonus_title": "Les 4 bonus du Combo Premium",
    "fn.bonus1_alt": "Guide pour présenter des meubles en tôle",
    "fn.bonus1_name": "Guide pour présenter des meubles en tôle",
    "fn.bonus2_alt": "Guide complet des prix pour meubles industriels",
    "fn.bonus2_name": "Guide complet des prix pour meubles industriels",
    "fn.bonus3_alt": "Les 10 plus grosses erreurs d'un forgeron débutant",
    "fn.bonus3_name": "Les 10 plus grosses erreurs d'un forgeron débutant",
    "fn.bonus4_alt": "Types d'acier et leurs applications",
    "fn.bonus4_name": "Types d'acier et leurs applications",
    "fn.card_cats": "8 catégories : portails, remorques, meubles, structures, grils, sport et plus",
    "fn.card_ribbon": "Recommandé",
    "fn.cta_pre": "Je veux le Combo Premium pour",
    "fn.deal_kicker": "Obtenez le <span class=\"accent\">Combo Premium</span> maintenant pour seulement :",
    "fn.decline_pre": "Non, je préfère continuer avec le Kit Basique à",
    "fn.faq_title": "Questions sur cette offre",
    "fn.microcopy": "Paiement unique · Accès numérique immédiat par e-mail",
    "fn.price_regular": "Sur la page principale",
    "fn.sticky_cta": "Je le veux",
    "fn.tag_projects": "4 000+ projets",
    "fn.w1_d": "Au lieu des 3 000+ du Kit Basique. Tous avec mesures, découpes et prix suggéré.",
    "fn.w2_d": "Meubles industriels, structures et hangars, grils, sport, plateformes et carrosserie.",
    "fn.w2_t": "Plus de catégories",
    "fn.w3_d": "Guides des prix et de présentation, erreurs de débutant et types d'acier.",
    "fn.why_title": "Pourquoi prendre le Combo Premium ?",
    "up.badge": "Une meilleure offre !",
    "up.choice": "Mais le choix vous appartient : si vous préférez, vous pouvez continuer avec votre offre basique.",
    "up.ctx_bonus": "4 bonus inclus",
    "up.deal_text": "Nous voulons que vous ayez le pack complet. Alors, avant que vous ne continuiez avec la seule offre basique, nous débloquons cette condition spéciale. C'est le dernier jour pour en profiter.",
    "up.fa1": "Non. En acceptant, vous passez au paiement du Combo Premium à la place du Kit Basique. Le combo inclut déjà portails, grilles et remorques, en plus de tout le reste.",
    "up.fa2": "Parce que nous voulons que vous ayez le Combo Premium et tous les contenus que nous avons préparés. Avant que vous ne continuiez avec la seule option basique, nous avons débloqué cette condition spéciale.",
    "up.fq1": "Si j'accepte, est-ce que je paie aussi le Kit Basique ?",
    "up.fq2": "Pourquoi proposons-nous cette condition ?",
    "up.meta_desc": "Une meilleure offre : le Combo Premium complet à une condition spéciale.",
    "up.meta_title": "Meilleure offre : Combo Premium — Pack Arsenal du Forgeron",
    "dn.badge": "Dernière chance !",
    "dn.choice": "Après cette étape, vous n'aurez plus d'autre occasion d'obtenir le Combo Premium à cette condition.",
    "dn.deal_text": "Nous voulons que vous ayez accès au pack complet. C'est pourquoi nous débloquons cette dernière condition avant que vous ne continuiez avec l'offre basique.",
    "dn.fa2": "Parce qu'avant que vous ne continuiez avec l'option basique, nous voulons vous donner une dernière occasion d'avoir le Combo Premium complet à une condition spéciale.",
    "dn.fq2": "Pourquoi ai-je reçu cette offre ?",
    "dn.meta_desc": "Dernière occasion de cette commande pour obtenir le Combo Premium à une condition spéciale.",
    "dn.meta_title": "Dernière chance : Combo Premium — Pack Arsenal du Forgeron"
  };
  for (var k in t) dict[k] = t[k];
  // Título y descripción propios de cada página del funnel (i18n.js usa meta.title / meta.description).
  var p = document.documentElement.getAttribute("data-funnel-page") === "downsell" ? "dn" : "up";
  dict["meta.title"] = t[p + ".meta_title"];
  dict["meta.description"] = t[p + ".meta_desc"];
})();
