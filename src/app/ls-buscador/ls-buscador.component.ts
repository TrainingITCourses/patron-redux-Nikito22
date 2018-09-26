import { delay } from 'rxjs/operators';
import { IsaStore, IsaSlideTypes } from './../stores/isa-store.state';
import { Lanzamiento, Selopt, enTipoCriterio } from '../stores/isa.model';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SwitchView } from '@angular/common/src/directives/ng_switch';
import { CambioTipoCriterio } from '../stores/isa-store.actions';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ls-buscador',
    templateUrl: './ls-buscador.component.html',
    styleUrls: ['./ls-buscador.component.css']
})
export class LsBuscadorComponent implements OnInit {

    tiposCriterios = Object.keys(enTipoCriterio).slice(Object.keys(enTipoCriterio).length / 2);

    constructor(public Isa: IsaStore) { }

    ngOnInit() {
    }

    alCambioTipoCriterio(event) {
        this.Isa.dispatch(new CambioTipoCriterio(event.target.selectedIndex));
    }
}
