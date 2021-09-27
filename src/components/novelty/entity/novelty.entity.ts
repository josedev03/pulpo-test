import { Entity, ObjectID, ObjectIdColumn, Column} from 'typeorm';

export class Novelty {
  @Column() asunto: String;
  @Column() descripcion: String;
	@Column('enum') tipo: 'mecanico' | 'multa' | 'mantenimiento' | 'accidente';
	

  constructor(novelty?: Partial<Novelty>) {
    Object.assign(this, novelty);
  }
}