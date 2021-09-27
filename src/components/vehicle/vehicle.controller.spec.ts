import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

describe('VehicleController', () => {
  let controller: VehicleController;
  let spyService: VehicleService;

  /*{
    "id": "614fbbb5a43a131b76dd1a5a",
    "identification": "CCC333",
    "marca": "Ford",
    "modelo": 2012,
    "color": "rojo",
    "fechaIngreso": "2021/09/12",
    "estado": true,
    "asignado": false
  }*/

  beforeEach(async () => {
    const VehicleServiceProvider = {
      provide: VehicleService,
      useFactory:() =>{
        get: jest.fn(()=>10)
      }
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [VehicleService, VehicleServiceProvider]
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
    spyService = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
