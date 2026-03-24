import {DoBootstrap, Injector, NgModule, ProviderToken} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import {bootstrapCrtModule, CrtModule} from '@creatio-devkit/common';
import {ClientWorldClockWidgetComponent} from './view-elements/client-world-clock-widget/client-world-clock-widget.component';

@CrtModule({
  viewElements: [ClientWorldClockWidgetComponent],
})
@NgModule({
  imports: [BrowserModule, ClientWorldClockWidgetComponent],
  providers: [],
})
export class AppModule implements DoBootstrap {
  constructor(private _injector: Injector) {}

  ngDoBootstrap(): void {
    const element = createCustomElement(ClientWorldClockWidgetComponent, {
      injector: this._injector,
    });
    customElements.define('usr-client-world-clock-widget', element);

    bootstrapCrtModule('client_world_clock_widget', AppModule, {
      resolveDependency: (token) => this._injector.get(<ProviderToken<unknown>>token)
    });
  }
}