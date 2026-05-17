export interface Product {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  price: number;
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
    price: 90,
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
    description: "Le Bleu Abyssal évoque la profondeur des océans. Doté de notre formulation unique de polymère fluoré, ce modèle résiste aux environnements aquatiques tout en préservant son esthétique haut de gamme. Chaque pièce est soigneusement sculptée.",
    price: 90,
    image: "/straps/bleu-profil.png",
    images: [
      "/straps/bleu-profil.png",
      "/straps/bleu-face.png",
    ],
    features: [
      "Revêtement hydrophobe exclusif",
      "Design ergonomique aéré pour un port quotidien",
      "Tolérance de fabrication à +/- 0.005 mm",
      "Sur-piqûres ton-sur-ton (optionnelles)"
    ]
  },
  {
    id: "strap-rose-poudre",
    name: "Rose Poudré",
    shortDesc: "Une douceur poudrée, signature contemporaine.",
    description: "Le Rose Poudré apporte une touche de raffinement contemporain. Sculpté dans un polymère fluoré teinté dans la masse, il conserve sa nuance unique au fil du temps. Une pièce audacieuse, pensée pour les collectionneurs qui assument un style distinctif.",
    price: 90,
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
    id: "strap-blanc-glacier",
    name: "Blanc Glacier",
    shortDesc: "L'élégance minérale d'un blanc immaculé.",
    description: "Le Blanc Glacier impose un contraste pur et minimaliste. Sa surface mate met en valeur la lumière des céramiques claires. Traité anti-jaunissement, ce bracelet préserve sa pureté à travers les saisons.",
    price: 90,
    image: "/straps/blanc-face.png",
    images: [
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
