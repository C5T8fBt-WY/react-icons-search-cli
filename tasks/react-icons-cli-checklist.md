# React Icons CLI Implementation - Checklist

For detailed findings, analysis, and rationale, see the conversation and `README.md`.

DO:
- frequently update an item right after it's done
- check unchecked items
- add new unchecked items
- note direction changes
- note why items are blocked

DON'T:
- newly add already-checked items
- delete items: rather use strikethrough

---

## Phase 1: Research

### 1.1 Understand references
- [x] Inspect `anshuopinion/react-icons-mcp` package, service, and MCP tools
- [x] Inspect Playwright MCP vs CLI messaging and command style

## Phase 2: Implementation

### 2.1 Build package
- [x] Add TypeScript package scaffolding
- [x] Implement library metadata and dynamic react-icons loading
- [x] Implement CLI commands for libraries, search, list, details, examples, and prefixes
- [x] Add compact table, JSON, and YAML output formats
- [x] Add README and agent skill notes

## Phase 3: Proof

### 3.1 Verify behavior
- [x] Install dependencies and generate lockfile
- [x] Build and type-check the project
- [x] Run npm audit
- [x] Invoke the CLI as a real consumer for each core workflow

## Phase 4: Image Downloads

### 4.1 Export icons as image files
- [x] Add dependencies needed to render React icon components to SVG
- [x] Implement a CLI command that writes one or more icons as SVG files
- [x] Document the download workflow
- [x] Test the installed CLI against several icon examples, including generated files

## Phase 5: Subagent UX Findings

### 5.1 Fix discoverability issues found by subagents
- [x] Replace default stack traces with concise CLI error messages
- [x] Keep full stack traces available for debugging
- [x] Generate usage examples with icon-specific labels instead of hardcoded Save wording
- [x] Verify the failing icon case and `examples fa --icon FaUser`

## Phase 6: Public npm readiness

### 6.1 Match Playwright CLI install pattern
- [x] Add `install --skills` command
- [x] Remove machine-specific paths from packaged skill docs
- [x] Add npm package metadata needed for public publication
- [x] Add license file
- [x] Verify skill installation, package export, pack dry-run, and publish dry-run
