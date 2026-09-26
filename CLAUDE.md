# system-development-skills

A Claude Code plugin / marketplace repository that collects skills reused across projects.
Other repositories load it through `extraKnownMarketplaces` / `enabledPlugins` in their `.claude/settings.json`, so whatever is on `main` reaches every project that uses it.

# RTK (Rust Token Killer)

Prefix every shell command with `rtk`, including each command in an `&&` chain — it is always safe (a dedicated filter cuts noisy output for tests, builds, git, and more; anything without one passes through unchanged). The full command reference is in the global `~/.claude/RTK.md` (already loaded, if set up). Meta commands: `rtk gain` (savings so far), `rtk discover` (missed opportunities in past sessions), `rtk proxy <cmd>` (run unfiltered, for debugging).

## Working conventions

- Skill names are referenced by other repositories as `system-development-skills:<skill-name>`. Do not rename or remove a skill without updating the repositories that use it; prefer adding a new skill over changing the purpose of an existing one.
- When adding a skill, add it to the list in `README.md` and update the descriptions in `.claude-plugin/marketplace.json` and `plugin.json` if the plugin's scope changes.
- In this repository, `.claude/skills` is a symlink to `skills/`, so the skills load as project skills under their plain names (such as `finalize-artifacts`) and edits to `skills/` can be tried here.
- `git commit` runs the lefthook hooks. If they fail, fix the reported issues. Do not use `--no-verify`.
- Run `mise run check` after making changes.

## Code map

```text
skills/<skill-name>/
  SKILL.md       Skill definition (frontmatter name/description, then instructions).
  references/    Detailed instructions that SKILL.md links to.
.claude/skills   Symlink to skills/ (loads the skills as project skills in this repository).
.claude-plugin/
  marketplace.json  Marketplace definition (this repository is both the marketplace and its single plugin).
  plugin.json       Plugin definition.
.devcontainer/   Dev container (mise, rtk, lefthook).
mise.toml        Tool versions and tasks (install/fmt/lint/hooks/setup/check).
package.json     textlint and markdownlint for the skill Markdown files (skills/).
.markdownlint-rules/  Custom markdownlint rules (SKILL.md frontmatter and length).
```

# Artifact Cleanup

## Golden Rule

**Whenever you produce an artifact, always run the `finalize-artifacts` skill to clean it up before reporting the work as done.**

An artifact is any deliverable you create or substantially rewrite: documents, READMEs, code and code comments, config files, scripts, commit messages, PR descriptions, and so on.

- Invoke the skill via the Skill tool (`finalize-artifacts`) after the artifact is written and before the final reply.
- The skill edits the artifact files in place. Do not append a changelog of the cleanup to the artifact; in the final reply, mention what changed in a sentence or two at most unless the user asks for a full report.
- Skip it only for replies that produce no artifact (answering questions, explaining code, running read-only commands).
- Loaded from `skills/finalize-artifacts/` through the `.claude/skills` symlink.
