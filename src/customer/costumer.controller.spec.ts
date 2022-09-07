import { Test, TestingModule } from '@nestjs/testing';
import { CostumerController } from './costumer.controller';

describe('Costumer Controller', () => {
  let controller: CostumerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CostumerController],
    }).compile();

    controller = module.get<CostumerController>(CostumerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
