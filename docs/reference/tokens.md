# BDS Design Tokens — Verified Reference

Source: Figma Design Tokens 2.0 (`ulkxigZpLlG77lOkdkKS0k`, node `305:0`)
Extracted via: `get_variable_defs` on Welcome page nodes

## Colors (verified from Figma)

### Default Theme Primitives (Blue)
| Token | Value |
|---|---|
| `color/dark/primary/default` | `#295eff` |
| `color/dark/primary/lighter` | `#a4b1ff` |
| `color/dark/primary/lightest` | `#dee2ff` |
| `color/dark/neutral/white` | `#ffffff` |
| `color/light/lime/default` | `#79c716` |

### Semantic Tokens (Light Mode)
| Token | Value |
|---|---|
| `foreground/default` | `#061223` |
| `foreground/support` | `#3A495D` |
| `foreground/brand` | `#295EFF` |
| `foreground/on-color` | `#FFFFFF` |
| `background/surface-1` | `#FFFFFF` |
| `background/surface-2` | `#F5F7FA` |
| `background/page` | `#F5F7FA` |
| `background/brand-subtle` | `#DEE2FF` |
| `background/shadow` | `rgba(0,0,0,0.56)` |
| `border/subtle` | `#CCD5DF` |
| `link/default` | `#295EFF` |

### Semantic Tokens (Dark Mode)
| Token | Value |
|---|---|
| `color/foreground/default` | `#ffffff` |
| `color/foreground/support` | `#a1a8b2` |
| `color/background/surface-1` | `#292b2e` |
| `color/background/shadow` | `#0000008f` |
| `color/link/default` | `#a4b1ff` |

## Typography (verified)
| Token | Value |
|---|---|
| `font-family/heading` | `Libre Franklin` |
| `font-family/default` | `Libre Franklin` |
| `Web/Headings/Heading 1` | Bold, 34px, line-height 51, letter-spacing 0 |
| `Web/Headings/Heading 2` | Bold, 24px, line-height 36, letter-spacing 0 |
| `Web/Highlight/Regular` | Regular, 18px, line-height 27, letter-spacing 0 |
| `Web/Body/Semibold` | SemiBold, 16px, line-height 24, letter-spacing 0 |
| `Web/Subtitle/Semibold` | SemiBold, 14px, line-height 21, letter-spacing 0 |
| `Web/Subheader/Regular` | Regular, 12px, line-height 18, letter-spacing 0 |

## Effects (verified)
| Token | Value |
|---|---|
| `Large Shadow` | DROP_SHADOW, color: `color/background/shadow`, offset (0, 15), radius 20, spread 0 |
| Component shadow | `rgba(16, 47, 67, 0.1)` — used across cards, notifications, dropdowns |

## Themes
| Theme | Primary Color | Default? |
|---|---|---|
| Default | `#295EFF` (Blue) | No |
| SHC | Red (approx `#C8102E`) | Yes |
| Thrive | `#108360` (Green) | No |

## Notes
- Tokens stored as Figma Variables, NOT on canvas pages
- Only the Welcome page (`305:0`) exists as a canvas in the tokens file
- To access full variable set, use Figma REST API `/v1/files/:key/variables/local`
- 3-tier architecture: Primitive → Semantic → Component tokens
