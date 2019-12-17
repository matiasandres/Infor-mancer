export class Usuario {
    nombre: string;
    email: string;
    password: string;
    token2FA?: string;
    Activo2FA?: boolean;
    activo?: boolean;
    imagen?: string;
    roles?: string[];
    _id?: string;    
}
