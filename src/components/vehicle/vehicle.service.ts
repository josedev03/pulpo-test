import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository} from 'typeorm';
import { CreateVehicleDTO } from './dto/vehicle.dto';
import { Vehicle } from './entity/vehicle.entity';

@Injectable()
export class VehicleService {

  constructor(@InjectRepository(Vehicle) private readonly vehicleRepository: MongoRepository<Vehicle>) { }

  async get(id: string) {
    return await this.existsVehicle(id, true)
  }

  async create(payload: CreateVehicleDTO): Promise<any> {
    try {
      const vehicle = await this.vehicleRepository.save(new Vehicle(payload));
      return vehicle;
    } catch (error) {
      console.log(error)
      return "Error to create vehicle"
    }
  }

  async update(id: string, payload: CreateVehicleDTO) {
    await this.existsVehicle(id)
    await this.vehicleRepository.update(id, payload);
    return "vehicle updated"
  }

  async delete(id: string) {
    await this.existsVehicle(id)
    await this.vehicleRepository.delete(id)
    return "vehicle deleted"
  }

  private async existsVehicle(id: string, returnData: boolean = false){
    const exists = await this.vehicleRepository.findOne(id)
    console.log(exists)
    if (!exists) {
      throw new NotFoundException()
    }
    if(returnData){
      return exists
    }
  }
}
