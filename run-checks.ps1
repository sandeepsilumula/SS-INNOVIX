# ============================================================
# Multi-Stack Validation Harness
# Auto-generated -- adapts to detected stacks
# Detected: node, graphify
# ============================================================

$failedStacks = @()
$skippedStacks = @()
$errorLog = ".\.claude\last_error.log"
if (Test-Path $errorLog) { Remove-Item $errorLog }

# Prerequisite tool checks
$requiredTools = @{
    "node"     = @{ Cmd = "node";     Check = "node --version" }
    "python"   = @{ Cmd = "python";   Check = "python --version" }
    "go"       = @{ Cmd = "go";       Check = "go version" }
    "rust"     = @{ Cmd = "cargo";    Check = "cargo --version" }
    "java"     = @{ Cmd = "java";     Check = "java -version" }
    "terraform"= @{ Cmd = "terraform";Check = "terraform version" }
    "docker"   = @{ Cmd = "docker";   Check = "docker --version" }
    "dotnet"   = @{ Cmd = "dotnet";   Check = "dotnet --version" }
    "ruby"     = @{ Cmd = "ruby";     Check = "ruby --version" }
    "php"      = @{ Cmd = "php";      Check = "php --version" }
}

Write-Host ""
Write-Host "  Running Validation Gates..." -ForegroundColor Cyan
Write-Host ""
Write-Host "  Checking prerequisites..." -ForegroundColor Cyan

$stacksToRun = @()
foreach ($stack in $detectedStacks) {
    if ($requiredTools.ContainsKey($stack)) {
        $tool = $requiredTools[$stack]
        try {
            $null = & cmd /c "$(.Check) 2>&1" 2>$null
            if ($LASTEXITCODE -eq 0) {
                $stacksToRun += $stack
                Write-Host "    [OK] $(.Cmd) found" -ForegroundColor Green
            } else {
                $skippedStacks += $stack
                Write-Host "    [SKIP] $(.Cmd) not found -- $stack validation skipped" -ForegroundColor Yellow
            }
        } catch {
            $skippedStacks += $stack
            Write-Host "    [SKIP] $(.Cmd) not found -- $stack validation skipped" -ForegroundColor Yellow
        }
    } else {
        $stacksToRun += $stack
    }
}

if ($skippedStacks.Count -gt 0) {
    Write-Host ""
    Write-Host "  Skipped stacks (tools not installed): $( -join ', ')" -ForegroundColor Yellow
}
Write-Host ""


# [Node.js] Validation
if (Test-Path "package.json") {
    # Check if test script exists
    $pkg = Get-Content package.json | ConvertFrom-Json
    if ($pkg.scripts -and $pkg.scripts.test) {
        Write-Host "  [Node.js] Running npm test..." -ForegroundColor Cyan
        $nodeOutput = & npm test 2>&1 | Select-Object -Last 10
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  [Node.js] FAIL" -ForegroundColor Red
            $nodeOutput | ForEach-Object { Write-Host "    $_" -ForegroundColor Red }
            $failedStacks += "Node.js"
        } else {
            Write-Host "  [Node.js] PASS" -ForegroundColor Green
        }
    } else {
        Write-Host "  [Node.js] No test script found -- running build validation..." -ForegroundColor Cyan
        $nodeOutput = & npm run build 2>&1 | Select-Object -Last 10
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  [Node.js] FAIL" -ForegroundColor Red
            $nodeOutput | ForEach-Object { Write-Host "    $_" -ForegroundColor Red }
            $failedStacks += "Node.js"
        } else {
            Write-Host "  [Node.js] PASS (build)" -ForegroundColor Green
        }
    }
}

Write-Host ""
if ($failedStacks.Count -gt 0) {
    Write-Host "  [STATUS] FAILED -- $($failedStacks.Count) stack(s) with errors: $($failedStacks -join ', ')" -ForegroundColor Red
    exit 1
} else {
    Write-Host "  [STATUS] ALL GATES PASSED" -ForegroundColor Green
    exit 0
}