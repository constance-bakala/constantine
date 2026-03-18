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
  { id: 1,  extraImages: ['mask-1-b.png'] },   // mask-2
  { id: 3,  extraImages: ['mask-3-b.png'] },   // mask-4
  { id: 5,  extraImages: ['mask-5-b.png'] },   // mask-6
  { id: 7,  extraImages: ['mask-7-b.png'] },   // mask-8
  { id: 9,  extraImages: ['mask-9-b.png'] },   // mask-10
  { id: 11, extraImages: ['mask-11-b.png'] },  // mask-12
  { id: 13, extraImages: ['mask-13-b.png'] },  // mask-14
  { id: 15, extraImages: ['mask-15-b.png'] },  // mask-16
  { id: 17, extraImages: ['mask-17-b.png'] },  // mask-18
  { id: 19, extraImages: ['mask-19-b.png', 'mask-19-c.png'] }, // mask-20, mask-21
  { id: 22, extraImages: ['mask-22-b.png'] },  // mask-23
  { id: 24, extraImages: ['mask-24-b.png'] },  // mask-25
  { id: 26, extraImages: ['mask-26-b.png'] },  // mask-27
  { id: 28, extraImages: ['mask-28-b.png'] },  // mask-29
  { id: 30, extraImages: ['mask-30-b.png', 'mask-30-c.png'] }, // mask-31, mask-32
  { id: 33, extraImages: ['mask-33-b.png'] },  // mask-34
  { id: 35, extraImages: ['mask-35-b.png', 'mask-35-c.png'] }, // mask-36, mask-37
  { id: 38, extraImages: ['mask-38-b.png', 'mask-38-c.png'] }, // mask-39, mask-40
  { id: 41, extraImages: ['mask-41-b.png', 'mask-41-c.png'] }, // mask-42, mask-43
  { id: 44, extraImages: ['mask-44-b.png'] },  // mask-45
  { id: 46 },
  { id: 47, extraImages: ['mask-47-b.png', 'mask-47-c.png'] }, // mask-48, mask-49
  { id: 50, extraImages: ['mask-50-b.png'] },  // mask-51
  { id: 52, extraImages: ['mask-52-b.png'] },  // mask-53
  { id: 54, extraImages: ['mask-54-b.png', 'mask-54-c.png'] }, // mask-55, mask-56
  { id: 57, extraImages: ['mask-57-b.png'] }, // mask-58
  { id: 59 },
  { id: 60, extraImages: ['mask-60-b.png', 'mask-60-c.png'] }, // mask-61, mask-62
];

export const DRESS_GROUPS: ItemGroupDef[] = [
  { id: 1 },
  { id: 2,  extraImages: ['dress-2-b.png'] },  // dress-3
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9,  extraImages: ['dress-9-b.png'] },  // dress-10
  { id: 11, extraImages: ['dress-11-b.png'] }, // dress-12
  { id: 13, extraImages: ['dress-13-b.png'] }, // dress-14
  { id: 15, extraImages: ['dress-15-b.png'] }, // dress-16
  { id: 17, extraImages: ['dress-17-b.png'] }, // dress-18
  { id: 19, extraImages: ['dress-19-b.png'] }, // dress-20
  { id: 21, extraImages: ['dress-21-b.png'] }, // dress-22
  { id: 23 },
  { id: 24 },
  { id: 25 },
  { id: 26 },
  { id: 27 },
  { id: 28 },
  { id: 29 },
  { id: 30 },
  { id: 31 },
  { id: 32 },
  { id: 33 },
  { id: 34 },
  { id: 35 },
  { id: 36, extraImages: ['dress-36-b.png'] }, // dress-37
  { id: 38, extraImages: ['dress-38-b.png', 'dress-38-c.png'] }, // dress-41, dress-48
  { id: 39 },
  { id: 40 },
  { id: 42, extraImages: ['dress-42-b.png'] }, // dress-46
  { id: 43 },
  { id: 44, extraImages: ['dress-44-b.png'] }, // dress-45
  { id: 47 },
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
