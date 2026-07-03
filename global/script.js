
// Punto Smart OS Global — misma interfaz que Free Argentina, con presets por país.
function getGlobalCountry(){
  const params = new URLSearchParams(location.search);
  const q = (params.get('country') || '').toUpperCase();
  if(q === 'AR') { location.replace('../'); return 'US'; }
  if(q && GLOBAL_PRESETS && GLOBAL_PRESETS[q]) return q;
  const saved = (localStorage.getItem('ps_global_country') || '').toUpperCase();
  if(saved === 'AR') return 'US';
  if(saved && GLOBAL_PRESETS && GLOBAL_PRESETS[saved]) return saved;
  const lang = (navigator.language || '').toLowerCase();
  if(lang.startsWith('pt')) return 'BR';
  if(lang.startsWith('fr')) return 'FR';
  if(lang.includes('mx')) return 'MX';
  if(lang.includes('es')) return 'ES';
  return 'US';
}
function A(name,url,domain,dark=false,fallback='',icon=''){ return { id: (name||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''), name, url, domain, dark, fallback, icon }; }
const BASE_WEB = {
  fotos: [A('Google Photos','https://photos.google.com/','photos.google.com'),A('Camera / Photos','https://photos.google.com/','photos.google.com', true, '📷'),A('Canva','https://www.canva.com/','canva.com'),A('Photopea','https://www.photopea.com/','photopea.com'),A('Remove.bg','https://www.remove.bg/','remove.bg'),A('CapCut','https://www.capcut.com/','capcut.com'),A('Adobe Express','https://www.adobe.com/express/','adobe.com'),A('Pinterest','https://www.pinterest.com/','pinterest.com')],
  juegos: [A('Steam','https://store.steampowered.com/','steampowered.com'),A('Poki','https://poki.com/','poki.com'),A('CrazyGames','https://www.crazygames.com/','crazygames.com'),A('Minigames','https://www.minijuegos.com/','minijuegos.com')],
  aiBase: [A('Gemini','https://gemini.google.com/','gemini.google.com'),A('ChatGPT','https://chatgpt.com/','chatgpt.com'),A('Claude','https://claude.ai/','claude.ai'),A('Microsoft 365','https://www.office.com/','office.com'),A('Google Drive','https://drive.google.com/','drive.google.com'),A('Canva','https://www.canva.com/','canva.com')]
};
function smart(locale,countryCode,shoppingBase,newsGl,govQuery,providerQuery){
  return {
    defaults:{google:'https://www.google.com/',chatgpt:'https://chatgpt.com/',videos:'https://www.youtube.com/',comprar:shoppingBase,comparar:'https://www.google.com/search?q=compare+products',futbol:'https://www.google.com/search?q=football+today',tramites:govQuery,noticias:`https://news.google.com/topstories?hl=${locale}&gl=${newsGl}&ceid=${newsGl}:${locale.split('-')[0]}`,lugares:'https://www.google.com/maps',proveedores:'https://www.google.com/search?q='+encodeURIComponent(providerQuery),soporte:'https://www.google.com/search?q=technical+support',trabajo:'https://mail.google.com/',redes:'https://www.google.com/search?q=social+networks'},
    placeholders:{google:'Search the web...',chatgpt:'Ask AI...',videos:'Search videos...',comprar:'Search products...',comparar:'Compare products...',futbol:'Search football, results or fixtures...',tramites:'Search government services...',noticias:'Search news...',lugares:'Search places...',proveedores:'Search suppliers...',soporte:'Search technical support...',trabajo:'Search work tools...',redes:'Search social networks...'},
    templates:{google:'https://www.google.com/search?q={q}',chatgpt:'https://chatgpt.com/?q={q}',videos:'https://www.youtube.com/results?search_query={q}',comprar:shoppingBase.includes('mercado') ? shoppingBase + '/jm/search?as_word={q}' : 'https://www.google.com/search?q={q}+shopping',comparar:'https://www.google.com/search?q=compare+{q}+price+reviews',futbol:'https://www.google.com/search?q={q}+football+results+fixtures',tramites:'https://www.google.com/search?q={q}+government+services+'+encodeURIComponent(countryCode),noticias:`https://news.google.com/search?q={q}&hl=${locale}&gl=${newsGl}&ceid=${newsGl}:${locale.split('-')[0]}`,lugares:'https://www.google.com/maps/search/{q}',proveedores:'https://www.google.com/search?q=supplier+wholesale+{q}+'+encodeURIComponent(countryCode),soporte:'https://www.google.com/search?q=technical+support+{q}',trabajo:'https://mail.google.com/mail/u/0/#search/{q}',redes:'https://www.google.com/search?q={q}+site:instagram.com+OR+site:tiktok.com+OR+site:facebook.com+OR+site:x.com'}
  }
}
const GLOBAL_PRESETS = {
  US:{name:'United States',htmlLang:'en',locale:'en-US',city:'New York',weatherUrl:'https://www.google.com/search?q=weather+new+york',currencyUrl:'https://www.google.com/search?q=usd+exchange+rate',labels:{weatherTitle:'Weather',currencyTitle:'USD',slogan:'Hybrid Operating Interface. Adaptive web environment.',searchPlaceholder:'What do you want to search?',sections:{'Favoritos y Esenciales':'Favorites & Essentials','Compras y Contenido':'Shopping & Content','Fotos y Cámara':'Photos & Camera','Juegos y Ocio':'Games & Leisure','IA y Productividad':'AI & Productivity'},engines:{google:'Web',chatgpt:'AI',videos:'Videos',comprar:'Shop',comparar:'Compare',futbol:'Sports',tramites:'Gov',noticias:'News',lugares:'Places',proveedores:'Suppliers',soporte:'Support',trabajo:'Work',redes:'Social'},customTitle:'Your custom shortcuts',helpTitle:'Customize your Smart OS',helpText:'Add the websites and apps you use most. Tap a free tile, paste the link and save it.',howBtn:'How to add a shortcut?',edit:'✎ Edit',support:'? Support',guide:'How to use',suggestions:'☏ Suggestions',footer:'Your portal. Everything in one place.',addDialogTitle:'Add website or app'}, folderNames:{fotos:'Photos & Camera',juegos:'Games & Leisure',tramites:'Government',noticias:'News & Sports',bancos:'Banks / Finance',negocio:'Business / Suppliers'}, smart:smart('en-US','United States','https://www.amazon.com','US','https://www.usa.gov/','wholesale suppliers united states'), groups:{favorites:[A('Google','https://www.google.com/','google.com'),A('YouTube','https://www.youtube.com/','youtube.com'),A('Gmail','https://mail.google.com/','gmail.com'),A('Outlook','https://outlook.live.com/','outlook.com'),A('WhatsApp Web','https://web.whatsapp.com/','',false,'WA'),A('Instagram','https://www.instagram.com/','instagram.com'),A('TikTok','https://www.tiktok.com/','tiktok.com',true),A('Facebook','https://www.facebook.com/','facebook.com'),A('Maps','https://www.google.com/maps','google.com'),A('Translate','https://translate.google.com/','translate.google.com'),A('Weather','https://weather.com/','weather.com'),A('X.com','https://x.com/','x.com',true),A('Calendar','https://calendar.google.com/','calendar.google.com')], content:[A('Amazon','https://www.amazon.com/','amazon.com'),A('eBay','https://www.ebay.com/','ebay.com'),A('Walmart','https://www.walmart.com/','walmart.com'),A('Wikipedia','https://www.wikipedia.org/','wikipedia.org'),A('Netflix','https://www.netflix.com/','netflix.com',true),A('Spotify','https://open.spotify.com/','spotify.com',true),A('Reddit','https://www.reddit.com/','reddit.com'),A('Notes','#notes','',true,'▤')], fotos:BASE_WEB.fotos, juegos:BASE_WEB.juegos, ai:[...BASE_WEB.aiBase,A('PayPal','https://www.paypal.com/','paypal.com'),A('Indeed','https://www.indeed.com/','indeed.com')], tramites:[A('USA.gov','https://www.usa.gov/','usa.gov'),A('IRS','https://www.irs.gov/','',false,'IRS'),A('USPS','https://www.usps.com/','usps.com'),A('SSA','https://www.ssa.gov/','ssa.gov')], noticias:[A('CNN','https://www.cnn.com/','cnn.com'),A('NYTimes','https://www.nytimes.com/','nytimes.com'),A('Reuters','https://www.reuters.com/','reuters.com'),A('ESPN','https://www.espn.com/','espn.com')], bancos:[A('Bank of America','https://www.bankofamerica.com/','bankofamerica.com'),A('Chase','https://www.chase.com/','chase.com'),A('Wells Fargo','https://www.wellsfargo.com/','wellsfargo.com'),A('PayPal','https://www.paypal.com/','paypal.com')], negocio:[A('Suppliers','https://www.google.com/search?q=wholesale+suppliers+usa','google.com',true,'▰'),A('Alibaba','https://www.alibaba.com/','alibaba.com'),A('Amazon Business','https://business.amazon.com/','amazon.com'),A('Tech','https://www.google.com/search?q=technology+suppliers+usa','google.com',true,'▦')]}},
  ES:{name:'España',htmlLang:'es',locale:'es-ES',city:'Madrid',weatherUrl:'https://www.google.com/search?q=clima+madrid',currencyUrl:'https://www.google.com/search?q=euro+dolar+hoy',labels:{weatherTitle:'Clima',currencyTitle:'EUR / USD',slogan:'Interfaz Híbrida Operativa. Entorno Adaptable a tu gusto.',searchPlaceholder:'¿Qué quieres buscar?',sections:{'Favoritos y Esenciales':'Favoritos y Esenciales','Compras y Contenido':'Compras y Contenido','Fotos y Cámara':'Fotos y Cámara','Juegos y Ocio':'Juegos y Ocio','IA y Productividad':'IA y Productividad'},engines:{google:'Web',chatgpt:'IA',videos:'Videos',comprar:'Comprar',comparar:'Comparar',futbol:'Fútbol',tramites:'Trámites',noticias:'Noticias',lugares:'Lugares',proveedores:'Proveedores',soporte:'Soporte',trabajo:'Trabajo',redes:'Redes'},customTitle:'Tus accesos personalizados',helpTitle:'Personaliza tu Smart OS',helpText:'Agrega los sitios y aplicaciones que más usas. Toca una baldosa libre, pega el link y guárdalo.',howBtn:'¿Cómo agregar un acceso?',edit:'✎ Editar',support:'? Soporte',guide:'Cómo usarlo',suggestions:'☏ Sugerencias',footer:'Tu portal. Todo en un lugar.',addDialogTitle:'Agregar página o aplicación'}, folderNames:{fotos:'Fotos y Cámara',juegos:'Juegos y Ocio',tramites:'Trámites',noticias:'Noticias y Deportes',bancos:'Bancos',negocio:'Negocio / Proveedores'}, smart:smart('es-ES','España','https://www.amazon.es','ES','https://administracion.gob.es/','proveedores mayoristas españa'), groups:{favorites:[A('Google','https://www.google.es/','google.es'),A('YouTube','https://www.youtube.com/','youtube.com'),A('Gmail','https://mail.google.com/','gmail.com'),A('Outlook','https://outlook.live.com/','outlook.com'),A('WhatsApp Web','https://web.whatsapp.com/','',false,'WA'),A('Instagram','https://www.instagram.com/','instagram.com'),A('TikTok','https://www.tiktok.com/','tiktok.com',true),A('Facebook','https://www.facebook.com/','facebook.com'),A('Maps','https://www.google.com/maps','google.com'),A('Traductor','https://translate.google.com/','translate.google.com'),A('El Tiempo','https://www.eltiempo.es/','eltiempo.es'),A('X.com','https://x.com/','x.com',true),A('Calendario','https://calendar.google.com/','calendar.google.com')], content:[A('Amazon','https://www.amazon.es/','amazon.es'),A('Wallapop','https://es.wallapop.com/','wallapop.com'),A('Milanuncios','https://www.milanuncios.com/','milanuncios.com'),A('Wikipedia','https://es.wikipedia.org/','wikipedia.org'),A('Netflix','https://www.netflix.com/','netflix.com',true),A('Spotify','https://open.spotify.com/','spotify.com',true),A('RTVE Play','https://www.rtve.es/play/','rtve.es'),A('Bloc de notas','#notes','',true,'▤')], fotos:BASE_WEB.fotos, juegos:BASE_WEB.juegos, ai:[...BASE_WEB.aiBase,A('Renfe','https://www.renfe.com/','',false,'RF'),A('Booking','https://www.booking.com/','booking.com')], tramites:[A('Gob.es','https://administracion.gob.es/','',false,'GOB'),A('AEAT','https://sede.agenciatributaria.gob.es/','',false,'AEAT'),A('Seguridad Social','https://sede.seg-social.gob.es/','',false,'SS'),A('DGT','https://sede.dgt.gob.es/','',false,'DGT')], noticias:[A('El País','https://elpais.com/','elpais.com'),A('El Mundo','https://www.elmundo.es/','elmundo.es'),A('La Vanguardia','https://www.lavanguardia.com/','lavanguardia.com'),A('Marca','https://www.marca.com/','marca.com')], bancos:[A('Santander','https://www.bancosantander.es/','bancosantander.es'),A('BBVA','https://www.bbva.es/','bbva.es'),A('CaixaBank','https://www.caixabank.es/','caixabank.es'),A('Sabadell','https://www.bancsabadell.com/','bancsabadell.com')], negocio:[A('Proveedores','https://www.google.com/search?q=proveedores+mayoristas+españa','google.com',true,'▰'),A('SoloStocks','https://www.solostocks.com/','',false,'STK'),A('Amazon Business','https://business.amazon.es/','amazon.es'),A('Tecnología','https://www.google.com/search?q=proveedores+tecnologia+españa','google.com',true,'▦')]}},
  MX:{name:'México',htmlLang:'es',locale:'es-MX',city:'CDMX',weatherUrl:'https://www.google.com/search?q=clima+ciudad+de+mexico',currencyUrl:'https://www.google.com/search?q=dolar+peso+mexicano+hoy',labels:{weatherTitle:'Clima',currencyTitle:'USD / MXN',slogan:'Interfaz Híbrida Operativa. Entorno Adaptable a tu gusto.',searchPlaceholder:'¿Qué quieres buscar?',sections:{'Favoritos y Esenciales':'Favoritos y Esenciales','Compras y Contenido':'Compras y Contenido','Fotos y Cámara':'Fotos y Cámara','Juegos y Ocio':'Juegos y Ocio','IA y Productividad':'IA y Productividad'},engines:{google:'Web',chatgpt:'IA',videos:'Videos',comprar:'Comprar',comparar:'Comparar',futbol:'Fútbol',tramites:'Trámites',noticias:'Noticias',lugares:'Lugares',proveedores:'Proveedores',soporte:'Soporte',trabajo:'Trabajo',redes:'Redes'},customTitle:'Tus accesos personalizados',helpTitle:'Personaliza tu Smart OS',helpText:'Agrega los sitios y aplicaciones que más usas. Toca una baldosa libre, pega el link y guárdalo.',howBtn:'¿Cómo agregar un acceso?',edit:'✎ Editar',support:'? Soporte',guide:'Cómo usarlo',suggestions:'☏ Sugerencias',footer:'Tu portal. Todo en un lugar.',addDialogTitle:'Agregar página o aplicación'}, folderNames:{fotos:'Fotos y Cámara',juegos:'Juegos y Ocio',tramites:'Trámites',noticias:'Noticias y Deportes',bancos:'Bancos',negocio:'Negocio / Proveedores'}, smart:smart('es-MX','México','https://www.mercadolibre.com.mx','MX','https://www.gob.mx/','proveedores mayoristas mexico'), groups:{favorites:[A('Google','https://www.google.com.mx/','google.com.mx'),A('YouTube','https://www.youtube.com/','youtube.com'),A('Gmail','https://mail.google.com/','gmail.com'),A('Outlook','https://outlook.live.com/','outlook.com'),A('WhatsApp Web','https://web.whatsapp.com/','',false,'WA'),A('Instagram','https://www.instagram.com/','instagram.com'),A('TikTok','https://www.tiktok.com/','tiktok.com',true),A('Facebook','https://www.facebook.com/','facebook.com'),A('Maps','https://www.google.com/maps','google.com'),A('Traductor','https://translate.google.com/','translate.google.com'),A('Clima','https://weather.com/es-MX/','weather.com'),A('X.com','https://x.com/','x.com',true)], content:[A('Mercado Libre','https://www.mercadolibre.com.mx/','mercadolibre.com.mx'),A('Amazon','https://www.amazon.com.mx/','amazon.com.mx'),A('Walmart','https://www.walmart.com.mx/','walmart.com.mx'),A('Wikipedia','https://es.wikipedia.org/','wikipedia.org'),A('Netflix','https://www.netflix.com/','netflix.com',true),A('Spotify','https://open.spotify.com/','spotify.com',true),A('Claro Video','https://www.clarovideo.com/','clarovideo.com'),A('Bloc de notas','#notes','',true,'▤')], fotos:BASE_WEB.fotos, juegos:BASE_WEB.juegos, ai:[...BASE_WEB.aiBase,A('Aeroméxico','https://aeromexico.com/','',false,'AM'),A('Despegar','https://www.despegar.com.mx/','despegar.com.mx')], tramites:[A('Gob.mx','https://www.gob.mx/','gob.mx'),A('SAT','https://www.sat.gob.mx/','sat.gob.mx'),A('IMSS','https://www.imss.gob.mx/','imss.gob.mx'),A('CURP','https://www.gob.mx/curp/','gob.mx')], noticias:[A('El Universal','https://www.eluniversal.com.mx/','eluniversal.com.mx'),A('Milenio','https://www.milenio.com/','milenio.com'),A('Reforma','https://www.reforma.com/','reforma.com'),A('ESPN','https://www.espn.com.mx/','espn.com.mx')], bancos:[A('BBVA','https://www.bbva.mx/','bbva.mx'),A('Banamex','https://www.banamex.com/','banamex.com'),A('Santander','https://www.santander.com.mx/','santander.com.mx'),A('Banorte','https://www.banorte.com/','banorte.com')], negocio:[A('Proveedores','https://www.google.com/search?q=proveedores+mayoristas+mexico','google.com',true,'▰'),A('Alibaba','https://www.alibaba.com/','alibaba.com'),A('Mercado Libre','https://www.mercadolibre.com.mx/','mercadolibre.com.mx'),A('Tecnología','https://www.google.com/search?q=proveedores+tecnologia+mexico','google.com',true,'▦')]}},
  BR:{name:'Brasil',htmlLang:'pt',locale:'pt-BR',city:'São Paulo',weatherUrl:'https://www.google.com/search?q=clima+sao+paulo',currencyUrl:'https://www.google.com/search?q=dolar+real+hoje',labels:{weatherTitle:'Clima',currencyTitle:'USD / BRL',slogan:'Interface híbrida operacional. Ambiente adaptável ao seu uso.',searchPlaceholder:'O que você quer buscar?',sections:{'Favoritos y Esenciales':'Favoritos e Essenciais','Compras y Contenido':'Compras e Conteúdo','Fotos y Cámara':'Fotos e Câmera','Juegos y Ocio':'Jogos e Lazer','IA y Productividad':'IA e Produtividade'},engines:{google:'Web',chatgpt:'IA',videos:'Vídeos',comprar:'Comprar',comparar:'Comparar',futbol:'Futebol',tramites:'Serviços',noticias:'Notícias',lugares:'Lugares',proveedores:'Fornecedores',soporte:'Suporte',trabajo:'Trabalho',redes:'Redes'},customTitle:'Seus acessos personalizados',helpTitle:'Personalize seu Smart OS',helpText:'Adicione os sites e aplicativos que você mais usa. Toque em um bloco livre, cole o link e salve.',howBtn:'Como adicionar um acesso?',edit:'✎ Editar',support:'? Suporte',guide:'Como usar',suggestions:'☏ Sugestões',footer:'Seu portal. Tudo em um só lugar.',addDialogTitle:'Adicionar site ou app'}, folderNames:{fotos:'Fotos e Câmera',juegos:'Jogos e Lazer',tramites:'Serviços',noticias:'Notícias e Esportes',bancos:'Bancos',negocio:'Negócio / Fornecedores'}, smart:smart('pt-BR','Brasil','https://www.mercadolivre.com.br','BR','https://www.gov.br/','fornecedores atacado brasil'), groups:{favorites:[A('Google','https://www.google.com.br/','google.com.br'),A('YouTube','https://www.youtube.com/','youtube.com'),A('Gmail','https://mail.google.com/','gmail.com'),A('Outlook','https://outlook.live.com/','outlook.com'),A('WhatsApp Web','https://web.whatsapp.com/','',false,'WA'),A('Instagram','https://www.instagram.com/','instagram.com'),A('TikTok','https://www.tiktok.com/','tiktok.com',true),A('Facebook','https://www.facebook.com/','facebook.com'),A('Maps','https://www.google.com/maps','google.com'),A('Tradutor','https://translate.google.com/','translate.google.com'),A('Clima','https://weather.com/pt-BR/','weather.com'),A('X.com','https://x.com/','x.com',true)], content:[A('Mercado Livre','https://www.mercadolivre.com.br/','mercadolivre.com.br'),A('Amazon','https://www.amazon.com.br/','amazon.com.br'),A('Shopee','https://shopee.com.br/','shopee.com.br'),A('Wikipedia','https://pt.wikipedia.org/','wikipedia.org'),A('Netflix','https://www.netflix.com/','netflix.com',true),A('Spotify','https://open.spotify.com/','spotify.com',true),A('GloboPlay','https://globoplay.globo.com/','globoplay.globo.com'),A('Bloco de notas','#notes','',true,'▤')], fotos:BASE_WEB.fotos, juegos:BASE_WEB.juegos, ai:[...BASE_WEB.aiBase,A('Azul','https://www.voeazul.com.br/','',false,'AZ'),A('Decolar','https://www.decolar.com/','decolar.com')], tramites:[A('Gov.br','https://www.gov.br/','gov.br'),A('Receita Federal','https://www.gov.br/receitafederal/','gov.br'),A('INSS','https://www.gov.br/inss/','gov.br'),A('Correios','https://www.correios.com.br/','correios.com.br')], noticias:[A('Globo','https://www.globo.com/','globo.com'),A('UOL','https://www.uol.com.br/','uol.com.br'),A('Folha','https://www.folha.uol.com.br/','folha.uol.com.br'),A('GE','https://ge.globo.com/','ge.globo.com')], bancos:[A('Itaú','https://www.itau.com.br/','itau.com.br'),A('Bradesco','https://banco.bradesco/','',false,'B'),A('Banco do Brasil','https://www.bb.com.br/','bb.com.br'),A('Nubank','https://nubank.com.br/','nubank.com.br')], negocio:[A('Fornecedores','https://www.google.com/search?q=fornecedores+atacado+brasil','google.com',true,'▰'),A('Alibaba','https://www.alibaba.com/','alibaba.com'),A('Mercado Livre','https://www.mercadolivre.com.br/','mercadolivre.com.br'),A('Tecnologia','https://www.google.com/search?q=fornecedores+tecnologia+brasil','google.com',true,'▦')]}},
  FR:{name:'France',htmlLang:'fr',locale:'fr-FR',city:'Paris',weatherUrl:'https://www.google.com/search?q=meteo+paris',currencyUrl:'https://www.google.com/search?q=euro+dollar+aujourd%27hui',labels:{weatherTitle:'Météo',currencyTitle:'EUR / USD',slogan:'Interface hybride opérationnelle. Environnement web adaptable.',searchPlaceholder:'Que voulez-vous chercher ?',sections:{'Favoritos y Esenciales':'Favoris et essentiels','Compras y Contenido':'Achats et contenu','Fotos y Cámara':'Photos et caméra','Juegos y Ocio':'Jeux et loisirs','IA y Productividad':'IA et productivité'},engines:{google:'Web',chatgpt:'IA',videos:'Vidéos',comprar:'Acheter',comparar:'Comparer',futbol:'Football',tramites:'Services',noticias:'Actus',lugares:'Lieux',proveedores:'Fournisseurs',soporte:'Support',trabajo:'Travail',redes:'Réseaux'},customTitle:'Vos accès personnalisés',helpTitle:'Personnalisez votre Smart OS',helpText:'Ajoutez les sites et apps que vous utilisez le plus. Touchez une tuile libre, collez le lien et enregistrez.',howBtn:'Comment ajouter un accès ?',edit:'✎ Modifier',support:'? Support',guide:'Mode d’emploi',suggestions:'☏ Suggestions',footer:'Votre portail. Tout en un seul endroit.',addDialogTitle:'Ajouter un site ou une app'}, folderNames:{fotos:'Photos et caméra',juegos:'Jeux et loisirs',tramites:'Services',noticias:'Actualités et sport',bancos:'Banques',negocio:'Business / Fournisseurs'}, smart:smart('fr-FR','France','https://www.amazon.fr','FR','https://www.service-public.fr/','fournisseurs grossistes france'), groups:{favorites:[A('Google','https://www.google.fr/','google.fr'),A('YouTube','https://www.youtube.com/','youtube.com'),A('Gmail','https://mail.google.com/','gmail.com'),A('Outlook','https://outlook.live.com/','outlook.com'),A('WhatsApp Web','https://web.whatsapp.com/','',false,'WA'),A('Instagram','https://www.instagram.com/','instagram.com'),A('TikTok','https://www.tiktok.com/','tiktok.com',true),A('Facebook','https://www.facebook.com/','facebook.com'),A('Maps','https://www.google.com/maps','google.com'),A('Traduction','https://translate.google.com/','translate.google.com'),A('Météo','https://meteofrance.com/','meteofrance.com'),A('X.com','https://x.com/','x.com',true)], content:[A('Amazon','https://www.amazon.fr/','amazon.fr'),A('Leboncoin','https://www.leboncoin.fr/','leboncoin.fr'),A('Cdiscount','https://www.cdiscount.com/','cdiscount.com'),A('Wikipedia','https://fr.wikipedia.org/','wikipedia.org'),A('Netflix','https://www.netflix.com/','netflix.com',true),A('Spotify','https://open.spotify.com/','spotify.com',true),A('France TV','https://www.france.tv/','france.tv'),A('Notes','#notes','',true,'▤')], fotos:BASE_WEB.fotos, juegos:BASE_WEB.juegos, ai:[...BASE_WEB.aiBase,A('SNCF','https://www.sncf-connect.com/','sncf-connect.com'),A('Booking','https://www.booking.com/','booking.com')], tramites:[A('Service Public','https://www.service-public.fr/','',false,'SP'),A('Impôts','https://www.impots.gouv.fr/','impots.gouv.fr'),A('Ameli','https://www.ameli.fr/','ameli.fr'),A('La Poste','https://www.laposte.fr/','laposte.fr')], noticias:[A('Le Monde','https://www.lemonde.fr/','lemonde.fr'),A('Franceinfo','https://www.francetvinfo.fr/','francetvinfo.fr'),A('Le Figaro','https://www.lefigaro.fr/','lefigaro.fr'),A('L’Équipe','https://www.lequipe.fr/','lequipe.fr')], bancos:[A('BNP Paribas','https://mabanque.bnpparibas/','',false,'BNP'),A('Crédit Agricole','https://www.credit-agricole.fr/','credit-agricole.fr'),A('Société Générale','https://particuliers.sg.fr/','sg.fr'),A('Boursorama','https://www.boursobank.com/','boursobank.com')], negocio:[A('Fournisseurs','https://www.google.com/search?q=fournisseurs+grossistes+france','google.com',true,'▰'),A('Alibaba','https://www.alibaba.com/','alibaba.com'),A('Amazon Business','https://business.amazon.fr/','amazon.fr'),A('Technologie','https://www.google.com/search?q=fournisseurs+technologie+france','google.com',true,'▦')]}}
};
const GLOBAL_COUNTRY = getGlobalCountry();

