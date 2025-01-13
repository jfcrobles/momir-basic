import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrinterStateService {

  // Estado de conexión de la impresora
  private printerConnected = new BehaviorSubject<boolean>(false);
  printerConnected$ = this.printerConnected.asObservable();

  // Variable para almacenar la characteristic
  private characteristic: BluetoothRemoteGATTCharacteristic | null = null;

  constructor() {}

  // Actualizar el estado de conexión
  setPrinterConnected(status: boolean): void {
    this.printerConnected.next(status);
  }

  // Obtener el estado actual de conexión
  isPrinterConnected(): boolean {
    return this.printerConnected.getValue();
  }

  // Almacenar la characteristic
  setCharacteristic(characteristic: BluetoothRemoteGATTCharacteristic): void {
    this.characteristic = characteristic;
  }

  // Obtener la characteristic almacenada
  getCharacteristic(): BluetoothRemoteGATTCharacteristic | null {
    return this.characteristic;
  }

  // Verificar si la characteristic es válida
  canPrint(): boolean {
    return this.printerConnected.getValue() && this.characteristic !== null;
  }
}
