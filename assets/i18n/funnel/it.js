/* Traducciones IT — páginas del funnel (/upsell1/, /downsell1/).
 * Se cargan DESPUÉS de /assets/i18n/it.js y se suman a su diccionario, así las
 * páginas del funnel reutilizan las claves de la página principal (planes, bonus, FAQ...). */
(function () {
  var all = window.PTH_I18N = window.PTH_I18N || {};
  var dict = all.it = all.it || {};
  var t = {
    "fn.basic_cta": "Continua con l'offerta base",
    "fn.basic_desc": "Oltre 3.000 progetti selezionati, tra cui cancelli, ringhiere e rimorchi. Accesso digitale immediato.",
    "fn.basic_label": "La tua offerta base",
    "fn.bonus_title": "I 4 bonus del Combo Premium",
    "fn.bonus1_alt": "Guida per presentare mobili in lamiera",
    "fn.bonus1_name": "Guida per presentare mobili in lamiera",
    "fn.bonus2_alt": "Guida completa ai prezzi per mobili industriali",
    "fn.bonus2_name": "Guida completa ai prezzi per mobili industriali",
    "fn.bonus3_alt": "I 10 errori più grandi di un fabbro principiante",
    "fn.bonus3_name": "I 10 errori più grandi di un fabbro principiante",
    "fn.bonus4_alt": "Tipi di acciaio e le loro applicazioni",
    "fn.bonus4_name": "Tipi di acciaio e le loro applicazioni",
    "fn.card_ribbon": "Consigliato",
    "fn.cta_pre": "Voglio il Combo Premium a",
    "fn.deal_kicker": "Prendi il <span class=\"accent\">Combo Premium</span> ora a soli:",
    "fn.decline_pre": "No, preferisco continuare con il Kit Base da",
    "fn.faq_title": "Domande su questa offerta",
    "fn.microcopy": "Pagamento unico · Accesso digitale immediato via e-mail",
    "fn.price_regular": "Nella pagina principale",
    "fn.sticky_cta": "Lo voglio",
    "fn.tag_projects": "Oltre 4.000 progetti",
    "fn.w1_d": "Invece degli oltre 3.000 del Kit Base. Tutti con misure, tagli e prezzo suggerito.",
    "fn.w2_d": "Mobili industriali, strutture e capannoni, griglie, palestra, pianali e carrozzeria.",
    "fn.w2_t": "Più categorie",
    "fn.w3_d": "Guide ai prezzi e alla presentazione, errori da principiante e tipi di acciaio.",
    "fn.why_title": "Perché scegliere il Combo Premium?",
    "up.badge": "Un'offerta migliore!",
    "up.choice": "Ma la scelta è tua: se preferisci, puoi continuare con la tua offerta base.",
    "up.ctx_bonus": "4 bonus inclusi",
    "up.deal_text": "Vogliamo che tu abbia il pacchetto completo. Per questo, prima che tu continui solo con l'offerta base, sblocchiamo questa condizione speciale. Oggi è l'ultimo giorno per approfittarne.",
    "up.fa1": "No. Accettando passi al pagamento del Combo Premium al posto del Kit Base. Il combo include già cancelli, ringhiere e rimorchi, oltre a tutto il resto.",
    "up.fa2": "Perché vogliamo che tu abbia il Combo Premium e tutti i materiali che abbiamo preparato. Prima che tu continui solo con l'opzione base, abbiamo sbloccato questa condizione speciale.",
    "up.fq1": "Se accetto, pago anche il Kit Base?",
    "up.fq2": "Perché ti offriamo questa condizione?",
    "up.meta_desc": "Un'offerta migliore: il Combo Premium completo a una condizione speciale.",
    "up.meta_title": "Offerta migliore: Combo Premium — Pack Arsenale del Fabbro",
    "dn.badge": "Ultima occasione!",
    "dn.choice": "Dopo questa fase, non avrai un'altra occasione di avere il Combo Premium a questa condizione.",
    "dn.deal_text": "Vogliamo che tu abbia accesso al pacchetto completo. Per questo sblocchiamo quest'ultima condizione prima che tu continui con l'offerta base.",
    "dn.fa2": "Perché, prima che tu continui con l'opzione base, vogliamo darti un'ultima occasione di avere il Combo Premium completo a una condizione speciale.",
    "dn.fq2": "Perché ho ricevuto questa offerta?",
    "dn.meta_desc": "Ultima occasione di questo ordine per avere il Combo Premium a una condizione speciale.",
    "dn.meta_title": "Ultima occasione: Combo Premium — Pack Arsenale del Fabbro"
  };
  for (var k in t) dict[k] = t[k];
  // Título y descripción propios de cada página del funnel (i18n.js usa meta.title / meta.description).
  var p = document.documentElement.getAttribute("data-funnel-page") === "downsell" ? "dn" : "up";
  dict["meta.title"] = t[p + ".meta_title"];
  dict["meta.description"] = t[p + ".meta_desc"];
})();
