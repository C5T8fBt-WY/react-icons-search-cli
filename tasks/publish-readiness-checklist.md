# Publish Readiness - Checklist

For implementation context and reusable findings, see `tasks/lessons.md`.

---

## Phase 1: Licensing and CLI behavior

- [x] Make icon-pack license metadata available in icon search and detail results
- [x] Add deterministic `--license` filtering to search and list commands
- [x] Add license provenance to SVG downloads and generated attribution notices
- [x] Include third-party notices in the npm package

## Phase 2: Agent Skill distribution

- [x] Default `install --skills` to `.agents/skills`
- [x] Preserve explicit Claude and all-target installation modes
- [x] Update and validate the bundled Agent Skill metadata and instructions

## Phase 3: Package release readiness

- [x] Complete npm package metadata and documentation
- [x] Build, type-check, audit, and inspect the packed artifact
- [x] Install the tarball in a clean consumer and exercise real CLI workflows
- [x] Forward-test discovery and use with short-prompt subagents
