import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { IsaStore } from './stores/isa-store.state';
import { HttpClient } from '@angular/common/http';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ls-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ejercicio 1 Nicolás Jiménez!';

  constructor(public Isa: IsaStore, public http: HttpClient) { }

  ngOnInit() {  }
}
