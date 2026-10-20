$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

$required = @(
  'data/permitted_frozen_inputs/model-registry.json',
  'data/permitted_frozen_inputs/arena_snapshot_2026-10-08.json',
  'data/permitted_frozen_inputs/arena_full_2026-10-02.json'
)
$missing = @($required | Where-Object { -not (Test-Path -LiteralPath $_ -PathType Leaf) })
if ($missing.Count -gt 0) {
  Write-Error ("Cannot reproduce the paper panels; missing authorized frozen input(s):`n  " + ($missing -join "`n  ") + "`nSee data/data_access_instructions.md. The archive excludes these third-party inputs.")
  exit 2
}

New-Item -ItemType Directory -Force -Path scratch | Out-Null
node --test tests/math_invariants.test.js
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
node experiments/frontier_evaluation.js
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
node experiments/budget_balanced_evaluation.js
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
node experiments/matched_penalty_comparison.js
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
node experiments/support/weights_swing.js
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
python experiments/statistical_validation.py
exit $LASTEXITCODE
