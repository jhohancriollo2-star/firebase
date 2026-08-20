import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonList,
  IonLabel 
} from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonList, 
    IonLabel
  ]
})
export class HomePage implements OnInit {
  items: any[] = [];
  nuevoNombre: string = '';

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    await this.cargarItems();
  }

  async cargarItems() {
    this.items = await this.firebaseService.obtenerDatos('productos');
  }

  async guardar() {
    if (!this.nuevoNombre.trim()) return;
    await this.firebaseService.agregarDato('productos', { nombre: this.nuevoNombre });
    this.nuevoNombre = '';
    await this.cargarItems();
  }
}