# react-icons-search-cli

A token-efficient CLI for searching and inspecting [React Icons](https://react-icons.github.io/react-icons/), adapted from the ideas in [`anshuopinion/react-icons-mcp`](https://github.com/anshuopinion/react-icons-mcp).

## Why CLI instead of MCP?

`react-icons-mcp` exposes five MCP tools: list libraries, search icons, list a library, get icon details, and get usage examples. This package keeps that behavior but exposes it as short terminal commands, following the same split described by Playwright:

- CLI is better for coding agents that need compact, repeatable command output without loading MCP schemas into context.
- MCP remains useful when a client needs persistent state, rich tool negotiation, or a long-running agent loop.

React Icons search is naturally stateless, so a CLI is the smaller fit.

## Installation

```bash
npm install -g react-icons-search-cli@latest
react-icons-search-cli --help
```

### Installing Skills

Claude Code, GitHub Copilot, and other agents can use locally installed skills.

```bash
react-icons-search-cli install --skills
```

By default this installs the bundled skill into the portable
`.agents/skills/react-icons-search-cli` location in the current project.

Additional targets:

```bash
react-icons-search-cli install --skills=claude  # .claude/skills/react-icons-search-cli
react-icons-search-cli install --skills=all     # both .claude and .agents
react-icons-search-cli install --skills-dir ./myskills/skills
```

The installer updates files it manages but refuses to replace a skill directory
containing unknown files. Review that directory before using `--force`.

Local development:

```bash
npm install
npm run build
node dist/cli.js search user --library fa
```

## Commands

```bash
react-icons-search-cli libraries              # list known react-icons libraries
react-icons-search-cli libraries --counts     # include exact counts by loading packages
react-icons-search-cli prefixes               # print prefixes only

react-icons-search-cli search user            # search priority libraries first
react-icons-search-cli search fa:user         # MCP-style scoped query
react-icons-search-cli search user --library fa6 --limit 5
react-icons-search-cli search user --license MIT,ISC,Apache-2.0
react-icons-search-cli search "arrow left" --exhaustive --format json

react-icons-search-cli list fa --limit 20
react-icons-search-cli list lu --license ISC
react-icons-search-cli list md --filter home --format yaml

react-icons-search-cli details fa FaUser
react-icons-search-cli examples fa --icon FaUser

react-icons-search-cli download fa FaUser --out-dir ./icons
react-icons-search-cli download lu LuSave LuSearch --size 32 --color "#111827" --out-dir ./icons
react-icons-search-cli export md MdHome --filename home.svg --out-dir ./icons
```

Global output formats:

```bash
react-icons-search-cli --format table search user
react-icons-search-cli --format json details fa FaUser
react-icons-search-cli --format yaml libraries --counts
```

## MCP Mapping

| MCP tool | CLI command |
| --- | --- |
| `get_icon_libraries` | `react-icons-search-cli libraries` |
| `search_icons` | `react-icons-search-cli search <query>` |
| `get_library_icons` | `react-icons-search-cli list <prefix>` |
| `get_icon_details` | `react-icons-search-cli details <prefix> <icon>` |
| `get_icon_usage_examples` | `react-icons-search-cli examples [prefix]` |

## Downloading Icons

Use `download` to render one or more icon exports as standalone SVG image files:

```bash
react-icons-search-cli download fa FaUser --out-dir ./icons
react-icons-search-cli download fa FaUser,FaHome --out-dir ./icons --format json
react-icons-search-cli download lu LuSave --size 48 --color "#2563eb" --filename save.svg
```

The command writes SVG files named `<prefix>-<IconName>.svg` by default and
prints the written file paths. Each SVG contains source and license provenance,
and each has a neighboring `<prefix>-<IconName>.LICENSE.md` notice. `export` is
an alias for `download`.

## Icon licenses

The CLI code is MIT-licensed, but each icon pack retains its upstream license.
Use `libraries` to inspect licenses and `--license` to restrict `search` or
`list` to accepted licenses:

```bash
react-icons-search-cli libraries
react-icons-search-cli search save --license MIT,ISC,Apache-2.0 --format json
```

Canonical SPDX-style identifiers are used where available: `MIT`, `ISC`,
`Apache-2.0`, `MPL-2.0`, `CC-BY-3.0`, `CC-BY-4.0`, `CC-BY-SA-3.0`,
`CC0-1.0`, and `OFL-1.1`. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)
for sources and license links.

## Notes

- The library metadata is static, but icon names and `--counts` come from the installed `react-icons` package at runtime.
- The CLI supports Node.js 18 or newer.
- Generated SVG files are produced from `react-icons`; individual icon artwork remains governed by the source icon pack license reported by the CLI and its generated notice.
- Search defaults to the commonly used libraries first for fast agent workflows. Use `--exhaustive` when ranking across every library matters more than latency.
- `react-icons-search` is also shipped as a short alias for `react-icons-search-cli`.
- User-facing errors are concise by default. Set `REACT_ICONS_SEARCH_DEBUG=1` to print full stack traces while debugging.

## Releases

Pushes to `main` run `.github/workflows/publish.yml`. The workflow compares the
version in `package.json` with npm:

- An unpublished version is verified and published.
- A version already present on npm is skipped successfully.
- Registry or network errors fail the workflow instead of being treated as a
  missing version.

Publishing uses npm trusted publishing with GitHub Actions OIDC. It does not
require an `NPM_TOKEN`. Before enabling automatic releases:

1. Publish the initial package version manually because trusted-publisher
   settings are configured on an existing npm package.
2. In the npm package settings, add a GitHub Actions trusted publisher for the
   repository and workflow filename `publish.yml`.
3. Allow `npm publish` for that trusted publisher.
4. Increment `package.json` before merging a release to `main`.

The workflow injects repository, homepage, and issue metadata from
`GITHUB_REPOSITORY`, ensuring the published package points to its actual source
repository.
