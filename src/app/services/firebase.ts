import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // Inicialización de la app y la base de datos Firestore
  private app = initializeApp(environment.firebaseConfig);
  private db = getFirestore(this.app);

  /**
   * Obtiene todos los documentos de una colección específica.
   * @param nombreColeccion Nombre de la colección en Firestore.
   */
  async obtenerDatos(nombreColeccion: string) {
    try {
      const querySnapshot = await getDocs(collection(this.db, nombreColeccion));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (e) {
      console.error("Error al obtener documentos: ", e);
      throw e;
    }
  }

  /**
   * Agrega un nuevo documento a una colección específica.
   * @param nombreColeccion Nombre de la colección en Firestore.
   * @param data Objeto de datos a insertar.
   */
  async agregarDato(nombreColeccion: string, data: any) {
    try {
      const docRef = await addDoc(collection(this.db, nombreColeccion), data);
      return docRef.id;
    } catch (e) {
      console.error("Error al agregar documento: ", e);
      throw e;
    }
  }
}