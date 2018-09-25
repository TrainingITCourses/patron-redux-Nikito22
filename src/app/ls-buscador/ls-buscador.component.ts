import { Mission } from './../api.service';
import { APIService, Lanzamiento, Selopt } from '../api.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

export enum enTipoCriterio {
    Estado,
    Agencia,
    TipoMision
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ls-buscador',
    templateUrl: './ls-buscador.component.html',
    styleUrls: ['./ls-buscador.component.css']
})
export class LsBuscadorComponent implements OnInit {

    public criterio: enTipoCriterio = -1; // No establecemos tipo de criterio inicialmente para que decida el usuario
    tiposCriterios = Object.keys(enTipoCriterio).slice(Object.keys(enTipoCriterio).length / 2);

    private valoresCriterios: Array<Selopt>;
    private valorCriterio: '';
    public lanzamientos: Array<Lanzamiento>;

    constructor(public Api: APIService, private cdr: ChangeDetectorRef) {
        this.Api.cargado.subscribe(d => this.apiReady(d));
    }

    ngOnInit() { }

    apiReady(d) {
        console.log('Componente recibe aviso del api y lanza la deteccion de cambios');
    }

    alCambioTipoCriterio(event) {
        this.criterio = event.target.selectedIndex;
        this.leerValoresCriterio();
    }

    leerValoresCriterio() {
        switch (this.criterio) {
            case enTipoCriterio.Estado:
                this.valoresCriterios = this.Api.estados;
                console.log('Cargado Estados ' + this.valoresCriterios.length);
                break;
            case enTipoCriterio.Agencia:
                this.valoresCriterios = this.Api.agencias;
                console.log('Cargado Agencias ' + this.valoresCriterios.length);
                break;
            case enTipoCriterio.TipoMision:
                this.valoresCriterios = this.Api.tiposMision;
                console.log('Cargado Tipos Mision ' + this.valoresCriterios.length);
                break;
        }
        this.alCambioCriterio(this.valoresCriterios[0].value);
    }

    alCambioCriterio(v) {
        this.valorCriterio = v;
        switch (this.criterio) {
            case enTipoCriterio.Estado:
                this.lanzamientos = this.Api.lanzamientos.filter(l => l.status === Number(v));
                break;
            case enTipoCriterio.Agencia:
                this.lanzamientos = this.Api.lanzamientos.filter((l) => {
                    if (l.rocket) {
                        if (l.rocket.agencies) {
                            if (l.rocket.agencies.length > 0) {
                                return l.rocket.agencies[0].id === Number(v);
                            }
                        }
                    }
                }
                );
                break;
            case enTipoCriterio.TipoMision:
                this.lanzamientos = this.Api.lanzamientos.filter((l) => l.missions.length > 0 ? l.missions[0].type === Number(v) : false);
                break;
        }
        console.log('Filtrado lanzamientos por ' + enTipoCriterio[this.criterio] + ' ' + v);
    }
}
