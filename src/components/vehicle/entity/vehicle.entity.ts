import { Novelty } from 'src/components/novelty/entity/novelty.entity';
import { Entity, ObjectID, ObjectIdColumn, Column} from 'typeorm';

@Entity('vehicles')
export class Vehicle {
  @ObjectIdColumn() id: ObjectID;
  @Column({unique: true}) identification: String;
	@Column() marca: String;
	@Column() modelo: Number;
	@Column() color: String;
	@Column() fechaIngreso: String;
	@Column() estado: Boolean;
	@Column() asignado: Boolean;
	@Column(type=>Novelty) novedad: Novelty[];

  constructor(vehicle?: Partial<Vehicle>) {
    Object.assign(this, vehicle);
  }
}