export class Usuario {
  constructor(
    public uid: string,
    public nombre: string,
    public email: string
  ) {}

  static fromFirebase ( { email, uid, nombre }: any ) {
    return new Usuario( uid, nombre, email);
  }
}
