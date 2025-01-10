import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MmngService } from './mmng.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, of } from 'rxjs';
import { Slave } from './types';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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

  ifnameFormControl = new FormControl<string>('enx1c1adff64fae', [Validators.required]);

  slaveFormControl = new FormControl<number>(0, [Validators.required]);

  stateFormControl = new FormControl<number>(0, [Validators.required]);

  slaveState$: Observable<number | null> = of(null);

  states = {
    "INIT": 1,
    "PREOP": 2,
    "BOOT": 3,
    "SAFEOP": 4,
    "OP": 8,
  };

  onInitMaster() {
    const ifname = this.ifnameFormControl.value;
    if (ifname) {
      this.mmng.initMaster(ifname).subscribe();
    }
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

  onSetSlaveState() {
    const id = this.slaveFormControl.value ?? 0;
    const state = this.stateFormControl.value ?? 0;
    this.mmng.setSlaveState(id, state).subscribe();
  }

}
