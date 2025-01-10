import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MmngService } from './mmng.service';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { Slave } from './types';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, AsyncPipe, JsonPipe],
  providers: [MmngService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'mmngui';

  mmng = inject(MmngService);

  slaves$: Observable<Slave[]> | undefined;

  onInitMaster() {
    this.mmng.initMaster().subscribe();
  }

  onDeinitMaster() {
    this.mmng.deinitMaster().subscribe();
  }

  onGetSlaves() {
    this.slaves$ = this.mmng.getSlaves();
  }

}
