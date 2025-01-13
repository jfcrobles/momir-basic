
// typings.d.ts
interface BluetoothRemoteGATTCharacteristic {
    writeValue(value: ArrayBuffer): Promise<void>;
    readValue(): Promise<DataView>;
    startNotifications(): Promise<BluetoothRemoteGATTCharacteristic>;
    stopNotifications(): Promise<BluetoothRemoteGATTCharacteristic>;
    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ): void;
  }

  interface Navigator {
    bluetooth: Bluetooth;
  }
  