function getUiText(){
  const lang = ACTIVE_PRESET.htmlLang || 'en';
  const tables = {
    en: {
      addAccess:'Add shortcut', addShort:'Add', edit:'✎ Edit', done:'✓ Done', deleteBtn:'Delete', cancel:'Cancel', save:'Save',
      name:'Name', link:'Link', iconOptional:'Optional icon', customPlaceholder:'Example: supplier', iconPlaceholder:'https://.../icon.png',
      modalNote:'If you do not add an icon, Punto Smart OS tries to load the favicon automatically. If it fails, it uses the first letters of the name.',
      addDialogTitle:'Add website or app', addAccessIn:'Add shortcut in ', sectionFallback:'section', customEmpty:'Add<br>shortcut',
      deleteTitle:'Delete shortcut', deleteConfirm:'Delete this shortcut?', restoreConfirm:'Restore custom shortcuts, section order and reload the layout?',
      adTitle:'Reach more people', adText:'Advertise your product or service on Punto Smart OS.', adCta:'ADVERTISE HERE',
      infoTitle:'How to add a shortcut', info1:'1. Tap an “Add shortcut” tile.', info2:'2. Enter the name and paste the full link, for example: ', info3:'3. Save. The shortcut stays on this device.', info4:'To change it, tap “Edit” and select the tile.',
      plusTitle:'Plus version', plus1:'Plus saves your online desktop in your private cloud so you can open your environment wherever you are, from any device.', plus2:'Your shortcuts, favorite apps and settings stay saved, so you do not need to set everything up again.', plus3:'Most important: you do not lose your work environment.', plusSolves:'It solves:',
      plusBullets:['If your device is lost, stolen or broken, you can work again in minutes.','If you change computer, phone or TV Box, you recover your environment without starting over.','You do not need a powerful device: your environment opens from the web.','You can keep your important tools organized and always available.','You save time by not searching, loading and organizing shortcuts again.','Ideal for personal use, shops, offices, salespeople and teams.'],
      plusBenefits:'See Plus benefits'
    },
    es: {
      addAccess:'Agregar acceso', addShort:'Agregar', edit:'✎ Editar', done:'✓ Listo', deleteBtn:'Borrar', cancel:'Cancelar', save:'Guardar',
      name:'Nombre', link:'Link', iconOptional:'Icono opcional', customPlaceholder:'Ej: Proveedor', iconPlaceholder:'https://.../icono.png',
      modalNote:'Si no cargas icono, Punto Smart OS intenta traer el favicon automáticamente. Si falla, usa las iniciales del nombre.',
      addDialogTitle:'Agregar página o aplicación', addAccessIn:'Agregar acceso en ', sectionFallback:'sección', customEmpty:'Agregar<br>acceso',
      deleteTitle:'Borrar acceso', deleteConfirm:'¿Borrar este acceso?', restoreConfirm:'¿Restaurar accesos personalizados, orden de secciones y recargar la maqueta?',
      adTitle:'Llega a más personas', adText:'Anuncia tu producto o servicio en Punto Smart OS.', adCta:'ANUNCIA AQUÍ',
      infoTitle:'Cómo agregar un acceso', info1:'1. Toca una baldosa “Agregar acceso”.', info2:'2. Escribe el nombre y pega el link completo, por ejemplo: ', info3:'3. Guarda. El acceso queda en este dispositivo.', info4:'Para cambiarlo, toca “Editar” y selecciona la baldosa.',
      plusTitle:'Versión Plus', plus1:'Plus guarda tu escritorio online en tu nube privada para abrir tu entorno donde quieras, desde cualquier dispositivo.', plus2:'Tus accesos, apps preferidas y configuración quedan guardados, para que no tengas que volver a cargar todo desde cero.', plus3:'Y lo más importante: no pierdes tu entorno de trabajo.', plusSolves:'Resuelve:',
      plusBullets:['Si pierdes, te roban o se rompe tu dispositivo, puedes volver a operar en minutos.','Si cambias de computadora, celular o TV Box, recuperas tu entorno sin empezar de nuevo.','No necesitas un equipo súper potente: tu entorno se abre desde la web.','Puedes tener tus herramientas importantes siempre ordenadas y disponibles.','Ahorras tiempo evitando volver a buscar, cargar y organizar tus accesos.','Ideal para uso personal, comercios, oficinas, vendedores y equipos de trabajo.'],
      plusBenefits:'Ver ventajas Plus'
    },
    pt: {
      addAccess:'Adicionar acesso', addShort:'Adicionar', edit:'✎ Editar', done:'✓ Pronto', deleteBtn:'Excluir', cancel:'Cancelar', save:'Salvar',
      name:'Nome', link:'Link', iconOptional:'Ícone opcional', customPlaceholder:'Ex: Fornecedor', iconPlaceholder:'https://.../icone.png',
      modalNote:'Se você não adicionar um ícone, o Punto Smart OS tenta carregar o favicon automaticamente. Se falhar, usa as iniciais do nome.',
      addDialogTitle:'Adicionar site ou app', addAccessIn:'Adicionar acesso em ', sectionFallback:'seção', customEmpty:'Adicionar<br>acesso',
      deleteTitle:'Excluir acesso', deleteConfirm:'Excluir este acesso?', restoreConfirm:'Restaurar acessos personalizados, ordem das seções e recarregar o layout?',
      adTitle:'Alcance mais pessoas', adText:'Anuncie seu produto ou serviço no Punto Smart OS.', adCta:'ANUNCIE AQUI',
      infoTitle:'Como adicionar um acesso', info1:'1. Toque em um bloco “Adicionar acesso”.', info2:'2. Digite o nome e cole o link completo, por exemplo: ', info3:'3. Salve. O acesso fica neste dispositivo.', info4:'Para alterar, toque em “Editar” e selecione o bloco.',
      plusTitle:'Versão Plus', plus1:'Plus salva seu desktop online na sua nuvem privada para abrir seu ambiente onde quiser, em qualquer dispositivo.', plus2:'Seus acessos, apps favoritos e configurações ficam salvos, para você não precisar carregar tudo de novo.', plus3:'E o mais importante: você não perde seu ambiente de trabalho.', plusSolves:'Resolve:',
      plusBullets:['Se você perder, for roubado ou quebrar o dispositivo, pode voltar a operar em minutos.','Se trocar de computador, celular ou TV Box, recupera seu ambiente sem começar do zero.','Você não precisa de um equipamento potente: seu ambiente abre pela web.','Suas ferramentas importantes ficam sempre organizadas e disponíveis.','Você economiza tempo evitando buscar, carregar e organizar acessos novamente.','Ideal para uso pessoal, comércios, escritórios, vendedores e equipes.'],
      plusBenefits:'Ver vantagens Plus'
    },
    fr: {
      addAccess:'Ajouter un accès', addShort:'Ajouter', edit:'✎ Modifier', done:'✓ Terminé', deleteBtn:'Supprimer', cancel:'Annuler', save:'Enregistrer',
      name:'Nom', link:'Lien', iconOptional:'Icône optionnelle', customPlaceholder:'Ex : Fournisseur', iconPlaceholder:'https://.../icone.png',
      modalNote:'Si vous n’ajoutez pas d’icône, Punto Smart OS essaie de charger le favicon automatiquement. Si cela échoue, il utilise les initiales du nom.',
      addDialogTitle:'Ajouter un site ou une app', addAccessIn:'Ajouter un accès dans ', sectionFallback:'section', customEmpty:'Ajouter<br>un accès',
      deleteTitle:'Supprimer l’accès', deleteConfirm:'Supprimer cet accès ?', restoreConfirm:'Restaurer les accès personnalisés, l’ordre des sections et recharger l’interface ?',
      adTitle:'Touchez plus de personnes', adText:'Annoncez votre produit ou service sur Punto Smart OS.', adCta:'ANNONCER ICI',
      infoTitle:'Comment ajouter un accès', info1:'1. Touchez une tuile “Ajouter un accès”.', info2:'2. Écrivez le nom et collez le lien complet, par exemple : ', info3:'3. Enregistrez. L’accès reste sur cet appareil.', info4:'Pour le modifier, touchez “Modifier” et sélectionnez la tuile.',
      plusTitle:'Version Plus', plus1:'Plus enregistre votre bureau en ligne dans votre cloud privé pour ouvrir votre environnement où vous voulez, depuis n’importe quel appareil.', plus2:'Vos accès, apps favorites et réglages restent sauvegardés, sans devoir tout reconfigurer.', plus3:'Le plus important : vous ne perdez pas votre environnement de travail.', plusSolves:'Résout :',
      plusBullets:['Si vous perdez votre appareil, s’il est volé ou cassé, vous pouvez retravailler en quelques minutes.','Si vous changez d’ordinateur, de téléphone ou de TV Box, vous récupérez votre environnement sans recommencer.','Vous n’avez pas besoin d’un appareil puissant : votre environnement s’ouvre depuis le web.','Vos outils importants restent toujours organisés et disponibles.','Vous gagnez du temps en évitant de rechercher, charger et organiser vos accès à nouveau.','Idéal pour usage personnel, commerces, bureaux, vendeurs et équipes.'],
      plusBenefits:'Voir les avantages Plus'
    }
  };
  return tables[lang] || tables.en;
}

