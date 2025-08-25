---
id: core
title: Swipe Games Public Core API
slug: /core
---

We use this API for direct calls from the integration to our platform.

### Game Launch URL

When you issue `Create New Game` request, you will receive `Game URL` in the response. This response is used to configure and launch the game.
Please consult with [Game Launch URL](game-launch-url.md) documentation for more details.

### Environments

We have two stable environments you can use for integration and testing:

-   **Staging** - this is a testing environment that is used for integration and testing purposes. It is not intended for production use.  
    https://staging.platform.0.swipegames.io/api/v1
