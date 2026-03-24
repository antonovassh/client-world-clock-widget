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