const ACTIVE_PRESET = GLOBAL_PRESETS[GLOBAL_COUNTRY] || GLOBAL_PRESETS.US;
localStorage.setItem('ps_global_country', GLOBAL_COUNTRY);
const groups = JSON.parse(JSON.stringify(ACTIVE_PRESET.groups));
const folderNames = ACTIVE_PRESET.folderNames;

let editMode = false;
let currentCustomIndex = null;
let currentAddGroup = null;
let dragState = null;
const LS_GROUPS_STATE = 'ps_groups_state_global_' + GLOBAL_COUNTRY;
const LS_CUSTOM_TILES = 'ps_custom_tiles_global_' + GLOBAL_COUNTRY;
window.PS_GLOBAL_COUNTRY = GLOBAL_COUNTRY;
window.PS_STORAGE_KEYS = {
  groups: LS_GROUPS_STATE,
  custom: LS_CUSTOM_TILES,
  fileId: 'ps_plus_drive_file_id_global_' + GLOBAL_COUNTRY,
  lastSync: 'ps_plus_last_sync_global_' + GLOBAL_COUNTRY,
  connected: 'ps_plus_connected_global_' + GLOBAL_COUNTRY
};

function cleanGroupItem(item){
  return {
    id: item.id || slug(item.name || 'acceso'),
    name: item.name || 'Acceso',
    url: item.url || '#',
    domain: item.domain || '',
    dark: !!item.dark,
    fallback: item.fallback || '',
    icon: item.icon || ''
  };
}
function saveGroupsState(){
  try{
    const out = {};
    Object.keys(groups).forEach(k => out[k] = (groups[k] || []).map(cleanGroupItem));
    localStorage.setItem(LS_GROUPS_STATE, JSON.stringify(out));
    window.dispatchEvent(new CustomEvent('ps:groupsChanged'));
  }catch(e){}
}
function restoreGroupsState(){
  try{
    const saved = JSON.parse(localStorage.getItem(LS_GROUPS_STATE) || 'null');
    if(!saved) return;
    Object.keys(saved).forEach(k => {
      if(Array.isArray(saved[k]) && Array.isArray(groups[k])){
        groups[k].length = 0;
        saved[k].forEach(item => groups[k].push(cleanGroupItem(item)));
      }
    });
  }catch(e){}
}


