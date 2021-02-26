import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppSateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;

   // Doughnut
   public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
   public doughnutChartData: MultiDataSet = [[],];
   public doughnutChartType: ChartType = 'doughnut';

  constructor(private strore: Store<AppSateWithIngreso>) { }

  ngOnInit(): void {
    this.strore.select('ingresosEgresos')
        .subscribe( ({ items }) => {
          this.generarEstadistica(items);
        })
  }

  generarEstadistica(items: IngresoEgreso[]) {

    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;

    for (const item of items) {
      if(item.tipo === 'ingreso'){

        this.ingresos++;
        this.totalIngresos += item.monto;

      }
      else {

        this.egresos++;
        this.totalEgresos += item.monto;

      }
    }

    this.doughnutChartData = [[ this.totalIngresos, this.totalEgresos ]];

  }

}
