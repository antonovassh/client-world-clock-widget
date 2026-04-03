/** When set (e.g. in local index.html), forces visual day/evening/night. In Creatio omit for real time. */
export type ClientWorldClockPreviewMode = 'auto' | 'day' | 'evening' | 'night';

/** Display configuration for the time-of-day status (business / evening / night). */
export interface ClientClockStatusConfig {
  label: string;
  /** Accent color in HEX (badge glow, highlights). */
  color: string;
  /** Emoji or icon string. */
  icon: string;
  /** CSS class for the root background (e.g. `day`, `evening`, `night`). */
  class: string;
}
