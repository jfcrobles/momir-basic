import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { LanguageService } from '../../services/language.service';
import { PrinterService } from '../../services/printer.service';
import { PrinterStateService } from '../../services/printer-state.service';
//import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-card-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-detail-modal.component.html',
  styleUrl: './card-detail-modal.component.css'
})
export class CardDetailModalComponent {
  @Input() cmc: number | null = null;
  @Output() close = new EventEmitter<void>();
  // translate = require('@vitalets/google-translate-api');

  constructor(
    //private languageService: LanguageService,
    public printerStateService: PrinterStateService,
    private printerService: PrinterService,) { }

  closeModal() {
    this.close.emit();
  }

  cardDetails: any = null;
  loading = true;

  async fetchCardDetails(cmc: number) {
    this.loading = true;
    try {
      const response = await fetch(`https://api.scryfall.com/cards/random?q=cmc:${cmc}+type:creature+-is:digital+-is:funny+-layout:transform+-set_type:token+-layout:token+-layout:double_faced_token+-layout:modal_dfc`);
      if (!response.ok) {
        throw new Error('Carta no encontrada');
      }
      const data = await response.json();
      this.cardDetails = data;
    } catch (error) {
      console.error('Error al obtener los detalles de la carta:', error);
      this.fetchCardDetails(cmc);
    }
    finally {
      this.loading = false;
    }
  }

  async printCardDetails(cardJson: any): Promise<void> {
    try {
      console.log('Entra a printCardDetail');
      const name = cardJson.name;
      const cmc = cardJson.cmc;
      const manaCost = cardJson.mana_cost;
      const oracleText = cardJson.oracle_text;
      const power = cardJson.power;
      const toughness = cardJson.toughness;
      const type_line = cardJson.type_line;

       const text = `${name} ${manaCost}\n\n${type_line.replace(/—/g, '-')}\n\n${oracleText.replace(/—/g, '-')}\n\n${power}/${toughness}\n`;

      await this.printerService.printText(`${name} ${manaCost}\n\n`);      
      await this.printerService.printText(`${type_line.replace(/—/g, '-')}\n\n`);      
      await this.printerService.printText(`${oracleText.replace(/—/g, '-')}\n\n`);      
      await this.printerService.printText(`${power}/${toughness}\n\n\n\n`);

      this.closeModal();
    } catch (error) {
      console.error('Error al imprimir los detalles de la carta:', error);
    }
  }

  ngOnInit(): void {
    // this.translate('Hello world', {to: 'es'}).then(res => {
    //   console.log(res.text); // "Hola mundo"
    // }).catch(err => {
    //   console.error(err);
    // });
    this.fetchCardDetails(this.cmc ? this.cmc : 0);
  }
}
