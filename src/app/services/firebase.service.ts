import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class FirebaseService {
private db = getFirestore(initializeApp(environment.firebaseConfig));
async obtenerDatos(nombreColeccion: string) {
const querySnapshot = await getDocs(collection(this.db, nombreColeccion));
return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
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