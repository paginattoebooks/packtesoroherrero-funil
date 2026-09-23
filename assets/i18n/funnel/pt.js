/* Traducciones PT — páginas del funnel (/upsell1/, /downsell1/).
 * Se cargan DESPUÉS de /assets/i18n/pt.js y se suman a su diccionario, así las
 * páginas del funnel reutilizan las claves de la página principal (planes, bonus, FAQ...). */
(function () {
  var all = window.PTH_I18N = window.PTH_I18N || {};
  var dict = all.pt = all.pt || {};
  var t = {
    "fn.basic_cta": "Continuar com a oferta básica",
    "fn.basic_desc": "+3.000 projetos selecionados, com portões, grades e reboques. Acesso digital imediato.",
    "fn.basic_label": "Sua oferta básica",
    "fn.bonus_title": "Os 4 bônus do Combo Premium",
    "fn.bonus1_alt": "Guia para apresentar móveis de metalão",
    "fn.bonus1_name": "Guia para apresentar móveis de metalão",
    "fn.bonus2_alt": "Guia completo de preços para móveis industriais",
    "fn.bonus2_name": "Guia completo de preços para móveis industriais",
    "fn.bonus3_alt": "Os 10 maiores erros de um serralheiro iniciante",
    "fn.bonus3_name": "Os 10 maiores erros de um serralheiro iniciante",
    "fn.bonus4_alt": "Tipos de aço e suas aplicações",
    "fn.bonus4_name": "Tipos de aço e suas aplicações",
    "fn.card_cats": "8 categorias: portões, reboques, móveis, estruturas, churrasqueiras, academia e mais",
    "fn.card_ribbon": "Recomendado",
    "fn.cta_pre": "Quero o Combo Premium por",
    "fn.deal_kicker": "Leve o <span class=\"accent\">Combo Premium</span> agora por apenas:",
    "fn.decline_pre": "Não, prefiro continuar com o Kit Básico de",
    "fn.faq_title": "Dúvidas sobre esta oferta",
    "fn.microcopy": "Pagamento único · Acesso digital imediato por e-mail",
    "fn.price_regular": "Na página principal",
    "fn.sticky_cta": "Eu quero",
    "fn.tag_projects": "+4.000 projetos",
    "fn.w1_d": "Em vez dos +3.000 do Kit Básico. Todos com medidas, cortes e preço sugerido.",
    "fn.w2_d": "Móveis industriais, estruturas e galpões, churrasqueiras, academia, plataformas e lataria.",
    "fn.w2_t": "Mais categorias",
    "fn.w3_d": "Guias de preços e de apresentação, erros de iniciante e tipos de aço.",
    "fn.why_title": "Por que levar o Combo Premium?",
    "up.badge": "Oferta melhor!",
    "up.choice": "Mas a escolha é sua: se preferir, você pode continuar com sua oferta básica.",
    "up.ctx_bonus": "4 bônus incluídos",
    "up.deal_text": "Queremos que você tenha o pacote completo. Por isso, antes de continuar somente com a oferta básica, liberamos esta condição especial. Hoje é o último dia para aproveitá-la.",
    "up.fa1": "Não. Ao aceitar, você vai para o pagamento do Combo Premium no lugar do Kit Básico. O combo já inclui portões, grades e reboques, além de todo o resto.",
    "up.fa2": "Porque queremos que você tenha o Combo Premium e todos os materiais que preparamos. Antes de você continuar somente com a opção básica, liberamos esta condição especial.",
    "up.fq1": "Se eu aceitar, pago também o Kit Básico?",
    "up.fq2": "Por que estamos oferecendo esta condição?",
    "up.meta_desc": "Oferta melhor: leve o Combo Premium completo em uma condição especial.",
    "up.meta_title": "Oferta melhor: Combo Premium — Pack Arsenal do Ferreiro",
    "dn.badge": "Última chance!",
    "dn.choice": "Depois desta etapa, você não terá outra oportunidade de adquirir o Combo Premium nesta condição.",
    "dn.deal_text": "Queremos que você tenha acesso ao pacote completo. Por isso liberamos esta última condição antes de você continuar com a oferta básica.",
    "dn.fa2": "Porque, antes de você continuar com a opção básica, queremos lhe dar uma última oportunidade de ter acesso ao Combo Premium completo em uma condição especial.",
    "dn.fq2": "Por que recebi esta oferta?",
    "dn.meta_desc": "Última oportunidade deste pedido para levar o Combo Premium em uma condição especial.",
    "dn.meta_title": "Última chance: Combo Premium — Pack Arsenal do Ferreiro"
  };
  for (var k in t) dict[k] = t[k];
  // Título y descripción propios de cada página del funnel (i18n.js usa meta.title / meta.description).
  var p = document.documentElement.getAttribute("data-funnel-page") === "downsell" ? "dn" : "up";
  dict["meta.title"] = t[p + ".meta_title"];
  dict["meta.description"] = t[p + ".meta_desc"];
})();
