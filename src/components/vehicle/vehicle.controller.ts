import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { CreateVehicleDTO } from './dto/vehicle.dto';
import { Vehicle } from './entity/vehicle.entity';
import { VehicleService } from './vehicle.service';
import { Response } from 'express'
import { JoiValidationPipe } from 'src/comons/pipes/joi-validation.pipe';
import { vehicleSchema } from 'src/comons/models/createVehicle.schema';

@Controller('vehicle')
export class VehicleController {

  constructor(private vehicleService: VehicleService) { }

  @Get('/healtCheck')
  healtCheck(@Res() resp: Response){
    resp.send({health: true});
  }

  @Get('/:id')
  async getVehicleForId(@Param('id') id: string) {
    return await this.vehicleService.get(id);
  }
  
  @Put('/:id')
  async updateVehicle(@Param('id') id: string, @Body() payload: CreateVehicleDTO) {
    const result = await this.vehicleService.update(id, payload);
    return result;
  }

  @Delete('/:id')
  async deleteVehicle(@Param('id') id: string) {
    return await this.vehicleService.delete(id);
  }

  @Post()
  async createVehicle(@Body(new JoiValidationPipe(vehicleSchema)) payload: CreateVehicleDTO): Promise<Vehicle> {
    const result = await this.vehicleService.create(payload);
    return result;
  }
}
