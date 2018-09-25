import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { enTipoCriterio } from '../ls-buscador.component';
import { Selopt } from '../../api.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ls-buscador-criterios',
  templateUrl: './buscadorCriterios.component.html',
  styleUrls: ['./buscadorCriterios.component.css']
})

export class LsBuscadorCriteriosComponent implements OnInit {
  @Input() valoresCriterios: Selopt[];
  @Output() public cambioCriterio = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  alCambioCriterio(event) {
    this.cambioCriterio.next(event.target.value);
  }
}
