import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDetailModalComponent } from '../card-detail-modal/card-detail-modal.component';

@Component({
  selector: 'app-button-list',
  standalone: true,
  imports: [CommonModule, CardDetailModalComponent],
  templateUrl: './button-list.component.html',
  styleUrl: './button-list.component.css'
})
export class ButtonListComponent {
  // Crear un arreglo con los números del 0 al 16
  buttons: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16];
  selectedButton: number | null = null;

  // Función para manejar el click en un botón
  onButtonClick(number: number): void {
    console.log(`Botón ${number} presionado`);
  }

  isModalVisible = false;

  openModal(number: number) {
    this.selectedButton = number;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.selectedButton = null;
  }
}
