import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrinterComponent } from './components/printer/printer.component';
import { ButtonListComponent } from './components/button-list/button-list.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PrinterComponent, ButtonListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bluetooth-printer-app';
 
  
}
