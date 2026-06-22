<#
.SYNOPSIS
  Builds the StickyNote Tauri app and copies the installer + portable + MSI
  into this site's public/downloads folder, then writes a manifest.json the
  Download component reads (version, file names, human-readable sizes).

.PARAMETER SkipBuild
  Skip `tauri build` and just (re)copy the existing artifacts already in target/release.

.EXAMPLE
  pwsh scripts/publish-artifacts.ps1
  pwsh scripts/publish-artifacts.ps1 -SkipBuild
#>
[CmdletBinding()]
param(
  [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'

# --- Paths -------------------------------------------------------------------
$siteRoot = Split-Path -Parent $PSScriptRoot                 # ...\release-on-my-mind-note-app
$appRoot  = Join-Path (Split-Path -Parent $siteRoot) 'on-my-mind-note'
$relDir   = Join-Path $appRoot 'src-tauri\target\release'
$dlDir    = Join-Path $siteRoot 'public\downloads'

if (-not (Test-Path $appRoot)) { throw "App project not found at: $appRoot" }
New-Item -ItemType Directory -Force -Path $dlDir | Out-Null

# --- Build (uses the repo's MSVC wrapper; vcvars64 must be sourced first) -----
if (-not $SkipBuild) {
  Write-Host '==> Building StickyNote (tauri build via MSVC wrapper)...' -ForegroundColor Cyan
  Push-Location $appRoot
  try {
    npm run app:build:msvc
    if ($LASTEXITCODE -ne 0) { throw "tauri build failed (exit $LASTEXITCODE)" }
  } finally {
    Pop-Location
  }
}

# --- Locate artifacts (version-agnostic globs) -------------------------------
function Find-One($pattern, $label) {
  $hit = Get-ChildItem -Path $pattern -ErrorAction SilentlyContinue |
         Sort-Object LastWriteTime -Descending | Select-Object -First 1
  if (-not $hit) { Write-Warning "Could not find $label ($pattern)"; return $null }
  return $hit
}

$installer = Find-One (Join-Path $relDir 'bundle\nsis\*-setup.exe') 'NSIS installer'
$msi       = Find-One (Join-Path $relDir 'bundle\msi\*.msi')        'MSI package'
$portable  = Find-One (Join-Path $relDir 'StickyNote.exe')          'portable exe'

function Human($bytes) {
  if ($null -eq $bytes) { return '' }
  if ($bytes -ge 1GB) { return '{0:N1} GB' -f ($bytes / 1GB) }
  if ($bytes -ge 1MB) { return '{0:N1} MB' -f ($bytes / 1MB) }
  return '{0:N0} KB' -f ($bytes / 1KB)
}

# --- Copy with stable, friendly names ----------------------------------------
$manifest = [ordered]@{
  version = '0.1.0'
  builtAt = (Get-Date -Format 'yyyy-MM-dd')
}

$plan = @(
  @{ src = $installer; name = 'StickyNote-Setup.exe';    key = 'installer' },
  @{ src = $portable;  name = 'StickyNote-Portable.exe'; key = 'portable'  },
  @{ src = $msi;       name = 'StickyNote.msi';          key = 'msi'       }
)

foreach ($item in $plan) {
  if ($null -eq $item.src) { continue }
  $dest = Join-Path $dlDir $item.name
  Copy-Item -Path $item.src.FullName -Destination $dest -Force
  $manifest[$item.key] = [ordered]@{ file = $item.name; size = (Human $item.src.Length) }
  Write-Host ("    + {0,-26} {1}" -f $item.name, (Human $item.src.Length)) -ForegroundColor Green
}

# Pull the real version out of the installer filename if we can (StickyNote_0.1.0_x64-setup.exe)
if ($installer -and $installer.Name -match '_(\d+\.\d+\.\d+)_') { $manifest.version = $Matches[1] }

$manifest | ConvertTo-Json -Depth 4 | Set-Content -Path (Join-Path $dlDir 'manifest.json') -Encoding utf8
Write-Host "==> Wrote manifest.json (v$($manifest.version)) to public/downloads" -ForegroundColor Cyan
Write-Host "==> Done. Run 'npm run dev' to preview, or 'npm run build' to produce the static site." -ForegroundColor Cyan
