import type { Lang } from "@/contexts/language-context";

/* ------------------------------------------------------------------ */
/* Real Navisol imagery (served from /public/images)                   */
/* ------------------------------------------------------------------ */
export const IMG = {
  logo: "/images/logo-navisol-transparant.png",

  heroPhoto: "/images/hero-drone-varend.jpg",
  heroVideo: "/images/navisol-hero-video-web.mp4",
  heroBoat1: "/images/hero-eagle-sloop.jpg",
  heroBoat2: "/images/hero-eagle-force550.jpg",

  logoRituals: "/images/logos/rituals.png",
  logoCenterParcs: "/images/logos/centerparcs.png",
  logoStromma: "/images/logos/stromma.jpg",
  logoEagleBoats: "/images/logos/eagleboats.png",
  logoEcoBoats: "/images/logos/ecoboats.png",
  logoVeluvia: "/images/logos/veluvia.png",
  logoHappyWhale: "/images/logos/happywhale.png",
  logoArgoMaritime: "/images/logos/argomaritime.png",
  logoAlni: "/images/logos/alni.png",
  logoLongfish: "/images/logos/longfishleisure.png",

  editorial1: "/images/editorial-01.jpg",
  editorialPanorama2: "/images/editorial-02-panorama.jpg",
  editorialPanorama3: "/images/editorial-03-panorama.jpg",
  editorialPanorama4: "/images/editorial-04-panorama.jpg",
  editorialWerf5: "/images/editorial-05-werf.jpg",
  editorialWerf6: "/images/editorial-06-werf.jpg",
  editorial7: "/images/editorial-07.jpg",

  casco1: "/images/cascobouw-01.jpg",
  casco2: "/images/cascobouw-02.jpg",
  casco3: "/images/cascobouw-03.jpg",
  casco4: "/images/cascobouw-04.jpg",
  casco5: "/images/cascobouw-05.jpg",

  render1: "/images/render-32-ts-01.jpg",
  render2: "/images/render-32-ts-02.jpg",
  render3: "/images/render-32-ts-03.jpg",

  salon5: "/images/salonboot-18-8m-still-5.jpg",
  salon15: "/images/salonboot-18-8m-still-15.jpg",
  salon25: "/images/salonboot-18-8m-still-25.jpg",
  salonVideo: "/images/salonboot-18-8m-video-web.mp4",

  flamme1: "/images/flamme-40-01.jpg",
  flamme2: "/images/flamme-40-02.jpg",
  flamme3: "/images/flamme-40-03.jpg",
  flamme4: "/images/flamme-40-04.jpg",
  flamme5: "/images/flamme-40-05.jpg",
  flamme6: "/images/flamme-40-06.jpg",
  flamme7: "/images/flamme-40-07.jpg",

  veluvia1: "/images/veluvia-920-01.jpg",
  veluvia2: "/images/veluvia-920-02.jpg",

  eagle28_1: "/images/eagle-28sg-01.jpg",
  eagle28_2: "/images/eagle-28sg-02.jpg",
  eagle28_3: "/images/eagle-28sg-03.jpg",
  eagle25_1: "/images/eagle-25ts-01.jpg",
};

/* ------------------------------------------------------------------ */
/* Clients & partners (shared across languages)                        */
/* ------------------------------------------------------------------ */
export interface Client {
  name: string;
  logo?: string;
}

export const CLIENTS: Client[] = [
  { name: "Rituals", logo: IMG.logoRituals },
  { name: "Center Parcs", logo: IMG.logoCenterParcs },
  { name: "Stromma", logo: IMG.logoStromma },
  { name: "Eagle Boats", logo: IMG.logoEagleBoats },
  { name: "Eco Boats Amsterdam", logo: IMG.logoEcoBoats },
  { name: "Veluvia", logo: IMG.logoVeluvia },
  { name: "Longfish Leisure", logo: IMG.logoLongfish },
  { name: "HappyWhale", logo: IMG.logoHappyWhale },
  { name: "Argo Maritime", logo: IMG.logoArgoMaritime },
  { name: "ALNI Technical Bureau", logo: IMG.logoAlni },
];

export interface EditorialBlock {
  layout: "left" | "right" | "full";
  eyebrow?: string;
  title: string;
  body?: string;
  image: string;
}

export interface Step {
  index: string;
  title: string;
  body: string;
  image: string;
  gallery?: string[];
}

export interface WorkItem {
  slug: string;
  title: string;
  category: string;
  year?: string;
  status?: string;
  body: string;
  images: string[];
  video?: string;
  layout: "left" | "right" | "full";
}

