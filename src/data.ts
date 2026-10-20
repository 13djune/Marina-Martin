export interface PaletteColor {
  nameEs: string;
  nameEn: string;
  hex: string;
}

export interface Hotspot {
  x: number;
  y: number;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
}

export interface ProcessImage {
  url: string;
  labelEs: string;
  labelEn: string;
  hotspots?: Hotspot[];
}

// =============================================================================
// ESTRUCTURA DE DATOS PARA CADA PÁGINA INDIVIDUAL DEL SKETCHBOOK
// Permite modificar títulos, subtítulos, citas, notas, imágenes y hotspots
// de cada página por separado directamente desde este archivo.
// =============================================================================
export interface SketchbookPageData {
  pageNumber: string;               // Ej: "PÁG. 00", "PÁG. 01", "PÁG. 02", etc.
  sectionHeaderEs: string;          // Encabezado de la barra superior en español (Ej: "BÚSQUEDA DE SILUETAS", "DISEÑO DE LOS PERSONAJES", "ILUSTRACIONES")
  sectionHeaderEn: string;          // Top bar section header in English
  subHeaderEs: string;              // Subtítulo temático en español (Ej: "EXPLORACIÓN FORMAL & SILUETA", "PERSONAJE: CARMILLA · CONDICIÓN VAMPÍRICA")
  subHeaderEn: string;              // Thematic subheader in English
  titleEs: string;                  // Título principal de la lámina en español (Ej: "Carmilla — Diseño de personaje")
  titleEn: string;                  // Main plate title in English
  imageUrl: string;                 // URL de la imagen que se mostrará en esta página
  imageAltEs?: string;              // Descripción accesible en español
  imageAltEn?: string;              // Accessible alt description in English
  quoteEs?: string;                 // Cita artística / pensamiento visual destacado en cursiva
  quoteEn?: string;                 // Artistic quote / visual thought in English
  notesTitleEs?: string;            // Título de la tarjeta de notas (Ej: "NOTAS DE DISEÑO: CARMILLA", "APUNTES DE TALLER")
  notesTitleEn?: string;            // Notes card title in English
  notesEs?: string;                 // Texto de notas de la artista o desarrollo técnico
  notesEn?: string;                 // Artist technical / design notes in English
  hotspots?: Hotspot[];             // Puntos interactivos con anotaciones sobre la lámina
  palette?: PaletteColor[];         // Paleta cromática visible en esta página (opcional)
  footerLeftEs?: string;            // Texto inferior izquierdo (Ej: "Diseño de Personajes · Carmilla")
  footerLeftEn?: string;            // Footer left text in English
  footerRightEs?: string;           // Texto inferior derecho (Ej: "EXP. LIBRO I · EXP. 01", "PLATE 01 · MMP")
  footerRightEn?: string;           // Footer right text in English
}

// =============================================================================
// CONFIGURACIÓN COMPLETA DE PÁGINAS DEL SKETCHBOOK
// Organiza el orden exacto de las páginas para cada proyecto/cuaderno.
// =============================================================================
export interface SketchbookPagesConfig {
  // PÁGINA 00: Búsqueda de siluetas / estudio preliminar (Guarda izquierda)
  page00: SketchbookPageData;
  // PÁGINA 01: Diseño del personaje principal (ej: Carmilla)
  page01: SketchbookPageData;
  // PÁGINA 02: Diseño del personaje secundario / antagonista / complementario (ej: Laura)
  page02: SketchbookPageData;
  // PÁGINA 03: Ilustraciones · Lámina I (Pintura / atmósfera inicial)
  page03: SketchbookPageData;
  // PÁGINA 04: Ilustraciones · Lámina II (Acabado gótico / clímax)
  page04: SketchbookPageData;
  // PÁGINA 05: Lámina Final HD (Gran formato)
  page05?: SketchbookPageData;
  // PÁGINA 06: Revisión de Taller (Bitácora de producción)
  page06?: SketchbookPageData;
  // PÁGINA 07: Certificado de Autenticidad (Colofón de autoría)
  page07?: SketchbookPageData;
}

export interface Project {
  id: number;
  titleEs: string;
  titleEn: string;
  categoryEs: string;
  categoryEn: string;
  projectTypeEs: string;
  projectTypeEn: string;
  roleEs: string;
  roleEn: string;
  tools: string;
  year: string;
  imageUrl: string;
  descriptionEs: string;
  descriptionEn: string;
  tags: string[];
  processImages: ProcessImage[];
  sketchbookVol: string;
  coverColor: string;
  spineColor: string;
  accentColor: string;
  palette: PaletteColor[];
  techniqueEs: string;
  techniqueEn: string;
  notesEs: string;
  notesEn: string;

  // =========================================================================
  // PÁGINAS CONFIGURABLES DEL SKETCHBOOK
  // Puedes editar aquí el contenido exacto de cada página del cuaderno
  // =========================================================================
  sketchbookPages?: SketchbookPagesConfig;
}

