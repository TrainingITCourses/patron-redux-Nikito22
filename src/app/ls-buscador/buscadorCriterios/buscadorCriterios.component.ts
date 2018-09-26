import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { IsaStore, IsaSlideTypes } from './../../stores/isa-store.state';
import { CambioCriterio } from '../../stores/isa-store.actions';
import { Selopt, enTipoCriterio } from '../../stores/isa.model';
import { Observable } from 'rxjs';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ls-buscador-criterios',
  templateUrl: './buscadorCriterios.component.html',
  styleUrls: ['./buscadorCriterios.component.css']
})

export class LsBuscadorCriteriosComponent implements OnInit {
  valoresCriterio: Selopt[] = [];
  tipoCriterio: enTipoCriterio;

  constructor(public Isa: IsaStore) { }

  ngOnInit() {
    this.Isa.select$(IsaSlideTypes.enTipoCriterio).subscribe(tp => this.cargaValores(tp));
  }

  cargaValores(tp: enTipoCriterio) {
    this.tipoCriterio = tp;
    switch (this.tipoCriterio) {
      case enTipoCriterio.Estado:
        this.valoresCriterio = this.Isa.selectSnapShot(IsaSlideTypes.statuses);
        break;

      case enTipoCriterio.Agencia:
        this.valoresCriterio = this.Isa.selectSnapShot(IsaSlideTypes.agencies);
        break;

      case enTipoCriterio.TipoMision:
        this.valoresCriterio = this.Isa.selectSnapShot(IsaSlideTypes.missionTypes);
        break;
    }
  }

  cambioCriterio(event) {
    this.Isa.dispatch(new CambioCriterio(event.target.value));
  }
}