function app(name,url,domain,dark=false,fallback='',icon=''){
  return { id: slug(name), name, url, domain, dark, fallback, icon };
}
function slug(s){ return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
function favicon(domain){ return domain ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128` : ''; }
function normalizeUrl(url){
  if(!url) return '#';
  if(url.startsWith('#')) return url;
  if(!/^https?:\/\//i.test(url)) return 'https://' + url;
  return url;
}
function openSmartUrl(url){
  const finalUrl = normalizeUrl(url);
  if(!finalUrl || finalUrl === '#') return false;
  try{
    const a = document.createElement('a');
    a.href = finalUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }catch(e){
    // En web normal no navegamos la página principal: evita apertura duplicada.
    console.warn('No se pudo abrir en nueva pestaña', e);
  }
  return false;
}
function cleanText(str){
  return (str || '').toString().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}

const dailyPhrases = [
  'Disfrutá lo fugaz.',
  'El éxito es levantarse cada vez que te caés.',
  'Hoy será un gran día.',
  '¿Sonreíste hoy?',
  'Somos instantes.',
  '¿Qué estás esperando para amar?',
  'Lo imposible solo tarda un poco más.',
  'Duermo poco, sueño mucho.',
  'Con los ojos cerrados y los sueños despiertos.',
  'Vivir intensamente es mi insomnio permanente.',
  'Que nada te detenga.',
  'Persigue tus sueños.',
  'Más amor, por favor.',
  'Lo esencial es invisible a los ojos.',
  '¿Quién te dijo que todo está perdido?',
  '¿Es hermoso saber que estás?',
  'El tiempo es infinito a tu lado.',
  'No pierdas el foco.',
  '¿Cuánto perdemos por miedo a perder?',
  'Más acción y menos reacción.',
  'Qué placer verte sonreír.',
  'Ordenás mi caos.'
];

function initDailyPhrase(){
  const el = document.getElementById('dailyPhrase');
  if(!el || !dailyPhrases.length) return;
  const today = new Date();
  const start = new Date(2026,5,19); // 19/06/2026: primera frase de la lista.
  const d0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const day = Math.max(0, Math.floor((d0 - start) / 86400000));
  el.textContent = '“' + dailyPhrases[day % dailyPhrases.length] + '”';
}


function tileHTML(item, opts={}){
  const img = item.icon || favicon(item.domain);
  const fallback = item.fallback || (item.name || '?').slice(0,2).toUpperCase();
  const dark = item.dark ? ' dark' : '';
  const draggable = opts.draggable && editMode ? 'draggable="true"' : '';
  const groupAttr = opts.group ? `data-group="${opts.group}" data-index="${opts.index || 0}"` : '';
  return `<button type="button" class="tile ${editMode ? 'editing' : ''}" data-id="${item.id}" data-url="${item.url}" ${groupAttr} ${draggable} title="${item.name}">
    ${editMode && opts.group ? `<span class="tile-delete" data-delete-group="${opts.group}" data-delete-index="${opts.index || 0}" title="Borrar acceso">×</span>` : ''}
    <span class="tile-icon${dark}">${img ? `<img src="${img}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'letter',textContent:'${fallback.replace(/'/g,'')}'}))">` : `<span class="letter">${fallback}</span>`}</span>
    <span class="tile-name">${item.name}</span>
  </button>`;
}

function renderGroup(key, elId, mini=false){
  const el = document.getElementById(elId);
  if(!el) return;
  const items = groups[key];
  el.dataset.group = key;
  const ui = getUiText();
  const addTile = editMode ? `<button type="button" class="tile add-section-tile" data-add-group="${key}" title="${ui.addAccess}">
    <span class="tile-icon add-icon">+</span>
    <span class="tile-name">${ui.addAccess}</span>
  </button>` : '';
  el.innerHTML = items.map((i,idx) => tileHTML(i,{draggable: true, group:key, index:idx})).join('') + addTile;
}

function renderAll(){
  renderGroup('favorites','favoritesGrid');
  renderGroup('content','contentGrid');
  renderGroup('fotos','fotosGrid');
  renderGroup('juegos','juegosGrid');
  renderGroup('ai','aiGrid');
  renderGroup('tramites','tramitesGrid');
  renderGroup('noticias','noticiasGrid');
  renderGroup('bancos','bancosGrid');
  renderGroup('negocio','negocioGrid');
  renderCustom();
  bindTiles();
  bindDrag();
  document.body.classList.toggle('editing-mode', editMode);
  document.getElementById('editBtn').textContent = editMode ? getUiText().done : getUiText().edit;
}

function getCustom(){
  try{return JSON.parse(localStorage.getItem(LS_CUSTOM_TILES)||'[]')}catch(e){return []}
}
function setCustom(arr){localStorage.setItem(LS_CUSTOM_TILES,JSON.stringify(arr));}
function renderCustom(){
  const data = getCustom();
  const grid = document.getElementById('customGrid');
  grid.innerHTML = '';
  for(let i=0;i<5;i++){
    const item = data[i];
    const btn = document.createElement('button');
    btn.className = 'custom-tile' + (item ? ' filled' : '');
    btn.dataset.index = i;
    if(item){
      const img = item.icon || favicon(domainFromUrl(item.url));
      const letter = (item.name || '?').slice(0,2).toUpperCase();
      btn.innerHTML = `<span class="tile-icon"><img src="${img}" alt="" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'letter',textContent:'${letter}'}))"></span><span>${item.name}</span>`;
    }else{
      btn.innerHTML = `<span class="plus">+</span><span>${getUiText().customEmpty}</span>`;
    }
    grid.appendChild(btn);
  }
}
function domainFromUrl(url){
  try{return new URL(normalizeUrl(url)).hostname.replace(/^www\./,'')}catch(e){return ''}
}

