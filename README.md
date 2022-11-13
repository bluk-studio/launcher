<p align="center">
    <a href="https://github.com/bluk-studio/launcher">
        <picture width="100">
            <source media="(prefers-color-scheme: dark)" srcset="https://assets.k8s.odzi.dog/odzi-assets/logotypes/bluk-white.svg">
            <source media="(prefers-color-scheme: light)" srcset="https://assets.k8s.odzi.dog/odzi-assets/logotypes/bluk-white.svg">
            <img alt="bluk logotype" src="https://assets.k8s.odzi.dog/odzi-assets/logotypes/bluk-white.svg">
        </picture>
    </a>
</p>

<h1 align="center">bluk launcher</h1>

### Overview

Bluk Launcher is a multi-purpose game launcher, built on top of [Tauri](https://github.com/tauri-apps/tauri) and [Svelte](https://github.com/sveltejs/svelte). You'll be able to build your own launcher on top of this, or to publish your game to [Bluk Games Directory](https://github.com/bluk-studio/games-directory) with custom pages, custom download and startup logic and so on.

### Screenshots

*To be added*

### Problems

1. **Authorization logic**  
    Current authorization logic can be described with this schema:  
    | Frontend asks Backend to open authorization link in user's browser -> User completes authorization and is redirected to <localhost>/auth/token  
    | with user token -> Backend send this token to Frontend, which then asks Backend to fetch user information using this token.  

    Backend should automatically save this token to some local file and automatically fetch user profile. I could not achieve this (for now) due to my limited knowledge of Rust threads, but I'll definitely fix this issue. We need to save user token to ProfileState in file [apps/desktop/src-tauri/src/main.rs](https://github.com/bluk-studio/launcher/blob/master/apps/desktop/src-tauri/src/main.rs#L70) line 70, and then immediately start fetching user information, which we'll then send to frontend.
    
    *Frontend should not send any requests to external APIs at all.*