type Dict = {
  nav: {
    custom: string;
    partner: string;
    work: string;
    about: string;
    contact: string;
    cta: string;
    langName: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroLead: string;
    scroll: string;
    heroImage: string;
    heroImages: string[];
    heroVideo: string;
    designEyebrow: string;
    designTitle: string;
    designBody: string;
    clientsEyebrow: string;
    techEyebrow: string;
    techTitle: string;
    techItems: { title: string; body: string }[];
    techStatement: string;
    pillarsEyebrow: string;
    customLabel: string;
    customTitle: string;
    customBody: string;
    customCta: string;
    customImage: string;
    partnerLabel: string;
    partnerTitle: string;
    partnerBody: string;
    partnerCta: string;
    partnerImage: string;
    editorialEyebrow: string;
    editorial: EditorialBlock[];
    quote: string;
    quoteAuthor: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  };
  custom: {
    heroEyebrow: string;
    heroTitle: string;
    heroLead: string;
    heroImage: string;
    introTitle: string;
    introBody: string;
    stepsEyebrow: string;
    steps: Step[];
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  };
  partner: {
    heroEyebrow: string;
    heroTitle: string;
    heroLead: string;
    heroImage: string;
    blocks: EditorialBlock[];
    statement: string;
    brandEyebrow: string;
    brandTitle: string;
    brandBody: string;
    brandImages: string[];
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  };
  work: {
    heroEyebrow: string;
    heroTitle: string;
    heroLead: string;
    heroImage: string;
    items: WorkItem[];
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  };
  about: {
    heroEyebrow: string;
    heroTitle: string;
    heroLead: string;
    heroImage: string;
    fullImage: string;
    storyTitle: string;
    story: string[];
    valuesEyebrow: string;
    values: { title: string; body: string }[];
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  };
  contact: {
    heroEyebrow: string;
    heroTitle: string;
    heroLead: string;
    infoTitle: string;
    visit: string;
    call: string;
    email: string;
    hours: string;
    hoursValue: string;
    formTitle: string;
    name: string;
    company: string;
    emailField: string;
    phone: string;
    subject: string;
    subjectOptions: { value: string; label: string }[];
    message: string;
    send: string;
    success: string;
    sending: string;
    error: string;
  };
  footer: {
    tagline: string;
    explore: string;
    contact: string;
    rights: string;
    privacy: string;
    terms: string;
    langNote: string;
  };
};

