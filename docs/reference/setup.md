# BDS Agent — Setup Guide

## Prerequisites
- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) installed and working
- A Figma account with access to the Backbase Design System files
- macOS (instructions below are macOS-specific)

---

## Step 0 — Show hidden files in Finder

The `.claude/` directory is hidden by default in Finder. To see it:

**Keyboard shortcut (toggle):**
Press `Cmd + Shift + .` in any Finder window. This toggles visibility of all dotfiles/dotfolders. Press again to hide them.

**Permanent (Terminal):**
```bash
defaults write com.apple.finder AppleShowAllFiles -bool true
killall Finder
```
To undo: replace `true` with `false` and run again.

---

## Step 1 — Configure Figma MCP (one-time)

This is user-scoped — works across all your projects, only needs to be done once:

```bash
claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp
```

Then authenticate:
1. Start Claude Code in any project: `claude`
2. Type `/mcp` — verify `figma` appears in the server list
3. Ask anything that triggers a Figma query (e.g., "get screenshot of node 0:1 from file ulkxigZpLlG77lOkdkKS0k")
4. A browser window will open — log in with your Figma account and authorize
5. You're set — this auth persists across sessions

---

## Step 2 — Install the BDS Agent pack

### Option A: New project (greenfield)

Your project has no `CLAUDE.md` yet. Copy everything:

```bash
# Unzip the pack (if zipped)
unzip backbase-bds-agent.zip -d bds-agent-pack

# Copy all files into your project root
cp bds-agent-pack/CLAUDE.md /path/to/your-project/
cp -r bds-agent-pack/reference/ /path/to/your-project/
cp -r bds-agent-pack/assets/ /path/to/your-project/
mkdir -p /path/to/your-project/.claude
cp bds-agent-pack/.claude/settings.local.json /path/to/your-project/.claude/
```

Done. The `CLAUDE.md` is a small stub that references `reference/bds-agent.md`.

---

### Option B: Existing project (brownfield)

Your project already has a `CLAUDE.md` with its own instructions. **Don't overwrite it.**

#### 2a. Copy the non-conflicting directories

```bash
# Unzip the pack (if zipped)
unzip backbase-bds-agent.zip -d bds-agent-pack

# Copy reference files and assets — these don't conflict with anything
cp -r bds-agent-pack/reference/ /path/to/your-project/
cp -r bds-agent-pack/assets/ /path/to/your-project/
```

#### 2b. Append the BDS block to your existing CLAUDE.md

Open your project's `CLAUDE.md` and add this block at the end:

```markdown
## BDS Agent

For all UI and design system work, follow the Backbase Design System agent instructions
in [reference/bds-agent.md](reference/bds-agent.md).

Quick reference files are in `reference/` — tokens, components, Figma guide, mode references.
Brand assets are in `assets/`.
```

#### 2c. Merge settings

Check if `.claude/settings.local.json` already exists in your project:

```bash
cat /path/to/your-project/.claude/settings.local.json 2>/dev/null
```

**If it doesn't exist** — just copy it in:
```bash
mkdir -p /path/to/your-project/.claude
cp bds-agent-pack/.claude/settings.local.json /path/to/your-project/.claude/
```

**If it already exists** — open it and add these entries to the `permissions.allow` array:
```json
"mcp__figma__get_design_context",
"mcp__figma__get_variable_defs",
"mcp__figma__get_metadata",
"mcp__figma__get_screenshot",
"WebSearch",
"WebFetch(domain:designsystem.backbase.com)",
"WebFetch(domain:developers.figma.com)",
"WebFetch(domain:www.figma.com)"
```

These auto-allow the Figma MCP tools so you don't get prompted for every query.

---

## Step 3 — Verify the installation

Start Claude Code in your project:

```bash
cd /path/to/your-project
claude
```

Test with:
```
PROTOTYPE: Dashboard with account summary cards
```

The agent should:
1. Reference `reference/bds-agent.md` for its instructions
2. Query the Figma BDS files via MCP for component specs and tokens
3. Generate a single-file HTML prototype using BDS visual language

---

## What's in the pack

```
bds-agent-pack/
├── CLAUDE.md                        # Stub — references reference/bds-agent.md
├── .claude/
│   └── settings.local.json          # Auto-allow permissions for Figma MCP
├── assets/
│   ├── backbase-wordmark.svg        # Logo wordmark (vector, sharp at any size)
│   └── backbase-favicon.png         # Favicon/icon for small uses
└── reference/
    ├── bds-agent.md                 # Full agent instructions (modes, rules, tokens)
    ├── tokens.md                    # Verified design tokens (colors, type, effects)
    ├── components.md                # 78 BDS web components + Figma node IDs
    ├── figma-guide.md               # Figma MCP tool usage + query sequences
    ├── prototype-mode.md            # HTML template, conventions, quality checklist
    ├── code-mode.md                 # Angular stack reference (aliases, auth, theming)
    └── setup.md                     # This file
```

---

## How it works

| Layer | What it does |
|---|---|
| **Live (Figma MCP)** | Queries actual BDS Figma files in real-time — design changes are immediately available |
| **Cache (`reference/`)** | Known node IDs, token values, component patterns — accelerates first queries |
| **Fallback** | If Figma MCP is unavailable, the agent uses cached values |

**Figma is always the source of truth.** The reference files are a warm-start cache. If Figma
returns values that differ from the cache, Figma wins.

---

## Modes

| Prefix | Output | Use for |
|---|---|---|
| `PROTOTYPE:` | Single-file HTML, inline CSS/JS | Fast ideation, stakeholder review |
| `CODE:` | Angular components, SCSS, specs | Production implementation |

If you don't specify a prefix, the agent will ask which mode you want.

### Theme behavior

| Theme | Prototypes | CODE mode |
|---|---|---|
| **Default** (Blue `#295EFF`) | Always — only theme verified from Figma | Ask user |
| SHC (Red) | Not approximated | Requires project SCSS values |
| Thrive (Green `#108360`) | Not approximated | Requires project SCSS values |

---

## Updating the cache

The `reference/` files are a point-in-time snapshot. If the design system evolves significantly:

1. The agent will still get live data from Figma MCP — the cache just won't have the latest node IDs
2. To refresh the cache, start a Claude Code session and ask:
   ```
   Query the BDS Figma files and update the reference/ cache files with any new tokens or components
   ```
3. The agent will query Figma, compare with the cached files, and update them

---

## Troubleshooting

**"figma" not showing in `/mcp`**
Re-run the MCP add command:
```bash
claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp
```

**Figma queries return "invalid node ID"**
You may need to re-authenticate. Run `/mcp` and check the figma server status.

**Agent doesn't follow BDS instructions**
Check that your `CLAUDE.md` contains the BDS reference block pointing to `reference/bds-agent.md`.
Verify the file exists: `ls reference/bds-agent.md`

**Can't see `.claude/` in Finder**
Press `Cmd + Shift + .` to toggle hidden file visibility.
