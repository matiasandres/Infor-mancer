import { Paciente } from './paciente.model';
import { Arquetipo } from '../../arquetipo/models/arquetipo.model';

export class Ficha {
    folio: number;
    paciente: Paciente;
    fecha_ingreso: Date;
    arquetipos: Arquetipo[ ];
    last_update?: Date;
    _id?: string;
}