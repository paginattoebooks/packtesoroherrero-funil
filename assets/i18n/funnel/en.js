/* Traducciones EN — páginas del funnel (/upsell1/, /downsell1/).
 * Se cargan DESPUÉS de /assets/i18n/en.js y se suman a su diccionario, así las
 * páginas del funnel reutilizan las claves de la página principal (planes, bonus, FAQ...). */
(function () {
  var all = window.PTH_I18N = window.PTH_I18N || {};
  var dict = all.en = all.en || {};
  var t = {
    "fn.basic_cta": "Continue with the basic offer",
    "fn.basic_desc": "3,000+ selected projects, including gates, fences and trailers. Instant digital access.",
    "fn.basic_label": "Your basic offer",
    "fn.bonus_title": "The Premium Combo's 4 bonuses",
    "fn.bonus1_alt": "Guide to showcasing sheet-metal furniture",
    "fn.bonus1_name": "Guide to showcasing sheet-metal furniture",
    "fn.bonus2_alt": "Complete pricing guide for industrial furniture",
    "fn.bonus2_name": "Complete pricing guide for industrial furniture",
    "fn.bonus3_alt": "The 10 biggest mistakes of a beginner blacksmith",
    "fn.bonus3_name": "The 10 biggest mistakes of a beginner blacksmith",
    "fn.bonus4_alt": "Steel types and their applications",
    "fn.bonus4_name": "Steel types and their applications",
    "fn.card_ribbon": "Recommended",
    "fn.cta_pre": "I want the Premium Combo for",
    "fn.deal_kicker": "Get the <span class=\"accent\">Premium Combo</span> now for just:",
    "fn.decline_pre": "No, I'd rather continue with the Basic Kit for",
    "fn.faq_title": "Questions about this offer",
    "fn.microcopy": "One-time payment · Instant digital access by email",
    "fn.price_regular": "On the main page",
    "fn.sticky_cta": "I want it",
    "fn.tag_projects": "4,000+ projects",
    "fn.w1_d": "Instead of the Basic Kit's 3,000+. All with measurements, cuts and suggested price.",
    "fn.w2_d": "Industrial furniture, structures and sheds, grills, gym equipment, platforms and bodywork.",
    "fn.w2_t": "More categories",
    "fn.w3_d": "Pricing and presentation guides, beginner mistakes and steel types.",
    "fn.why_title": "Why get the Premium Combo?",
    "up.badge": "A better offer!",
    "up.choice": "But the choice is yours: if you prefer, you can continue with your basic offer.",
    "up.ctx_bonus": "4 bonuses included",
    "up.deal_text": "We want you to have the complete package. So before you continue with just the basic offer, we're unlocking this special condition. Today is the last day to take it.",
    "up.fa1": "No. When you accept, you go to the Premium Combo checkout instead of the Basic Kit one. The combo already includes gates, fences and trailers, plus everything else.",
    "up.fa2": "Because we want you to have the Premium Combo and all the materials we've prepared. Before you continue with just the basic option, we've unlocked this special condition.",
    "up.fq1": "If I accept, do I also pay for the Basic Kit?",
    "up.fq2": "Why are we offering this condition?",
    "up.meta_desc": "A better offer: get the complete Premium Combo under a special condition.",
    "up.meta_title": "A better offer: Premium Combo — Blacksmith's Arsenal Pack",
    "dn.badge": "Last chance!",
    "dn.choice": "After this step, you won't have another chance to get the Premium Combo on these terms.",
    "dn.deal_text": "We want you to have the complete package. That's why we're unlocking this final condition before you continue with the basic offer.",
    "dn.fa2": "Because, before you continue with the basic option, we want to give you one last chance to get the complete Premium Combo under a special condition.",
    "dn.fq2": "Why did I get this offer?",
    "dn.meta_desc": "Last chance in this order to get the Premium Combo under a special condition.",
    "dn.meta_title": "Last chance: Premium Combo — Blacksmith's Arsenal Pack"
  };
  for (var k in t) dict[k] = t[k];
  // Título y descripción propios de cada página del funnel (i18n.js usa meta.title / meta.description).
  var p = document.documentElement.getAttribute("data-funnel-page") === "downsell" ? "dn" : "up";
  dict["meta.title"] = t[p + ".meta_title"];
  dict["meta.description"] = t[p + ".meta_desc"];
})();
