---
id: getting-started
title: Getting Started
slug: /
---

# Swipe Games Public API Documentation

This documentation provides a comprehensive guide to the Swipe Games Public API, detailing its features, endpoints, and usage.  
Whether you're a developer looking to integrate with our platform or simply curious about our API capabilities, you'll find all the information you need here.

### Learn about this documentation, API, platform and integration process

- To learn about Terms used in this API please refer to the [Terms](/terms).
- Swipe Games Public API consists of two APIs. To learn about each of them, please refer to the following sections:
    -  [Core Public API](/core)
        This is the main integration API (direct) that allows you to create and manage games, free rounds and other core functionalities.
    -  [Swipe Games Integration Adapter API](/swipegames-integration)
        This is an Adapter API (reverse integration) you need to implement in your game server to allow Swipe Games to communicate with your game server. Please follow the link and use our OpenAPI specification for simpler integration.
-   We have 2 stable [Environments](/core#environments) you could use for integration and testing: `staging` and `production`.

## Integration Process

> 📝 **To start the integration process, please fill out our Integration Request Form:**  
> **[https://forms.gle/JZPyegfDxgEAvdVb7](https://forms.gle/JZPyegfDxgEAvdVb7)**  
> This form is essential for partners to provide their integration details and begin the onboarding process.

Integration process consists of the following steps:

-   Registering and providing us with your integration details.
-   Integrating [Core Public API](/core) into your back end.
-   Implementing [Swipe Games Integration Adapter API](/swipegames-integration) on your back end.

### Registration and Integration Details

To start using our Public API, you need to register an account on our portal (or request via any communication channel)
and provide us the following details:

-   Your IP addresses or range of IP addresses that will be used to access the Public API (for both environments: staging and production).
-   Base URL to your back end that will be used for reverse integration with Swipe Games Integration Adapter API (our calls to you). URL should support HTTPS and be accessible from our servers (if you have white lists).
-   List of External Client IDs (`ExtCID`) — each `ExtCID` is a unique identifier for your internal client (casino, operator, etc.). You can provide multiple `ExtCID`s if you want to split calls for different clients on your side. All configurations and settings are done per `ExtCID`. If you need different base URLs for reverse calls per client, you can provide a separate base URL for each `ExtCID` and we will configure them individually. See [Terms](/terms) and [Integration Adapter API — Setup](/swipegames-integration#setup-and-configuration) for more details.

From our side, we will provide you with the following details:

-   **Client ID (CID)** — your unique identifier in our system, used to identify your integration.
-   **ExtCID** — we will register all the `ExtCID`s you provided. If you don't provide any, we will set up a default `ExtCID` and share it with you. Each `ExtCID` can have its own base URL for reverse calls and its own configuration.
-   **API key** — used to authenticate your requests to the [Core Public API](/core). You sign your outbound requests with this key (see [Authentication](/authn) for more details).
-   **Integration API key** — used by us to sign our reverse calls to your back end via the [Integration Adapter API](/swipegames-integration). You verify incoming requests with this key (see [Verifying Request Signatures](/swipegames-integration#verifying-request-signatures) for more details).
-   List of our IP addresses or range of IP addresses that will be used to access your back end (for reverse integration with Swipe Games Integration Adapter API). You can find this information also in [IP Addresses](/swipegames-integration#please-whitelist-our-ip-addresses-to-allow-requests-from-our-servers-to-your-api) section.
