import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

describe('VehicleController', () => {
  let controller: VehicleController;
  let spyService: VehicleService;

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
