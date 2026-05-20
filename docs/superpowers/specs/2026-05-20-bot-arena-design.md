# Bot Arena — Design Spec

**Date:** 2026-05-20  
**Status:** Approved

## Summary

Add two more bots (UNIT/02, UNIT/03) to the `StatusTile` component. All three bots live in a new `BotArena` strip at the bottom of the status card. They wander horizontally using randomized position state + CSS transitions, and occasionally surface speech bubbles with short techy messages in staggered sequence.

## Architecture

No new files. `BotArena` is a sub-component defined in `src/components/tiles/StatusTile.tsx` and rendered below `.st-rows`.

### StatusTile changes

- Import nothing new — `useState` and `useEffect` already imported.
- Add `BotArena` component above the `StatusTile` function.
- Render `<BotArena accent={accent} />` as the last child of `.st`.

### BotArena component

**Props:** `{ accent: string }`

**State:**
```ts
const [positions, setPositions] = useState<[number, number, number]>([10, 45, 78])
const [bubbles, setBubbles] = useState<[string|null, string|null, string|null]>([null, null, null])
```

**Wander effect** — runs once on mount. Three independent `setInterval` calls with different intervals (2400ms, 3100ms, 2700ms) — each updates only its own bot's position to a random value clamped so the bot stays inside the arena:

```ts
// Per-bot position update, clamped to keep bot inside arena
const clamp = (pct: number) => Math.min(Math.max(pct, 4), 82)
// random target: Math.random() * 78 + 4
```

**Bubble effect** — one `setInterval` at 4500ms. On each tick:
1. Pick a random message set from the pool.
2. Set bot 0's bubble immediately, bot 1's after 600ms, bot 2's after 1300ms.
3. Clear all bubbles after 2200ms.

**Message pool:**
```ts
const MESSAGES = [
  ['PING',  'ACK',     'IDLE...'],
  ['SYN',   'SYN-ACK', 'OK'],
  ['BEEP',  'BOOP',    'ZZZ'],
  ['?',     '!',       '...'],
  ['SCAN',  'FOUND',   'LOL'],
  ['HELLO', 'HI',      '...'],
]
```

**Bot SVG:** Same shape as the existing `hcell-bot` SVG, scaled to `width="22" height="24"`. All three reuse the same SVG, colored by the `accent` prop. Reuse existing `bot-float` and `bot-antenna-tip` CSS animations; stagger the float via `animation-delay` (`0s`, `-1.2s`, `-2.4s`).

**Rendered structure per bot:**
```html
<div class="bot-unit" style={{ left: `${positions[i]}%`, animationDelay: ... }}>
  <div class="bot-bubble {show?}" >{bubbles[i]}</div>
  <svg .../>  <!-- bot SVG -->
</div>
```

## CSS additions (index.css)

```css
/* ─── Bot arena ─── */
.bot-arena {
  position: relative;
  height: 62px;
  border-top: 1px solid var(--line);
  overflow: hidden;
}
.bot-unit {
  position: absolute;
  bottom: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  transition: left 2s ease-in-out;
}
.bot-bubble {
  background: rgba(7,9,18,0.95);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 3px;
  font-family: var(--ff-mono);
  font-size: 8px;
  color: var(--accent);
  padding: 2px 5px;
  letter-spacing: 0.08em;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(3px);
  transition: opacity 0.25s, transform 0.25s;
  pointer-events: none;
}
.bot-bubble::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  border: 3px solid transparent;
  border-top-color: rgba(255,255,255,0.1);
}
.bot-bubble.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Note: `.bot-bubble` needs `position: relative` on `.bot-unit` for the `::after` pseudo-element to anchor correctly — `.bot-unit` already has `position: absolute` so this is fine.

## Existing CSS reused

- `bot-float` keyframe — applied to each bot SVG with staggered `animation-delay`
- `bot-antenna-tip` animation — applied to the antenna tip circle in each SVG

## Out of scope

- No click/hover interactions on bots
- No unique bot identities or different SVG shapes
- No mobile-specific behavior beyond what the tile already has
