---
id: games
title: Games
slug: /games
---

# Games

To check which games are available for your integration, use the [Get Games](/core/get-games-information) API endpoint directly.

Each game is available in multiple RTP configurations: 85%, 87%, 90%, 92%, 95%, and 97%. For other RTP values, please contact support.

:::caution Response size and latency

The `GET /games` response can be quite large — **over 1 MB** — and the request may take **10–20 seconds** to complete. Make sure your client timeouts are set accordingly.

To significantly reduce payload size and transfer time, send the `Accept-Encoding: gzip` header. The endpoint supports gzip response compression and we strongly recommend using it.

:::

**Game Type** is used to identify the game mechanics (e.g., `catch` or `swipe`). It is not the same as the Game ID or Game Name — multiple games with different names and IDs can share the same game type.

# Customized Games

We also offer customized versions of our games with different themes, graphics, and sound effects.

If you are interested in a customized game, please contact our support team for more information.
