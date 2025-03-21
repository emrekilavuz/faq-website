import { Test, TestingModule } from '@nestjs/testing';
import { QuestionGroupController } from './question-group.controller';

describe('QuestionGroupController', () => {
  let controller: QuestionGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionGroupController],
    }).compile();

    controller = module.get<QuestionGroupController>(QuestionGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