function bindTiles(){
  document.querySelectorAll('.tile-delete').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if(e.stopImmediatePropagation) e.stopImmediatePropagation();
      const group = btn.dataset.deleteGroup;
      const index = Number(btn.dataset.deleteIndex);
      if(!editMode || !group || !groups[group] || !Number.isFinite(index)) return false;
      if(!confirm(getUiText().deleteConfirm)) return false;
      groups[group].splice(index,1);
      saveGroupsState();
      renderAll();
      return false;
    };
  });
  document.querySelectorAll('.section-add-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if(!editMode) return false;
      openGroupAdd(btn.dataset.addGroup);
      return false;
    };
  });
  document.querySelectorAll('.add-section-tile').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if(!editMode) return false;
      openGroupAdd(btn.dataset.addGroup);
      return false;
    };
  });
  document.querySelectorAll('.tile:not(.add-section-tile)').forEach(btn => {
    btn.onclick = (e) => {
      e?.preventDefault();
      e?.stopPropagation();
      if(e?.stopImmediatePropagation) e.stopImmediatePropagation();
      if(editMode || dragState){
        return false;
      }
      const url = btn.dataset.url;
      if(url === '#notes') return openNotes();
      if(url === '#camera') return openCamera();
      openSmartUrl(url);
      return false;
    };
  });
  document.querySelectorAll('.custom-tile').forEach(btn => {
    btn.onclick = (e) => {
      e?.preventDefault();
      e?.stopPropagation();
      if(e?.stopImmediatePropagation) e.stopImmediatePropagation();
      if(dragState){
        return false;
      }
      const idx = Number(btn.dataset.index);
      const item = getCustom()[idx];
      if(item && !editMode){ openSmartUrl(item.url); return false; }
      openCustom(idx);
      return false;
    };
  });
}
function openNotes(){
  alert('Bloc de notas: en la próxima versión se puede agregar un bloc editable guardado en el navegador.');
}
function openCamera(){
  const input = document.getElementById('cameraInput');
  if(input){
    input.value = '';
    input.onchange = () => {
      const file = input.files && input.files[0];
      if(file) alert('Foto seleccionada: ' + file.name + '\nNo se guarda en Punto Smart OS. Queda en tu dispositivo.');
    };
    input.click();
  }else{
    openSmartUrl('https://photos.google.com/');
  }
  return false;
}

