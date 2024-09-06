import { Test, TestingModule } from '@nestjs/testing';
import { MailListController } from './mail-list.controller';

describe('MailListController', () => {
  let controller: MailListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailListController],
    }).compile();

    controller = module.get<MailListController>(MailListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
