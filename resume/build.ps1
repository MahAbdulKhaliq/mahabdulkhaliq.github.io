# Regenerates public/resume.pdf from resume/resume.html using Chrome or Edge.
# Run from anywhere:  powershell -ExecutionPolicy Bypass -File resume\build.ps1

$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$source = Join-Path $here 'resume.html'
$target = Join-Path (Split-Path -Parent $here) 'public\resume.pdf'

$browser = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $browser) {
  Write-Error 'Chrome or Edge is needed to make the PDF.'
  exit 1
}

$profile = Join-Path $env:TEMP 'resume-pdf-profile'
$url = ([System.Uri]$source).AbsoluteUri
$arguments = @(
  '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
  "--user-data-dir=`"$profile`"", "--print-to-pdf=`"$target`"", "`"$url`""
)
Start-Process -FilePath $browser -ArgumentList $arguments -Wait -NoNewWindow

if (Test-Path $target) {
  "Wrote $target ({0:N0} KB)" -f ((Get-Item $target).Length / 1KB)
} else {
  Write-Error 'The PDF was not created.'
  exit 1
}
