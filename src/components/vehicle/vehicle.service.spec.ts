import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { vehicleResponse } from '../../stubs/vehicle.stub';
import { MongoRepository, Repository } from 'typeorm';
import { Vehicle } from './entity/vehicle.entity';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDTO } from './dto/vehicle.dto';

const repositoryMockFactory: () => MongoRepository<Repository<any>> = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(vehicleResponse()),
  save: jest.fn().mockResolvedValue(vehicleResponse())
})


describe('VehicleService', () => {
  let service: VehicleService;
  let model: MongoRepository<Repository<Vehicle>>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        { 
          provide: getRepositoryToken(Vehicle),
          useFactory: repositoryMockFactory
        },
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
    model = module.get(getRepositoryToken(Vehicle))
  });

  it('Should be define', ()=>{
    expect(service).toBeDefined();
  })
});
