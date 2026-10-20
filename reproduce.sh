#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

required=(
  data/permitted_frozen_inputs/model-registry.json
  data/permitted_frozen_inputs/arena_snapshot_2026-10-08.json
  data/permitted_frozen_inputs/arena_full_2026-10-02.json
)
missing=()
for input in "${required[@]}"; do
  [[ -s "$input" ]] || missing+=("$input")
done
if ((${#missing[@]})); then
  printf 'Cannot reproduce the paper panels; missing authorized frozen input(s):\n' >&2
  printf '  %s\n' "${missing[@]}" >&2
  printf 'See data/data_access_instructions.md. The archive does not include these third-party inputs.\n' >&2
  exit 2
fi

mkdir -p scratch
node --test tests/math_invariants.test.js
node experiments/frontier_evaluation.js
node experiments/budget_balanced_evaluation.js
node experiments/matched_penalty_comparison.js
node experiments/support/weights_swing.js
python experiments/statistical_validation.py
