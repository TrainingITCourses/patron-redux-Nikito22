import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { IsaStore, IsaSlideTypes } from './../stores/isa-store.state';
import { CambioTipoCriterio, CambioCritero } from '../stores/isa-store.actions';
import { Selopt } from '../stores/isa.model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ls-buscador',
    templateUrl: './ls-buscador.component.html',
    styleUrls: ['./ls-buscador.component.css']
})
export class LsBuscadorComponent implements OnInit {

    public tiposCriterios: Selopt[];

    constructor(public Isa: IsaStore) { }

    ngOnInit() {
        // Con el pipe async y los observables por slices no es realmente necesario usar los snapshots.
        // He forzado el uso de snapshots en estos valores 'fijos' de tipos de criterios solo para satisfacer
        // el enunciado del ejercicio
        this.tiposCriterios = this.Isa.selectSnapShot(IsaSlideTypes.tiposCriterios);
    }

    alCambioTipoCriterio(event) {
        this.Isa.dispatch(new CambioTipoCriterio(event.target.selectedIndex));
        this.Isa.dispatch(new CambioCritero('1')); // cargamos los lanzamientos del primer valor de los criterios
    }
}