function openCustom(index){
  currentCustomIndex = index;
  currentAddGroup = null;
  customDialogTitle.textContent = getUiText().addDialogTitle;
  const arr = getCustom();
  const item = arr[index] || {};
  customName.value = item.name || '';
  customUrl.value = item.url || '';
  customIcon.value = item.icon || '';
  deleteCustomBtn.style.visibility = item.name ? 'visible':'hidden';
  customDialog.showModal();
}
function openGroupAdd(groupKey){
  currentCustomIndex = null;
  currentAddGroup = groupKey;
  const label = folderNames[groupKey] || ({favorites:(ACTIVE_PRESET.labels.sections||{})['Favoritos y Esenciales'] || 'Favorites', content:(ACTIVE_PRESET.labels.sections||{})['Compras y Contenido'] || 'Content', fotos:(ACTIVE_PRESET.labels.sections||{})['Fotos y Cámara'] || 'Photos', juegos:(ACTIVE_PRESET.labels.sections||{})['Juegos y Ocio'] || 'Games', ai:(ACTIVE_PRESET.labels.sections||{})['IA y Productividad'] || 'AI'}[groupKey] || getUiText().sectionFallback);
  customDialogTitle.textContent = getUiText().addAccessIn + label;
  customName.value = '';
  customUrl.value = '';
  customIcon.value = '';
  deleteCustomBtn.style.visibility = 'hidden';
  customDialog.showModal();
}

customForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = customName.value.trim();
  const url = normalizeUrl(customUrl.value.trim());
  const icon = customIcon.value.trim();
  if(currentAddGroup && groups[currentAddGroup]){
    groups[currentAddGroup].push(app(name, url, domainFromUrl(url), false, '', icon));
    saveGroupsState();
  }else{
    const arr = getCustom();
    arr[currentCustomIndex] = { name, url, icon };
    setCustom(arr);
  }
  currentAddGroup = null;
  customDialog.close();
  renderAll();
});
cancelCustomBtn.onclick = () => { currentAddGroup = null; customDialog.close(); };
deleteCustomBtn.onclick = () => {
  const arr = getCustom();
  arr.splice(currentCustomIndex,1);
  setCustom(arr);
  currentAddGroup = null;
  customDialog.close();
  renderAll();
};

function bindDrag(){
  document.querySelectorAll('.tile[draggable="true"]').forEach(tile => {
    tile.addEventListener('dragstart', e => {
      dragState = { id: tile.dataset.id };
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', tile.dataset.id);
      tile.classList.add('dragging');
    });
    tile.addEventListener('dragend', () => {
      document.querySelectorAll('.drag-over,.dragging,.panel-drop').forEach(el => el.classList.remove('drag-over','dragging','panel-drop'));
      setTimeout(() => { dragState = null; }, 80);
    });
    tile.addEventListener('dragover', e => {
      if(!editMode) return;
      e.preventDefault();
      tile.classList.add('drag-over');
    });
    tile.addEventListener('dragleave', () => tile.classList.remove('drag-over'));
    tile.addEventListener('drop', e => {
      if(!editMode) return;
      e.preventDefault();
      e.stopPropagation();
      tile.classList.remove('drag-over');
      const fromId = e.dataTransfer.getData('text/plain');
      const toId = tile.dataset.id;
      if(fromId && toId && fromId !== toId) moveItemToGroup(fromId, tile.dataset.group, toId);
    });
  });

  document.querySelectorAll('.icon-grid,.mini-grid').forEach(grid => {
    const groupKey = grid.dataset.group;
    if(!groupKey) return;
    grid.addEventListener('dragover', e => {
      if(!editMode) return;
      e.preventDefault();
      grid.classList.add('panel-drop');
    });
    grid.addEventListener('dragleave', e => {
      if(!grid.contains(e.relatedTarget)) grid.classList.remove('panel-drop');
    });
    grid.addEventListener('drop', e => {
      if(!editMode) return;
      if(e.target.closest('.tile')) return;
      e.preventDefault();
      grid.classList.remove('panel-drop');
      const fromId = e.dataTransfer.getData('text/plain');
      if(fromId) moveItemToGroup(fromId, groupKey, null);
    });
  });
}
function findItemLocation(id){
  for(const [k,arr] of Object.entries(groups)){
    const idx = arr.findIndex(it => it.id === id);
    if(idx >= 0) return {group:k, index:idx};
  }
  return null;
}
function moveItemToGroup(fromId,targetGroup,targetId=null){
  const from = findItemLocation(fromId);
  if(!from || !targetGroup || !groups[targetGroup]) return;
  const item = groups[from.group].splice(from.index,1)[0];
  let insertIndex = groups[targetGroup].length;
  if(targetId){
    insertIndex = groups[targetGroup].findIndex(it => it.id === targetId);
    if(insertIndex < 0) insertIndex = groups[targetGroup].length;
  }
  if(from.group === targetGroup && from.index < insertIndex) insertIndex--;
  groups[targetGroup].splice(insertIndex,0,item);
  saveGroupsState();
  renderAll();
}
function swapItems(fromId,toId){
  const to = findItemLocation(toId);
  if(to) moveItemToGroup(fromId, to.group, toId);
}


editBtn.onclick = () => { editMode = !editMode; renderAll(); };
if(window.resetBtn){ resetBtn.onclick = () => {
  if(confirm(getUiText().restoreConfirm)){ localStorage.removeItem(LS_CUSTOM_TILES); localStorage.removeItem(LS_GROUPS_STATE); location.reload(); }
}; }
howBtn.onclick = () => infoDialog.showModal();
closeInfoBtn.onclick = () => infoDialog.close();
supportBtn.onclick = () => openSmartUrl('../instructivo/');
suggestBtn.onclick = () => alert('Suggestions will be available soon.');

Object.keys(folderNames).forEach(key => {
  document.querySelector(`[data-folder="${key}"] .folder-open`)?.addEventListener('click', () => openFolder(key));
});
function openFolder(key){
  folderTitle.textContent = folderNames[key];
  folderModalGrid.innerHTML = groups[key].map(i => tileHTML(i)).join('');
  folderDialog.showModal();
  bindTiles();
}
closeFolderBtn.onclick = () => folderDialog.close();

let smartSearchEngine = 'google';
const smartSearchDefaults = ACTIVE_PRESET.smart.defaults;
const smartSearchPlaceholders = ACTIVE_PRESET.smart.placeholders;
function buildSmartSearchUrl(engine, query){
  const q = (query || '').trim();
  if(!q) return smartSearchDefaults[engine] || smartSearchDefaults.google;
  const e = encodeURIComponent(q);
  const tpl = (ACTIVE_PRESET.smart.templates && ACTIVE_PRESET.smart.templates[engine]) || ACTIVE_PRESET.smart.templates.google;
  return tpl.replaceAll('{q}', e).replaceAll('{raw}', encodeURIComponent(q));
}
function filterTiles(query){
  const q = cleanText(query);
  document.querySelectorAll('.tile,.custom-tile').forEach(el => {
    const text = cleanText(el.textContent);
    el.classList.toggle('hidden-search', !!q && !text.includes(q));
  });
}
function setSmartSearchEngine(engine){
  smartSearchEngine = engine || 'google';
  document.querySelectorAll('.engine-pill').forEach(btn => btn.classList.toggle('active', btn.dataset.engine === smartSearchEngine));
  const box = document.querySelector('.smart-search');
  box?.classList.toggle('local-mode', smartSearchEngine === 'local');
  if(searchInput) searchInput.placeholder = smartSearchPlaceholders[smartSearchEngine] || '¿Qué querés buscar?';
}
searchInput.addEventListener('input', e => filterTiles(e.target.value));
document.querySelectorAll('.engine-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    setSmartSearchEngine(btn.dataset.engine);
    searchInput.focus();
    if(btn.dataset.engine === 'local') filterTiles(searchInput.value);
  });
});
smartSearchForm?.addEventListener('submit', e => {
  e.preventDefault();
  const q = searchInput.value.trim();
  if(smartSearchEngine === 'local'){ filterTiles(q); return; }
  openSmartUrl(buildSmartSearchUrl(smartSearchEngine, q));
});
setSmartSearchEngine('google');

function initPlusAbTest(){
  const btn = document.getElementById('plusSalesBtn');
  const dialog = document.getElementById('plusSalesDialog');
  const close = document.getElementById('closePlusSalesBtn');
  if(!btn || !dialog) return;
  const variants = {
    A: (ACTIVE_PRESET.htmlLang === 'fr' ? 'Votre bureau en ligne, toujours prêt, même si vous changez d’appareil.' : ACTIVE_PRESET.htmlLang === 'pt' ? 'Seu desktop online sempre pronto, mesmo se trocar de dispositivo.' : ACTIVE_PRESET.htmlLang === 'en' ? 'Your online desktop, always ready, even if you change devices.' : 'Tu escritorio online siempre listo, aunque cambies de equipo.'),
    B: (ACTIVE_PRESET.htmlLang === 'fr' ? 'Sauvegardez votre environnement et récupérez-le depuis n’importe quel appareil.' : ACTIVE_PRESET.htmlLang === 'pt' ? 'Salve seu ambiente e recupere-o em qualquer dispositivo.' : ACTIVE_PRESET.htmlLang === 'en' ? 'Save your environment and recover it from any device.' : 'Guarda tu entorno y recupéralo desde cualquier dispositivo.')
  };
  let variant = localStorage.getItem('ps_plus_cta_variant');
  if(!variant || !variants[variant]){
    variant = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem('ps_plus_cta_variant', variant);
  }
  const visible = document.getElementById('plusCtaShort');
  const modal = document.getElementById('plusAbText');
  if(visible) visible.textContent = variants[variant];
  if(modal) modal.textContent = variants[variant];
  const wa = document.getElementById('plusWhatsappBtn');
  if(wa){
    wa.href = '../plus/?country=' + encodeURIComponent(GLOBAL_COUNTRY);
    wa.textContent = getUiText().plusBenefits;
  }
  btn.onclick = () => {
    try{
      const key = 'ps_plus_cta_click_' + variant;
      localStorage.setItem(key, String((Number(localStorage.getItem(key) || '0') + 1)));
    }catch(e){}
    dialog.showModal();
  };
  close && (close.onclick = () => dialog.close());
}

