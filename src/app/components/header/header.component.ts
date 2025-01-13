import { Component, Renderer2 } from '@angular/core';
import { ConfigModalComponent } from '../config-modal/config-modal.component';
import { CommonModule } from '@angular/common';
import { PrinterService } from '../../services/printer.service';
import { PrinterStateService } from '../../services/printer-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ConfigModalComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isConfigModalOpen = false;
  darkMode = true;
  loading = false;

  constructor(private renderer: Renderer2, public printerService: PrinterService, public printerStateService: PrinterStateService) { }

  openConfigModal() {
    this.isConfigModalOpen = true;
  }

  closeConfigModal() {
    this.isConfigModalOpen = false;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.setDarkMode(this.darkMode);
  }

  setDarkMode(isDark: boolean) {
    if (!document) return;
    const body = document.body;

    if (isDark) {
      this.renderer.addClass(body, 'dark-mode');
    } else {
      this.renderer.removeClass(body, 'dark-mode');
    }
  }

  async connectPrinter() {
    this.loading=true;
    const characteistic = await this.printerService.connectToPrinter();
    if (characteistic != null)
      this.loading = false;
    else{
      this.loading = false;
      alert("Error: The printer is not connected.");
    }
  }

}
