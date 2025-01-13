import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { PrinterStateService } from '../../services/printer-state.service'
import { PrinterService } from '../../services/printer.service';

@Component({
  selector: 'app-config-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './config-modal.component.html',
  styleUrl: './config-modal.component.css'
})
export class ConfigModalComponent {
  @Output() close = new EventEmitter<void>();
  languages = [
    { code: 'EN', name: 'English', flag: 'https://flagcdn.com/us.svg' },
    { code: 'ES', name: 'Español', flag: 'https://flagcdn.com/es.svg' },
    { code: 'FR', name: 'Français', flag: 'https://flagcdn.com/fr.svg' },
    { code: 'DE', name: 'Deutsch', flag: 'https://flagcdn.com/de.svg' },
  ];

  constructor(private languageService: LanguageService,
    public printerStateService: PrinterStateService,
    private printerService: PrinterService) { }

  isDropdownOpen = false;

  get selectedLanguage() {
    return this.languageService.selectedLanguage;
  }

  // Cambiar el idioma seleccionado en el servicio
  set selectedLanguage(language: { code: string; name: string; flag: string }) {
    this.languageService.selectedLanguage = language;
    this.isDropdownOpen = false;
  }

  async addPrinter() {
    const characteristic = await this.printerService.connectToPrinter();
    if (characteristic) {
      console.log('Impresora conectada correctamente');
    } else {
      console.error('No se pudo conectar a la impresora');
    }
  }
}