export const galleryItems: Project[] = [
  {
    id: 1,
    titleEs: "Carmilla",
    titleEn: "Carmilla",
    categoryEs: "Diseño de Personajes",
    categoryEn: "Character design",
    projectTypeEs: "Arte Conceptual e Ilustraciones",
    projectTypeEn: "Concept Art & Ilustrations",
    roleEs: "Artista 2D",
    roleEn: "2D Artist",
    tools: "Photoshop",
    year: "2026",
    imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop",
    descriptionEs: "Reinterpretación visual de 'Carmilla', obra precursora de la literatura vampírica de Sheridan Le Fanu, a través del diseño de sus personajes y la creación de ilustraciones.",
    descriptionEn: "Visual reinterpretation of 'Carmilla', Sheridan Le Fanu's pioneering gothic vampire masterpiece, through character design and finished illustrations.",
    tags: ["Character Design", "Concept Art", "Ilustraciones", "Dark Fantasy", "Gothic"],
    sketchbookVol: "LIBRO I · EXP. 01",
    coverColor: "#221717",
    spineColor: "#150d0d",
    accentColor: "#B8C5A8",
    palette: [
      { nameEs: "Sangre Seca", nameEn: "Dried Blood", hex: "#5b1414" },
      { nameEs: "Carmesí Vivo", nameEn: "Vivid Crimson", hex: "#ff3b1f" },
      { nameEs: "Niebla Esmeralda", nameEn: "Emerald Mist", hex: "#1a3325" },
      { nameEs: "Hueso Pálido", nameEn: "Pale Bone", hex: "#e7e2d6" }
    ],
    techniqueEs: "Búsqueda de siluetas para la indumentaria de los personajes y diseño de los rostros.",
    techniqueEn: "Silhouette exploration for character attire and facial anatomy design.",
    notesEs: "El contraste psicológico entre la inocencia victoriana de Laura y la seducción enigmática de Carmilla guía la indumentaria: terciopelo carmesí y encajes oscuros frente a muselina clara y telas etéreas.",
    notesEn: "The psychological contrast between Laura's Victorian innocence and Carmilla's enigmatic seduction guides the costume: crimson velvet and dark lace versus pale muslin and ethereal fabrics.",
    processImages: [
      { 
        url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2946&auto=format&fit=crop", 
        labelEs: "Búsqueda de Siluetas", 
        labelEn: "Silhouette Exploration",
        hotspots: [
          { x: 35, y: 38, titleEs: "Silueta de Carmilla", titleEn: "Carmilla Silhouette", descriptionEs: "Líneas afiladas y pesadas caídas de terciopelo que transmiten su naturaleza depredadora.", descriptionEn: "Sharp lines and heavy velvet drape evoking her predatory nature." },
          { x: 68, y: 45, titleEs: "Silueta de Laura", titleEn: "Laura Silhouette", descriptionEs: "Volúmenes suaves y cortes victorianos con miriñaque ligero y encaje etéreo.", descriptionEn: "Soft volumes and Victorian cuts with lightweight petticoats and ethereal lace." }
        ]
      },
      { 
        url: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2940&auto=format&fit=crop", 
        labelEs: "Diseño de Carmilla", 
        labelEn: "Carmilla Character Design",
        hotspots: [
          { x: 50, y: 35, titleEs: "Rostro Hipnótico", titleEn: "Hypnotic Features", descriptionEs: "Mirada penetrante, tez pálida y facciones aristocráticas de misterio eterno.", descriptionEn: "Penetrating gaze, pale complexion, and aristocratic features of eternal mystery." },
          { x: 50, y: 75, titleEs: "Indumentaria Carmesí", titleEn: "Crimson Attire", descriptionEs: "Terciopelo sangriento con ornamentos dorados envejecidos.", descriptionEn: "Deep blood-red velvet with aged golden ornaments." }
        ]
      },
      { 
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2787&auto=format&fit=crop", 
        labelEs: "Diseño de Laura", 
        labelEn: "Laura Character Design",
        hotspots: [
          { x: 50, y: 35, titleEs: "Inocencia & Fragilidad", titleEn: "Innocence & Fragility", descriptionEs: "Facciones serenas y vulnerables de joven aristócrata en Estiria.", descriptionEn: "Serene and vulnerable features of a young noblewoman in Styria." },
          { x: 50, y: 75, titleEs: "Vestido de Muselina", titleEn: "Muslin Gown", descriptionEs: "Tejidos claros y vaporosos que acentúan su fragilidad humana frente a Carmilla.", descriptionEn: "Light, vaporous fabrics emphasizing human fragility against Carmilla." }
        ]
      },
      { 
        url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2800&auto=format&fit=crop", 
        labelEs: "Ilustración I · La Fascinación", 
        labelEn: "Illustration I · The Fascination",
        hotspots: [
          { x: 50, y: 40, titleEs: "Atmósfera Tenebrista", titleEn: "Tenebrist Atmosphere", descriptionEs: "Claroscuro dramático inspirado en la pintura al óleo del romanticismo oscuro.", descriptionEn: "Dramatic chiaroscuro inspired by dark romanticism oil painting." }
        ]
      },
      { 
        url: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2800&auto=format&fit=crop", 
        labelEs: "Ilustración II · La Capilla en Ruinas", 
        labelEn: "Illustration II · The Ruined Chapel",
        hotspots: [
          { x: 45, y: 55, titleEs: "Entorno Gótico", titleEn: "Gothic Environment", descriptionEs: "Ruinas ancestrales de la familia Karnstein donde converge el destino de ambas.", descriptionEn: "Ancestral Karnstein ruins where the destiny of both characters converges." }
        ]
      }
    ],
    // =========================================================================
    // CONFIGURACIÓN PÁGINA A PÁGINA DEL SKETCHBOOK DE CARMILLA
    // Modifica aquí directamente todos los textos, imágenes, citas, notas y hotspots
    // de cada página de este cuaderno.
    // =========================================================================
    sketchbookPages: {
      // -----------------------------------------------------------------------
      // PÁGINA 00: BÚSQUEDA DE SILUETAS (Guarda izquierda)
      // -----------------------------------------------------------------------
      page00: {
        pageNumber: "PÁG. 00",
        sectionHeaderEs: "BÚSQUEDA DE SILUETAS",
        sectionHeaderEn: "SILHOUETTE EXPLORATION",
        subHeaderEs: "EXPLORACIÓN FORMAL & SILUETA",
        subHeaderEn: "FORMAL & SILHOUETTE EXPLORATION",
        titleEs: "«Carmilla» — Búsqueda de Siluetas",
        titleEn: "«Carmilla» — Silhouette Exploration",
        imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2946&auto=format&fit=crop",
        imageAltEs: "Estudio de siluetas de indumentaria y anatomía",
        imageAltEn: "Costume and anatomy silhouette exploration",
        quoteEs: "La silueta es el primer impacto visual. Antes del detalle o el color, la forma debe transmitir la amenaza depredadora de Carmilla y la fragilidad inocente de Laura.",
        quoteEn: "The silhouette is the initial visual impact. Before detail or color, the shape must convey Carmilla's predatory threat and Laura's innocent fragility.",
        notesTitleEs: "APUNTES DE PROCESO",
        notesTitleEn: "PROCESS NOTES",
        notesEs: "Búsqueda de proporciones estilizadas para acentuar el misterio y la elegancia gótica del relato.",
        notesEn: "Exploration of stylized proportions to enhance the gothic mystery and elegance of the tale.",
        hotspots: [
          { 
            x: 35, 
            y: 38, 
            titleEs: "Silueta de Carmilla", 
            titleEn: "Carmilla Silhouette", 
            descriptionEs: "Líneas afiladas y pesadas caídas de terciopelo que transmiten su naturaleza depredadora.", 
            descriptionEn: "Sharp lines and heavy velvet drape evoking her predatory nature." 
          },
          { 
            x: 68, 
            y: 45, 
            titleEs: "Silueta de Laura", 
            titleEn: "Laura Silhouette", 
            descriptionEs: "Volúmenes suaves y cortes victorianos con miriñaque ligero y encaje etéreo.", 
            descriptionEn: "Soft volumes and Victorian cuts with lightweight petticoats and ethereal lace." 
          }
        ],
        footerLeftEs: "Búsqueda de Siluetas · Estudio de Formas",
        footerLeftEn: "Silhouette Exploration · Form Study",
        footerRightEs: "MMP · ARCHIVO TÉCNICO",
        footerRightEn: "MMP · TECHNICAL ARCHIVE"
      },

      // -----------------------------------------------------------------------
      // PÁGINA 01: DISEÑO DE LOS PERSONAJES - CARMILLA (Lámina derecha)
      // -----------------------------------------------------------------------
      page01: {
        pageNumber: "PÁG. 01",
        sectionHeaderEs: "DISEÑO DE LOS PERSONAJES",
        sectionHeaderEn: "CHARACTER DESIGN",
        subHeaderEs: "PERSONAJE: CARMILLA · CONDICIÓN VAMPÍRICA",
        subHeaderEn: "CHARACTER: CARMILLA · VAMPIRIC NATURE",
        titleEs: "Carmilla — Diseño de personaje",
        titleEn: "Carmilla — Character Design",
        imageUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2940&auto=format&fit=crop",
        imageAltEs: "Diseño de personaje de Carmilla",
        imageAltEn: "Carmilla character design",
        notesTitleEs: "NOTAS DE DISEÑO: CARMILLA",
        notesTitleEn: "DESIGN NOTES: CARMILLA",
        notesEs: "El terciopelo carmesí y los encajes oscuros contrastan con la palidez aristocrática de su rostro, sugiriendo una sensualidad letal oculta bajo modales cortesanos.",
        notesEn: "Crimson velvet and dark lace contrast with the aristocratic paleness of her face, suggesting lethal sensuality beneath courtly manners.",
        palette: [
          { nameEs: "Sangre Seca", nameEn: "Dried Blood", hex: "#5b1414" },
          { nameEs: "Carmesí Vivo", nameEn: "Vivid Crimson", hex: "#ff3b1f" },
          { nameEs: "Niebla Esmeralda", nameEn: "Emerald Mist", hex: "#1a3325" },
          { nameEs: "Hueso Pálido", nameEn: "Pale Bone", hex: "#e7e2d6" }
        ],
        hotspots: [
          { 
            x: 50, 
            y: 35, 
            titleEs: "Rostro Hipnótico", 
            titleEn: "Hypnotic Features", 
            descriptionEs: "Mirada penetrante, tez pálida y facciones aristocráticas de misterio eterno.", 
            descriptionEn: "Penetrating gaze, pale complexion, and aristocratic features of eternal mystery." 
          },
          { 
            x: 50, 
            y: 75, 
            titleEs: "Indumentaria Carmesí", 
            titleEn: "Crimson Attire", 
            descriptionEs: "Terciopelo sangriento con ornamentos dorados envejecidos.", 
            descriptionEn: "Deep blood-red velvet with aged golden ornaments." 
          }
        ],
        footerLeftEs: "Diseño de Personajes · Carmilla",
        footerLeftEn: "Character Design · Carmilla",
        footerRightEs: "EXP. LIBRO I · EXP. 01",
        footerRightEn: "EXP. BOOK I · EXP. 01"
      },

      // -----------------------------------------------------------------------
      // PÁGINA 02: DISEÑO DE LOS PERSONAJES - LAURA (Lámina izquierda)
      // -----------------------------------------------------------------------
      page02: {
        pageNumber: "PÁG. 02",
        sectionHeaderEs: "DISEÑO DE LOS PERSONAJES",
        sectionHeaderEn: "CHARACTER DESIGN",
        subHeaderEs: "PERSONAJE: LAURA · INOCENCIA VICTORIANA",
        subHeaderEn: "CHARACTER: LAURA · VICTORIAN INNOCENCE",
        titleEs: "Laura — Diseño de personaje",
        titleEn: "Laura — Character Design",
        imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2787&auto=format&fit=crop",
        imageAltEs: "Diseño de personaje de Laura",
        imageAltEn: "Laura character design",
        quoteEs: "Laura encarna la pureza que será atraída hacia el abismo. Sus ropas claras de muselina reflejan su inocencia y su condición de víctima elegida.",
        quoteEn: "Laura embodies the purity drawn toward the abyss. Her light muslin attire reflects innocence and chosen victimhood.",
        notesTitleEs: "NOTAS DE DISEÑO: LAURA",
        notesTitleEn: "DESIGN NOTES: LAURA",
        notesEs: "Líneas curvas y telas vaporosas que contrastan con los ángulos afilados de Carmilla.",
        notesEn: "Curved lines and vaporous fabrics contrasting with Carmilla's sharp angles.",
        hotspots: [
          { 
            x: 50, 
            y: 35, 
            titleEs: "Inocencia & Fragilidad", 
            titleEn: "Innocence & Fragility", 
            descriptionEs: "Facciones serenas y vulnerables de joven aristócrata en Estiria.", 
            descriptionEn: "Serene and vulnerable features of a young noblewoman in Styria." 
          },
          { 
            x: 50, 
            y: 75, 
            titleEs: "Vestido de Muselina", 
            titleEn: "Muslin Gown", 
            descriptionEs: "Tejidos claros y vaporosos que acentúan su fragilidad humana frente a Carmilla.", 
            descriptionEn: "Light, vaporous fabrics emphasizing human fragility against Carmilla." 
          }
        ],
        footerLeftEs: "Diseño de Personajes · Laura",
        footerLeftEn: "Character Design · Laura",
        footerRightEs: "EXP. LIBRO I · EXP. 01",
        footerRightEn: "EXP. BOOK I · EXP. 01"
      },

      // -----------------------------------------------------------------------
      // PÁGINA 03: ILUSTRACIONES · LÁMINA I (Lámina derecha)
      // -----------------------------------------------------------------------
      page03: {
        pageNumber: "PÁG. 03",
        sectionHeaderEs: "ILUSTRACIONES",
        sectionHeaderEn: "ILLUSTRATIONS",
        subHeaderEs: "LÁMINA I · LA FASCINACIÓN",
        subHeaderEn: "PLATE I · THE FASCINATION",
        titleEs: "«La Fascinación» — Ilustraciones",
        titleEn: "«The Fascination» — Illustrations",
        imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2800&auto=format&fit=crop",
        imageAltEs: "Ilustración I: La Fascinación",
        imageAltEn: "Illustration I: The Fascination",
        quoteEs: "El primer contacto en la alcoba: claroscuros profundos donde la luz de la vela revela apenas la cercanía magnética entre ambas protagonistas.",
        quoteEn: "First encounter in the bedchamber: deep chiaroscuro where candlelight barely reveals the magnetic intimacy between both characters.",
        notesTitleEs: "COMPOSICIÓN & COLOR",
        notesTitleEn: "COMPOSITION & COLOR",
        notesEs: "Uso de contrastes lumínicos con fuentes cálidas focales y sombras envolventes en tonos fríos.",
        notesEn: "Use of lighting contrast with warm focal sources and enveloping shadows in cool tones.",
        hotspots: [
          { 
            x: 50, 
            y: 40, 
            titleEs: "Atmósfera Tenebrista", 
            titleEn: "Tenebrist Atmosphere", 
            descriptionEs: "Claroscuro dramático inspirado en la pintura al óleo del romanticismo oscuro.", 
            descriptionEn: "Dramatic chiaroscuro inspired by dark romanticism oil painting." 
          }
        ],
        footerLeftEs: "Ilustraciones · Lámina I",
        footerLeftEn: "Illustrations · Plate I",
        footerRightEs: "PLATE 01 · MMP",
        footerRightEn: "PLATE 01 · MMP"
      },

      // -----------------------------------------------------------------------
      // PÁGINA 04: ILUSTRACIONES · LÁMINA II (Lámina izquierda)
      // -----------------------------------------------------------------------
      page04: {
        pageNumber: "PÁG. 04",
        sectionHeaderEs: "ILUSTRACIONES",
        sectionHeaderEn: "ILLUSTRATIONS",
        subHeaderEs: "LÁMINA II · LA CAPILLA EN RUINAS",
        subHeaderEn: "PLATE II · THE RUINED CHAPEL",
        titleEs: "«La Capilla en Ruinas» — Ilustraciones",
        titleEn: "«The Ruined Chapel» — Illustrations",
        imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2800&auto=format&fit=crop",
        imageAltEs: "Ilustración II: La Capilla en Ruinas",
        imageAltEn: "Illustration II: The Ruined Chapel",
        quoteEs: "Ruinas ancestrales de la familia Karnstein donde converge el destino trágico de ambas. La arquitectura gótica decadente sirve de marco para la resolución mística.",
        quoteEn: "Ancestral Karnstein ruins where both characters' destinies converge. Decadent gothic architecture in the Styrian forests frames the mystical resolution.",
        notesTitleEs: "ENTORNO ARQUITECTÓNICO",
        notesTitleEn: "ARCHITECTURAL ENVIRONMENT",
        notesEs: "Mampostería erosionada, arcos ojivales quebrados y vegetación invasiva que acentúan el paso inexorable del tiempo.",
        notesEn: "Eroded masonry, fractured lancet arches and encroaching vegetation emphasizing the inexorable passage of time.",
        hotspots: [
          { 
            x: 45, 
            y: 55, 
            titleEs: "Entorno Gótico", 
            titleEn: "Gothic Environment", 
            descriptionEs: "Ruinas ancestrales de la familia Karnstein donde converge el destino de ambas.", 
            descriptionEn: "Ancestral Karnstein ruins where the destiny of both characters converges." 
          }
        ],
        footerLeftEs: "Ilustraciones · Lámina II",
        footerLeftEn: "Illustrations · Plate II",
        footerRightEs: "PLATE 02 · MMP",
        footerRightEn: "PLATE 02 · MMP"
      },

      // -----------------------------------------------------------------------
      // PÁGINA 05: LÁMINA FINAL HD (Lámina derecha)
      // -----------------------------------------------------------------------
      page05: {
        pageNumber: "PÁG. 05",
        sectionHeaderEs: "LÁMINA FINAL HD",
        sectionHeaderEn: "FINAL HD PLATE",
        subHeaderEs: "OBRA TERMINADA EN ALTA RESOLUCIÓN",
        subHeaderEn: "FINISHED HIGH RESOLUTION WORK",
        titleEs: "«Carmilla» — Ilustración Principal",
        titleEn: "«Carmilla» — Master Illustration",
        imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop",
        imageAltEs: "Ilustración terminada en alta resolución",
        imageAltEn: "Finished high-resolution illustration",
        notesTitleEs: "FICHA TÉCNICA DE LA OBRA",
        notesTitleEn: "ARTWORK TECHNICAL SHEET",
        notesEs: "Composición definitiva con iluminación gótica, veladuras al óleo digital y tratamiento cromático atmosférico.",
        notesEn: "Master composition featuring gothic lighting, digital oil glazing and atmospheric chromatic treatment.",
        footerLeftEs: "Obra Maestra Final",
        footerLeftEn: "Final Masterwork",
        footerRightEs: "PLATE 05 · MMP",
        footerRightEn: "PLATE 05 · MMP"
      },

      // -----------------------------------------------------------------------
      // PÁGINA 06: REVISIÓN DE TALLER (Lámina izquierda)
      // -----------------------------------------------------------------------
      page06: {
        pageNumber: "PÁG. 06",
        sectionHeaderEs: "REVISIÓN DE TALLER",
        sectionHeaderEn: "WORKSHOP REVIEW",
        subHeaderEs: "BITÁCORA DE PRODUCCIÓN & REFERENCIAS",
        subHeaderEn: "PRODUCTION LOG & REFERENCES",
        titleEs: "Bitácora de Taller & Proceso",
        titleEn: "Workshop Log & Process",
        imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop",
        quoteEs: "Un proyecto conceptual requiere un diálogo continuo entre la investigación literaria y la plástica visual.",
        quoteEn: "A concept project demands continuous dialogue between literary research and visual arts.",
        notesTitleEs: "APUNTES DE TALLER",
        notesTitleEn: "WORKSHOP NOTES",
        notesEs: "Desarrollo artístico completado con Photoshop y referencias del arte gótico europeo.",
        notesEn: "Artistic development completed with Photoshop and European gothic art references.",
        footerLeftEs: "Revisión de Taller",
        footerLeftEn: "Workshop Review",
        footerRightEs: "REGISTRO TÉCNICO",
        footerRightEn: "TECHNICAL LOG"
      },

      // -----------------------------------------------------------------------
      // PÁGINA 07: CERTIFICADO DE AUTENTICIDAD (Lámina derecha)
      // -----------------------------------------------------------------------
      page07: {
        pageNumber: "PÁG. 07",
        sectionHeaderEs: "CERTIFICADO DE AUTENTICIDAD",
        sectionHeaderEn: "CERTIFICATE OF AUTHENTICITY",
        subHeaderEs: "REGISTRO EDITORIAL & ARCHIVO",
        subHeaderEn: "EDITORIAL ARCHIVE RECORD",
        titleEs: "Certificado de Obra y Registro",
        titleEn: "Certificate of Work & Record",
        imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop",
        notesTitleEs: "DECLARACIÓN DE AUTORÍA",
        notesTitleEn: "DECLARATION OF AUTHORSHIP",
        notesEs: "Certifico que todos los bocetos, estudios de siluetas, diseños de vestuario e ilustraciones terminadas recogidas en este cuaderno forman parte del desarrollo visual original de la artista Marina Martín Prieto.",
        notesEn: "I certify that all sketches, silhouette studies, costume designs and finished illustrations in this sketchbook form part of the original visual development by artist Marina Martín Prieto.",
        footerLeftEs: "Marina Martín Prieto",
        footerLeftEn: "Marina Martín Prieto",
        footerRightEs: "EXPEDIENTE AUTÉNTICO",
        footerRightEn: "GENUINE ARCHIVE"
      }
    }
  },
  {
    id: 2,
    titleEs: "El Tribunal Carmesí",
    titleEn: "The Crimson Court",
    categoryEs: "Diseño de Personajes",
    categoryEn: "Character",
    projectTypeEs: "Diseño de Personajes",
    projectTypeEn: "Character Design",
    roleEs: "Ilustradora Principal",
    roleEn: "Lead Illustrator",
    tools: "Photoshop, ZBrush",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2940&auto=format&fit=crop",
    descriptionEs: "Aristocracia de la noche, celebrando su eterna mascarada en el invernadero en ruinas.",
    descriptionEn: "Aristocracy of the night, holding their eternal masquerade in the ruined conservatory.",
    tags: ["Character Design", "Costume", "Vampire", "Baroque"],
    sketchbookVol: "LIBRO II · EXP. 04",
    coverColor: "#1a1622",
    spineColor: "#100d16",
    accentColor: "#e11d48",
    palette: [
      { nameEs: "Oro Envejecido", nameEn: "Aged Gold", hex: "#c59b27" },
      { nameEs: "Terciopelo Carmín", nameEn: "Crimson Velvet", hex: "#991b1b" },
      { nameEs: "Obsidiana", nameEn: "Obsidian", hex: "#121215" },
      { nameEs: "Encaje Veneciano", nameEn: "Venetian Lace", hex: "#f5f0eb" }
    ],
    techniqueEs: "Estudios anatómicos en papel gris teñido, esculpido digital en ZBrush para joyería y ropajes góticos, y veladuras de color al óleo digital.",
    techniqueEn: "Anatomical studies on tinted grey paper, ZBrush digital sculpt for gothic jewelry and drapery, finished with digital oil glazing.",
    notesEs: "La elegancia aristocrática debe esconder una violencia latente. Cada pliegue de la seda parece haber sido bañado en vino o algo más espeso.",
    notesEn: "Aristocratic elegance must conceal latent violence. Every fold of silk seems dipped in wine or something denser.",
    processImages: [
      { 
        url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2946&auto=format&fit=crop", 
        labelEs: "Estudio de Silueta", 
        labelEn: "Silhouette Study",
        hotspots: [
          { x: 50, y: 30, titleEs: "Anatomía Alargada", titleEn: "Elongated Anatomy", descriptionEs: "Estudio previo de proporciones alargadas para dar aspecto vampírico.", descriptionEn: "Preliminary study of elongated proportions for a vampiric look." }
        ]
      },
      { 
        url: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2940&auto=format&fit=crop", 
        labelEs: "Lámina Definitiva", 
        labelEn: "Final Plate",
        hotspots: [
          { x: 40, y: 80, titleEs: "Detalle Textil", titleEn: "Textile Detail", descriptionEs: "Renderizado de terciopelo y encaje para reflejar su estatus social.", descriptionEn: "Rendering of velvet and lace to reflect their social status." }
        ]
      }
    ],
    // =========================================================================
    // CONFIGURACIÓN PÁGINA A PÁGINA: EL TRIBUNAL CARMESÍ
    // Edita aquí directamente textos, imágenes, citas, notas y hotspots
    // =========================================================================
    sketchbookPages: {
      page00: {
        pageNumber: "PÁG. 00",
        sectionHeaderEs: "BÚSQUEDA DE SILUETAS",
        sectionHeaderEn: "SILHOUETTE EXPLORATION",
        subHeaderEs: "ANATOMÍA VAMPÍRICA & PROPORCIONES",
        subHeaderEn: "VAMPIRIC ANATOMY & PROPORTIONS",
        titleEs: "«El Tribunal Carmesí» — Búsqueda de Siluetas",
        titleEn: "«The Crimson Court» — Silhouette Exploration",
        imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2946&auto=format&fit=crop",
        imageAltEs: "Estudios anatómicos y proporciones de la corte vampírica",
        imageAltEn: "Anatomical studies and vampiric court proportions",
        quoteEs: "Estudio previo de proporciones alargadas para dar aspecto vampírico aristocrático.",
        quoteEn: "Preliminary study of elongated proportions for an aristocratic vampiric look.",
        notesTitleEs: "NOTAS DE PROCESO",
        notesTitleEn: "PROCESS NOTES",
        notesEs: "Líneas aristocráticas y pliegues rígidos que transmiten soberbia y peligro latente.",
        notesEn: "Aristocratic lines and rigid drapery conveying pride and latent danger.",
        hotspots: [
          { x: 50, y: 30, titleEs: "Anatomía Alargada", titleEn: "Elongated Anatomy", descriptionEs: "Estudio previo de proporciones alargadas para dar aspecto vampírico.", descriptionEn: "Preliminary study of elongated proportions for a vampiric look." }
        ],
        footerLeftEs: "Búsqueda de Siluetas · El Tribunal Carmesí",
        footerLeftEn: "Silhouette Exploration · The Crimson Court",
        footerRightEs: "LIBRO II · EXP. 04",
        footerRightEn: "BOOK II · EXP. 04"
      },
      page01: {
        pageNumber: "PÁG. 01",
        sectionHeaderEs: "DISEÑO DE LOS PERSONAJES",
        sectionHeaderEn: "CHARACTER DESIGN",
        subHeaderEs: "PERSONAJE PRINCIPAL · ARISTOCRACIA DE LA NOCHE",
        subHeaderEn: "MAIN CHARACTER · ARISTOCRACY OF THE NIGHT",
        titleEs: "El Tribunal Carmesí — Diseño de personaje",
        titleEn: "The Crimson Court — Character Design",
        imageUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2940&auto=format&fit=crop",
        imageAltEs: "Diseño de vestuario aristocrático del Tribunal Carmesí",
        imageAltEn: "Aristocratic costume design for the Crimson Court",
        notesTitleEs: "NOTAS DE DISEÑO: VESTUARIO",
        notesTitleEn: "DESIGN NOTES: COSTUME",
        notesEs: "La elegancia aristocrática debe esconder una violencia latente. Cada pliegue de la seda parece haber sido bañado en vino o algo más espeso.",
        notesEn: "Aristocratic elegance must conceal latent violence. Every fold of silk seems dipped in wine or something denser.",
        palette: [
          { nameEs: "Oro Envejecido", nameEn: "Aged Gold", hex: "#c59b27" },
          { nameEs: "Terciopelo Carmín", nameEn: "Crimson Velvet", hex: "#991b1b" },
          { nameEs: "Obsidiana", nameEn: "Obsidian", hex: "#121215" },
          { nameEs: "Encaje Veneciano", nameEn: "Venetian Lace", hex: "#f5f0eb" }
        ],
        hotspots: [
          { x: 40, y: 75, titleEs: "Detalle Textil", titleEn: "Textile Detail", descriptionEs: "Renderizado de terciopelo y encaje para reflejar su estatus social.", descriptionEn: "Rendering of velvet and lace to reflect their social status." }
        ],
        footerLeftEs: "Diseño de Personajes · El Tribunal Carmesí",
        footerLeftEn: "Character Design · The Crimson Court",
        footerRightEs: "EXP. LIBRO II",
        footerRightEn: "EXP. BOOK II"
      },
      page02: {
        pageNumber: "PÁG. 02",
        sectionHeaderEs: "DISEÑO DE LOS PERSONAJES",
        sectionHeaderEn: "CHARACTER DESIGN",
        subHeaderEs: "MASCARADA & ORFEBRERÍA BARROCA",
        subHeaderEn: "MASQUERADE & BAROQUE JEWELRY",
        titleEs: "«El Tribunal Carmesí» — Joyería y Ropajes",
        titleEn: "«The Crimson Court» — Jewelry & Drapery",
        imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2800&auto=format&fit=crop",
        imageAltEs: "Orfebrería y máscaras cortesanas barrocas",
        imageAltEn: "Courtly baroque jewelry and masks",
        quoteEs: "Esculpido digital en ZBrush para joyería y ropajes góticos con veladuras al óleo.",
        quoteEn: "ZBrush digital sculpt for gothic jewelry and drapery finished with oil glazes.",
        hotspots: [
          { x: 45, y: 35, titleEs: "Orfebrería en Oro", titleEn: "Gold Crafting", descriptionEs: "Filigrana barroca envejecida con engarces de granate.", descriptionEn: "Aged baroque filigree with garnet settings." }
        ],
        notesTitleEs: "APUNTES DE ORFEBRERÍA",
        notesTitleEn: "JEWELRY NOTES",
        notesEs: "Máscaras venecianas de porcelana craquelada decoradas con motivos de enredaderas marchitas.",
        notesEn: "Cracked porcelain Venetian masks adorned with withered ivy motifs.",
        footerLeftEs: "Diseño de Personajes · Accesorios",
        footerLeftEn: "Character Design · Accessories",
        footerRightEs: "PLATE 01",
        footerRightEn: "PLATE 01"
      },
      page03: {
        pageNumber: "PÁG. 03",
        sectionHeaderEs: "ILUSTRACIONES",
        sectionHeaderEn: "ILLUSTRATIONS",
        subHeaderEs: "LÁMINA I · EL SALÓN DE LOS ESPEJOS",
        subHeaderEn: "PLATE I · THE HALL OF MIRRORS",
        titleEs: "«El Tribunal Carmesí» — Lámina I",
        titleEn: "«The Crimson Court» — Plate I",
        imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop",
        imageAltEs: "El salón de los espejos en la velada nocturna",
        imageAltEn: "The hall of mirrors during the nocturnal soiree",
        quoteEs: "Aristocracia de la noche celebrando su eterna mascarada en el invernadero en ruinas.",
        quoteEn: "Aristocracy of the night holding their eternal masquerade in the ruined conservatory.",
        notesTitleEs: "COMPOSICIÓN DE ESCENA",
        notesTitleEn: "SCENE COMPOSITION",
        notesEs: "Luz de candelabros de cera negra reflejada tenuemente en mármoles pulidos.",
        notesEn: "Black wax candlelight dimly reflected across polished marble floors.",
        hotspots: [
          { x: 55, y: 45, titleEs: "Reflejo Ausente", titleEn: "Absent Reflection", descriptionEs: "Los espejos barrocos no devuelven la figura de los nobles presentes.", descriptionEn: "The baroque mirrors do not cast reflections of the noble guests." }
        ],
        footerLeftEs: "Ilustraciones · Lámina I",
        footerLeftEn: "Illustrations · Plate I",
        footerRightEs: "PLATE 01 · MMP",
        footerRightEn: "PLATE 01 · MMP"
      },
      page04: {
        pageNumber: "PÁG. 04",
        sectionHeaderEs: "ILUSTRACIONES",
        sectionHeaderEn: "ILLUSTRATIONS",
        subHeaderEs: "LÁMINA II · LA DANZA DE OBSIDIANA",
        subHeaderEn: "PLATE II · THE OBSIDIAN DANCE",
        titleEs: "«El Tribunal Carmesí» — Lámina II",
        titleEn: "«The Crimson Court» — Plate II",
        imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2800&auto=format&fit=crop",
        imageAltEs: "La danza nocturna en el estanque del palacio",
        imageAltEn: "Night dance at the palace reflecting pool",
        quoteEs: "El clímax de la velada donde la etiqueta cortesana se quiebra en un frenesí de terciopelo y sangre.",
        quoteEn: "The climax of the evening where court etiquette breaks in a frenzy of velvet and blood.",
        notesTitleEs: "NOTAS DE COLOR",
        notesTitleEn: "COLOR NOTES",
        notesEs: "El carmín puro se reserva únicamente para los puntos de mayor impacto visual.",
        notesEn: "Pure crimson is strictly reserved for the focal points of highest visual impact.",
        hotspots: [
          { x: 48, y: 52, titleEs: "Cáliz de Granate", titleEn: "Garnet Chalice", descriptionEs: "El brindis ceremonial que consagra la pertenencia perpetua a la corte.", descriptionEn: "The ceremonial toast sealing perpetual allegiance to the court." }
        ],
        footerLeftEs: "Ilustraciones · Lámina II",
        footerLeftEn: "Illustrations · Plate II",
        footerRightEs: "PLATE 02 · MMP",
        footerRightEn: "PLATE 02 · MMP"
      },
      page05: {
        pageNumber: "PÁG. 05",
        sectionHeaderEs: "LÁMINA FINAL HD",
        sectionHeaderEn: "FINAL HD PLATE",
        subHeaderEs: "RETRATO CORTE GÓTICA · FORMATO MAESTRO",
        subHeaderEn: "GOTHIC COURT PORTRAIT · MASTER FORMAT",
        titleEs: "«El Tribunal Carmesí» — Ilustración Principal",
        titleEn: "«The Crimson Court» — Master Artwork",
        imageUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2940&auto=format&fit=crop",
        imageAltEs: "Lámina maestra terminada de El Tribunal Carmesí",
        imageAltEn: "Finished master plate of The Crimson Court",
        notesTitleEs: "FICHA TÉCNICA DE LA OBRA",
        notesTitleEn: "ARTWORK TECHNICAL SHEET",
        notesEs: "Aristocracia de la noche, celebrando su eterna mascarada en el invernadero en ruinas. Creado en 2023 con Photoshop, ZBrush.",
        notesEn: "Aristocracy of the night, holding their eternal masquerade in the ruined conservatory. Created in 2023 with Photoshop, ZBrush.",
        footerLeftEs: "Obra Maestra Final",
        footerLeftEn: "Final Masterwork",
        footerRightEs: "PLATE 05 · MMP",
        footerRightEn: "PLATE 05 · MMP"
      },
      page06: {
        pageNumber: "PÁG. 06",
        sectionHeaderEs: "REVISIÓN DE TALLER",
        sectionHeaderEn: "WORKSHOP REVIEW",
        subHeaderEs: "BITÁCORA DE PRODUCCIÓN & REFERENCIAS",
        subHeaderEn: "PRODUCTION LOG & REFERENCES",
        titleEs: "Bitácora de Taller & Proceso",
        titleEn: "Workshop Log & Process",
        imageUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2940&auto=format&fit=crop",
        quoteEs: "Estudios anatómicos en papel gris teñido, esculpido digital en ZBrush para joyería y ropajes góticos, y veladuras de color al óleo digital.",
        quoteEn: "Anatomical studies on tinted grey paper, ZBrush digital sculpt for gothic jewelry and drapery, finished with digital oil glazing.",
        notesTitleEs: "APUNTES DE TALLER",
        notesTitleEn: "WORKSHOP NOTES",
        notesEs: "Desarrollo artístico completado con Photoshop, ZBrush. Rol: Ilustradora Principal.",
        notesEn: "Artistic development completed with Photoshop, ZBrush. Role: Lead Illustrator.",
        footerLeftEs: "Revisión de Taller",
        footerLeftEn: "Workshop Review",
        footerRightEs: "REGISTRO TÉCNICO",
        footerRightEn: "TECHNICAL LOG"
      },
      page07: {
        pageNumber: "PÁG. 07",
        sectionHeaderEs: "CERTIFICADO DE AUTENTICIDAD",
        sectionHeaderEn: "CERTIFICATE OF AUTHENTICITY",
        subHeaderEs: "REGISTRO EDITORIAL & ARCHIVO",
        subHeaderEn: "EDITORIAL ARCHIVE RECORD",
        titleEs: "Certificado de Obra y Registro",
        titleEn: "Certificate of Work & Record",
        imageUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2940&auto=format&fit=crop",
        notesTitleEs: "DECLARACIÓN DE AUTORÍA",
        notesTitleEn: "DECLARATION OF AUTHORSHIP",
        notesEs: "Certifico que todos los bocetos, estudios de siluetas, diseños e ilustraciones terminadas recogidas en este cuaderno forman parte del desarrollo visual original de la artista Marina Martín Prieto para el proyecto \"El Tribunal Carmesí\".",
        notesEn: "I certify that all sketches, silhouette studies, designs and finished illustrations in this sketchbook form part of the original visual development by artist Marina Martín Prieto for \"The Crimson Court\".",
        footerLeftEs: "Marina Martín Prieto",
        footerLeftEn: "Marina Martín Prieto",
        footerRightEs: "EXPEDIENTE AUTÉNTICO",
        footerRightEn: "GENUINE ARCHIVE"
      }
    }
  },
  {
    id: 3,
    titleEs: "Sanctum Cubierto",
    titleEn: "Overgrown Sanctorum",
    categoryEs: "Diseño de Entorno",
    categoryEn: "Environment",
    projectTypeEs: "Ilustración de Entorno",
    projectTypeEn: "Environment Illustration",
    roleEs: "Artista de Entornos",
    roleEn: "Environment Artist",
    tools: "Unreal Engine, Maya",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2940&auto=format&fit=crop",
    descriptionEs: "La naturaleza reclama los templos olvidados, convirtiendo arcos de piedra en esculturas de raíces retorcidas.",
    descriptionEn: "Nature reclaims the forgotten temples, turning stone arches into twisted root sculptures.",
    tags: ["Environment", "Ruins", "Nature", "Atmospheric"],
    sketchbookVol: "LIBRO III · EXP. 08",
    coverColor: "#17221b",
    spineColor: "#0d1611",
    accentColor: "#10b981",
    palette: [
      { nameEs: "Musgo Fóssil", nameEn: "Fossil Moss", hex: "#2b4c36" },
      { nameEs: "Piedra de Catedral", nameEn: "Cathedral Stone", hex: "#4b5563" },
      { nameEs: "Filtración Solar", nameEn: "Solar Leak", hex: "#fde047" },
      { nameEs: "Tierra Virgen", nameEn: "Virgin Earth", hex: "#29211a" }
    ],
    techniqueEs: "Composición basada en la arquitectura cisterciense francesa, con pasadas de luz godrays simuladas en motor 3D y sobrepintura al temple.",
    techniqueEn: "Composition grounded in French Cistercian architecture, with simulated godray lighting passes in 3D and tempera overpainting.",
    notesEs: "El silencio debe poder olerse. La piedra fría contrastada con el musgo mullido evoca siglos de quietud ininterrumpida.",
    notesEn: "The silence should be palpable. Cold stone against soft moss evokes centuries of uninterrupted stillness.",
    processImages: [
      { 
        url: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2940&auto=format&fit=crop", 
        labelEs: "Estudio Lumínico Final", 
        labelEn: "Final Light Study",
        hotspots: [
          { x: 35, y: 60, titleEs: "Ruinas Antiguas", titleEn: "Ancient Ruins", descriptionEs: "Detalle del musgo creciendo en la arquitectura de piedra.", descriptionEn: "Detail of moss growing on the stone architecture." },
          { x: 70, y: 45, titleEs: "Luz Filtrada", titleEn: "Filtered Light", descriptionEs: "Efecto de rayos de sol penetrando el denso dosel.", descriptionEn: "Effect of sunbeams penetrating the dense canopy." }
        ]
      }
    ],
    // =========================================================================
    // CONFIGURACIÓN PÁGINA A PÁGINA: SANCTUM CUBIERTO
    // Edita aquí directamente textos, imágenes, citas, notas y hotspots
    // =========================================================================
    sketchbookPages: {
      page00: {
        pageNumber: "PÁG. 00",
        sectionHeaderEs: "BÚSQUEDA DE SILUETAS",
        sectionHeaderEn: "SILHOUETTE EXPLORATION",
        subHeaderEs: "ESTRUCTURA ARQUITECTÓNICA & MASAS",
        subHeaderEn: "ARCHITECTURAL STRUCTURE & MASSING",
        titleEs: "«Sanctum Cubierto» — Siluetas Arquitectónicas",
        titleEn: "«Overgrown Sanctorum» — Architectural Silhouettes",
        imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop",
        imageAltEs: "Estudio de siluetas de arcos y contrafuertes góticos",
        imageAltEn: "Silhouette study of gothic arches and buttresses",
        quoteEs: "Composición basada en la arquitectura cisterciense francesa y arcos de piedra gótica.",
        quoteEn: "Composition grounded in French Cistercian architecture and gothic stone arches.",
        notesTitleEs: "NOTAS DE ARQUITECTURA",
        notesTitleEn: "ARCHITECTURE NOTES",
        notesEs: "Equilibrio entre la geometría vertical del templo y el crecimiento orgánico desordenado de las raíces.",
        notesEn: "Balance between vertical geometry of the temple and messy organic root growth.",
        hotspots: [
          { x: 45, y: 35, titleEs: "Arco Ojival", titleEn: "Pointed Arch", descriptionEs: "Estructura original gótica fracturada por el paso del tiempo.", descriptionEn: "Original gothic structure fractured by centuries of decay." }
        ],
        footerLeftEs: "Búsqueda de Siluetas · Sanctum Cubierto",
        footerLeftEn: "Silhouette Exploration · Overgrown Sanctorum",
        footerRightEs: "LIBRO III · EXP. 08",
        footerRightEn: "BOOK III · EXP. 08"
      },
      page01: {
        pageNumber: "PÁG. 01",
        sectionHeaderEs: "DISEÑO DE LOS ELEMENTOS",
        sectionHeaderEn: "ENVIRONMENT ASSET DESIGN",
        subHeaderEs: "EL ALTAR ENRAIZADO · ELEMENTO CENTRAL",
        subHeaderEn: "THE ROOTED ALTAR · CENTRAL ASSET",
        titleEs: "Sanctum Cubierto — El Altar Vegetal",
        titleEn: "Overgrown Sanctorum — The Vegetal Altar",
        imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2940&auto=format&fit=crop",
        imageAltEs: "Diseño del altar principal cubierto por vegetación",
        imageAltEn: "Main altar design overgrown by wild flora",
        notesTitleEs: "NOTAS DE ENTORNO: VEGETACIÓN",
        notesTitleEn: "ENVIRONMENT NOTES: VEGETATION",
        notesEs: "El silencio debe poder olerse. La piedra fría contrastada con el musgo mullido evoca siglos de quietud ininterrumpida.",
        notesEn: "The silence should be palpable. Cold stone against soft moss evokes centuries of uninterrupted stillness.",
        palette: [
          { nameEs: "Musgo Fóssil", nameEn: "Fossil Moss", hex: "#2b4c36" },
          { nameEs: "Piedra de Catedral", nameEn: "Cathedral Stone", hex: "#4b5563" },
          { nameEs: "Filtración Solar", nameEn: "Solar Leak", hex: "#fde047" },
          { nameEs: "Tierra Virgen", nameEn: "Virgin Earth", hex: "#29211a" }
        ],
        hotspots: [
          { x: 35, y: 60, titleEs: "Ruinas Antiguas", titleEn: "Ancient Ruins", descriptionEs: "Detalle del musgo creciendo en la arquitectura de piedra.", descriptionEn: "Detail of moss growing on the stone architecture." },
          { x: 70, y: 45, titleEs: "Luz Filtrada", titleEn: "Filtered Light", descriptionEs: "Efecto de rayos de sol penetrando el denso dosel.", descriptionEn: "Effect of sunbeams penetrating the dense canopy." }
        ],
        footerLeftEs: "Diseño de Entornos · Sanctum Cubierto",
        footerLeftEn: "Environment Design · Overgrown Sanctorum",
        footerRightEs: "EXP. LIBRO III",
        footerRightEn: "EXP. BOOK III"
      },
      page02: {
        pageNumber: "PÁG. 02",
        sectionHeaderEs: "DISEÑO DE ENTORNO",
        sectionHeaderEn: "ENVIRONMENT DESIGN",
        subHeaderEs: "BOTÁNICA DE CATEDRAL & RAÍCES PARÁSITAS",
        subHeaderEn: "CATHEDRAL BOTANY & PARASITIC ROOTS",
        titleEs: "«Sanctum Cubierto» — Flora Rupestre",
        titleEn: "«Overgrown Sanctorum» — Rock Flora",
        imageUrl: "https://images.unsplash.com/photo-1550100136-e092101726f4?q=80&w=2800&auto=format&fit=crop",
        imageAltEs: "Estudio de flora silvestre en los capiteles",
        imageAltEn: "Wild flora study on cathedral capitals",
        quoteEs: "La vegetación no destruye el santuario; se convierte en su nueva bóveda viva.",
        quoteEn: "Vegetation does not destroy the sanctuary; it becomes its new living vault.",
        hotspots: [
          { x: 50, y: 40, titleEs: "Micelio & Líquenes", titleEn: "Mycelium & Lichen", descriptionEs: "Variedad de especies adaptadas a la oscuridad húmeda del templo.", descriptionEn: "Variety of species adapted to the temple's damp darkness." }
        ],
        notesTitleEs: "ESTUDIO DE PROPAGACIÓN",
        notesTitleEn: "PROPAGATION STUDY",
        notesEs: "Texturizado de esporas y humedad condensada sobre los capiteles labrados.",
        notesEn: "Texturing of spores and condensed dampness on carved capitals.",
        footerLeftEs: "Diseño de Entorno · Botánica",
        footerLeftEn: "Environment Design · Botany",
        footerRightEs: "PLATE 01",
        footerRightEn: "PLATE 01"
      },
      page03: {
        pageNumber: "PÁG. 03",
        sectionHeaderEs: "ILUSTRACIONES",
        sectionHeaderEn: "ILLUSTRATIONS",
        subHeaderEs: "LÁMINA I · EL ATRIO SUMERGIDO EN SOMBRAS",
        subHeaderEn: "PLATE I · THE SHADOWED ATRIUM",
        titleEs: "«Sanctum Cubierto» — Lámina I",
        titleEn: "«Overgrown Sanctorum» — Plate I",
        imageUrl: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=2874&auto=format&fit=crop",
        imageAltEs: "Atrio de la catedral en penumbra",
        imageAltEn: "Cathedral atrium in dim shadow",
        quoteEs: "La naturaleza reclama los templos olvidados, convirtiendo arcos de piedra en esculturas de raíces retorcidas.",
        quoteEn: "Nature reclaims the forgotten temples, turning stone arches into twisted root sculptures.",
        notesTitleEs: "COMPOSICIÓN LUMÍNICA",
        notesTitleEn: "LIGHTING COMPOSITION",
        notesEs: "Pasadas de luz godrays simuladas en motor 3D y sobrepintura al temple.",
        notesEn: "Simulated godray lighting passes in 3D with tempera overpainting.",
        hotspots: [
          { x: 40, y: 50, titleEs: "Claroscuro Natural", titleEn: "Natural Chiaroscuro", descriptionEs: "Juego de volúmenes lumínicos entre el dosel vegetal y el suelo pétreo.", descriptionEn: "Interplay of light volumes between tree canopy and stone floor." }
        ],
        footerLeftEs: "Ilustraciones · Lámina I",
        footerLeftEn: "Illustrations · Plate I",
        footerRightEs: "PLATE 01 · MMP",
        footerRightEn: "PLATE 01 · MMP"
      },
      page04: {
        pageNumber: "PÁG. 04",
        sectionHeaderEs: "ILUSTRACIONES",
        sectionHeaderEn: "ILLUSTRATIONS",
        subHeaderEs: "LÁMINA II · LA NAVE CENTRAL ILUMINADA",
        subHeaderEn: "PLATE II · THE ILLUMINATED NAVE",
        titleEs: "«Sanctum Cubierto» — Lámina II",
        titleEn: "«Overgrown Sanctorum» — Plate II",
        imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2940&auto=format&fit=crop",
        imageAltEs: "Nave central bañada por luz solar",
        imageAltEn: "Central nave bathed in solar rays",
        quoteEs: "Rayos solares rasantes que penetran las grietas de la cúpula al atardecer.",
        quoteEn: "Raking sunlight piercing dome fissures at twilight.",
        notesTitleEs: "ATMÓSFERA VOLUMÉTRICA",
        notesTitleEn: "VOLUMETRIC ATMOSPHERE",
        notesEs: "Simulación de niebla baja y motas de polen en suspensión.",
        notesEn: "Simulation of ground mist and suspended airborne pollen specs.",
        hotspots: [
          { x: 60, y: 35, titleEs: "Rayos de Dios (Godrays)", titleEn: "Godrays", descriptionEs: "Dispersión atmosférica volumétrica a través del polvo en suspensión.", descriptionEn: "Volumetric atmospheric scattering through suspended dust." }
        ],
        footerLeftEs: "Ilustraciones · Lámina II",
        footerLeftEn: "Illustrations · Plate II",
        footerRightEs: "PLATE 02 · MMP",
        footerRightEn: "PLATE 02 · MMP"
      },
      page05: {
        pageNumber: "PÁG. 05",
        sectionHeaderEs: "LÁMINA FINAL HD",
        sectionHeaderEn: "FINAL HD PLATE",
        subHeaderEs: "PANORÁMICA DE ENTORNO · GRAN FORMATO",
        subHeaderEn: "ENVIRONMENT PANORAMA · LARGE FORMAT",
        titleEs: "«Sanctum Cubierto» — Ilustración Principal",
        titleEn: "«Overgrown Sanctorum» — Master Artwork",
        imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2940&auto=format&fit=crop",
        imageAltEs: "Lámina final terminada de Sanctum Cubierto",
        imageAltEn: "Finished master plate of Overgrown Sanctorum",
        notesTitleEs: "FICHA TÉCNICA DE LA OBRA",
        notesTitleEn: "ARTWORK TECHNICAL SHEET",
        notesEs: "La naturaleza reclama los templos olvidados, convirtiendo arcos de piedra en esculturas de raíces retorcidas. Creado en 2023 con Unreal Engine, Maya.",
        notesEn: "Nature reclaims the forgotten temples, turning stone arches into twisted root sculptures. Created in 2023 with Unreal Engine, Maya.",
        footerLeftEs: "Obra Maestra Final",
        footerLeftEn: "Final Masterwork",
        footerRightEs: "PLATE 05 · MMP",
        footerRightEn: "PLATE 05 · MMP"
      },
      page06: {
        pageNumber: "PÁG. 06",
        sectionHeaderEs: "REVISIÓN DE TALLER",
        sectionHeaderEn: "WORKSHOP REVIEW",
        subHeaderEs: "BITÁCORA DE PRODUCCIÓN & REFERENCIAS",
        subHeaderEn: "PRODUCTION LOG & REFERENCES",
        titleEs: "Bitácora de Taller & Proceso",
        titleEn: "Workshop Log & Process",
        imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2940&auto=format&fit=crop",
        quoteEs: "Composición basada en la arquitectura cisterciense francesa, con pasadas de luz godrays simuladas en motor 3D y sobrepintura al temple.",
        quoteEn: "Composition grounded in French Cistercian architecture, with simulated godray lighting passes in 3D and tempera overpainting.",
        notesTitleEs: "APUNTES DE TALLER",
        notesTitleEn: "WORKSHOP NOTES",
        notesEs: "Desarrollo artístico completado con Unreal Engine, Maya. Rol: Artista de Entornos.",
        notesEn: "Artistic development completed with Unreal Engine, Maya. Role: Environment Artist.",
        footerLeftEs: "Revisión de Taller",
        footerLeftEn: "Workshop Review",
        footerRightEs: "REGISTRO TÉCNICO",
        footerRightEn: "TECHNICAL LOG"
      },
      page07: {
        pageNumber: "PÁG. 07",
        sectionHeaderEs: "CERTIFICADO DE AUTENTICIDAD",
        sectionHeaderEn: "CERTIFICATE OF AUTHENTICITY",
        subHeaderEs: "REGISTRO EDITORIAL & ARCHIVO",
        subHeaderEn: "EDITORIAL ARCHIVE RECORD",
        titleEs: "Certificado de Obra y Registro",
        titleEn: "Certificate of Work & Record",
        imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2940&auto=format&fit=crop",
        notesTitleEs: "DECLARACIÓN DE AUTORÍA",
        notesTitleEn: "DECLARATION OF AUTHORSHIP",
        notesEs: "Certifico que todos los bocetos, estudios de siluetas, diseños e ilustraciones terminadas recogidas en este cuaderno forman parte del desarrollo visual original de la artista Marina Martín Prieto para el proyecto \"Sanctum Cubierto\".",
        notesEn: "I certify that all sketches, silhouette studies, designs and finished illustrations in this sketchbook form part of the original visual development by artist Marina Martín Prieto for \"Overgrown Sanctorum\".",
        footerLeftEs: "Marina Martín Prieto",
        footerLeftEn: "Marina Martín Prieto",
        footerRightEs: "EXPEDIENTE AUTÉNTICO",
        footerRightEn: "GENUINE ARCHIVE"
      }
    }
  },
  {
    id: 4,
    titleEs: "Flora Nocturna",
    titleEn: "Nocturnal Flora",
    categoryEs: "Diseño de Atrezo",
    categoryEn: "Prop Design",
    projectTypeEs: "Diseño de Atrezo Botánico",
    projectTypeEn: "Botanical Prop Design",
    roleEs: "Diseñadora de Atrezo",
    roleEn: "Prop Designer",
    tools: "Procreate, Photoshop",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1550100136-e092101726f4?q=80&w=2800&auto=format&fit=crop",
    descriptionEs: "Plantas jarra carnívoras que emiten un tenue y fascinante resplandor para atraer a sus presas.",
    descriptionEn: "Carnivorous pitcher plants that emit a faint, mesmerizing glow to attract their prey.",
    tags: ["Props", "Botany", "Bioluminescence", "Creature"],
    sketchbookVol: "LIBRO IV · EXP. 12",
    coverColor: "#172026",
    spineColor: "#0f151a",
    accentColor: "#06b6d4",
    palette: [
      { nameEs: "Luz de Espora", nameEn: "Spore Light", hex: "#06b6d4" },
      { nameEs: "Cutícula Venenosa", nameEn: "Venomous Cuticle", hex: "#7c3aed" },
      { nameEs: "Cáliz Nocturno", nameEn: "Night Calyx", hex: "#0f172a" },
      { nameEs: "Pergamino Botánico", nameEn: "Botanical Parchment", hex: "#e2e8f0" }
    ],
    techniqueEs: "Estilo tratado como cuaderno de expedición botánica del siglo XIX, con caligrafía técnica y secciones transversales coloreadas.",
    techniqueEn: "Treated as a 19th-century botanical field expedition notebook, with technical calligraphy and colored cross-sections.",
    notesEs: "Diseñé los bordes de la flor como membranas translúcidas para dar la sensación de que palpitan al compás de la respiración del bosque.",
    notesEn: "I designed the flower edges as translucent membranes to feel like they pulsate with the breathing rhythm of the forest.",
    processImages: [
      { 
        url: "https://images.unsplash.com/photo-1550100136-e092101726f4?q=80&w=2800&auto=format&fit=crop", 
        labelEs: "Placa Botánica Final", 
        labelEn: "Final Botanical Plate",
        hotspots: [
          { x: 50, y: 50, titleEs: "Bioluminiscencia", titleEn: "Bioluminescence", descriptionEs: "Simulación de dispersión de luz subsuperficial.", descriptionEn: "Simulation of subsurface light scattering." }
        ]
      }
    ],
    // =========================================================================
    // CONFIGURACIÓN PÁGINA A PÁGINA: FLORA NOCTURNA
    // Edita aquí directamente textos, imágenes, citas, notas y hotspots
    // =========================================================================
    sketchbookPages: {
      page00: {
        pageNumber: "PÁG. 00",
        sectionHeaderEs: "BÚSQUEDA DE SILUETAS",
        sectionHeaderEn: "SILHOUETTE EXPLORATION",
        subHeaderEs: "MORFOLOGÍA BOTÁNICA & SILUETA",
        subHeaderEn: "BOTANICAL MORPHOLOGY & SILHOUETTE",
        titleEs: "«Flora Nocturna» — Siluetas Botánicas",
        titleEn: "«Nocturnal Flora» — Botanical Silhouettes",
        imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop",
        imageAltEs: "Siluetas y proporciones de cálices carnívoros",
        imageAltEn: "Silhouettes and proportions of carnivorous calyxes",
        quoteEs: "Diseñé los bordes de la flor como membranas translúcidas para dar la sensación de que palpitan al compás del bosque.",
        quoteEn: "I designed the flower edges as translucent membranes to feel like they pulsate with the forest rhythm.",
        notesTitleEs: "MORFOLOGÍA VEGETAL",
        notesTitleEn: "PLANT MORPHOLOGY",
        notesEs: "Estudio de siluetas de plantas jarra carnívoras con cálices cerrados y espinas carnosas protectoras.",
        notesEn: "Silhouette study of carnivorous pitcher plants with closed calyxes and protective fleshy thorns.",
        hotspots: [
          { x: 48, y: 40, titleEs: "Cáliz de Jarra", titleEn: "Pitcher Calyx", descriptionEs: "Silueta curvada diseñada para retener rocío y néctar atrayente.", descriptionEn: "Curved silhouette designed to hold dew and alluring nectar." }
        ],
        footerLeftEs: "Búsqueda de Siluetas · Flora Nocturna",
        footerLeftEn: "Silhouette Exploration · Nocturnal Flora",
        footerRightEs: "LIBRO IV · EXP. 12",
        footerRightEn: "BOOK IV · EXP. 12"
      },
      page01: {
        pageNumber: "PÁG. 01",
        sectionHeaderEs: "DISEÑO DE LOS ELEMENTOS",
        sectionHeaderEn: "PROP ASSET DESIGN",
        subHeaderEs: "ESPECIE: NEPENTHES NOCTURNA · BIOLUMINISCENCIA",
        subHeaderEn: "SPECIES: NEPENTHES NOCTURNA · BIOLUMINESCENCE",
        titleEs: "Flora Nocturna — Diseño de Atrezo",
        titleEn: "Nocturnal Flora — Prop Design",
        imageUrl: "https://images.unsplash.com/photo-1550100136-e092101726f4?q=80&w=2800&auto=format&fit=crop",
        imageAltEs: "Diseño botánico de la planta jarra bioluminiscente",
        imageAltEn: "Botanical design of the bioluminescent pitcher plant",
        notesTitleEs: "NOTAS DE ATREZO: BOTÁNICA",
        notesTitleEn: "PROP NOTES: BOTANY",
        notesEs: "Plantas jarra carnívoras que emiten un tenue y fascinante resplandor para atraer a sus presas en la noche profunda.",
        notesEn: "Carnivorous pitcher plants that emit a faint, mesmerizing glow to attract their prey in the deep night.",
        palette: [
          { nameEs: "Luz de Espora", nameEn: "Spore Light", hex: "#06b6d4" },
          { nameEs: "Cutícula Venenosa", nameEn: "Venomous Cuticle", hex: "#7c3aed" },
          { nameEs: "Cáliz Nocturno", nameEn: "Night Calyx", hex: "#0f172a" },
          { nameEs: "Pergamino Botánico", nameEn: "Botanical Parchment", hex: "#e2e8f0" }
        ],
        hotspots: [
          { x: 50, y: 50, titleEs: "Bioluminiscencia", titleEn: "Bioluminescence", descriptionEs: "Simulación de dispersión de luz subsuperficial en cutícula celular.", descriptionEn: "Subsurface light scattering simulation across cell cuticle." }
        ],
        footerLeftEs: "Diseño de Atrezo · Flora Nocturna",
        footerLeftEn: "Prop Design · Nocturnal Flora",
        footerRightEs: "EXP. LIBRO IV",
        footerRightEn: "EXP. BOOK IV"
      },
      page02: {
        pageNumber: "PÁG. 02",
        sectionHeaderEs: "DISEÑO DE ATREZO",
        sectionHeaderEn: "PROP DESIGN",
        subHeaderEs: "ANATOMÍA SECCIONAL & VENENOS",
        subHeaderEn: "SECTIONAL ANATOMY & VENOMS",
        titleEs: "«Flora Nocturna» — Sección Transversal",
        titleEn: "«Nocturnal Flora» — Cross Section",
        imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2940&auto=format&fit=crop",
        imageAltEs: "Sección anatómica de la jarra carnívora",
        imageAltEn: "Anatomical cross section of the carnivorous pitcher",
        quoteEs: "Tratado como cuaderno de expedición botánica del siglo XIX, con caligrafía técnica y secciones transversales coloreadas.",
        quoteEn: "Treated as a 19th-century botanical field expedition notebook, with technical calligraphy and colored cross-sections.",
        hotspots: [
          { x: 52, y: 48, titleEs: "Glándula de Enzimas", titleEn: "Enzyme Gland", descriptionEs: "Depósito interno de jugo digestivo con fluorescencia azul.", descriptionEn: "Internal digestive fluid reservoir with blue fluorescence." }
        ],
        notesTitleEs: "REGISTRO DISOLVENTE",
        notesTitleEn: "SOLVENT LOG",
        notesEs: "Diseño de fluidos viscosos y membranas interiores con vellosidades digestivas.",
        notesEn: "Design of viscous fluids and internal membranes with digestive microvilli.",
        footerLeftEs: "Diseño de Atrezo · Anatomía",
        footerLeftEn: "Prop Design · Anatomy",
        footerRightEs: "PLATE 01",
        footerRightEn: "PLATE 01"
      },
      page03: {
        pageNumber: "PÁG. 03",
        sectionHeaderEs: "ILUSTRACIONES",
        sectionHeaderEn: "ILLUSTRATIONS",
        subHeaderEs: "LÁMINA I · EL ENJAMBRE NOCTURNO",
        subHeaderEn: "PLATE I · THE NIGHT SWARM",
        titleEs: "«Flora Nocturna» — Lámina I",
        titleEn: "«Nocturnal Flora» — Plate I",
        imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2800&auto=format&fit=crop",
        imageAltEs: "Polillas atraídas por la flor resplandeciente",
        imageAltEn: "Moths attracted by the glowing flower",
        quoteEs: "Polillas de terciopelo atraídas hacia el resplandor de esporas cian en el sotobosque.",
        quoteEn: "Velvet moths drawn toward the cyan spore glow within the understory.",
        notesTitleEs: "COMPOSICIÓN DE CONTRASTE",
        notesTitleEn: "CONTRAST COMPOSITION",
        notesEs: "Luces bioluminiscentes cian contrastando con la oscuridad vegetal del fondo.",
        notesEn: "Bioluminescent cyan lights contrasting with deep botanical dark backdrop.",
        hotspots: [
          { x: 45, y: 40, titleEs: "Atracción Fatal", titleEn: "Fatal Attraction", descriptionEs: "Efecto óptico de halo en torno a la corona floral.", descriptionEn: "Optical glow halo effect around the floral rim." }
        ],
        footerLeftEs: "Ilustraciones · Lámina I",
        footerLeftEn: "Illustrations · Plate I",
        footerRightEs: "PLATE 01 · MMP",
        footerRightEn: "PLATE 01 · MMP"
      },
      page04: {
        pageNumber: "PÁG. 04",
        sectionHeaderEs: "ILUSTRACIONES",
        sectionHeaderEn: "ILLUSTRATIONS",
        subHeaderEs: "LÁMINA II · LA DISPERSIÓN DE ESPORAS",
        subHeaderEn: "PLATE II · SPORE DISPERSION",
        titleEs: "«Flora Nocturna» — Lámina II",
        titleEn: "«Nocturnal Flora» — Plate II",
        imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2800&auto=format&fit=crop",
        imageAltEs: "Nube de esporas nocturnas en suspensión",
        imageAltEn: "Suspended nocturnal spore cloud",
        quoteEs: "El clímax biológico: liberación de esporas venenosas cuando el cáliz se colmata.",
        quoteEn: "The biological climax: venomous spore release once the calyx fills.",
        notesTitleEs: "DISPERSIÓN DE LUZ",
        notesTitleEn: "LIGHT DISPERSION",
        notesEs: "Gotas suspendidas con índice de refracción elevado.",
        notesEn: "Suspended droplets with elevated refractive index.",
        hotspots: [
          { x: 50, y: 55, titleEs: "Dispersión Cian", titleEn: "Cyan Dispersion", descriptionEs: "Nube de esporas luminiscentes flotando en corrientes de aire frío.", descriptionEn: "Luminescent spore cloud drifting on cold air currents." }
        ],
        footerLeftEs: "Ilustraciones · Lámina II",
        footerLeftEn: "Illustrations · Plate II",
        footerRightEs: "PLATE 02 · MMP",
        footerRightEn: "PLATE 02 · MMP"
      },
      page05: {
        pageNumber: "PÁG. 05",
        sectionHeaderEs: "LÁMINA FINAL HD",
        sectionHeaderEn: "FINAL HD PLATE",
        subHeaderEs: "PLACA BOTÁNICA DE EXPEDICIÓN · ALTA RESOLUCIÓN",
        subHeaderEn: "EXPEDITION BOTANICAL PLATE · HIGH RESOLUTION",
        titleEs: "«Flora Nocturna» — Placa Botánica Final",
        titleEn: "«Nocturnal Flora» — Final Botanical Plate",
        imageUrl: "https://images.unsplash.com/photo-1550100136-e092101726f4?q=80&w=2800&auto=format&fit=crop",
        imageAltEs: "Placa botánica terminada de Flora Nocturna",
        imageAltEn: "Finished botanical plate of Nocturnal Flora",
        notesTitleEs: "FICHA TÉCNICA DE LA OBRA",
        notesTitleEn: "ARTWORK TECHNICAL SHEET",
        notesEs: "Plantas jarra carnívoras que emiten un tenue y fascinante resplandor para atraer a sus presas. Creado en 2024 con Procreate, Photoshop.",
        notesEn: "Carnivorous pitcher plants that emit a faint, mesmerizing glow to attract their prey. Created in 2024 with Procreate, Photoshop.",
        footerLeftEs: "Obra Maestra Final",
        footerLeftEn: "Final Masterwork",
        footerRightEs: "PLATE 05 · MMP",
        footerRightEn: "PLATE 05 · MMP"
      },
      page06: {
        pageNumber: "PÁG. 06",
        sectionHeaderEs: "REVISIÓN DE TALLER",
        sectionHeaderEn: "WORKSHOP REVIEW",
        subHeaderEs: "BITÁCORA DE PRODUCCIÓN & REFERENCIAS",
        subHeaderEn: "PRODUCTION LOG & REFERENCES",
        titleEs: "Bitácora de Taller & Proceso",
        titleEn: "Workshop Log & Process",
        imageUrl: "https://images.unsplash.com/photo-1550100136-e092101726f4?q=80&w=2800&auto=format&fit=crop",
        quoteEs: "Estilo tratado como cuaderno de expedición botánica del siglo XIX, con caligrafía técnica y secciones transversales coloreadas.",
        quoteEn: "Treated as a 19th-century botanical field expedition notebook, with technical calligraphy and colored cross-sections.",
        notesTitleEs: "APUNTES DE TALLER",
        notesTitleEn: "WORKSHOP NOTES",
        notesEs: "Desarrollo artístico completado con Procreate, Photoshop. Rol: Diseñadora de Atrezo.",
        notesEn: "Artistic development completed with Procreate, Photoshop. Role: Prop Designer.",
        footerLeftEs: "Revisión de Taller",
        footerLeftEn: "Workshop Review",
        footerRightEs: "REGISTRO TÉCNICO",
        footerRightEn: "TECHNICAL LOG"
      },
      page07: {
        pageNumber: "PÁG. 07",
        sectionHeaderEs: "CERTIFICADO DE AUTENTICIDAD",
        sectionHeaderEn: "CERTIFICATE OF AUTHENTICITY",
        subHeaderEs: "REGISTRO EDITORIAL & ARCHIVO",
        subHeaderEn: "EDITORIAL ARCHIVE RECORD",
        titleEs: "Certificado de Obra y Registro",
        titleEn: "Certificate of Work & Record",
        imageUrl: "https://images.unsplash.com/photo-1550100136-e092101726f4?q=80&w=2800&auto=format&fit=crop",
        notesTitleEs: "DECLARACIÓN DE AUTORÍA",
        notesTitleEn: "DECLARATION OF AUTHORSHIP",
        notesEs: "Certifico que todos los bocetos, estudios de siluetas, diseños e ilustraciones terminadas recogidas en este cuaderno forman parte del desarrollo visual original de la artista Marina Martín Prieto para el proyecto \"Flora Nocturna\".",
        notesEn: "I certify that all sketches, silhouette studies, designs and finished illustrations in this sketchbook form part of the original visual development by artist Marina Martín Prieto for \"Nocturnal Flora\".",
        footerLeftEs: "Marina Martín Prieto",
        footerLeftEn: "Marina Martín Prieto",
        footerRightEs: "EXPEDIENTE AUTÉNTICO",
        footerRightEn: "GENUINE ARCHIVE"
      }
    }
  },
  {
    id: 5,
    titleEs: "Río Estigia",
    titleEn: "River of Styx",
    categoryEs: "Ilustración Principal",
    categoryEn: "Keyframe Art",
    projectTypeEs: "Arte Conceptual y Keyframe",
    projectTypeEn: "Concept Art & Keyframe",
    roleEs: "Directora de Arte",
    roleEn: "Art Director",
    tools: "Photoshop",
    year: "2022",
    imageUrl: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=2874&auto=format&fit=crop",
    descriptionEs: "El punto de cruce entre el exuberante mundo de los vivos y el árido más allá.",
    descriptionEn: "The crossing point between the lush living world and the barren afterlife.",
    tags: ["Keyframe", "Mythology", "Cinema", "Lighting"],
    sketchbookVol: "LIBRO V · EXP. 15",
    coverColor: "#221d17",
    spineColor: "#15110d",
    accentColor: "#f59e0b",
    palette: [
      { nameEs: "Aguas Negras", nameEn: "Dark Waters", hex: "#1e293b" },
      { nameEs: "Niebla de Almas", nameEn: "Soul Mist", hex: "#64748b" },
      { nameEs: "Llama del barquero", nameEn: "Ferryman's Flame", hex: "#f59e0b" },
      { nameEs: "Pizarra Fría", nameEn: "Cold Slate", hex: "#334155" }
    ],
    techniqueEs: "Composición cinematográfica panorámica 2.39:1, enfatizando la gradación de temperatura de color desde el cálido al sepulcral.",
    techniqueEn: "Cinematic 2.39:1 widescreen keyframe, emphasizing color temperature gradation from warm gold to sepulchral cold.",
    notesEs: "El río actúa como el umbral definitivo. El horizonte nunca toca el fondo; se disuelve en una niebla que no ofrece retorno.",
    notesEn: "The river acts as the definitive threshold. The horizon never meets the floor; it dissolves into mist that offers no return.",
    processImages: [
      { 
        url: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=2874&auto=format&fit=crop", 
        labelEs: "Keyframe Definitivo", 
        labelEn: "Final Keyframe",
        hotspots: [
          { x: 65, y: 35, titleEs: "Contraste Térmico", titleEn: "Thermal Contrast", descriptionEs: "Uso de tonos fríos vs cálidos para marcar el límite entre la vida y la muerte.", descriptionEn: "Use of cool vs warm tones to mark the boundary between life and death." }
        ]
      }
    ],
    // =========================================================================
    // CONFIGURACIÓN PÁGINA A PÁGINA: RÍO ESTIGIA
    // Edita aquí directamente textos, imágenes, citas, notas y hotspots
    // =========================================================================
    sketchbookPages: {
      page00: {
        pageNumber: "PÁG. 00",
        sectionHeaderEs: "BÚSQUEDA DE SILUETAS",
        sectionHeaderEn: "SILHOUETTE EXPLORATION",
        subHeaderEs: "LÍNEA DE HORIZONTE & PROFUNDIDAD",
        subHeaderEn: "HORIZON LINE & DEPTH",
        titleEs: "«Río Estigia» — Siluetas de Orilla",
        titleEn: "«River of Styx» — Shoreline Silhouettes",
        imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop",
        imageAltEs: "Estudio de siluetas y niebla del río Estigia",
        imageAltEn: "Silhouette study and mist of river Styx",
        quoteEs: "El río actúa como el umbral definitivo. El horizonte se disuelve en una niebla que no ofrece retorno.",
        quoteEn: "The river acts as the definitive threshold. The horizon dissolves into mist that offers no return.",
        notesTitleEs: "COMPOSICIÓN CINEMATOGRÁFICA",
        notesTitleEn: "CINEMATIC COMPOSITION",
        notesEs: "Estudio de siluetas de barca, pértiga y almas esperando en la niebla espectral.",
        notesEn: "Silhouette study of boat, pole and souls waiting in spectral mist.",
        hotspots: [
          { x: 55, y: 40, titleEs: "Silueta del Barquero", titleEn: "Ferryman Silhouette", descriptionEs: "Línea solitaria guiando la proa a través de la densa niebla.", descriptionEn: "Solitary line guiding the bow through the thick mist." }
        ],
        footerLeftEs: "Búsqueda de Siluetas · Río Estigia",
        footerLeftEn: "Silhouette Exploration · River of Styx",
        footerRightEs: "LIBRO V · EXP. 15",
        footerRightEn: "BOOK V · EXP. 15"
      },
      page01: {
        pageNumber: "PÁG. 01",
        sectionHeaderEs: "DISEÑO DE LOS ELEMENTOS",
        sectionHeaderEn: "KEYFRAME ASSET DESIGN",
        subHeaderEs: "LA LLAMA DE CARONTE · CONTRASTE TÉRMICO",
        subHeaderEn: "CHARON'S FLAME · THERMAL CONTRAST",
        titleEs: "Río Estigia — Diseño de Elementos",
        titleEn: "River of Styx — Element Design",
        imageUrl: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=2874&auto=format&fit=crop",
        imageAltEs: "Diseño del farol y la barca de Caronte",
        imageAltEn: "Design of Charon's lantern and skiff",
        notesTitleEs: "NOTAS DE COLOR: AGUAS NEGRAS",
        notesTitleEn: "COLOR NOTES: DARK WATERS",
        notesEs: "Composición cinematográfica panorámica 2.39:1, enfatizando la gradación de temperatura de color desde el cálido al sepulcral.",
        notesEn: "Cinematic 2.39:1 widescreen keyframe, emphasizing color temperature gradation from warm gold to sepulchral cold.",
        palette: [
          { nameEs: "Aguas Negras", nameEn: "Dark Waters", hex: "#1e293b" },
          { nameEs: "Niebla de Almas", nameEn: "Soul Mist", hex: "#64748b" },
          { nameEs: "Llama del barquero", nameEn: "Ferryman's Flame", hex: "#f59e0b" },
          { nameEs: "Pizarra Fría", nameEn: "Cold Slate", hex: "#334155" }
        ],
        hotspots: [
          { x: 65, y: 35, titleEs: "Contraste Térmico", titleEn: "Thermal Contrast", descriptionEs: "Uso de tonos fríos vs cálidos para marcar el límite entre la vida y la muerte.", descriptionEn: "Use of cool vs warm tones to mark the boundary between life and death." }
        ],
        footerLeftEs: "Diseño de Elementos · Río Estigia",
        footerLeftEn: "Element Design · River of Styx",
        footerRightEs: "EXP. LIBRO V",
        footerRightEn: "EXP. BOOK V"
      },
      page02: {
        pageNumber: "PÁG. 02",
        sectionHeaderEs: "DISEÑO DE ESCENA",
        sectionHeaderEn: "SCENE DESIGN",
        subHeaderEs: "NIEBLA DE ÁNIMAS & AGUAS SEPULCRALES",
        subHeaderEn: "SOUL MIST & SEPULCHRAL WATERS",
        titleEs: "«Río Estigia» — Niebla de Almas",
        titleEn: "«River of Styx» — Mist of Souls",
        imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2940&auto=format&fit=crop",
        imageAltEs: "Orillas pedregosas envueltas en niebla espectral",
        imageAltEn: "Stony riverbanks wrapped in spectral fog",
        quoteEs: "El horizonte nunca toca el fondo; se disuelve en una niebla que no ofrece retorno.",
        quoteEn: "The horizon never touches the floor; it dissolves into a mist that offers no return.",
        hotspots: [
          { x: 45, y: 45, titleEs: "Bancos de Niebla", titleEn: "Mist Banks", descriptionEs: "Gradientes fríos azulados de pizarra y humo de ánimas.", descriptionEn: "Cool blue slate gradients and soul smoke." }
        ],
        notesTitleEs: "DESARROLLO DE PROFUNDIDAD",
        notesTitleEn: "DEPTH DEVELOPMENT",
        notesEs: "Capas sucesivas de neblina para crear escala monumental en pantalla ancha.",
        notesEn: "Successive mist layers to build monumental scale in widescreen format.",
        footerLeftEs: "Diseño de Escena · Atmósfera",
        footerLeftEn: "Scene Design · Atmosphere",
        footerRightEs: "PLATE 01",
        footerRightEn: "PLATE 01"
      },
      page03: {
        pageNumber: "PÁG. 03",
        sectionHeaderEs: "ILUSTRACIONES",
        sectionHeaderEn: "ILLUSTRATIONS",
        subHeaderEs: "LÁMINA I · EL UMBRAL DE LA PARTIDA",
        subHeaderEn: "PLATE I · THE THRESHOLD OF DEPARTURE",
        titleEs: "«Río Estigia» — Lámina I",
        titleEn: "«River of Styx» — Plate I",
        imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2800&auto=format&fit=crop",
        imageAltEs: "El punto de cruce del río Estigia",
        imageAltEn: "The crossing point of river Styx",
        quoteEs: "El punto de cruce entre el exuberante mundo de los vivos y el árido más allá.",
        quoteEn: "The crossing point between the lush living world and the barren afterlife.",
        notesTitleEs: "COMPOSICIÓN DE CONTRASTE",
        notesTitleEn: "CONTRAST COMPOSITION",
        notesEs: "La orilla viva conserva verdes apagados; la opuesta es roca mineral inerte.",
        notesEn: "The living shore holds muted greens; the opposite is inert mineral rock.",
        hotspots: [
          { x: 40, y: 40, titleEs: "La Riberas Gemelas", titleEn: "The Twin Shores", descriptionEs: "Vegetación moribunda en contraste con piedra inerte.", descriptionEn: "Dying vegetation in contrast to inert stone." }
        ],
        footerLeftEs: "Ilustraciones · Lámina I",
        footerLeftEn: "Illustrations · Plate I",
        footerRightEs: "PLATE 01 · MMP",
        footerRightEn: "PLATE 01 · MMP"
      },
      page04: {
        pageNumber: "PÁG. 04",
        sectionHeaderEs: "ILUSTRACIONES",
        sectionHeaderEn: "ILLUSTRATIONS",
        subHeaderEs: "LÁMINA II · LA TRAVESÍA SILENCIOSA",
        subHeaderEn: "PLATE II · THE SILENT CROSSING",
        titleEs: "«Río Estigia» — Lámina II",
        titleEn: "«River of Styx» — Plate II",
        imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2800&auto=format&fit=crop",
        imageAltEs: "La barca cruzando aguas inmóviles",
        imageAltEn: "The boat crossing still waters",
        quoteEs: "La barca atraviesa el vórtice central sin levantar una sola onda en la superficie.",
        quoteEn: "The boat glides through the central eddy without stirring a single surface ripple.",
        notesTitleEs: "TRATAMIENTO DE AGUA",
        notesTitleEn: "WATER TREATMENT",
        notesEs: "Reflexiones espejadas oscuras con ausencia deliberada de oleaje dinámico.",
        notesEn: "Dark mirrored reflections with deliberate omission of dynamic ripples.",
        hotspots: [
          { x: 55, y: 50, titleEs: "Superficie de Espejo", titleEn: "Mirror Surface", descriptionEs: "Agua oscura de densidad anómala sin oleaje ni corrientes.", descriptionEn: "Dark water of anomalous density with neither swell nor currents." }
        ],
        footerLeftEs: "Ilustraciones · Lámina II",
        footerLeftEn: "Illustrations · Plate II",
        footerRightEs: "PLATE 02 · MMP",
        footerRightEn: "PLATE 02 · MMP"
      },
      page05: {
        pageNumber: "PÁG. 05",
        sectionHeaderEs: "LÁMINA FINAL HD",
        sectionHeaderEn: "FINAL HD PLATE",
        subHeaderEs: "KEYFRAME PANORÁMICO 2.39:1 · FORMATO MASTER",
        subHeaderEn: "PANORAMIC 2.39:1 KEYFRAME · MASTER FORMAT",
        titleEs: "«Río Estigia» — Keyframe Definitivo",
        titleEn: "«River of Styx» — Master Keyframe",
        imageUrl: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=2874&auto=format&fit=crop",
        imageAltEs: "Keyframe maestro terminado de Río Estigia",
        imageAltEn: "Finished master keyframe of River of Styx",
        notesTitleEs: "FICHA TÉCNICA DE LA OBRA",
        notesTitleEn: "ARTWORK TECHNICAL SHEET",
        notesEs: "El punto de cruce entre el exuberante mundo de los vivos y el árido más allá. Creado en 2022 con Photoshop.",
        notesEn: "The crossing point between the lush living world and the barren afterlife. Created in 2022 with Photoshop.",
        footerLeftEs: "Obra Maestra Final",
        footerLeftEn: "Final Masterwork",
        footerRightEs: "PLATE 05 · MMP",
        footerRightEn: "PLATE 05 · MMP"
      },
      page06: {
        pageNumber: "PÁG. 06",
        sectionHeaderEs: "REVISIÓN DE TALLER",
        sectionHeaderEn: "WORKSHOP REVIEW",
        subHeaderEs: "BITÁCORA DE PRODUCCIÓN & REFERENCIAS",
        subHeaderEn: "PRODUCTION LOG & REFERENCES",
        titleEs: "Bitácora de Taller & Proceso",
        titleEn: "Workshop Log & Process",
        imageUrl: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=2874&auto=format&fit=crop",
        quoteEs: "Composición cinematográfica panorámica 2.39:1, enfatizando la gradación de temperatura de color desde el cálido al sepulcral.",
        quoteEn: "Cinematic 2.39:1 widescreen keyframe, emphasizing color temperature gradation from warm gold to sepulchral cold.",
        notesTitleEs: "APUNTES DE TALLER",
        notesTitleEn: "WORKSHOP NOTES",
        notesEs: "Desarrollo artístico completado con Photoshop. Rol: Directora de Arte.",
        notesEn: "Artistic development completed with Photoshop. Role: Art Director.",
        footerLeftEs: "Revisión de Taller",
        footerLeftEn: "Workshop Review",
        footerRightEs: "REGISTRO TÉCNICO",
        footerRightEn: "TECHNICAL LOG"
      },
      page07: {
        pageNumber: "PÁG. 07",
        sectionHeaderEs: "CERTIFICADO DE AUTENTICIDAD",
        sectionHeaderEn: "CERTIFICATE OF AUTHENTICITY",
        subHeaderEs: "REGISTRO EDITORIAL & ARCHIVO",
        subHeaderEn: "EDITORIAL ARCHIVE RECORD",
        titleEs: "Certificado de Obra y Registro",
        titleEn: "Certificate of Work & Record",
        imageUrl: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=2874&auto=format&fit=crop",
        notesTitleEs: "DECLARACIÓN DE AUTORÍA",
        notesTitleEn: "DECLARATION OF AUTHORSHIP",
        notesEs: "Certifico que todos los bocetos, estudios de siluetas, diseños e ilustraciones terminadas recogidas en este cuaderno forman parte del desarrollo visual original de la artista Marina Martín Prieto para el proyecto \"Río Estigia\".",
        notesEn: "I certify that all sketches, silhouette studies, designs and finished illustrations in this sketchbook form part of the original visual development by artist Marina Martín Prieto for \"River of Styx\".",
        footerLeftEs: "Marina Martín Prieto",
        footerLeftEn: "Marina Martín Prieto",
        footerRightEs: "EXPEDIENTE AUTÉNTICO",
        footerRightEn: "GENUINE ARCHIVE"
      }
    }
  },
  {
    id: 6,
    titleEs: "Abrazo de Terciopelo",
    titleEn: "Velvet Embrace",
    categoryEs: "Diseño de Personajes",
    categoryEn: "Character",
    projectTypeEs: "Diseño y Vestuario",
    projectTypeEn: "Character & Costume Design",
    roleEs: "Artista 2D",
    roleEn: "2D Artist",
    tools: "Clip Studio Paint",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=2940&auto=format&fit=crop",
    descriptionEs: "Una criatura de elegancia y terror, envuelta en sedas color sangre seca.",
    descriptionEn: "A creature of elegance and terror, draped in silks the color of dried blood.",
    tags: ["Character Design", "Portrait", "Sensual Goth", "Textile"],
    sketchbookVol: "LIBRO VI · EXP. 19",
    coverColor: "#24181e",
    spineColor: "#160d12",
    accentColor: "#f43f5e",
    palette: [
      { nameEs: "Seda Carmesí", nameEn: "Crimson Silk", hex: "#be123c" },
      { nameEs: "Sombra Gótica", nameEn: "Gothic Shade", hex: "#18181b" },
      { nameEs: "Marfil Funerario", nameEn: "Funerary Ivory", hex: "#fdf4ff" },
      { nameEs: "Rosa Marchita", nameEn: "Withered Rose", hex: "#9f1239" }
    ],
    techniqueEs: "Renderizado de tejidos táctiles con especial énfasis en el acabado especular del terciopelo y la translucidez de la piel pálida.",
    techniqueEn: "Tactile fabric rendering with special emphasis on velvet specular sheen and the translucency of pale skin.",
    notesEs: "El rostro está casi en calma, pero la tensión de los ropajes sugiere una amenaza inminente. El cuaderno contiene más de 20 pruebas de telas.",
    notesEn: "The face is nearly serene, yet the drape tension hints at imminent threat. The sketchbook holds over 20 fabric texture swatches.",
    processImages: [
      { 
        url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2946&auto=format&fit=crop", 
        labelEs: "Estudio de Mirada y Rictus", 
        labelEn: "Gaze & Expression Study",
        hotspots: []
      },
      { 
        url: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=2940&auto=format&fit=crop", 
        labelEs: "Retrato Terminado", 
        labelEn: "Finished Portrait",
        hotspots: [
          { x: 30, y: 25, titleEs: "Textura Suave", titleEn: "Soft Texture", descriptionEs: "Contraste entre los bordes suaves y duros en el retrato.", descriptionEn: "Contrast between soft and hard edges in the portrait." }
        ]
      }
    ],
    // =========================================================================
    // CONFIGURACIÓN PÁGINA A PÁGINA: ABRAZO DE TERCIOPELO
    // Edita aquí directamente textos, imágenes, citas, notas y hotspots
    // =========================================================================
    sketchbookPages: {
      page00: {
        pageNumber: "PÁG. 00",
        sectionHeaderEs: "BÚSQUEDA DE SILUETAS",
        sectionHeaderEn: "SILHOUETTE EXPLORATION",
        subHeaderEs: "DRAPEADO DE TELAS & TENSIÓN CORPÓREA",
        subHeaderEn: "FABRIC DRAPING & BODILY TENSION",
        titleEs: "«Abrazo de Terciopelo» — Siluetas y Caída de Tejidos",
        titleEn: "«Velvet Embrace» — Silhouettes & Fabric Drape",
        imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2946&auto=format&fit=crop",
        imageAltEs: "Estudio de caída y volumen de ropajes de terciopelo",
        imageAltEn: "Study of drape and volume in velvet robes",
        quoteEs: "El rostro está casi en calma, pero la tensión de los ropajes sugiere una amenaza inminente.",
        quoteEn: "The face is nearly serene, yet the drape tension hints at imminent threat.",
        notesTitleEs: "DINÁMICA DE TELAS",
        notesTitleEn: "FABRIC DYNAMICS",
        notesEs: "Estudio de peso y caída de sedas pesadas y terciopelos con drapeados envolventes.",
        notesEn: "Study of weight and drape in heavy silks and enveloping velvets.",
        hotspots: [
          { x: 45, y: 40, titleEs: "Caída de Terciopelo", titleEn: "Velvet Drape", descriptionEs: "Pliegues profundos que atrapan sombras densas.", descriptionEn: "Deep folds capturing dense shadows." }
        ],
        footerLeftEs: "Búsqueda de Siluetas · Abrazo de Terciopelo",
        footerLeftEn: "Silhouette Exploration · Velvet Embrace",
        footerRightEs: "LIBRO VI · EXP. 19",
        footerRightEn: "BOOK VI · EXP. 19"
      },
      page01: {
        pageNumber: "PÁG. 01",
        sectionHeaderEs: "DISEÑO DE LOS PERSONAJES",
        sectionHeaderEn: "CHARACTER DESIGN",
        subHeaderEs: "RETRATO GÓTICO · SEDAS COLOR SANGRE SECA",
        subHeaderEn: "GOTHIC PORTRAIT · DRIED BLOOD SILKS",
        titleEs: "Abrazo de Terciopelo — Diseño de personaje",
        titleEn: "Velvet Embrace — Character Design",
        imageUrl: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=2940&auto=format&fit=crop",
        imageAltEs: "Retrato terminado con ropajes carmesíes",
        imageAltEn: "Finished portrait in crimson silks",
        notesTitleEs: "NOTAS DE DISEÑO: TEXTIL",
        notesTitleEn: "DESIGN NOTES: TEXTILE",
        notesEs: "Renderizado de tejidos táctiles con especial énfasis en el acabado especular del terciopelo y la translucidez de la piel pálida.",
        notesEn: "Tactile fabric rendering with special emphasis on velvet specular sheen and the translucency of pale skin.",
        palette: [
          { nameEs: "Seda Carmesí", nameEn: "Crimson Silk", hex: "#be123c" },
          { nameEs: "Sombra Gótica", nameEn: "Gothic Shade", hex: "#18181b" },
          { nameEs: "Marfil Funerario", nameEn: "Funerary Ivory", hex: "#fdf4ff" },
          { nameEs: "Rosa Marchita", nameEn: "Withered Rose", hex: "#9f1239" }
        ],
        hotspots: [
          { x: 30, y: 25, titleEs: "Textura Suave", titleEn: "Soft Texture", descriptionEs: "Contraste entre los bordes suaves y duros en el retrato.", descriptionEn: "Contrast between soft and hard edges in the portrait." }
        ],
        footerLeftEs: "Diseño de Personajes · Abrazo de Terciopelo",
        footerLeftEn: "Character Design · Velvet Embrace",
        footerRightEs: "EXP. LIBRO VI",
        footerRightEn: "EXP. BOOK VI"
      },
      page02: {
        pageNumber: "PÁG. 02",
        sectionHeaderEs: "DISEÑO DE LOS PERSONAJES",
        sectionHeaderEn: "CHARACTER DESIGN",
        subHeaderEs: "ESTUDIO DE MIRADA Y RICTUS EMOCIONAL",
        subHeaderEn: "GAZE STUDY & EMOTIONAL EXPRESSION",
        titleEs: "«Abrazo de Terciopelo» — Expresión y Rictus",
        titleEn: "«Velvet Embrace» — Gaze & Expression",
        imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2946&auto=format&fit=crop",
        imageAltEs: "Estudios preparatorios de rostro y rictus",
        imageAltEn: "Preparatory studies of face and gaze",
        quoteEs: "Más de 20 pruebas de telas y expresiones faciales contenidas en el cuaderno.",
        quoteEn: "Over 20 fabric swatches and facial expression tests gathered in the sketchbook.",
        hotspots: [
          { x: 50, y: 30, titleEs: "Rictus Contenido", titleEn: "Subtle Expression", descriptionEs: "Serenidad inquietante de la figura que contrasta con la intensidad cromática.", descriptionEn: "Unsettling serenity of the figure contrasting with color intensity." }
        ],
        notesTitleEs: "ANÁLISIS DE MIRADA",
        notesTitleEn: "GAZE ANALYSIS",
        notesEs: "Pinceladas directas para fijar el punto focal en la cuenca ocular y los labios teñidos.",
        notesEn: "Direct brushwork anchoring the focal point on the eye socket and stained lips.",
        footerLeftEs: "Diseño de Personajes · Expresión",
        footerLeftEn: "Character Design · Expression",
        footerRightEs: "PLATE 01",
        footerRightEn: "PLATE 01"
      },
      page03: {
        pageNumber: "PÁG. 03",
        sectionHeaderEs: "ILUSTRACIONES",
        sectionHeaderEn: "ILLUSTRATIONS",
        subHeaderEs: "LÁMINA I · EL ROBO DE SEDA",
        subHeaderEn: "PLATE I · THE SILK THEFT",
        titleEs: "«Abrazo de Terciopelo» — Lámina I",
        titleEn: "«Velvet Embrace» — Plate I",
        imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2800&auto=format&fit=crop",
        imageAltEs: "Composición con sedas color sangre seca",
        imageAltEn: "Composition with dried-blood colored silks",
        quoteEs: "Una criatura de elegancia y terror envuelta en sedas color sangre seca.",
        quoteEn: "A creature of elegance and terror draped in silks the color of dried blood.",
        notesTitleEs: "COMPOSICIÓN CROMÁTICA",
        notesTitleEn: "CHROMATIC COMPOSITION",
        notesEs: "Tonos carmín saturados contra sombras de carbón vegetal.",
        notesEn: "Saturated carmine tones against charcoal black shadows.",
        hotspots: [
          { x: 45, y: 40, titleEs: "Seda Carmesí", titleEn: "Crimson Silk", descriptionEs: "Reflejo tornasolado en los pliegues superiores.", descriptionEn: "Iridescent sheen along the upper folds." }
        ],
        footerLeftEs: "Ilustraciones · Lámina I",
        footerLeftEn: "Illustrations · Plate I",
        footerRightEs: "PLATE 01 · MMP",
        footerRightEn: "PLATE 01 · MMP"
      },
      page04: {
        pageNumber: "PÁG. 04",
        sectionHeaderEs: "ILUSTRACIONES",
        sectionHeaderEn: "ILLUSTRATIONS",
        subHeaderEs: "LÁMINA II · LA PENUMBRA ATERCIOPELADA",
        subHeaderEn: "PLATE II · VELVETY PENUMBRA",
        titleEs: "«Abrazo de Terciopelo» — Lámina II",
        titleEn: "«Velvet Embrace» — Plate II",
        imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2800&auto=format&fit=crop",
        imageAltEs: "Figura rodeada por penumbra aterciopelada",
        imageAltEn: "Figure surrounded by velvety penumbra",
        quoteEs: "La sombra gótica abraza el busto en una atmósfera de opulencia fúnebre.",
        quoteEn: "Gothic shadow embraces the bust in an atmosphere of funerary opulence.",
        notesTitleEs: "ACABADO ESPECULAR",
        notesTitleEn: "SPECULAR FINISH",
        notesEs: "Control preciso de las luces especulares del terciopelo en las zonas de quiebre.",
        notesEn: "Precise control of velvet specular highlights at fold crests.",
        hotspots: [
          { x: 50, y: 55, titleEs: "Atmósfera Fúnebre", titleEn: "Funerary Atmosphere", descriptionEs: "Luces bajas de velas y penumbra aterciopelada.", descriptionEn: "Low candlelight and velvety penumbra." }
        ],
        footerLeftEs: "Ilustraciones · Lámina II",
        footerLeftEn: "Illustrations · Plate II",
        footerRightEs: "PLATE 02 · MMP",
        footerRightEn: "PLATE 02 · MMP"
      },
      page05: {
        pageNumber: "PÁG. 05",
        sectionHeaderEs: "LÁMINA FINAL HD",
        sectionHeaderEn: "FINAL HD PLATE",
        subHeaderEs: "RETRATO MAESTRO AL ÓLEO DIGITAL · FORMATO HD",
        subHeaderEn: "DIGITAL OIL MASTER PORTRAIT · HD FORMAT",
        titleEs: "«Abrazo de Terciopelo» — Retrato Terminado",
        titleEn: "«Velvet Embrace» — Master Portrait",
        imageUrl: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=2940&auto=format&fit=crop",
        imageAltEs: "Lámina final terminada de Abrazo de Terciopelo",
        imageAltEn: "Finished master plate of Velvet Embrace",
        notesTitleEs: "FICHA TÉCNICA DE LA OBRA",
        notesTitleEn: "ARTWORK TECHNICAL SHEET",
        notesEs: "Una criatura de elegancia y terror, envuelta en sedas color sangre seca. Creado en 2023 con Clip Studio Paint.",
        notesEn: "A creature of elegance and terror, draped in silks the color of dried blood. Created in 2023 with Clip Studio Paint.",
        footerLeftEs: "Obra Maestra Final",
        footerLeftEn: "Final Masterwork",
        footerRightEs: "PLATE 05 · MMP",
        footerRightEn: "PLATE 05 · MMP"
      },
      page06: {
        pageNumber: "PÁG. 06",
        sectionHeaderEs: "REVISIÓN DE TALLER",
        sectionHeaderEn: "WORKSHOP REVIEW",
        subHeaderEs: "BITÁCORA DE PRODUCCIÓN & REFERENCIAS",
        subHeaderEn: "PRODUCTION LOG & REFERENCES",
        titleEs: "Bitácora de Taller & Proceso",
        titleEn: "Workshop Log & Process",
        imageUrl: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=2940&auto=format&fit=crop",
        quoteEs: "Renderizado de tejidos táctiles con especial énfasis en el acabado especular del terciopelo y la translucidez de la piel pálida.",
        quoteEn: "Tactile fabric rendering with special emphasis on velvet specular sheen and the translucency of pale skin.",
        notesTitleEs: "APUNTES DE TALLER",
        notesTitleEn: "WORKSHOP NOTES",
        notesEs: "Desarrollo artístico completado con Clip Studio Paint. Rol: Artista 2D.",
        notesEn: "Artistic development completed with Clip Studio Paint. Role: 2D Artist.",
        footerLeftEs: "Revisión de Taller",
        footerLeftEn: "Workshop Review",
        footerRightEs: "REGISTRO TÉCNICO",
        footerRightEn: "TECHNICAL LOG"
      },
      page07: {
        pageNumber: "PÁG. 07",
        sectionHeaderEs: "CERTIFICADO DE AUTENTICIDAD",
        sectionHeaderEn: "CERTIFICATE OF AUTHENTICITY",
        subHeaderEs: "REGISTRO EDITORIAL & ARCHIVO",
        subHeaderEn: "EDITORIAL ARCHIVE RECORD",
        titleEs: "Certificado de Obra y Registro",
        titleEn: "Certificate of Work & Record",
        imageUrl: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=2940&auto=format&fit=crop",
        notesTitleEs: "DECLARACIÓN DE AUTORÍA",
        notesTitleEn: "DECLARATION OF AUTHORSHIP",
        notesEs: "Certifico que todos los bocetos, estudios de siluetas, diseños e ilustraciones terminadas recogidas en este cuaderno forman parte del desarrollo visual original de la artista Marina Martín Prieto para el proyecto \"Abrazo de Terciopelo\".",
        notesEn: "I certify that all sketches, silhouette studies, designs and finished illustrations in this sketchbook form part of the original visual development by artist Marina Martín Prieto for \"Velvet Embrace\".",
        footerLeftEs: "Marina Martín Prieto",
        footerLeftEn: "Marina Martín Prieto",
        footerRightEs: "EXPEDIENTE AUTÉNTICO",
        footerRightEn: "GENUINE ARCHIVE"
      }
    }
  }
];

