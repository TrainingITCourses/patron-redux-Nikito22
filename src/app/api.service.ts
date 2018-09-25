import { Injectable, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';


export interface Selopt {
    value: string;
    viewValue: string;
}

export interface Mission {
    type: number;
}
export interface Agency {
    id: number;
}
export interface Rocket {
    agencies: Agency[];
}

export interface Lanzamiento {
    id: number;
    name: string;
    status: number;
    rocket: Rocket;
    missions: Mission[]; // Lost in launchlibrary json simplification
    net: string;
}

@Injectable()
export class APIService implements OnInit {
    public estados: Array<Selopt>;
    public agencias: Array<Selopt>;
    public tiposMision: Array<Selopt>;
    public lanzamientos: Array<Lanzamiento>;
    @Output() cargado: EventEmitter<any> = new EventEmitter();

    constructor(private http: HttpClient) {

        // Esta modo no activa el interface al usuario hasta tener cargados todos los json,
        // Las lecturas de los json ya dejan un array de value y viewValue para pasar directo al select
        // me parece muy exagerado como metodo para  llamadas API más lentas que este sencillo json local.
        forkJoin([
            this.http.get<any>('/assets/launchstatus.json'),
            this.http.get('/assets/launchagencies.json'),
            this.http.get('/assets/launchmissions.json'),
            this.http.get('/assets/launchlibrary.json')
        ]).pipe(delay(200)).subscribe((results: any[]) => {
            this.estados = results[0].types.map(d => ({
                value: d.id, viewValue: d.id + ' - ' + d.description + ' (' + d.name + ')'
            }));
            this.agencias = results[1].agencies.map(d => ({
                value: d.id, viewValue: d.id + ' - ' + d.name
            }));
            this.tiposMision = results[2].types.map(d => ({
                value: d.id, viewValue: d.id + ' - ' + d.name
            }));
            this.lanzamientos = results[3].launches;
            // Imitamos una cierta demora con delay(xxx)
            console.log('Servicio inicializado (json listos para su consumo)');
            this.cargado.emit(true);
        });
    }
    ngOnInit() {
        // Este modo empieza a 'cachear' los arrays de estados, agencias y tipos de misión en la inicialización del componente,
        // Pero hay que seguir esperando a que esten cargados antes de que se vea el componente
        // this.http.get('/assets/launchstatus.json').subscribe((res: any) =>
        //     this.estados = res.types.map(d => ({ value: d.id, viewValue: d.id + ' - ' + d.description + ' (' + d.name + ')' }))
        // );
        // this.http.get('/assets/launchagencies.json').subscribe((res: any) =>
        //     this.agencias = res.agencies.map(d => ({ value: d.id, viewValue: d.id + ' - ' + d.name }))
        // );
        // this.http.get('/assets/launchmissions.json').subscribe((res: any) =>
        //     this.tiposMision = res.types.map(d => ({ value: d.id, viewValue: d.id + ' - ' + d.name }))
        // );
    }
}

