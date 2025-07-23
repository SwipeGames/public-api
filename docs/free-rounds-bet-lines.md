---
id: free-rounds-bet-lines
title: Bet Lines
slug: /free-rounds-bet-lines
---

# Bet Lines

`Bet lines` are a crucial part of the Swipe Games Public API. They define the betting options available for free rounds in games.
Each `bet line` specifies the settings for a particular game available for players in the game. These settings might include bet amount, multipliers, and other parameters that affect how the game is played.

## Configuration

The `bet lines` are configured prior the free rounds integration. Integrator must fill up the following table and provide it to the Game Provider (Swipe Games):

| Game ID            | Currency           | Bet lines                     |
| ------------------ | ------------------ | ----------------------------- |
| `string` or `null` | `string` or `null` | `array` of `bet line` objects |

`null` value in `Game ID` or `Currency` columns means that `Bet lines` are wildcarded for all games/currencies.
`Bet lines` configuration is games specific, but overall structure is the following:

```
[<max_bet>:<max_multiplier>,<max_bet>:<max_multiplier>,...]
```

**where:** `max_bet` is the maximum bet amount for the line (in currency units), and `max_multiplier` is the multiplier applied to the bet.

e.g. `[1:10,2:20,3:30]` means that there are three bet lines available:

-   line 1: bet `1 currency unit` with 10x multiplier
-   line 2: bet `2 currency units` with 20x multiplier
-   line 3: bet `3 currency units` with 30x multiplier

Please consult with this documentation about list of games and their bet lines configuration.

### Catch game configuration

[TODO]

### Swipe game configuration

[TODO]
