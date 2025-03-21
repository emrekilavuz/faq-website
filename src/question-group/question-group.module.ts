import { Module } from '@nestjs/common';
import { QuestionGroupService } from './question-group.service';
import { QuestionGroupController } from './question-group.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [QuestionGroupService],
  controllers: [QuestionGroupController],
  imports: [DatabaseModule]
})
export class QuestionGroupModule {}
