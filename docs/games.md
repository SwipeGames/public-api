---
id: games
title: Games
slug: /games
---

# Default Games

Notice all game IDs here start with `sg_` prefix which stands for `Swipe Games` (default).  

The list below represents default game examples.
To retrieve the actual list of games available for your integration, you should always use the [Get Games](/core/get-games-information) API endpoint.

:::caution Response size and latency

The `GET /games` response can be quite large — **over 1 MB** — and the request may take **10–20 seconds** to complete. Make sure your client timeouts are set accordingly.

To significantly reduce payload size and transfer time, send the `Accept-Encoding: gzip` header. The endpoint supports gzip response compression and we strongly recommend using it.

:::

The available game IDs are:  

| Game Name | Game Type | RTP % | Game ID |
| --- | --- | --- | --- |
| Cash Garage   | catch | 97% | sg_catch_97 |
| Cash Garage   | catch | 95% | sg_catch_95 |
| Catch Ahegao  | catch | 97% | sg_catchahegao_97 |
| Catch Ahegao  | catch | 95% | sg_catchahegao_95 |
| Tuna Bomber   | catch | 97% | sg_catchtuna_97 |
| Tuna Bomber   | catch | 95% | sg_catchtuna_95 |
| Smash or Cash | swipe | 97% | sg_swipe_97 |
| Smash or Cash | swipe | 95% | sg_swipe_95 |
| Triple Nipple | swipe | 97% | sg_swipeaigirls_97 |
| Triple Nipple | swipe | 95% | sg_swipeaigirls_95 |
| Swipe Football | swipe | 97% | sg_swipefootball_97 |
| Swipe Football | swipe | 95% | sg_swipefootball_95 |
| Chicken Fryer | swipe | 97% | sg_swipechicken_97 |
| Chicken Fryer | swipe | 95% | sg_swipechicken_95 |

**Game Type** is used to identify the game mechanics (e.g., `catch` or `swipe`). It is not the same as the Game ID or Game Name — multiple games with different names and IDs can share the same game type.

_*_ for other RTP values please contact support.
# Customized Games

We also offer customized versions of our games with different themes, graphics, and sound effects. In such games we use different prefix `<prefix>_`, so you can easily identify them and use e.g. for `cv` prefix (client based) `cv_catch_97` as a game ID.

If you are interested in a customized game, please contact our support team for more information.

