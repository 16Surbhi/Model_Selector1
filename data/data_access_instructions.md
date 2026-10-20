# Data access and local placement

The frozen study inputs are not distributed in this archive. Do not scrape or copy Arena service output into this repository unless Arena authorizes that use in writing. The current Arena Terms of Use are at <https://help.arena.ai/articles/5629909088-terms-of-use?lang=en>. The official historical leaderboard dataset is at <https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset> and is labeled CC BY 4.0 by its publisher. Before substituting it, verify that the relevant dated records and metric definition match the manuscript; a different source snapshot is a new analysis, not an exact reproduction.

If an authorized study freeze is supplied, place the files under `data/permitted_frozen_inputs/` with these names:

- `model-registry.json`
- `arena_snapshot_2026-10-08.json`
- `arena_full_2026-10-02.json`
- optionally, `model-registry.seed.json`

Record permission or license evidence, retrieval date, and SHA-256 for each file in the local study log. Keep credentials and API keys out of the archive. The analysis harnesses use pinned parser outputs and do not require a Cohere key.
