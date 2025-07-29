---
id: game-session
title: Game Session
slug: /game-session
---

We run game session for every `Create New Game` request even if the external (integration) session is the same.
It has the following properties:

-   has default duration of 4 hrs.
-   game session contains game settings specific info, such as min/max bets, this prevents changing game settings during the game session. Game client uses it to fetch the game settings.
