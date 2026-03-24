# Client World Clock Widget

A simple standalone Angular component for **Creatio Freedom UI** that displays the client's local time based on their city.

## Purpose
The widget helps managers identify the best time to contact a client by visualizing their current time zone and work status.

## Key Functionality
* **Real-time Clock:** Displays the current time in the client's location.
* **Availability Status:** Simple indicators for "Working Hours", "Evening", and "Night".
* **Adaptive Design:** Background color changes slightly based on the time of day to provide quick visual context.

## Technical Details
* **Framework:** Angular (Standalone Component).
* **Data Binding:** Receives `cityName` as an Input from the Creatio page schema.

## How to Use
1. Deploy the component as a **Remote Module**.
2. Add the widget to the **Contact** or **Account** page via Page Designer.
3. Bind the `cityName` parameter to the corresponding attribute.

---
*Created as a functional enhancement for the Creatio Freedom UI ecosystem.*
<img width="819" height="191" alt="image" src="https://github.com/user-attachments/assets/4c3f69f7-1621-4f85-8bac-bd6ef0c00c55" />

