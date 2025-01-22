import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { MmngService } from './mmng.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { catchError, Observable, of } from 'rxjs';
import { Parameter, Slave } from './types';
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
export class AppComponent implements OnInit {

  title = 'mmngui';

  mmng = inject(MmngService);

  slaves$: Observable<Slave[]> = of([]);

  baseUrlFormControl = new FormControl<string>('https://localhost:9000', [Validators.required]);

  ifnameFormControl = new FormControl<string>('enx1c1adff64fae', [Validators.required]);

  slaveFormControl = new FormControl<number>(0, [Validators.required]);

  stateFormControl = new FormControl<number>(0, [Validators.required]);

  slaveState$: Observable<number | null> = of(null);

  parameters$: Observable<Parameter[]> = of([]);

  states = {
    "INIT": 1,
    "PREOP": 2,
    "BOOT": 3,
    "SAFEOP": 4,
    "OP": 8,
  };

  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.baseUrlFormControl.valueChanges.subscribe((value) => {
      if (value) {
        this.mmng.baseUrl = value;
      }
    });
  }

  onInitMaster() {
    const ifname = this.ifnameFormControl.value;
    if (ifname) {
      this.mmng.initMaster(ifname).pipe(
        catchError((err) => {
          this._snackBar.open(err.message, 'Error');
          return of(null);
        }),
      ).subscribe();
    }
  }

  onDeinitMaster() {
    this.mmng.deinitMaster().pipe(
      catchError((err) => {
        this._snackBar.open(err.message, 'Error');
        return of(null);
      }),
    ).subscribe();
  }

  onGetSlaves() {
    this.slaves$ = this.mmng.getSlaves().pipe(
      catchError((err) => {
        this._snackBar.open(err.message, 'Error');
        return of([]);
      }),
    );
  }

  onGetSlaveState() {
    const id = this.slaveFormControl.value ?? 0;
    this.slaveState$ = this.mmng.getSlaveState(id).pipe(
      catchError((err) => {
        this._snackBar.open(err.message, 'Error');
        return of(null);
      }),
    );
  }

  onSetSlaveState() {
    const id = this.slaveFormControl.value ?? 0;
    const state = this.stateFormControl.value ?? 0;
    this.mmng.setSlaveState(id, state).pipe(
      catchError((err) => {
        this._snackBar.open(err.message, 'Error');
        return of(null);
      }),
    ).subscribe();
  }

  onLoadParameters() {
    const id = this.slaveFormControl.value ?? 0;
    this.mmng.loadParameters(id).pipe(
      catchError((err) => {
        this._snackBar.open(err.message, 'Error');
        return of(null);
      }),
    ).subscribe();
  }

  onClearParameters() {
    const id = this.slaveFormControl.value ?? 0;
    this.mmng.clearParameters(id).pipe(
      catchError((err) => {
        this._snackBar.open(err.message, 'Error');
        return of(null);
      }),
    ).subscribe();
  }

  onGetParameters() {
    const id = this.slaveFormControl.value ?? 0;
    this.parameters$ = this.mmng.getParameters(id).pipe(
      catchError((err) => {
        this._snackBar.open(err.message, 'Error');
        return of([]);
      }),
    );
  }

}
