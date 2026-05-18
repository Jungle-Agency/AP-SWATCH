export interface Product {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  features: string[];
}

export const products: Product[] = [
  {
    id: "strap-noir-obsidienne",
    name: "Noir Obsidienne",
    shortDesc: "L'essence de la discrétion et de l'élégance absolue.",
    description: "Finis à la main en Suisse, ce bracelet intègre un polymère FKM de grade aérospatial offrant une résistance thermique et chimique inégalée. Conçu exclusivement pour épouser les lignes de la Royal Oak Concept, le Noir Obsidienne évoque une élégance discrète et ténébreuse.",
    price: 100,
    originalPrice: 120,
    image: "/straps/noir-profil.png",
    images: [
      "/straps/noir-profil.png",
      "/straps/noir-face.png",
    ],
    features: [
      "Caoutchouc FKM haute performance",
      "Insert rigide pour maintien structurel",
      "Boucle ardillon en titane brossé",
      "Assemblage et finition main en Suisse"
    ]
  },
  {
    id: "strap-bleu-abyssal",
    name: "Bleu Abyssal",
    shortDesc: "Une profondeur océanique, idéale pour le sport.",
    description: "Le Bleu Abyssal évoque la profondeur des océans. Doté de notre formulation unique de polymère fluoré, ce modèle résiste aux environnements aquatiques tout en préservant son esthétique haut de gamme. Boucle blanche pour un contraste élégant.",
    price: 100,
    originalPrice: 120,
    image: "/straps/bleu-profil.png",
    images: [
      "/straps/bleu-profil.png",
      "/straps/bleu-face.png",
    ],
    features: [
      "Revêtement hydrophobe exclusif",
      "Boucle céramique blanche",
      "Tolérance de fabrication à +/- 0.005 mm",
      "Édition limitée numérotée"
    ]
  },
  {
    id: "strap-bleu-tangerine",
    name: "Bleu Tangerine",
    shortDesc: "Marine profond rehaussé d'accents orangés.",
    description: "Le Bleu Tangerine combine la sobriété d'un marine profond et l'audace d'inserts orange vif. Inspiré des chronographes de plongée vintage, ce bracelet apporte une touche sportive et lumineuse à votre Royal Oak Concept.",
    price: 100,
    originalPrice: 120,
    image: "/straps/bleu-tangerine-profil.png",
    images: [
      "/straps/bleu-tangerine-profil.png",
      "/straps/bleu-tangerine-face.png",
    ],
    features: [
      "Inserts orange ton-sur-ton",
      "Polymère FKM marine teinté masse",
      "Boucle anodisée orange brossée",
      "Édition Capsule été 2026"
    ]
  },
  {
    id: "strap-rose-poudre",
    name: "Rose Poudré",
    shortDesc: "Une douceur poudrée, signature contemporaine.",
    description: "Le Rose Poudré apporte une touche de raffinement contemporain. Sculpté dans un polymère fluoré teinté dans la masse, il conserve sa nuance unique au fil du temps. Une pièce audacieuse, pensée pour les collectionneurs qui assument un style distinctif.",
    price: 100,
    originalPrice: 120,
    image: "/straps/rose-profil.png",
    images: [
      "/straps/rose-profil.png",
      "/straps/rose-face.png",
    ],
    features: [
      "Pigmentation infusée résistante aux UV",
      "Toucher soyeux et hypoallergénique",
      "Boucle assortie ton-sur-ton",
      "Édition limitée numérotée"
    ]
  },
  {
    id: "strap-rose-dore",
    name: "Rose Doré",
    shortDesc: "Rose pastel et boucle dorée — pure orfèvrerie.",
    description: "Le Rose Doré fait dialoguer un rose poudré minéral avec des passants et une boucle finis or jaune. L'alliance précieuse d'une céramique tendre et d'une touche d'orfèvrerie pour les amateurs de raffinement absolu.",
    price: 100,
    originalPrice: 120,
    image: "/straps/rose-dore-profil.png",
    images: [
      "/straps/rose-dore-profil.png",
      "/straps/rose-dore-face.png",
    ],
    features: [
      "Passants et boucle plaqués or 18k",
      "Polymère FKM rose pastel",
      "Garniture anti-jaunissement",
      "Édition Capsule Joaillerie"
    ]
  },
  {
    id: "strap-jaune-sahara",
    name: "Jaune Sahara",
    shortDesc: "Une nuance solaire pour les pièces estivales.",
    description: "Le Jaune Sahara s'inspire des sables clairs et de la lumière du désert. Sa nuance pastel se marie naturellement avec les céramiques claires et apporte une signature solaire à toute la collection.",
    price: 100,
    originalPrice: 120,
    image: "/straps/jaune-profil.png",
    images: [
      "/straps/jaune-profil.png",
      "/straps/jaune-face.png",
    ],
    features: [
      "Pigment minéral stable à la lumière",
      "Boucle satinée argentée",
      "Toucher mat soyeux",
      "Édition Capsule été 2026"
    ]
  },
  {
    id: "strap-blanc-glacier",
    name: "Blanc Glacier",
    shortDesc: "L'élégance minérale d'un blanc immaculé.",
    description: "Le Blanc Glacier impose un contraste pur et minimaliste. Sa surface mate met en valeur la lumière des céramiques claires. Traité anti-jaunissement, ce bracelet préserve sa pureté à travers les saisons.",
    price: 100,
    originalPrice: 120,
    image: "/straps/blanc-profil.png",
    images: [
      "/straps/blanc-profil.png",
      "/straps/blanc-face.png",
    ],
    features: [
      "Traitement anti-jaunissement",
      "Finition mate satinée",
      "Polymère FKM Swiss Made",
      "Boucle ardillon céramique blanche"
    ]
  }
];
