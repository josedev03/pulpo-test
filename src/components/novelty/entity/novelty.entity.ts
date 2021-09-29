import {Column} from 'typeorm';

export class Novelty {
  @Column() asunto: string;
  @Column() descripcion: string;
	@Column() tipo: string;
	

  constructor(asunto: string, descripcion: string, tipo: string){
    this.asunto = asunto;
    this.descripcion = descripcion;
    this.tipo = tipo;
  }
}