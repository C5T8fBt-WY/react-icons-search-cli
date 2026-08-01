# react-icons-search-cli

Agent-friendly CLI for searching [React Icons](https://react-icons.github.io/react-icons/), inspecting usage, and downloading license-aware SVG files.

## Quick Start

```bash
npm install -g react-icons-search-cli@latest
react-icons-search-cli search save --limit 5
react-icons-search-cli download lu LuSave --out-dir ./icons
```

Install the bundled skill for Claude Code, GitHub Copilot, and other agents:

```bash
react-icons-search-cli install --skills
```

## Common Usage

```bash
# Search by name, optionally restricting icon-pack licenses.
react-icons-search-cli search user --license MIT,ISC,Apache-2.0 --limit 10

# Return compact structured output for agents and scripts.
react-icons-search-cli --format json search "arrow left" --exhaustive

# Inspect the exact React import and JSX usage.
react-icons-search-cli details fa FaUser

# Download SVG files with neighboring license notices.
react-icons-search-cli download lu LuSave LuSearch --size 32 --out-dir ./icons

# List icon libraries, prefixes, licenses, and source URLs.
react-icons-search-cli libraries
```

Run `react-icons-search-cli --help` for all commands and options.

## License Warning

The CLI code is MIT-licensed, but the icons are not covered by the CLI license. Each icon pack retains its upstream license. Check `libraries`, use `--license` when appropriate, and review [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) before distributing downloaded icons.

Downloaded SVGs include provenance and a neighboring `.LICENSE.md` notice. These notices do not replace the upstream license terms or legal review.

## Acknowledgements

- Built on [React Icons](https://github.com/react-icons/react-icons).
- Adapted from the stateless icon-search capabilities of [`anshuopinion/react-icons-mcp`](https://github.com/anshuopinion/react-icons-mcp).