function tick(){
  const now = new Date();
  const locale = ACTIVE_PRESET.locale || 'en-US';
  clock.textContent = now.toLocaleTimeString(locale,{hour:'2-digit',minute:'2-digit'});
  dateText.textContent = now.toLocaleDateString(locale,{weekday:'short',day:'numeric',month:'short'}).replace(/^./,c=>c.toUpperCase());
}

function applyGlobalPreset(){
  document.documentElement.lang = ACTIVE_PRESET.htmlLang || 'en';
  const sel = document.getElementById('countrySelect');
  if(sel){
    sel.innerHTML = Object.entries(GLOBAL_PRESETS).map(([code,p]) => `<option value="${code}">${p.name}</option>`).join('') + '<option value="AR">Argentina — versión local</option>';
    sel.value = GLOBAL_COUNTRY;
    sel.onchange = () => {
      if(sel.value === 'AR') { location.href = '../'; return; }
      localStorage.setItem('ps_global_country', sel.value);
      location.href = '?country=' + encodeURIComponent(sel.value);
    };
  }
  const label = document.getElementById('countryLabel');
  if(label){
    const lang = ACTIVE_PRESET.htmlLang || 'en';
    label.textContent = lang === 'en' ? 'Country' : (lang === 'pt' ? 'País' : (lang === 'fr' ? 'Pays' : 'País'));
  }
  const weather = document.getElementById('weatherLink');
  if(weather){
    weather.href = ACTIVE_PRESET.weatherUrl;
    const b = weather.querySelector('b');
    const small = weather.querySelector('small');
    if(b) b.textContent = ACTIVE_PRESET.labels.weatherTitle;
    if(small) small.textContent = ACTIVE_PRESET.city;
  }
  const currency = document.getElementById('currencyLink');
  if(currency){
    currency.href = ACTIVE_PRESET.currencyUrl;
    const b = currency.querySelector('b');
    if(b) b.textContent = ACTIVE_PRESET.labels.currencyTitle;
  }
  const l = ACTIVE_PRESET.labels;
  const slogan = document.querySelector('.os-slogan'); if(slogan) slogan.textContent = l.slogan;
  const searchBadge = document.querySelector('.smart-search-badge'); if(searchBadge) searchBadge.textContent = 'Smart OS Browser';
  if(searchInput) searchInput.placeholder = l.searchPlaceholder;
  const sections = l.sections || {};
  Object.entries(sections).forEach(([key,val]) => {
    const panel = document.querySelector(`[data-section="${key}"] h2`);
    if(panel) panel.textContent = val;
  });
  document.querySelectorAll('.engine-pill').forEach(btn => {
    const txt = l.engines && l.engines[btn.dataset.engine];
    if(txt) btn.textContent = txt;
  });
  const customTitle = document.querySelector('.custom-title'); if(customTitle) customTitle.innerHTML = l.customTitle + ' <span title="Local save">ⓘ</span>';
  const helpB = document.querySelector('.help-card b'); if(helpB) helpB.textContent = l.helpTitle;
  const helpP = document.querySelector('.help-card p'); if(helpP) helpP.textContent = l.helpText;
  if(howBtn) howBtn.textContent = l.howBtn;
  if(editBtn) editBtn.textContent = l.edit;
  if(supportBtn) supportBtn.textContent = l.support;
  if(guideBtn) guideBtn.textContent = l.guide;
  if(suggestBtn) suggestBtn.textContent = l.suggestions;
  const footerSmall = document.querySelector('.footer small'); if(footerSmall) footerSmall.textContent = l.footer;
  const ui = getUiText();
  const customDialogH = document.getElementById('customDialogTitle'); if(customDialogH) customDialogH.textContent = ui.addDialogTitle;
  // Folder titles that are not part of the wide sections
  Object.entries(folderNames || {}).forEach(([key,val]) => {
    const h = document.querySelector(`[data-folder="${key}"] .panel-title h2`);
    if(h) h.textContent = val;
    const open = document.querySelector(`[data-folder="${key}"] .folder-open`);
    if(open) open.setAttribute('aria-label', val);
  });
  document.querySelectorAll('.section-add-btn').forEach(btn => btn.textContent = '+ ' + ui.addShort);
  const adTitle = document.querySelector('.ad-copy b'); if(adTitle) adTitle.textContent = ui.adTitle;
  const adText = document.querySelector('.ad-copy small'); if(adText) adText.textContent = ui.adText;
  const adCta = document.querySelector('.ad-cta'); if(adCta) adCta.textContent = ui.adCta;
  const modalH = document.querySelector('#plusSalesDialog h3'); if(modalH) modalH.textContent = ui.plusTitle;
  const plusCopy = document.querySelector('.plus-sales-copy');
  if(plusCopy){
    const p = plusCopy.querySelectorAll('p');
    if(p[0]) p[0].textContent = ui.plus1;
    if(p[1]) p[1].textContent = ui.plus2;
    if(p[2]) p[2].innerHTML = '<b>' + ui.plus3.split(':')[0] + ':</b>' + (ui.plus3.includes(':') ? ui.plus3.substring(ui.plus3.indexOf(':')+1) : '');
    const h4 = plusCopy.querySelector('h4'); if(h4) h4.textContent = ui.plusSolves;
    const lis = plusCopy.querySelectorAll('li'); ui.plusBullets.forEach((txt,i)=>{ if(lis[i]) lis[i].textContent = txt; });
  }
  const nameLabel = document.querySelector('label[for="customName"], #customForm label:nth-of-type(1)'); if(nameLabel && nameLabel.firstChild) nameLabel.firstChild.textContent = ui.name + '\n        ';
  const linkLabel = document.querySelector('#customForm label:nth-of-type(2)'); if(linkLabel && linkLabel.firstChild) linkLabel.firstChild.textContent = ui.link + '\n        ';
  const iconLabel = document.querySelector('#customForm label:nth-of-type(3)'); if(iconLabel && iconLabel.firstChild) iconLabel.firstChild.textContent = ui.iconOptional + '\n        ';
  const customNameInput = document.getElementById('customName'); if(customNameInput) customNameInput.placeholder = ui.customPlaceholder;
  const customIconInput = document.getElementById('customIcon'); if(customIconInput) customIconInput.placeholder = ui.iconPlaceholder;
  const note = document.querySelector('.modal-note'); if(note) note.textContent = ui.modalNote;
  if(deleteCustomBtn) deleteCustomBtn.textContent = ui.deleteBtn;
  if(cancelCustomBtn) cancelCustomBtn.textContent = ui.cancel;
  const saveButton = document.querySelector('#customForm button.primary'); if(saveButton) saveButton.textContent = ui.save;
  const infoH = document.querySelector('#infoDialog h3'); if(infoH) infoH.textContent = ui.infoTitle;
  const infoPs = document.querySelectorAll('#infoDialog p');
  if(infoPs[0]) infoPs[0].textContent = ui.info1;
  if(infoPs[1]) infoPs[1].innerHTML = ui.info2 + '<b>https://www.example.com</b>.';
  if(infoPs[2]) infoPs[2].textContent = ui.info3;
  if(infoPs[3]) infoPs[3].textContent = ui.info4;
}
restoreGroupsState();
initPlusAbTest();
setInterval(tick,1000);
tick();
applyGlobalPreset();
renderAll();
applyGlobalPreset();
