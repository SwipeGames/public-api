---
id: free-rounds-bet-lines
title: Bet Lines
slug: /free-rounds-bet-lines
hidden: true
---

# Bet Lines

`Bet lines` are a crucial part of the Swipe Games Public API. They define the betting options available for free rounds in games.
Each `bet line` specifies the settings for a particular game available for players in the game. These settings might include bet amount, multipliers, and other parameters that affect how the game is played.

## Configuration

The `bet lines` are configured prior the free rounds integration. Integrator must fill up the following table and provide it to the Game Provider (Swipe Games):

| Game ID            | Currency | Bet lines                     |
| ------------------ | -------- | ----------------------------- |
| `string` or `null` | `string` | `array` of `bet line` objects |

`null` value in `Game ID` column means that `bet lines` are wildcarded for all games.

You only need to provide values in **USD**. The platform automatically converts USD values to all other supported currencies using daily exchange rates, so there is no need to list every currency. If you want to override the auto-conversion for a specific currency, you can provide custom per-currency values.

`Bet lines` are a **pre-configured menu of staking options** for free rounds. Each entry is an **independent option** — it is **not** a threshold or tier system. The overall structure is the following:

```
[<max_bet>:<max_multiplier>,<max_bet>:<max_multiplier>,...]
```

**where:**

- `max_bet` is the **fixed bet amount** for each free round of that line (in currency units) — it is exactly this amount per round, not an upper limit.
- `max_multiplier` is the maximum win multiplier per round for that line.

e.g. `[1:10,2:20,3:30]` defines three independent bet line options:

- line 1: bet exactly `1 currency unit` per round, 10x max win → max `10 currency units` per round
- line 2: bet exactly `2 currency units` per round, 20x max win → max `40 currency units` per round
- line 3: bet exactly `3 currency units` per round, 30x max win → max `90 currency units` per round

### Selecting a bet line

When issuing free rounds, the operator specifies `bet_line=N`, a **1-based index** into the bet lines array. The platform picks the Nth entry from the configured array and uses its `max_bet` and `max_multiplier` for every free round in that campaign.

For example, with `[1:10,2:20,3:30]`, issuing free rounds with `bet_line=2` selects the second option: a fixed `2 currency unit` bet per round with a 20x max win.

### Why multiple bet lines?

Configuring several bet lines from a single config lets you assign different stake levels to different player segments. For instance, regular players can be issued free rounds on a low-stake line, while VIP players are issued the same campaign on a higher-stake line — without needing a separate configuration for each segment.

### Max Exposure

Max exposure is the maximum amount that can be paid out for a free rounds campaign. It is calculated as:

```
max_exposure = max_bet × max_multiplier × quantity
```

For example, with `[1:10,2:20,3:30]`, issuing 10 free rounds on `bet_line=2`:

```
2.00 × 20 × 10 = 400.00 max exposure
```

Please consult with this documentation about list of games and their bet lines configuration.

### Catch game type example configuration

This is the example configuration for the `catch` game type (see [Games](/games) for the list of game types):

| Currency | Bet lines                                                                                                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| USD      | `{1.00:5.00,1.10:5.00,2.00:5.00,2.50:5.00,3.00:5.00,5.00:5.00}` |
