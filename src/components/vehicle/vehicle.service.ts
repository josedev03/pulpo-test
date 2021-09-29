import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID} from 'typeorm';
import { Novelty } from '../novelty/entity/novelty.entity';
import { CreateVehicleDTO } from './dto/vehicle.dto';
import { Vehicle } from './entity/vehicle.entity';

@Injectable()
export class VehicleService {

  constructor(@InjectRepository(Vehicle) private readonly vehicleRepository: MongoRepository<Vehicle>) { }

  async getVehicleById(id: string) {
    const vehicle = await this.existsVehicle(id, true);
    return vehicle;
  }

  async getVehicleByFilter(payload: any): Promise<any>{
    let result: any = "";
    if(payload.id){
      result = await this.vehicleRepository.findOne(payload.id);
    }
    if(payload.novedad){
      let filter = this.getFilterNovelty(payload.novedad)
      result = await this.vehicleRepository.find({where: filter});
    }
    else{
      result = await this.vehicleRepository.find(payload);
    }
    return result;
  }

  getFilterNovelty(novedad: any):object{
    let filter = {};
    if(novedad.asunto){
      filter['novedad.asunto'] =  novedad.asunto;
    }
    if(novedad.tipo){
      filter['novedad.tipo'] =  novedad.tipo;
    }
    if(novedad.descripcion){
      filter['novedad.descripcion'] =  novedad.descripcion;
    }
    return filter;
  }

  async create(payload: CreateVehicleDTO): Promise<any> {
    try {
      const newVehicle = await this.vehicleRepository.save(new Vehicle(payload));
      return newVehicle;
    } catch (error) {
      console.log(error)
      throw new NotFoundException("Error to create vehicle")
    }
  }

  async update(id: string, payload: CreateVehicleDTO): Promise<CreateVehicleDTO> {
    const currentVehicle = await this.existsVehicle(id, true);
    if(payload.id) delete payload.id;
    await this.vehicleRepository.update(id, payload);
    const response = {
      id: currentVehicle.id,
      ...payload
    }
    return response
  }

  async delete(id: string): Promise<object> {
    await this.existsVehicle(id)
    await this.vehicleRepository.delete(id)
    return {statusCode: 200, message: "vehicle deleted"}
  }

  async createNoveltyVehicle(id: string, payload){
    const currentVehicle = await this.existsVehicle(id, true);
    if(!currentVehicle.novedad){
      currentVehicle.novedad = []; 
    }
    currentVehicle.novedad.push(
      new Novelty(
        payload.novedad.asunto,
        payload.novedad.descripcion,
        payload.novedad.tipo));
    return this.update(id, currentVehicle);
  }

  private async existsVehicle(id: string, returnData: boolean = false): Promise<CreateVehicleDTO>{
    const exists = await this.vehicleRepository.findOne(id)
    if (!exists) {
      throw new NotFoundException()
    }
    if(returnData){
      return exists
    }
  }
}
