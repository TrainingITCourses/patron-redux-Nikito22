import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { forkJoin, Observable, of, throwError } from 'rxjs';

import { APIService } from './api.service';
import { AppComponent } from './app.component';
import { LsBuscadorComponent } from './ls-buscador/ls-buscador.component';
import { LsBuscadorCriteriosComponent } from './ls-buscador/buscadorCriterios/buscadorCriterios.component';
import { LsBuscadorLanzamientosComponent } from './ls-buscador/buscadorLanzamientos/buscadorLanzamientos.component';


@NgModule({
    declarations: [
        AppComponent,
        LsBuscadorComponent,
        LsBuscadorCriteriosComponent,
        LsBuscadorLanzamientosComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    exports: [],
    providers: [
        APIService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
