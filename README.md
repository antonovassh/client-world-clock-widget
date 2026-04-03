# Client World Clock Widget

An Angular component for **Creatio Freedom UI** that shows the client’s local time and a simple day / evening / night status from their city name.

## Purpose

Helps managers choose a good time to reach out by showing the contact’s current local time and whether it falls in business hours, after hours, or night.

<img width="819" height="191" alt="Client World Clock Widget preview" src="https://github.com/user-attachments/assets/4c3f69f7-1621-4f85-8bac-bd6ef0c00c55" />

## Features

- **Live clock** — updates every second in the time zone inferred from the city name (mapped to IANA zones; unknown cities fall back to UTC).
- **Availability hint** — **Business hours**, **After hours**, or **Night** (with icon and accent), driven by local hour in that zone.
- **Visual context** — background gradient shifts with the status for quick scanning.

## Technical stack

- **Angular** with **Angular Elements** (`@angular/elements`) — packaged as a custom element for Creatio.
- **Creatio DevKit** (`@creatio-devkit/common`) — `@CrtViewElement`, `@CrtModule`, `@CrtInput`, `bootstrapCrtModule` (same integration style as other in-house Freedom UI widgets).
- **Build** — `ngx-build-plus` + **Module Federation** (`webpack.config.js` / `webpack.prod.config.js`). Output goes to `dist/` (ignored by Git; regenerate with `ng build`).

## Creatio binding

| Mechanism | Detail |
|-----------|--------|
| View element type | `usr.ClientWorldClockWidget` |
| Custom element tag | `usr-client-world-clock-widget` |
| Inputs (`@Input` + `@CrtInput`) | `cityName` — display name of the city (must match the widget’s internal map, e.g. Kyiv, London). `previewMode` — optional: `auto` (default), `day`, `evening`, `night` — useful for local `ng serve` / demos; in production leave `auto` so status follows real time. |


## Deploy & use in Creatio

1. Build the app and publish the bundle per your package process (**remote module** / static JS as for your other Angular Freedom widgets).
2. Register the script and load the module in your Creatio package (same pattern as existing Angular elements).
3. In **Page Designer**, add the widget to a **Contact**, **Account**, or other page.
4. Bind **`cityName`** to the appropriate column or attribute (string the user sees as the city name).

---

*Functional enhancement for the Creatio Freedom UI ecosystem.*
