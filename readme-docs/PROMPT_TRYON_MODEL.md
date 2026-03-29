# Prompt — Image mannequin pour le virtual try-on

Utilisé pour générer l'image mannequin par défaut uploadée dans l'interface admin
(onglet "Photos try-on IA" → avatar mannequin).

## Contraintes techniques

- Format **3:4 portrait** (ex : 768×1024 px) — obligatoire pour IDM-VTON
- Fond uni, bras dégagés du corps
- Vêtements neutres sans pantalon visible (bodysuit/combinaison) pour les robes

---

## Prompt — Version robes (actuel)

```
Full body studio photo of a real mixed-race woman, front view, perfectly centered,
standing straight. Arms slightly away from the body on both sides, no hands on hips,
no crossed arms. Confident and natural expression, eyes looking straight at the camera.

Wearing a plain white form-fitting bodysuit or leotard, no pants, no skirt, no shorts,
bare legs, smooth fabric, no folds, no wrinkles, no logos, no patterns, no textures.
Clean elegant nude heels.

Uniform light gray background (#e0e0e0), flat lighting, no shadows, no gradients,
no reflections. Clean silhouette, sharp edges, no accessories, no jewelry.

Highly realistic photography, fashion catalog style, full body fully visible from head
to toe, no cropping at any edge, 3:4 portrait ratio, optimized for dress and full-body
clothing replacement and virtual try-on AI models.
```

## Prompt — Version hauts / bas (upperbody / lowerbody)

```
Full body studio photo of a real mixed-race woman, front view, perfectly centered,
standing straight. Arms slightly away from the body on both sides, no hands on hips,
no crossed arms. Confident and natural expression, eyes looking straight at the camera.

Wearing a plain white t-shirt and simple neutral light gray pants, smooth fabric,
no folds, no wrinkles, no logos, no patterns, no textures. Clean elegant nude heels.

Uniform light gray background (#e0e0e0), flat lighting, no shadows, no gradients,
no reflections. Clean silhouette, sharp edges, no accessories, no jewelry.

Highly realistic photography, fashion catalog style, full body fully visible from head
to toe, no cropping at any edge, 3:4 portrait ratio, optimized for clothing replacement
and virtual try-on AI models.
```

---

## Sites générateurs recommandés (gratuits)

| Site | Notes |
|---|---|
| **Google ImageFX** (aitestkitchen.withgoogle.com) | Imagen 3, très réaliste, compte Google suffit |
| **mage.space** | Gratuit sans inscription |
| **tensor.art** | SDXL réaliste, crédits gratuits |

## Post-traitement

Si l'image générée n'est pas en 3:4, recadrer à **768×1024 px** avant upload
(ex : Canva, Photopea, ou tout éditeur en ligne).
