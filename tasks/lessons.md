# Lessons

- This workspace started empty, so the React Icons CLI is a new package rather than an edit to existing code.
- `react-icons-mcp` keeps useful domain logic in dynamic `react-icons/<prefix>` imports; a CLI can reuse that stateless model without the MCP transport.
- `commander@15` requires Node `>=22.12`, so this project uses `commander@12` to preserve the Node 18 floor used by the upstream MCP.
- For package proof, installing the packed tarball into a clean consumer project is more reliable than `npm exec --package file:.`, which can resolve flags and bins in surprising ways.
- React Icons components render naturally to standalone SVG through `react-dom/server`; SVG export avoids an unnecessary raster dependency for this CLI.
- Short-prompt subagents could discover the CLI via `--help` and get proper search/details/download results; they also surfaced two UX issues: stack traces on user errors and generic `SaveButton` examples for non-save icons.
- Default CLI errors should stay concise for users; `REACT_ICONS_SEARCH_DEBUG=1` is the opt-in path for stack traces.
- The React Icons CLI skill was installed into the user skill registry at `C:/Users/ShimaLab/Mitoma/GitWin/myskills/skills/react-icons-search-cli/SKILL.md`; keep the repo copy and installed copy in sync when changing the skill.
- Public npm readiness requires keeping packaged skill docs free of machine-specific local paths; `react-icons-search-cli install --skills` now follows the Playwright CLI style.
- Cross-agent skill installation should default to `.agents/skills`; keep `.claude/skills` as an explicit compatibility target.
- Skill updates must not recursively delete unknown user files. Stage replacements, preserve recoverability, and require `--force` when unmanaged files exist.
- Icon-pack license metadata must be pinned to a reviewed `react-icons` version; exported SVGs should carry provenance and neighboring notices without claiming those notices replace the upstream license terms.
- Public release gates should run type checking, behavior tests, and Agent Skill validation from `prepack`, then prove the exact tarball in a clean consumer.
- Main-branch npm automation should be version-driven: publish only when `package.json` names an unpublished version, skip existing versions, and fail closed on registry errors.
- Prefer npm trusted publishing with GitHub OIDC over long-lived `NPM_TOKEN` secrets; inject repository metadata from `GITHUB_REPOSITORY` when the final repository identity is not yet fixed locally.
