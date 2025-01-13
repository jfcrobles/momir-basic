import { Component } from '@angular/core';
import { PrinterService } from '../../services/printer.service';
import { PrinterStateService } from '../../services/printer-state.service'

@Component({
  selector: 'app-printer',
  standalone: true,
  imports: [],
  templateUrl: './printer.component.html',
  styleUrl: './printer.component.css'
})
export class PrinterComponent {
  //characteristic: BluetoothRemoteGATTCharacteristic | null = null;

  constructor(
    private printerService: PrinterService,
    public printerStateService: PrinterStateService
  ) {}

  async connectToPrinter() {
    const characteristic = await this.printerService.connectToPrinter();
    if (characteristic) {
      console.log('Impresora conectada correctamente');
    } else {
      console.error('No se pudo conectar a la impresora');
    }
  }

  async printText() {
    const characteristic = await this.printerStateService.getCharacteristic();
    if (characteristic) {
      await this.printerService.printText('¡Hola, impresora!');
    } else {
      console.error('Conéctate a una impresora antes de imprimir');
    }
  }

  async printCardDetails(cardJson: any): Promise<void> {
    try {
      console.log('Entra a printCardDetail');
      // Extraer los campos requeridos
      const name = cardJson.name;
      const cmc = cardJson.cmc;
      const manaCost = cardJson.mana_cost;
      const oracleText = cardJson.oracle_text;
      const power = cardJson.power;
      const toughness = cardJson.toughness;
      const type_line = cardJson.type_line;

      // Formatear el texto con el mana_cost al lado del name si cabe en la línea
      const text = `${name} ${manaCost}\n\n${type_line.replace('—', '-')}\n\n${oracleText}\n\n${power}/${toughness}\n`;

            // Llamar a la función printText que ya tienes para imprimir el texto
            await this.printerService.printText(text);
          } catch (error) {
            console.error('Error al imprimir los detalles de la carta:', error);
          }
    }

  async printRandomCard(): Promise<void> {
    try {
      const characteristic = this.printerStateService.getCharacteristic();
      // Hacer la solicitud al endpoint para obtener una carta aleatoria
      const response = await fetch("https://api.scryfall.com/cards/random?q=cmc:0+type:creature+-is:digital+-is:funny");
      const cardJson = await response.json();
      // Verificar si el JSON contiene la información necesaria
      if (cardJson && characteristic) {
        await this.printCardDetails(cardJson); // Usar la función printCardDetails previamente definida
      } else {
        console.error("No se encontró ninguna carta válida.");
      }
    } catch (error) {
      console.error("Error al obtener la carta aleatoria:", error);
    }
  }
}
