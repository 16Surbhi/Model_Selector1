# Model Compass Research Archive

This archive contains the frozen scoring implementation, evaluation harnesses, and manuscript source for the Model Compass study. It preserves the implementation used to produce the paper's analyses; the live application has since evolved, and its current registry and scores are not the basis of the paper's results. This is a research snapshot, not a current application build.

## Contents

- `src/`: scoring entry point, the frozen implementation modules, the quality-factor formula, and reference baseline aggregators.
- `experiments/`: the paper's frontier, budget/balanced, matched-penalty, ablation, and statistical-validation scripts. `experiments/support/` contains parser pins and auxiliary diagnostics.
- `data/data_schema.json`: required input fields and provenance.
- `data/permitted_frozen_inputs/`: empty in this archive because the study-specific third-party data are not cleared for redistribution. See `data/data_access_instructions.md`.
- `paper.tex`: the manuscript version checked against the saved frozen results.
- `tests/`: implementation-level math checks that do not need external data.

## Reproduction status

The reported tables were checked against the saved 47-model, 2026-10-08 headline run: the independent paper-number checker reports 48/48 checks passing. The frozen input registry and Arena snapshots are not included, so a clean checkout cannot regenerate those empirical tables until the exact inputs are obtained through an authorized route. The two local snapshot files are present in the author's working project, but are not copied here. The official historical Arena dataset hosted by Hugging Face is a possible licensed source for a future rerun; equivalence to the paper's frozen headline column has not been established.

The parser output is pinned in `experiments/support/intents.frozen.json`; evaluation scripts do not need a live LLM call. Do not regenerate paper results with the application registry or a regex parser fallback: the paper's registry revision and parser vectors are part of the frozen protocol.

## Run

1. Obtain authorization for the study-specific inputs or prepare equivalent, documented inputs from an authorized release. Follow `data/data_access_instructions.md`.
2. Put the model registry, both Arena input files, and `model-registry.seed.json` (if required by the registry reader) in `data/permitted_frozen_inputs/` using the exact names in `data/data_schema.json`.
3. Run `bash reproduce.sh` from this directory with Node.js 20+ and Python 3.8+, or run `./reproduce.ps1` in PowerShell on Windows.

The run script stops with a list of missing inputs before starting if the freeze is incomplete. It uses recorded parser outputs and makes no network requests.

## Reuse and attribution

The `LICENSE` file states the current reuse terms for the authors' code. Arena, OpenRouter, Hugging Face, Artificial Analysis, and any other third-party data or software retain their own terms. Do not redistribute a data file merely because the source was publicly viewable.
