/* Traducciones ES (idioma original del sitio, usado como referencia y fallback) — páginas del funnel (/upsell1/, /downsell1/).
 * Se cargan DESPUÉS de /assets/i18n/es.js y se suman a su diccionario, así las
 * páginas del funnel reutilizan las claves de la página principal (planes, bonus, FAQ...). */
(function () {
  var all = window.PTH_I18N = window.PTH_I18N || {};
  var dict = all.es = all.es || {};
  var t = {
    "fn.basic_cta": "Continuar con la oferta básica",
    "fn.basic_desc": "+3.000 proyectos seleccionados, con portones, rejas y remolques. Acceso digital inmediato.",
    "fn.basic_label": "Tu oferta básica",
    "fn.bonus_title": "Los 4 bonos del Combo Premium",
    "fn.bonus1_alt": "Guía para presentar muebles de metalón",
    "fn.bonus1_name": "Guía para presentar muebles de metalón",
    "fn.bonus2_alt": "Guía completa de precios para muebles industriales",
    "fn.bonus2_name": "Guía completa de precios para muebles industriales",
    "fn.bonus3_alt": "Los 10 mayores errores de un herrero principiante",
    "fn.bonus3_name": "Los 10 mayores errores de un herrero principiante",
    "fn.bonus4_alt": "Tipos de acero y sus aplicaciones",
    "fn.bonus4_name": "Tipos de acero y sus aplicaciones",
    "fn.card_cats": "8 categorías: portones, remolques, muebles, estructuras, parrillas, gimnasio y más",
    "fn.card_ribbon": "Recomendado",
    "fn.cta_pre": "Quiero el Combo Premium por",
    "fn.deal_kicker": "Lleva el <span class=\"accent\">Combo Premium</span> ahora por solo:",
    "fn.decline_pre": "No, prefiero continuar con el Kit Básico de",
    "fn.faq_title": "Dudas sobre esta oferta",
    "fn.microcopy": "Pago único · Acceso digital inmediato por correo",
    "fn.price_regular": "En la página principal",
    "fn.sticky_cta": "Lo quiero",
    "fn.tag_projects": "+4.000 proyectos",
    "fn.w1_d": "En lugar de los +3.000 del Kit Básico. Todos con medidas, cortes y precio sugerido.",
    "fn.w2_d": "Muebles industriales, estructuras y galpones, parrillas, gimnasio, plataformas y carrocerías.",
    "fn.w2_t": "Más categorías",
    "fn.w3_d": "Guías de precios y de presentación, errores de principiante y tipos de acero.",
    "fn.why_title": "¿Por qué llevar el Combo Premium?",
    "up.badge": "¡Oferta mejor!",
    "up.choice": "Pero la decisión es tuya: si prefieres, puedes continuar con tu oferta básica.",
    "up.ctx_bonus": "4 bonos incluidos",
    "up.deal_text": "Queremos que tengas el paquete completo. Por eso, antes de que continúes solo con la oferta básica, liberamos esta condición especial. Hoy es el último día para aprovecharla.",
    "up.fa1": "No. Al aceptar vas al pago del Combo Premium en lugar del Kit Básico. El combo ya incluye portones, rejas y remolques, además de todo lo demás.",
    "up.fa2": "Porque queremos que tengas el Combo Premium y todos los materiales que preparamos. Antes de que continúes solo con la opción básica, liberamos esta condición especial.",
    "up.fq1": "Si acepto, ¿pago también el Kit Básico?",
    "up.fq2": "¿Por qué estamos ofreciendo esta condición?",
    "up.meta_desc": "Oferta mejor: lleva el Combo Premium completo con una condición especial.",
    "up.meta_title": "Oferta mejor: Combo Premium — Pack Arsenal del Herrero",
    "dn.badge": "¡Última oportunidad!",
    "dn.choice": "Después de esta etapa, no tendrás otra oportunidad de llevar el Combo Premium en esta condición.",
    "dn.deal_text": "Queremos que tengas acceso al paquete completo. Por eso liberamos esta última condición antes de que continúes con la oferta básica.",
    "dn.fa2": "Porque, antes de que continúes con la opción básica, queremos darte una última oportunidad de tener el Combo Premium completo en una condición especial.",
    "dn.fq2": "¿Por qué recibí esta oferta?",
    "dn.meta_desc": "Última oportunidad de este pedido para llevar el Combo Premium en una condición especial.",
    "dn.meta_title": "Última oportunidad: Combo Premium — Pack Arsenal del Herrero"
  };
  for (var k in t) dict[k] = t[k];
  // Título y descripción propios de cada página del funnel (i18n.js usa meta.title / meta.description).
  var p = document.documentElement.getAttribute("data-funnel-page") === "downsell" ? "dn" : "up";
  dict["meta.title"] = t[p + ".meta_title"];
  dict["meta.description"] = t[p + ".meta_desc"];
})();