export const content: Record<Lang, Dict> = {
  nl: {
    nav: {
      custom: "Jachtbouw op maat",
      partner: "Ontwikkel- & bouwpartner",
      work: "Ons werk",
      about: "Over ons",
      contact: "Contact",
      cta: "Neem contact op",
      langName: "Nederlands",
    },
    home: {
      heroEyebrow: "Aluminium jachtbouw · Elburg, Nederland",
      heroTitle: "Van eerste schets tot varend jacht.",
      heroLead:
        "Navisol ontwerpt en bouwt aluminium jachten op maat — en is de vaste ontwikkel- en bouwpartner voor botenmerken. Alles onder één dak.",
      scroll: "Ontdek",
      heroImage: IMG.heroPhoto,
      heroImages: [
        IMG.heroBoat1,
        IMG.heroBoat2,
        IMG.flamme1,
        IMG.eagle28_1,
        IMG.editorial1,
      ],
      heroVideo: IMG.heroVideo,
      designEyebrow: "In 3D ontworpen",
      designTitle: "Elk jacht begint als ontwerp",
      designBody:
        "Voordat er ook maar één plaat aluminium wordt gesneden, komt elk jacht tot leven in 3D. Zo klopt elke lijn — en weet je precies wat je krijgt — nog voordat de bouw begint.",
      clientsEyebrow: "Vertrouwd door toonaangevende organisaties",
      techEyebrow: "Onder de huid",
      techTitle: "Techniek die klopt. Bouw die blijft.",
      techItems: [
        {
          title: "Aluminium cascobouw",
          body: "Licht, sterk, goed repareerbaar en uitstekend geschikt voor maatwerk en intensief, dagelijks gebruik.",
        },
        {
          title: "Elektrisch & hybride",
          body: "Aandrijving, accupakketten, laden, energiemanagement en volledige systeemintegratie.",
        },
        {
          title: "Elektra",
          body: "Navigatie, communicatie, verlichting, pompen, verwarming en monitoring aan boord.",
        },
        {
          title: "Certificering",
          body: "ES-TRIN, CE, technische documentatie en afstemming met keuringspartijen.",
        },
      ],
      techStatement: "Niet alleen technisch mogelijk, maar ook dagelijks betrouwbaar.",
      pillarsEyebrow: "Twee manieren om samen te werken",
      customLabel: "Voor eigenaren",
      customTitle: "Jachtbouw op maat",
      customBody:
        "Volledig op maat gebouwde aluminium jachten tot circa 15 meter — van ontwerp en engineering tot een compleet interieur en oplevering.",
      customCta: "Bekijk het traject",
      customImage: IMG.editorial1,
      partnerLabel: "Voor botenmerken",
      partnerTitle: "Ontwikkel- & bouwpartner",
      partnerBody:
        "Eén verantwoordelijke partij voor merken die willen ontwikkelen en produceren — van slim ontwerp en engineering tot een productieklaar eindproduct.",
      partnerCta: "Ontdek de samenwerking",
      partnerImage: IMG.eagle28_1,
      editorialEyebrow: "Gebouwd werk",
      editorial: [
        {
          layout: "left",
          eyebrow: "Materiaal",
          title: "Aluminium, perfectie tot in de kleinste details",
          body:
            "Aluminium vraagt om vakmanschap. Elke las, elk spant en elke plaat wordt met de hand gecontroleerd. Het resultaat is een casco dat sterk is, licht vaart en decennialang meegaat en gerecycled kan worden.",
          image: IMG.editorialWerf5,
        },
        {
          layout: "full",
          title: "Elk jacht vertelt een ander verhaal.",
          image: IMG.editorialPanorama2,
        },
        {
          layout: "right",
          eyebrow: "Onder één dak",
          title: "Ontworpen én gebouwd op één plek",
          body:
            "Ontwerp, engineering, cascobouw, installatie en afbouw gebeuren door dezelfde werf. Korte lijnen, één aanspreekpunt en volledige grip op kwaliteit en planning.",
          image: IMG.editorialWerf6,
        },
        {
          layout: "full",
          title: "",
          image: IMG.editorialPanorama3,
        },
        {
          layout: "left",
          eyebrow: "Compleet",
          title: "Van casco tot compleet interieur",
          body:
            "Wij leveren varende, complete schepen. Inclusief een interieur dat op maat is getekend en gebouwd.",
          image: IMG.editorial1,
        },
        {
          layout: "right",
          eyebrow: "Aandrijving",
          title: "Stil, schoon en krachtig",
          body:
            "Conventioneel, hybride of volledig elektrisch. We integreren de aandrijving die past bij het vaargebied en de wensen — fluisterstil op het water, betrouwbaar in gebruik.",
          image: IMG.editorial7,
        },
        {
          layout: "full",
          title: "Van eerste schets tot varend jacht.",
          image: IMG.editorialPanorama4,
        },
      ],
      quote: "Wij bouwen niet in aantallen, maar in schepen die blijven.",
      quoteAuthor: "Navisol",
      ctaTitle: "Laten we kennismaken",
      ctaBody:
        "Een eigen jacht voor ogen, of op zoek naar een bouwpartner voor jouw merk? We denken graag met je mee.",
      ctaButton: "Neem contact op",
    },
    custom: {
      heroEyebrow: "Voor eigenaren",
      heroTitle: "Jachtbouw op maat",
      heroLead:
        "Complete aluminium jachten tot circa 15 meter, inclusief interieur. Van eerste lijn tot proefvaart — bij Navisol komt alles samen.",
      heroImage: IMG.editorial1,
      introTitle: "Jouw jacht, van A tot Z",
      introBody:
        "Een jacht op maat begint bij jouw verhaal en eindigt bij jouw eerste vaart. Wij begeleiden elke stap, ontwerpen en bouwen alles zelf, en leveren een schip dat volledig van jou is — tot in het kleinste detail van het interieur.",
      stepsEyebrow: "Van idee naar water",
      steps: [
        {
          index: "01",
          title: "Schets & concept",
          body:
            "Vaarprofiel, indeling, uitstraling en eerste richting. Jouw wensen vertalen we naar een 3D-ontwerp dat klopt op het water én in gebruik.",
          image: IMG.render1,
          gallery: [IMG.render2, IMG.render3],
        },
        {
          index: "02",
          title: "Engineering",
          body:
            "Constructie, systemen, vermogen, energie en detaillering worden doorgerekend en uitgewerkt tot productieklare tekeningen.",
          image: IMG.editorialWerf6,
        },
        {
          index: "03",
          title: "Cascobouw",
          body:
            "Aluminium constructie, laswerk en kwaliteitscontrole. Platen worden gesneden, gezet en met de hand gelast tot een sterk, licht en strak casco.",
          image: IMG.casco2,
          gallery: [IMG.casco1, IMG.casco3, IMG.casco4, IMG.casco5],
        },
        {
          index: "04",
          title: "Afbouw & techniek",
          body:
            "Interieur, installaties, aandrijving en dekuitrusting — conventioneel, hybride of volledig elektrisch — vakkundig ingebouwd en op maat afgewerkt.",
          image: IMG.salon15,
          gallery: [IMG.salon5, IMG.salon25],
        },
        {
          index: "05",
          title: "Testen & opleveren",
          body:
            "Inbedrijfstelling, proefvaart, dossier en instructie. Je stapt aan boord van een compleet, gecertificeerd en varend schip.",
          image: IMG.editorialPanorama4,
        },
      ],
      ctaTitle: "Jouw jacht begint met een gesprek",
      ctaBody:
        "Vertel ons wat je voor ogen hebt. We denken graag mee over de mogelijkheden.",
      ctaButton: "Plan een kennismaking",
    },
    partner: {
      heroEyebrow: "Voor botenmerken",
      heroTitle: "Ontwikkel- & bouwpartner",
      heroLead: "Voor merken die verder willen dan alleen bouwen.",
      heroImage: IMG.eagle28_2,
      blocks: [
        {
          layout: "left",
          eyebrow: "Meer dan een bouwer",
          title: "Wij denken mee, vanaf het eerste idee",
          body:
            "Navisol is meer dan een bouwer. We denken mee in slim ontwerp, engineering en produceerbaarheid — zodat jouw product niet alleen mooi is, maar ook slim te maken en te varen.",
          image: IMG.editorialWerf6,
        },
        {
          layout: "right",
          eyebrow: "Eén aanspreekpunt",
          title: "Van concept tot eindproduct, onder één dak",
          body:
            "Eén verantwoordelijke partij voor het hele traject. Ontwerp, engineering en productie komen bij ons samen, waardoor je rust, snelheid en grip houdt gedurende het hele project.",
          image: IMG.casco3,
        },
      ],
      statement: "Jij kent jouw merk. Wij weten hoe je het bouwt.",
      brandEyebrow: "Merkwerk",
      brandTitle: "Gebouwd voor het merk Eagle",
      brandBody:
        "Voor Eagle ontwikkelen en bouwen we aluminium modellen die klaar zijn voor de markt — van casco tot afwerking, met constante kwaliteit.",
      brandImages: [IMG.eagle28_1, IMG.eagle28_3, IMG.eagle25_1],
      ctaTitle: "Laten we verkennen wat mogelijk is",
      ctaBody:
        "Denk je aan een nieuwe lijn, een doorontwikkeling of een betrouwbare bouwpartner? We gaan graag het gesprek aan.",
      ctaButton: "Neem contact op",
    },
    work: {
      heroEyebrow: "Portfolio",
      heroTitle: "Ons werk",
      heroLead:
        "Een selectie uit wat we bouwden — van jachten op maat voor eigenaren tot ontwikkel- en bouwtrajecten voor merken.",
      heroImage: IMG.veluvia2,
      items: [
        {
          slug: "flamme-40",
          title: "Flamme 40",
          category: "Jacht op maat",
          year: "2024",
          body:
            "Een custom zeiljacht van veertig voet, volledig in aluminium. In eigen huis ontworpen en gebouwd, met een op maat getekend interieur waarin hout en licht de toon zetten.",
          images: [
            IMG.flamme1,
            IMG.flamme2,
            IMG.flamme3,
            IMG.flamme4,
            IMG.flamme5,
            IMG.flamme6,
            IMG.flamme7,
          ],
          layout: "full",
        },
        {
          slug: "veluvia-920",
          title: "Veluvia 920",
          category: "Jacht op maat",
          year: "2023",
          body:
            "Een strakke aluminium sloep met tijdloze lijnen. Comfortabel, stil en gebouwd om lang mee te gaan.",
          images: [IMG.veluvia1, IMG.veluvia2],
          layout: "left",
        },
        {
          slug: "salonboot-18-8m",
          title: "Salonboot 18,8 m voor Amsterdam",
          category: "Jacht op maat",
          status: "In aanbouw",
          body:
            "Een salonboot van 18,8 meter, in aanbouw voor de Amsterdamse grachten. Ruim, elegant en volledig op maat — hier gevolgd van casco tot afbouw.",
          images: [IMG.salon5, IMG.salon15, IMG.salon25],
          video: IMG.salonVideo,
          layout: "right",
        },
        {
          slug: "eagle-28sg",
          title: "Eagle 28 SG",
          category: "Ontwikkel- & bouwpartner",
          body:
            "Ontwikkeld en gebouwd voor het merk Eagle. Een aluminium model dat productieklaar wordt opgeleverd — van casco tot afwerking.",
          images: [IMG.eagle28_1, IMG.eagle28_2, IMG.eagle28_3],
          layout: "left",
        },
        {
          slug: "eagle-25ts",
          title: "Eagle 25 TS",
          category: "Ontwikkel- & bouwpartner",
          body:
            "Een compacter model uit de Eagle-lijn. Dezelfde bouwkwaliteit, doordacht tot in het detail en klaar voor het water.",
          images: [IMG.eagle25_1],
          layout: "right",
        },
        {
          slug: "32-ts",
          title: "32 TS — hybride tender",
          category: "Eigen ontwikkeling",
          status: "In ontwikkeling",
          body:
            "Een hybride tender en mini-jacht, nu in ontwikkeling. De 3D-renders tonen de lijnen van wat er op de werf tot leven komt.",
          images: [IMG.render1, IMG.render2, IMG.render3],
          layout: "full",
        },
      ],
      ctaTitle: "Jouw project op deze pagina?",
      ctaBody: "We vertellen je graag hoe we jouw jacht of product realiseren.",
      ctaButton: "Neem contact op",
    },
    about: {
      heroEyebrow: "Over Navisol",
      heroTitle: "Een werf met een verhaal",
      heroLead:
        "Precisie, rust en vakmanschap. Navisol bouwt aluminium jachten en producten waar mensen jarenlang plezier van hebben.",
      heroImage: IMG.casco3,
      fullImage: IMG.editorialPanorama4,
      storyTitle: "Ons verhaal",
      story: [
        "Navisol is geworteld in de maritieme wereld. Vanuit Elburg ontwerpen en bouwen we aluminium jachten op maat en werken we als ontwikkel- en bouwpartner voor botenmerken.",
        "Wat ons kenmerkt is de combinatie van technische precisie en Nederlands vakmanschap. Ontwerp, engineering en bouw komen samen onder één dak, waardoor we volledige grip houden op kwaliteit, planning en communicatie.",
        "We bouwen niet in aantallen, maar in schepen die blijven. Elk project is een samenwerking — of het nu een eigen jacht is of een product voor jouw merk.",
      ],
      valuesEyebrow: "Waar we voor staan",
      values: [
        {
          title: "Vakmanschap",
          body:
            "Aandacht voor het detail, van de eerste las tot de laatste afwerking.",
        },
        {
          title: "Onder één dak",
          body:
            "Ontwerp, engineering en bouw in eigen huis, met één aanspreekpunt.",
        },
        {
          title: "Rust & betrouwbaarheid",
          body:
            "Heldere afspraken, realistische planningen en een schip dat klopt.",
        },
      ],
      ctaTitle: "Benieuwd wat we voor jou kunnen betekenen?",
      ctaBody: "We maken graag kennis, persoonlijk of op de werf.",
      ctaButton: "Neem contact op",
    },
    contact: {
      heroEyebrow: "Contact",
      heroTitle: "Laten we kennismaken",
      heroLead:
        "Een eigen jacht voor ogen of op zoek naar een bouwpartner? We horen graag van je.",
      infoTitle: "Navisol",
      visit: "Bezoek",
      call: "Bel",
      email: "Mail",
      hours: "Openingstijden",
      hoursValue: "Maandag t/m vrijdag · 08:00 – 17:00",
      formTitle: "Stuur ons een bericht",
      name: "Naam",
      company: "Bedrijf (optioneel)",
      emailField: "E-mailadres",
      phone: "Telefoonnummer",
      subject: "Onderwerp",
      subjectOptions: [
        { value: "custom", label: "Jachtbouw op maat" },
        { value: "partner", label: "Ontwikkel- & bouwpartner" },
        { value: "other", label: "Iets anders" },
      ],
      message: "Bericht",
      send: "Verstuur bericht",
      success: "Bedankt voor je bericht. We nemen snel contact met je op.",
      sending: "Bezig met verzenden…",
      error:
        "Er ging iets mis bij het verzenden. Mail ons gerust direct op info@navisol.nl.",
    },
    footer: {
      tagline:
        "Aluminium jachtbouw op maat en ontwikkel- & bouwpartner voor botenmerken. Gevestigd in Elburg, Nederland.",
      explore: "Ontdek",
      contact: "Contact",
      rights: "Alle rechten voorbehouden.",
      privacy: "Privacybeleid",
      terms: "Voorwaarden",
      langNote: "Taal",
    },
  },

  en: {
    nav: {
      custom: "Custom Yacht Building",
      partner: "Design & Build Partner",
      work: "Our Work",
      about: "About",
      contact: "Contact",
      cta: "Get in touch",
      langName: "English",
    },
    home: {
      heroEyebrow: "Aluminium yacht building · Elburg, The Netherlands",
      heroTitle: "From first sketch to sailing yacht.",
      heroLead:
        "Navisol designs and builds bespoke aluminium yachts — and is the trusted development and build partner for boat brands. Everything under one roof.",
      scroll: "Discover",
      heroImage: IMG.heroPhoto,
      heroImages: [
        IMG.heroBoat1,
        IMG.heroBoat2,
        IMG.flamme1,
        IMG.eagle28_1,
        IMG.editorial1,
      ],
      heroVideo: IMG.heroVideo,
      designEyebrow: "Designed in 3D",
      designTitle: "Every yacht begins as a design",
      designBody:
        "Before a single sheet of aluminium is cut, every yacht comes to life in 3D. So every line is right — and you know exactly what you'll get — before construction begins.",
      clientsEyebrow: "Trusted by leading organisations",
      techEyebrow: "Under the skin",
      techTitle: "Engineering that's right. Built to last.",
      techItems: [
        {
          title: "Aluminium hull building",
          body: "Light, strong, easily repairable and ideally suited to custom work and intensive, daily use.",
        },
        {
          title: "Electric & hybrid",
          body: "Propulsion, battery packs, charging, energy management and full system integration.",
        },
        {
          title: "Electrical systems",
          body: "Navigation, communication, lighting, pumps, heating and onboard monitoring.",
        },
        {
          title: "Certification",
          body: "ES-TRIN, CE, technical documentation and coordination with inspection bodies.",
        },
      ],
      techStatement: "Not just technically possible, but dependable every day.",
      pillarsEyebrow: "Two ways to work together",
      customLabel: "For owners",
      customTitle: "Custom Yacht Building",
      customBody:
        "Fully bespoke aluminium yachts up to around 15 metres — from design and engineering to a complete interior and handover.",
      customCta: "See the journey",
      customImage: IMG.editorial1,
      partnerLabel: "For boat brands",
      partnerTitle: "Design & Build Partner",
      partnerBody:
        "One accountable partner for brands that want to develop and produce — from smart design and engineering to a production-ready end product.",
      partnerCta: "Explore the partnership",
      partnerImage: IMG.eagle28_1,
      editorialEyebrow: "Work built",
      editorial: [
        {
          layout: "left",
          eyebrow: "Material",
          title: "Aluminium, perfection down to the finest detail",
          body:
            "Aluminium demands craftsmanship. Every weld, frame and plate is checked by hand. The result is a hull that is strong, sails light, lasts for decades and can be recycled.",
          image: IMG.editorialWerf5,
        },
        {
          layout: "full",
          title: "Every yacht tells a different story.",
          image: IMG.editorialPanorama2,
        },
        {
          layout: "right",
          eyebrow: "Under one roof",
          title: "Designed and built in one place",
          body:
            "Design, engineering, hull construction, installation and finishing all happen in the same yard. Short lines, one point of contact and full control over quality and planning.",
          image: IMG.editorialWerf6,
        },
        {
          layout: "full",
          title: "",
          image: IMG.editorialPanorama3,
        },
        {
          layout: "left",
          eyebrow: "Complete",
          title: "From hull to complete interior",
          body:
            "We deliver complete, sailing vessels. Including an interior that is drawn and built entirely to measure.",
          image: IMG.editorial1,
        },
        {
          layout: "right",
          eyebrow: "Propulsion",
          title: "Quiet, clean and powerful",
          body:
            "Conventional, hybrid or fully electric. We integrate the propulsion that suits the waters and the brief — whisper-quiet on the water, dependable in use.",
          image: IMG.editorial7,
        },
        {
          layout: "full",
          title: "From first sketch to sailing yacht.",
          image: IMG.editorialPanorama4,
        },
      ],
      quote: "We don't build in numbers, but in yachts that endure.",
      quoteAuthor: "Navisol",
      ctaTitle: "Let's talk",
      ctaBody:
        "Dreaming of your own yacht, or looking for a build partner for your brand? We'd love to think along with you.",
      ctaButton: "Get in touch",
    },
    custom: {
      heroEyebrow: "For owners",
      heroTitle: "Custom Yacht Building",
      heroLead:
        "Complete aluminium yachts up to around 15 metres, interior included. From first line to sea trial — at Navisol it all comes together.",
      heroImage: IMG.editorial1,
      introTitle: "Your yacht, from A to Z",
      introBody:
        "A bespoke yacht begins with your story and ends with your first voyage. We guide every step, design and build everything in-house, and deliver a vessel that is entirely yours — down to the smallest detail of the interior.",
      stepsEyebrow: "From idea to water",
      steps: [
        {
          index: "01",
          title: "Sketch & concept",
          body:
            "Sailing profile, layout, styling and first direction. Your wishes become a 3D design that works on the water and in use.",
          image: IMG.render1,
          gallery: [IMG.render2, IMG.render3],
        },
        {
          index: "02",
          title: "Engineering",
          body:
            "Structure, systems, power, energy and detailing are calculated and developed into production-ready drawings.",
          image: IMG.editorialWerf6,
        },
        {
          index: "03",
          title: "Hull construction",
          body:
            "Aluminium construction, welding and quality control. Plates are cut, formed and welded by hand into a strong, light and precise hull.",
          image: IMG.casco2,
          gallery: [IMG.casco1, IMG.casco3, IMG.casco4, IMG.casco5],
        },
        {
          index: "04",
          title: "Fit-out & systems",
          body:
            "Interior, installations, propulsion and deck equipment — conventional, hybrid or fully electric — expertly installed and finished to measure.",
          image: IMG.salon15,
          gallery: [IMG.salon5, IMG.salon25],
        },
        {
          index: "05",
          title: "Testing & handover",
          body:
            "Commissioning, sea trial, documentation and instruction. You step aboard a complete, certified and sailing vessel.",
          image: IMG.editorialPanorama4,
        },
      ],
      ctaTitle: "Your yacht begins with a conversation",
      ctaBody:
        "Tell us what you have in mind. We'd be glad to explore the possibilities.",
      ctaButton: "Plan an introduction",
    },
    partner: {
      heroEyebrow: "For boat brands",
      heroTitle: "Design & Build Partner",
      heroLead: "For brands that want more than a builder.",
      heroImage: IMG.eagle28_2,
      blocks: [
        {
          layout: "left",
          eyebrow: "More than a builder",
          title: "We think along, from the first idea",
          body:
            "Navisol is more than a builder. We think along in smart design, engineering and manufacturability — so your product isn't only beautiful, but also clever to make and to sail.",
          image: IMG.editorialWerf6,
        },
        {
          layout: "right",
          eyebrow: "One point of contact",
          title: "From concept to end product, under one roof",
          body:
            "One accountable party for the entire journey. Design, engineering and production come together with us, so you keep calm, speed and control throughout the project.",
          image: IMG.casco3,
        },
      ],
      statement: "You know your brand. We know how to build it.",
      brandEyebrow: "Brand work",
      brandTitle: "Built for the Eagle brand",
      brandBody:
        "For Eagle we develop and build market-ready aluminium models — from hull to finish, with consistent quality.",
      brandImages: [IMG.eagle28_1, IMG.eagle28_3, IMG.eagle25_1],
      ctaTitle: "Let's explore what's possible",
      ctaBody:
        "Considering a new line, a further development or a reliable build partner? We'd be glad to start the conversation.",
      ctaButton: "Get in touch",
    },
    work: {
      heroEyebrow: "Portfolio",
      heroTitle: "Our Work",
      heroLead:
        "A selection of what we've built — from bespoke yachts for owners to development and build programs for brands.",
      heroImage: IMG.veluvia2,
      items: [
        {
          slug: "flamme-40",
          title: "Flamme 40",
          category: "Custom yacht",
          year: "2024",
          body:
            "A forty-foot custom sailing yacht, entirely in aluminium. Designed and built in-house, with a bespoke interior where wood and light set the tone.",
          images: [
            IMG.flamme1,
            IMG.flamme2,
            IMG.flamme3,
            IMG.flamme4,
            IMG.flamme5,
            IMG.flamme6,
            IMG.flamme7,
          ],
          layout: "full",
        },
        {
          slug: "veluvia-920",
          title: "Veluvia 920",
          category: "Custom yacht",
          year: "2023",
          body:
            "A sleek aluminium sloop with timeless lines. Comfortable, quiet and built to last.",
          images: [IMG.veluvia1, IMG.veluvia2],
          layout: "left",
        },
        {
          slug: "salonboot-18-8m",
          title: "18.8 m salon boat for Amsterdam",
          category: "Custom yacht",
          status: "Under construction",
          body:
            "An 18.8-metre salon boat, under construction for the Amsterdam canals. Spacious, elegant and fully bespoke — followed here from hull to finishing.",
          images: [IMG.salon5, IMG.salon15, IMG.salon25],
          video: IMG.salonVideo,
          layout: "right",
        },
        {
          slug: "eagle-28sg",
          title: "Eagle 28 SG",
          category: "Design & Build Partner",
          body:
            "Developed and built for the Eagle brand. An aluminium model delivered production-ready — from hull to finish.",
          images: [IMG.eagle28_1, IMG.eagle28_2, IMG.eagle28_3],
          layout: "left",
        },
        {
          slug: "eagle-25ts",
          title: "Eagle 25 TS",
          category: "Design & Build Partner",
          body:
            "A more compact model from the Eagle line. The same build quality, considered down to the detail and ready for the water.",
          images: [IMG.eagle25_1],
          layout: "right",
        },
        {
          slug: "32-ts",
          title: "32 TS — hybrid tender",
          category: "In-house development",
          status: "In development",
          body:
            "A hybrid tender and mini-yacht, currently in development. The 3D renders reveal the lines of what will come to life on the yard.",
          images: [IMG.render1, IMG.render2, IMG.render3],
          layout: "full",
        },
      ],
      ctaTitle: "Your project on this page?",
      ctaBody: "We'd be glad to tell you how we bring your yacht or product to life.",
      ctaButton: "Get in touch",
    },
    about: {
      heroEyebrow: "About Navisol",
      heroTitle: "A yard with a story",
      heroLead:
        "Precision, calm and craftsmanship. Navisol builds aluminium yachts and products people enjoy for years.",
      heroImage: IMG.casco3,
      fullImage: IMG.editorialPanorama4,
      storyTitle: "Our story",
      story: [
        "Navisol is rooted in the maritime world. From Elburg we design and build bespoke aluminium yachts and work as a development and build partner for boat brands.",
        "What defines us is the combination of technical precision and Dutch craftsmanship. Design, engineering and construction come together under one roof, giving us full control over quality, planning and communication.",
        "We don't build in numbers, but in yachts that endure. Every project is a collaboration — whether it's your own yacht or a product for your brand.",
      ],
      valuesEyebrow: "What we stand for",
      values: [
        {
          title: "Craftsmanship",
          body: "Attention to detail, from the first weld to the final finish.",
        },
        {
          title: "Under one roof",
          body: "Design, engineering and construction in-house, with one point of contact.",
        },
        {
          title: "Calm & reliable",
          body: "Clear agreements, realistic planning and a vessel that's right.",
        },
      ],
      ctaTitle: "Curious what we can do for you?",
      ctaBody: "We'd be glad to meet, in person or at the yard.",
      ctaButton: "Get in touch",
    },
    contact: {
      heroEyebrow: "Contact",
      heroTitle: "Let's talk",
      heroLead:
        "Dreaming of your own yacht or looking for a build partner? We'd love to hear from you.",
      infoTitle: "Navisol",
      visit: "Visit",
      call: "Call",
      email: "Email",
      hours: "Opening hours",
      hoursValue: "Monday to Friday · 08:00 – 17:00",
      formTitle: "Send us a message",
      name: "Name",
      company: "Company (optional)",
      emailField: "Email address",
      phone: "Phone number",
      subject: "Subject",
      subjectOptions: [
        { value: "custom", label: "Custom Yacht Building" },
        { value: "partner", label: "Design & Build Partner" },
        { value: "other", label: "Something else" },
      ],
      message: "Message",
      send: "Send message",
      success: "Thank you for your message. We'll be in touch soon.",
      sending: "Sending…",
      error:
        "Something went wrong while sending. Feel free to email us directly at info@navisol.nl.",
    },
    footer: {
      tagline:
        "Bespoke aluminium yacht building and development & build partner for boat brands. Based in Elburg, The Netherlands.",
      explore: "Explore",
      contact: "Contact",
      rights: "All rights reserved.",
      privacy: "Privacy policy",
      terms: "Terms",
      langNote: "Language",
    },
  },
};

export const NAV_LINKS = [
  { href: "/custom-yacht-building", key: "custom" as const },
  { href: "/design-build-partner", key: "partner" as const },
  { href: "/our-work", key: "work" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

export const CONTACT_DETAILS = {
  address1: "Industriestraat 25",
  address2: "8081 HH Elburg",
  country: "Nederland / The Netherlands",
  phone: "+31 (0)85 0600 139",
  phoneHref: "tel:+31850600139",
  email: "info@navisol.nl",
  emailHref: "mailto:info@navisol.nl",
  maps: "https://maps.google.com/?q=Industriestraat+25,+8081+HH+Elburg",
};
