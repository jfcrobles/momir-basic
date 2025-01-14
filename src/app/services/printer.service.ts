import { Injectable } from '@angular/core';
import { PrinterStateService } from './printer-state.service';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {
  constructor(private printerStateService: PrinterStateService) { }

  async connectToPrinter(): Promise<BluetoothRemoteGATTCharacteristic | null> {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [
          '49535343-fe7d-4ae5-8fa9-9fafd205e455', // Service UUID
          '000018f0-0000-1000-8000-00805f9b34fb',  // Another service UUID
          '0000ae30-0000-1000-8000-00805f9b34fb',
          'device_information'
        ]

      });

      console.log(`Conectado a: ${device.name}`);

      const server = await device.gatt?.connect();
      if (!server) throw new Error('No se pudo conectar al servidor GATT');

      const services = await server.getPrimaryServices();
      console.log('Servicios disponibles:', services);

      // Recorre todos los servicios y sus características
      for (let service of services) {
        console.log(`Servicio UUID: ${service.uuid}`);
        const characteristics = await service.getCharacteristics();
        console.log(`Características de ${service.uuid}:`, characteristics);

        // Si encuentras una característica con permiso de escritura
        for (let characteristic of characteristics) {
          console.log(`Característica UUID: ${characteristic.uuid}`);
          console.log('Característica Propiedades: ', characteristic.properties);
          if (characteristic.properties.write || characteristic.properties.writeWithoutResponse) {
            console.log('Característica encontrada para imprimir');

            // Almacena el estado en PrinterStateService
            this.printerStateService.setPrinterConnected(true);
            this.printerStateService.setCharacteristic(characteristic);

            return characteristic;  // Retorna la característica que permite escribir
          }
        }
      }

      throw new Error('No se encontró una característica para imprimir');
    } catch (error) {
      console.error('Error al conectar con la impresora:', error);
      this.printerStateService.setPrinterConnected(false);
      return null;
    }
  }

  async printText(text: string): Promise<void> {
    try {
      if (!this.printerStateService.canPrint()) {
        throw new Error('La impresora no está conectada o no está lista para imprimir.');
      }

      const characteristic = this.printerStateService.getCharacteristic();
      if (!characteristic) throw new Error('No se encontró la característica para imprimir.');


      const encoder = new TextEncoder();
      const resetCommand = [0x1B, 0x40]; // Reset de la impresora
      const textData = encoder.encode(text )//+ '\n\n');
      const cutCommand = [0x1D, 0x56, 0x00]; // Cortar papel
      const command = new Uint8Array([...resetCommand, ...textData, ...cutCommand]);

      await characteristic.writeValue(command);

      console.log('Texto enviado correctamente a la impresora');
    } catch (error) {
      console.error('Error al imprimir:', error);
    }
  } 

}
