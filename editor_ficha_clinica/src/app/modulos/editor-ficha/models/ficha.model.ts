import { Paciente } from './paciente.model';

export class Ficha {
    folio: number;
    paciente: Paciente;
    fecha_ingreso: Date;
    arquetipos: [ ];
    last_update?: Date;
    _id?: string;
}