import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MmngService } from './mmng.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule],
  providers: [MmngService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mmngui';
  mmng = inject(MmngService);
}
