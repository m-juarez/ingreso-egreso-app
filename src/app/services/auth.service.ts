import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import * as  actions from '../auth/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor (public auth: AngularFireAuth, private firestore: AngularFirestore, private store: Store) { }

  initAuthListener () {
    this.auth.authState.subscribe( fuser => {


      if( fuser ){
        this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
            .subscribe( (firestoreUser: any) => {

              const user = Usuario.fromFirebase(firestoreUser);
              this.store.dispatch( actions.setUser({ user }));
            });
      }
      else {
        this.store.dispatch( actions.unSetUser());
      }

    })
  }

  crearUsuario (nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword( email, password)
               .then( ({ user }) => {
                 const newUser = new Usuario( user.uid, nombre, user.email );

                 return this.firestore.doc(`${user.uid}/usuario`)
                     .set( { ...newUser } );
               })
  }

  loginUsuario (email: string, password: string) {
    return this.auth.signInWithEmailAndPassword( email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }
}
