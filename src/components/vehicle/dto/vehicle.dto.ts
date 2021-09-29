import { Novelty } from "src/components/novelty/entity/novelty.entity";
import { ObjectID } from "typeorm";

export class CreateVehicleDTO {
	id?: ObjectID;
  identification: String;
	marca: String;
	modelo: Number;
	color: String;
	fechaIngreso: String;
	estado: Boolean;
	asignado: Boolean;
	novedad: Novelty[];
}