/**
 * Obtiene la configuración completa de páginas de un sketchbook.
 * Si el proyecto tiene `sketchbookPages` definido en data.ts, lo devuelve directamente.
 * Si no, genera una estructura coherente por defecto a partir de las imágenes de proceso y datos del proyecto.
 */
export function getSketchbookPages(project: Project): SketchbookPagesConfig {
  if (project.sketchbookPages) {
    return project.sketchbookPages;
  }

  // Valores predeterminados autogenerados a partir de los datos generales del proyecto
  return {
    page00: {
      pageNumber: "PÁG. 00",
      sectionHeaderEs: "BÚSQUEDA DE SILUETAS",
      sectionHeaderEn: "SILHOUETTE EXPLORATION",
      subHeaderEs: "EXPLORACIÓN FORMAL & SILUETA",
      subHeaderEn: "FORMAL & SILHOUETTE EXPLORATION",
      titleEs: `«${project.titleEs}» — Búsqueda de Siluetas`,
      titleEn: `«${project.titleEn}» — Silhouette Exploration`,
      imageUrl: project.processImages[0]?.url || project.imageUrl,
      imageAltEs: `Estudio de siluetas de ${project.titleEs}`,
      imageAltEn: `Silhouette study of ${project.titleEn}`,
      quoteEs: project.techniqueEs,
      quoteEn: project.techniqueEn,
      notesTitleEs: "APUNTES PRELIMINARES",
      notesTitleEn: "PRELIMINARY NOTES",
      notesEs: project.techniqueEs,
      notesEn: project.techniqueEn,
      hotspots: project.processImages[0]?.hotspots || [],
      footerLeftEs: "Búsqueda de Siluetas · Estudio de Formas",
      footerLeftEn: "Silhouette Exploration · Form Study",
      footerRightEs: "MMP · ARCHIVO TÉCNICO",
      footerRightEn: "MMP · TECHNICAL ARCHIVE"
    },
    page01: {
      pageNumber: "PÁG. 01",
      sectionHeaderEs: "DISEÑO DE LOS PERSONAJES",
      sectionHeaderEn: "CHARACTER DESIGN",
      subHeaderEs: `${project.categoryEs} · ${project.year}`,
      subHeaderEn: `${project.categoryEn} · ${project.year}`,
      titleEs: `${project.titleEs} — Diseño de personaje`,
      titleEn: `${project.titleEn} — Character Design`,
      imageUrl: project.processImages[1]?.url || project.imageUrl,
      imageAltEs: `Diseño de personaje de ${project.titleEs}`,
      imageAltEn: `Character design of ${project.titleEn}`,
      notesTitleEs: "NOTAS DE LA ARTISTA",
      notesTitleEn: "ARTIST NOTES",
      notesEs: project.notesEs,
      notesEn: project.notesEn,
      palette: project.palette,
      hotspots: project.processImages[1]?.hotspots || [],
      footerLeftEs: `${project.categoryEs} · ${project.titleEs}`,
      footerLeftEn: `${project.categoryEn} · ${project.titleEn}`,
      footerRightEs: `EXP. ${project.sketchbookVol}`,
      footerRightEn: `EXP. ${project.sketchbookVol}`
    },
    page02: {
      pageNumber: "PÁG. 02",
      sectionHeaderEs: "DISEÑO DE LOS PERSONAJES",
      sectionHeaderEn: "CHARACTER DESIGN",
      subHeaderEs: "LÍNEA EXPLORATORIA & BOCETOS",
      subHeaderEn: "EXPLORATORY LINE & SKETCHES",
      titleEs: `«${project.titleEs}» — Bocetos y Proceso`,
      titleEn: `«${project.titleEn}» — Sketches & Process`,
      imageUrl: project.processImages[2]?.url || project.processImages[0]?.url || project.imageUrl,
      imageAltEs: `Bocetos preparatorios de ${project.titleEs}`,
      imageAltEn: `Preparatory sketches of ${project.titleEn}`,
      quoteEs: project.notesEs,
      quoteEn: project.notesEn,
      notesTitleEs: "DESARROLLO DE LÍNEA",
      notesTitleEn: "LINE DEVELOPMENT",
      notesEs: project.techniqueEs,
      notesEn: project.techniqueEn,
      hotspots: project.processImages[2]?.hotspots || [],
      footerLeftEs: `Bocetos y Proceso · ${project.titleEs}`,
      footerLeftEn: `Sketches and Process · ${project.titleEn}`,
      footerRightEs: `EXP. ${project.sketchbookVol}`,
      footerRightEn: `EXP. ${project.sketchbookVol}`
    },
    page03: {
      pageNumber: "PÁG. 03",
      sectionHeaderEs: "ILUSTRACIONES",
      sectionHeaderEn: "ILLUSTRATIONS",
      subHeaderEs: "LÁMINA I · PINTURA & COLOR",
      subHeaderEn: "PLATE I · PAINTING & COLOR",
      titleEs: `«${project.titleEs}» — Lámina I`,
      titleEn: `«${project.titleEn}» — Plate I`,
      imageUrl: project.processImages[3]?.url || project.processImages[1]?.url || project.imageUrl,
      imageAltEs: `Lámina I de ${project.titleEs}`,
      imageAltEn: `Plate I of ${project.titleEn}`,
      quoteEs: project.descriptionEs,
      quoteEn: project.descriptionEn,
      notesTitleEs: "COMPOSICIÓN & COLOR",
      notesTitleEn: "COMPOSITION & COLOR",
      notesEs: project.techniqueEs,
      notesEn: project.techniqueEn,
      hotspots: project.processImages[3]?.hotspots || [],
      footerLeftEs: "Ilustraciones · Lámina I",
      footerLeftEn: "Illustrations · Plate I",
      footerRightEs: "PLATE 01 · MMP",
      footerRightEn: "PLATE 01 · MMP"
    },
    page04: {
      pageNumber: "PÁG. 04",
      sectionHeaderEs: "ILUSTRACIONES",
      sectionHeaderEn: "ILLUSTRATIONS",
      subHeaderEs: "LÁMINA II · ACABADO Y ATMÓSFERA",
      subHeaderEn: "PLATE II · FINISH & ATMOSPHERE",
      titleEs: `«${project.titleEs}» — Lámina II`,
      titleEn: `«${project.titleEn}» — Plate II`,
      imageUrl: project.processImages[4]?.url || project.imageUrl,
      imageAltEs: `Lámina II de ${project.titleEs}`,
      imageAltEn: `Plate II of ${project.titleEn}`,
      quoteEs: project.notesEs,
      quoteEn: project.notesEn,
      notesTitleEs: "ACABADO FINAL",
      notesTitleEn: "FINAL FINISH",
      notesEs: project.notesEs,
      notesEn: project.notesEn,
      hotspots: project.processImages[4]?.hotspots || [],
      footerLeftEs: "Ilustraciones · Lámina II",
      footerLeftEn: "Illustrations · Plate II",
      footerRightEs: "PLATE 02 · MMP",
      footerRightEn: "PLATE 02 · MMP"
    },
    page05: {
      pageNumber: "PÁG. 05",
      sectionHeaderEs: "LÁMINA FINAL HD",
      sectionHeaderEn: "FINAL HD PLATE",
      subHeaderEs: "OBRA TERMINADA EN ALTA RESOLUCIÓN",
      subHeaderEn: "FINISHED HIGH RESOLUTION WORK",
      titleEs: `«${project.titleEs}» — Ilustración Principal`,
      titleEn: `«${project.titleEn}» — Master Illustration`,
      imageUrl: project.imageUrl,
      imageAltEs: `Obra terminada de ${project.titleEs}`,
      imageAltEn: `Finished work of ${project.titleEn}`,
      notesTitleEs: "FICHA TÉCNICA DE LA OBRA",
      notesTitleEn: "ARTWORK TECHNICAL SHEET",
      notesEs: `${project.descriptionEs} Creado en ${project.year} con ${project.tools}.`,
      notesEn: `${project.descriptionEn} Created in ${project.year} using ${project.tools}.`,
      footerLeftEs: "Obra Maestra Final",
      footerLeftEn: "Final Masterwork",
      footerRightEs: "PLATE 05 · MMP",
      footerRightEn: "PLATE 05 · MMP"
    },
    page06: {
      pageNumber: "PÁG. 06",
      sectionHeaderEs: "REVISIÓN DE TALLER",
      sectionHeaderEn: "WORKSHOP REVIEW",
      subHeaderEs: "BITÁCORA DE PRODUCCIÓN & REFERENCIAS",
      subHeaderEn: "PRODUCTION LOG & REFERENCES",
      titleEs: "Bitácora de Taller & Proceso",
      titleEn: "Workshop Log & Process",
      imageUrl: project.imageUrl,
      quoteEs: "Un proyecto conceptual requiere un diálogo continuo entre la investigación y la plástica visual.",
      quoteEn: "A concept project demands continuous dialogue between research and visual arts.",
      notesTitleEs: "APUNTES DE TALLER",
      notesTitleEn: "WORKSHOP NOTES",
      notesEs: `Desarrollo artístico completado con ${project.tools}. Rol: ${project.roleEs}.`,
      notesEn: `Artistic development completed with ${project.tools}. Role: ${project.roleEn}.`,
      footerLeftEs: "Revisión de Taller",
      footerLeftEn: "Workshop Review",
      footerRightEs: "REGISTRO TÉCNICO",
      footerRightEn: "TECHNICAL LOG"
    },
    page07: {
      pageNumber: "PÁG. 07",
      sectionHeaderEs: "CERTIFICADO DE AUTENTICIDAD",
      sectionHeaderEn: "CERTIFICATE OF AUTHENTICITY",
      subHeaderEs: "REGISTRO EDITORIAL & ARCHIVO",
      subHeaderEn: "EDITORIAL ARCHIVE RECORD",
      titleEs: "Certificado de Obra y Registro",
      titleEn: "Certificate of Work & Record",
      imageUrl: project.imageUrl,
      notesTitleEs: "DECLARACIÓN DE AUTORÍA",
      notesTitleEn: "DECLARATION OF AUTHORSHIP",
      notesEs: `Certifico que todos los bocetos, estudios de siluetas, diseños e ilustraciones terminadas recogidas en este cuaderno forman parte del desarrollo visual original de la artista Marina Martín Prieto para el proyecto "${project.titleEs}".`,
      notesEn: `I certify that all sketches, silhouette studies, designs and finished illustrations in this sketchbook form part of the original visual development by artist Marina Martín Prieto for "${project.titleEn}".`,
      footerLeftEs: "Marina Martín Prieto",
      footerLeftEn: "Marina Martín Prieto",
      footerRightEs: "EXPEDIENTE AUTÉNTICO",
      footerRightEn: "GENUINE ARCHIVE"
    }
  };
}
