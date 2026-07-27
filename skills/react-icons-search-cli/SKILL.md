---
name: react-icons-search-cli
description: Search React Icons, inspect exact imports, filter icon packs by license, and export license-aware SVG files. Use when selecting icons for React code or downloading React Icons artwork.
license: MIT
allowed-tools: Bash(react-icons-search-cli:*) Bash(react-icons-search:*)
---

# React Icons Search CLI

Use `react-icons-search-cli` when a project needs an icon from `react-icons` and the agent should avoid loading MCP tool schemas.

## CLI Availability

If `react-icons-search-cli --help` is unavailable, report this installation command to the user:

```bash
npm install -g react-icons-search-cli@latest
```

To install this skill into the current project for agents that read local skills:

```bash
react-icons-search-cli install --skills
```

This installs to `.agents/skills/react-icons-search-cli` by default.

## Quick Start

```bash
react-icons-search-cli search user --library fa --limit 5
react-icons-search-cli details fa FaUser
react-icons-search-cli examples fa --icon FaUser
```

## Commands

```bash
react-icons-search-cli libraries
react-icons-search-cli libraries --counts
react-icons-search-cli prefixes
react-icons-search-cli search <query>
react-icons-search-cli search <prefix>:<query>
react-icons-search-cli search <query> --library <prefix> --limit 10
react-icons-search-cli search <query> --license MIT,ISC,Apache-2.0
react-icons-search-cli search <query> --exhaustive --format json
react-icons-search-cli list <prefix> --filter <query>
react-icons-search-cli details <prefix> <iconName>
react-icons-search-cli examples [prefix] --icon <iconName>
react-icons-search-cli download <prefix> <iconName...> --out-dir ./icons
react-icons-search-cli export <prefix> <iconName> --filename icon.svg
```

## Agent Guidance

Prefer `--format json` when the result will be parsed or reused in code generation.

Prefer a scoped search first when the target design system already has an icon family:

```bash
react-icons-search-cli search save --library lu --limit 8 --format json
```

When a project restricts asset licenses, pass its allowed identifiers through
`--license`. Do not silently substitute a pack outside that policy.

Use `details` before editing application code so the import path and component name are exact:

```bash
react-icons-search-cli details lu LuSave --format json
```

Use `download` when the requested result should be an image file. It writes standalone SVG files:

```bash
react-icons-search-cli download lu LuSave LuSearch --size 32 --color "#111827" --out-dir ./icons --format json
```

Preserve the generated `.LICENSE.md` file when redistributing an exported SVG.
For attribution or share-alike licenses, follow the reported upstream terms.
