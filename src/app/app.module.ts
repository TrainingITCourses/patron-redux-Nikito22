import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LsBuscadorComponent } from './ls-buscador/ls-buscador.component';
import { LsBuscadorCriteriosComponent } from './ls-buscador/buscadorCriterios/buscadorCriterios.component';
import { LsBuscadorLanzamientosComponent } from './ls-buscador/buscadorLanzamientos/buscadorLanzamientos.component';
import { IsaStore } from './stores/isa-store.state';

@NgModule({
    declarations: [
        AppComponent,
        LsBuscadorComponent,
        LsBuscadorCriteriosComponent,
        LsBuscadorLanzamientosComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    exports: [],
    providers: [
        IsaStore
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
