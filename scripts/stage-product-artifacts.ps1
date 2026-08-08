<#
.SYNOPSIS
  Collects the already-built installers/APKs from ..\products\* and copies them
  into release\<slug>\ under the stable file names src\data\products.ts links to.

  It does NOT build anything — build each app in its own repo first, then run
  this to gather the artifacts and upload them to GitHub Releases.

.EXAMPLE
  pwsh scripts/stage-product-artifacts.ps1
  pwsh scripts/stage-product-artifacts.ps1 -Upload      # also runs `gh release`
#>
[CmdletBinding()]
param(
  # Create/update the GitHub release for each product and upload its assets.
  [switch]$Upload
)

$ErrorActionPreference = 'Stop'

$siteRoot     = Split-Path -Parent $PSScriptRoot
$productsRoot = Join-Path (Split-Path -Parent $siteRoot) 'products'
$stageRoot    = Join-Path $siteRoot 'release'

if (-not (Test-Path $productsRoot)) { throw "Products folder not found at: $productsRoot" }

# slug -> release tag + the artifacts to look for. `src` globs are relative to
# the product folder; the newest match wins, so version bumps need no edits.
$catalogue = @(
  [ordered]@{
    slug = 'calculate-what-you-do'
    tag  = 'calculate-what-you-do'
    dir  = 'calculate-what-you-do'
    files = @(
      @{ src = 'src-tauri\target\release\bundle\nsis\*-setup.exe'; name = 'CalculateWhatYouDo-Setup.exe' },
      @{ src = 'src-tauri\target\release\bundle\msi\*.msi';        name = 'CalculateWhatYouDo.msi' },
      @{ src = 'src-tauri\gen\android\app\build\outputs\apk\universal\release\*.apk'; name = 'CalculateWhatYouDo.apk' }
    )
  },
  [ordered]@{
    # Shipped as Sthir; the project folder on disk is still named naam-jaap.
    slug = 'sthir'
    tag  = 'sthir'
    dir  = 'naam-jaap'
    files = @(
      @{ src = 'android\app\build\outputs\apk\release\*.apk'; name = 'Sthir.apk' }
    )
  },
  [ordered]@{
    slug = 'eye-rest-reminder'
    tag  = 'eye-rest-reminder'
    dir  = 'screen-tracker'
    files = @(
      @{ src = 'eye-rest-reminder.apk'; name = 'EyeRestReminder.apk' }
    )
  }
)

function Human($bytes) {
  if ($null -eq $bytes) { return '' }
  if ($bytes -ge 1GB) { return '{0:N1} GB' -f ($bytes / 1GB) }
  if ($bytes -ge 1MB) { return '{0:N1} MB' -f ($bytes / 1MB) }
  return '{0:N0} KB' -f ($bytes / 1KB)
}

foreach ($product in $catalogue) {
  $appRoot = Join-Path $productsRoot $product.dir
  Write-Host "==> $($product.slug)" -ForegroundColor Cyan

  if (-not (Test-Path $appRoot)) {
    Write-Warning "  project folder missing: $appRoot — skipped"
    continue
  }

  $outDir = Join-Path $stageRoot $product.slug
  New-Item -ItemType Directory -Force -Path $outDir | Out-Null
  $staged = @()

  foreach ($file in $product.files) {
    $hit = Get-ChildItem -Path (Join-Path $appRoot $file.src) -ErrorAction SilentlyContinue |
           Sort-Object LastWriteTime -Descending | Select-Object -First 1
    if (-not $hit) {
      Write-Warning "  not built yet: $($file.src)"
      continue
    }
    $dest = Join-Path $outDir $file.name
    Copy-Item -Path $hit.FullName -Destination $dest -Force
    $staged += $dest
    Write-Host ("    + {0,-28} {1}" -f $file.name, (Human $hit.Length)) -ForegroundColor Green
    Write-Host ("      size for src/data/products.ts: '{0}'" -f (Human $hit.Length)) -ForegroundColor DarkGray
  }

  if ($staged.Count -eq 0) { continue }

  if ($Upload) {
    # `gh release create` fails if the tag exists, so fall back to upload.
    $exists = $null
    try { $exists = gh release view $product.tag 2>$null } catch {}
    if ($exists) {
      gh release upload $product.tag @staged --clobber
    } else {
      gh release create $product.tag @staged --title $product.slug --notes "Downloads for $($product.slug)."
    }
    if ($LASTEXITCODE -ne 0) { Write-Warning "  gh failed for $($product.tag) — upload it manually" }
  } else {
    $quoted = ($staged | ForEach-Object { '"{0}"' -f $_ }) -join ' '
    Write-Host "    upload with:" -ForegroundColor DarkGray
    Write-Host "      gh release create $($product.tag) $quoted --title `"$($product.slug)`" --notes `"Downloads for $($product.slug).`"" -ForegroundColor DarkGray
  }
}

Write-Host "==> Staged under $stageRoot (gitignored — upload to GitHub Releases)." -ForegroundColor Cyan
