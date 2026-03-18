# =============================================================================
# reorganize-assets.ps1
#
# Réorganise les assets selon la nouvelle convention de groupes.
# IMPORTANT : exécuter UNE SEULE FOIS, après avoir fait un commit git.
#
# Usage (depuis la racine du projet) :
#   .\reorganize-assets.ps1
# =============================================================================

$base = ".\src\assets"

function Move-Asset($src, $destDir, $destName) {
  if (-not (Test-Path $src)) {
    Write-Host "  ABSENT   $src" -ForegroundColor Yellow
    return
  }
  if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
  }
  Move-Item -Path $src -Destination "$destDir\$destName" -Force
  Write-Host "  OK  $src  ->  $destDir\$destName" -ForegroundColor Green
}

# =============================================================================
# MASKS — groupes avec vues additionnelles
# =============================================================================
Write-Host "`n--- MASKS ---" -ForegroundColor Cyan

$maskMoves = @(
  # src            destDir            destName
  @("mask-1.png",  "mask-1", "cover.png"),
  @("mask-2.png",  "mask-1", "mask-1-b.png"),

  @("mask-3.png",  "mask-3", "cover.png"),
  @("mask-4.png",  "mask-3", "mask-3-b.png"),

  @("mask-5.png",  "mask-5", "cover.png"),
  @("mask-6.png",  "mask-5", "mask-5-b.png"),

  @("mask-7.png",  "mask-7", "cover.png"),
  @("mask-8.png",  "mask-7", "mask-7-b.png"),

  @("mask-9.png",  "mask-9", "cover.png"),
  @("mask-10.png", "mask-9", "mask-9-b.png"),

  @("mask-11.png", "mask-11", "cover.png"),
  @("mask-12.png", "mask-11", "mask-11-b.png"),

  @("mask-13.png", "mask-13", "cover.png"),
  @("mask-14.png", "mask-13", "mask-13-b.png"),

  @("mask-15.png", "mask-15", "cover.png"),
  @("mask-16.png", "mask-15", "mask-15-b.png"),

  @("mask-17.png", "mask-17", "cover.png"),
  @("mask-18.png", "mask-17", "mask-17-b.png"),

  @("mask-19.png", "mask-19", "cover.png"),
  @("mask-20.png", "mask-19", "mask-19-b.png"),
  @("mask-21.png", "mask-19", "mask-19-c.png"),

  @("mask-22.png", "mask-22", "cover.png"),
  @("mask-23.png", "mask-22", "mask-22-b.png"),

  @("mask-24.png", "mask-24", "cover.png"),
  @("mask-25.png", "mask-24", "mask-24-b.png"),

  @("mask-26.png", "mask-26", "cover.png"),
  @("mask-27.png", "mask-26", "mask-26-b.png"),

  @("mask-28.png", "mask-28", "cover.png"),
  @("mask-29.png", "mask-28", "mask-28-b.png"),

  @("mask-30.png", "mask-30", "cover.png"),
  @("mask-31.png", "mask-30", "mask-30-b.png"),
  @("mask-32.png", "mask-30", "mask-30-c.png"),

  @("mask-33.png", "mask-33", "cover.png"),
  @("mask-34.png", "mask-33", "mask-33-b.png"),

  @("mask-35.png", "mask-35", "cover.png"),
  @("mask-36.png", "mask-35", "mask-35-b.png"),
  @("mask-37.png", "mask-35", "mask-35-c.png"),

  @("mask-38.png", "mask-38", "cover.png"),
  @("mask-39.png", "mask-38", "mask-38-b.png"),
  @("mask-40.png", "mask-38", "mask-38-c.png"),

  @("mask-41.png", "mask-41", "cover.png"),
  @("mask-42.png", "mask-41", "mask-41-b.png"),
  @("mask-43.png", "mask-41", "mask-41-c.png"),

  @("mask-44.png", "mask-44", "cover.png"),
  @("mask-45.png", "mask-44", "mask-44-b.png"),

  @("mask-46.png", "mask-46", "cover.png"),

  @("mask-47.png", "mask-47", "cover.png"),
  @("mask-48.png", "mask-47", "mask-47-b.png"),
  @("mask-49.png", "mask-47", "mask-47-c.png"),

  @("mask-50.png", "mask-50", "cover.png"),
  @("mask-51.png", "mask-50", "mask-50-b.png"),

  @("mask-52.png", "mask-52", "cover.png"),
  @("mask-53.png", "mask-52", "mask-52-b.png"),

  @("mask-54.png", "mask-54", "cover.png"),
  @("mask-55.png", "mask-54", "mask-54-b.png"),
  @("mask-56.png", "mask-54", "mask-54-c.png"),

  @("mask-57.png", "mask-57", "cover.png"),
  @("mask-58.png", "mask-57", "mask-57-b.png"),
  @("mask-59.png", "mask-59", "cover.png"),

  @("mask-60.png", "mask-60", "cover.png"),
  @("mask-61.png", "mask-60", "mask-60-b.png"),
  @("mask-62.png", "mask-60", "mask-60-c.png")
)

