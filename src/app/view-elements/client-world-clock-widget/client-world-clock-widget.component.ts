import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ClientClockStatusConfig } from './types';

/** Creatio city display names → IANA time zone IDs. */
const CITY_TIMEZONE_MAP: Readonly<Record<string, string>> = {
  'New York': 'America/New_York',
  London: 'Europe/London',
  Kyiv: 'Europe/Kiev',
  Kiev: 'Europe/Kiev',
  Paris: 'Europe/Paris',
  Berlin: 'Europe/Berlin',
  Tokyo: 'Asia/Tokyo',
  Sydney: 'Australia/Sydney',
};

const DEFAULT_TIMEZONE = 'UTC';

@Component({
  selector: 'usr-client-world-clock-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-world-clock-widget.component.html',
  styleUrls: ['./client-world-clock-widget.component.scss'],
})
export class ClientWorldClockWidgetComponent implements OnInit, OnDestroy {
  @Input() cityName = '';

  /** Current local time for the client time zone (HH:mm:ss). */
  displayTime = '00:00:00';

  /** Active status configuration. */
  status: ClientClockStatusConfig = this.buildStatusForHour(12);

  private timeZone = DEFAULT_TIMEZONE;
  private tickId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.refreshDerivedState();
    this.tickId = setInterval(() => this.refreshDerivedState(), 1000);
  }

  ngOnDestroy(): void {
    if (this.tickId !== null) {
      clearInterval(this.tickId);
      this.tickId = null;
    }
  }

  /** Resolves IANA zone for the given city name, or UTC if unknown. */
  resolveTimeZone(city: string): string {
    const key = city?.trim();
    if (!key) {
      return DEFAULT_TIMEZONE;
    }
    return CITY_TIMEZONE_MAP[key] ?? DEFAULT_TIMEZONE;
  }

  /** Hour of day 0–23 in the given IANA time zone. */
  getHourInTimeZone(ianaZone: string): number {
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: ianaZone,
      hour: 'numeric',
      hourCycle: 'h23',
    });
    const hourPart = dtf.formatToParts(new Date()).find((p) => p.type === 'hour');
    return hourPart ? parseInt(hourPart.value, 10) : 0;
  }

  /** Formats HH:mm:ss in the given time zone. */
  formatTimeInTimeZone(ianaZone: string): string {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: ianaZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date());
  }

  /** Status for the given hour in the client time zone. */
  getStatusForLocalHour(hour: number): ClientClockStatusConfig {
    return this.buildStatusForHour(hour);
  }

  private refreshDerivedState(): void {
    this.timeZone = this.resolveTimeZone(this.cityName);
    this.displayTime = this.formatTimeInTimeZone(this.timeZone);
    const hour = this.getHourInTimeZone(this.timeZone);
    this.status = this.getStatusForLocalHour(hour);
  }

  private buildStatusForHour(hour: number): ClientClockStatusConfig {
    if (hour >= 9 && hour <= 17) {
      return {
        label: 'Business hours',
        color: '#FFE566',
        icon: '☀️',
        class: 'day',
      };
    }
    if (hour >= 18 && hour <= 21) {
      return {
        label: 'After hours',
        color: '#FFB86C',
        icon: '🌇',
        class: 'evening',
      };
    }
    return {
      label: 'Night',
      color: '#B8C5FF',
      icon: '🌙',
      class: 'night',
    };
  }
}
