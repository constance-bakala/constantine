/**
 * Définition des groupes d'items par catégorie.
 *
 * Chaque groupe représente un objet physique unique.
 * - `id`          : identifiant numérique (correspond au sous-répertoire assets/[dir]/[prefix]-[id]/)
 * - `extraImages` : noms de fichiers des vues additionnelles dans ce répertoire (hors cover.png)
 *
 * Convention d'asset :
 *   assets/masks/mask-2/cover.png          → image principale (affichée dans la liste)
 *   assets/masks/mask-2/mask-2-b.png       → vue additionnelle
 *
 * Pour grouper des images qui représentent le même objet :
 *   1. Déplacer les fichiers dans le répertoire du groupe (ex: mask-3/)
 *   2. Nommer le fichier principal "cover.png"
 *   3. Nommer les vues additionnelles "[prefix]-[id]-b.png", "[prefix]-[id]-c.png", etc.
 *   4. Ajouter les noms des fichiers dans extraImages ci-dessous
 *   5. Supprimer le groupe qui ne sert plus (si deux groupes ont été fusionnés)
 */

export interface ItemGroupDef {
  id: number;
  extraImages?: string[];
}

export const MASK_GROUPS: ItemGroupDef[] = [
  { id: 1,  extraImages: ['mask-1-b.webp'] },   // mask-2
  { id: 3,  extraImages: ['mask-3-b.webp'] },   // mask-4
  { id: 5,  extraImages: ['mask-5-b.webp'] },   // mask-6
  { id: 7,  extraImages: ['mask-7-b.webp'] },   // mask-8
  { id: 9,  extraImages: ['mask-9-b.webp'] },   // mask-10
  { id: 11, extraImages: ['mask-11-b.webp'] },  // mask-12
  { id: 13, extraImages: ['mask-13-b.webp'] },  // mask-14
  { id: 15, extraImages: ['mask-15-b.webp'] },  // mask-16
  { id: 17, extraImages: ['mask-17-b.webp'] },  // mask-18
  { id: 19, extraImages: ['mask-19-b.webp', 'mask-19-c.webp'] }, // mask-20, mask-21
  { id: 22, extraImages: ['mask-22-b.webp'] },  // mask-23
  { id: 24, extraImages: ['mask-24-b.webp'] },  // mask-25
  { id: 26, extraImages: ['mask-26-b.webp'] },  // mask-27
  { id: 28, extraImages: ['mask-28-b.webp'] },  // mask-29
  { id: 30, extraImages: ['mask-30-b.webp', 'mask-30-c.webp'] }, // mask-31, mask-32
  { id: 33, extraImages: ['mask-33-b.webp'] },  // mask-34
  { id: 35, extraImages: ['mask-35-b.webp', 'mask-35-c.webp'] }, // mask-36, mask-37
  { id: 38, extraImages: ['mask-38-b.webp', 'mask-38-c.webp'] }, // mask-39, mask-40
  { id: 41, extraImages: ['mask-41-b.webp', 'mask-41-c.webp'] }, // mask-42, mask-43
  { id: 44, extraImages: ['mask-44-b.webp'] },  // mask-45
  { id: 46 },
  { id: 47, extraImages: ['mask-47-b.webp', 'mask-47-c.webp'] }, // mask-48, mask-49
  { id: 50, extraImages: ['mask-50-b.webp'] },  // mask-51
  { id: 52, extraImages: ['mask-52-b.webp'] },  // mask-53
  { id: 54, extraImages: ['mask-54-b.webp', 'mask-54-c.webp'] }, // mask-55, mask-56
  { id: 57, extraImages: ['mask-57-b.webp'] }, // mask-58
  { id: 59 },
  { id: 60, extraImages: ['mask-60-b.webp', 'mask-60-c.webp'] }, // mask-61, mask-62
];

// Nouvelles robes (format JPEG) — dress-7 = dress-1 (2e vue), dress-13 = dress-11 (2e vue)
export const DRESS_GROUPS: ItemGroupDef[] = [
  { id: 1 },  { id: 2 },  { id: 3 },  { id: 4 },  { id: 5 },
  { id: 6 },  { id: 8 },  { id: 9 },  { id: 10 }, { id: 11, extraImages: ['dress-11-b.jpeg'] },
  { id: 12 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 },
  { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 }, { id: 22 },
  { id: 23 }, { id: 24 }, { id: 25 }, { id: 26 }, { id: 27 },
  { id: 28 }, { id: 29 }, { id: 30 }, { id: 31 }, { id: 32 },
  { id: 33 }, { id: 34 }, { id: 35 }, { id: 36 }, { id: 37 },
  { id: 38 }, { id: 39 }, { id: 40 }, { id: 41 }, { id: 42 },
  { id: 43 }, { id: 44 }, { id: 45 }, { id: 46 }, { id: 47 },
  { id: 48 }, { id: 49 }, { id: 50 }, { id: 51 }, { id: 52 },
];

export const EARING_GROUPS: ItemGroupDef[] = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
  { id: 14 },
  { id: 15 },
  { id: 16 },
  { id: 17 },
];
