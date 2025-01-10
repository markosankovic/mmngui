import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MmngService } from './mmng.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, of } from 'rxjs';
import { Slave } from './types';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AsyncPipe,
    JsonPipe,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [MmngService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'mmngui';

  mmng = inject(MmngService);

  slaves$: Observable<Slave[]> = of([]);

  slaveFormControl = new FormControl<number>(0);

  slaveState$: Observable<{ state: number } | null> = of(null);

  onInitMaster() {
    this.mmng.initMaster().subscribe();
  }

  onDeinitMaster() {
    this.mmng.deinitMaster().subscribe();
  }

  onGetSlaves() {
    this.slaves$ = this.mmng.getSlaves();
  }

  onGetSlaveState() {
    const id = this.slaveFormControl.value ?? 0;
    this.slaveState$ = this.mmng.getSlaveState(id);
  }

}