foreach ($m in $maskMoves) {
  Move-Asset "$base\masks\$($m[0])" "$base\masks\$($m[1])" $m[2]
}

# =============================================================================
# DRESSES
# =============================================================================
Write-Host "`n--- DRESSES ---" -ForegroundColor Cyan

$dressMoves = @(
  @("dress-1.png",  "dress-1",  "cover.png"),
  @("dress-2.png",  "dress-2",  "cover.png"),
  @("dress-3.png",  "dress-2",  "dress-2-b.png"),
  @("dress-4.png",  "dress-4",  "cover.png"),
  @("dress-5.png",  "dress-5",  "cover.png"),
  @("dress-6.png",  "dress-6",  "cover.png"),
  @("dress-7.png",  "dress-7",  "cover.png"),
  @("dress-8.png",  "dress-8",  "cover.png"),
  @("dress-9.png",  "dress-9",  "cover.png"),
  @("dress-10.png", "dress-9",  "dress-9-b.png"),
  @("dress-11.png", "dress-11", "cover.png"),
  @("dress-12.png", "dress-11", "dress-11-b.png"),
  @("dress-13.png", "dress-13", "cover.png"),
  @("dress-14.png", "dress-13", "dress-13-b.png"),
  @("dress-15.png", "dress-15", "cover.png"),
  @("dress-16.png", "dress-15", "dress-15-b.png"),
  @("dress-17.png", "dress-17", "cover.png"),
  @("dress-18.png", "dress-17", "dress-17-b.png"),
  @("dress-19.png", "dress-19", "cover.png"),
  @("dress-20.png", "dress-19", "dress-19-b.png"),
  @("dress-21.png", "dress-21", "cover.png"),
  @("dress-22.png", "dress-21", "dress-21-b.png"),
  @("dress-23.png", "dress-23", "cover.png"),
  @("dress-24.png", "dress-24", "cover.png"),
  @("dress-25.png", "dress-25", "cover.png"),
  @("dress-26.png", "dress-26", "cover.png"),
  @("dress-27.png", "dress-27", "cover.png"),
  @("dress-28.png", "dress-28", "cover.png"),
  @("dress-29.png", "dress-29", "cover.png"),
  @("dress-30.png", "dress-30", "cover.png"),
  @("dress-31.png", "dress-31", "cover.png"),
  @("dress-32.png", "dress-32", "cover.png"),
  @("dress-33.png", "dress-33", "cover.png"),
  @("dress-34.png", "dress-34", "cover.png"),
  @("dress-35.png", "dress-35", "cover.png"),
  @("dress-36.png", "dress-36", "cover.png"),
  @("dress-37.png", "dress-36", "dress-36-b.png"),
  @("dress-38.png", "dress-38", "cover.png"),
  @("dress-41.png", "dress-38", "dress-38-b.png"),
  @("dress-48.png", "dress-38", "dress-38-c.png"),
  @("dress-39.png", "dress-39", "cover.png"),
  @("dress-40.png", "dress-40", "cover.png"),
  @("dress-42.png", "dress-42", "cover.png"),
  @("dress-43.png", "dress-43", "cover.png"),
  @("dress-44.png", "dress-44", "cover.png"),
  @("dress-45.png", "dress-44", "dress-44-b.png"),
  @("dress-46.png", "dress-42", "dress-42-b.png"),
  @("dress-47.png", "dress-47", "cover.png")
)

foreach ($m in $dressMoves) {
  Move-Asset "$base\dresses\$($m[0])" "$base\dresses\$($m[1])" $m[2]
}

# =============================================================================
# JEWELLERY — 1 image par objet (chaque boucle est unique)
# =============================================================================
Write-Host "`n--- JEWELLERY ---" -ForegroundColor Cyan

for ($i = 1; $i -le 17; $i++) {
  Move-Asset "$base\jewellery\earing-$i.png" "$base\jewellery\earing-$i" "cover.png"
}

Write-Host "`nReorganisation terminee." -ForegroundColor Cyan
Write-Host "Relance 'ng serve' pour que Angular serve les nouveaux chemins."
