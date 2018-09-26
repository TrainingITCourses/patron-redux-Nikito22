import { AppModule } from './app.module';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { IsaStore } from './stores/isa-store.state';
import { LoadLaunches, LoadAgencies , LoadStatuses, LoadMissionTypes} from './stores/isa-store.actions';
import { forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';
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

  ngOnInit() {
    // Cargamos los Json iniciales
    this.http.get<any>('/assets/launchstatus.json').subscribe( (r: any[]) => this.Isa.dispatch(new LoadStatuses(r)));
    this.http.get('/assets/launchagencies.json').subscribe( (r: any[]) => this.Isa.dispatch(new LoadAgencies(r)));
    this.http.get('/assets/launchmissions.json').subscribe( (r: any[]) => this.Isa.dispatch(new LoadMissionTypes(r)));
    this.http.get('/assets/launchlibrary.json').subscribe( (r: any[]) => this.Isa.dispatch(new LoadLaunches(r)));
  }
}
