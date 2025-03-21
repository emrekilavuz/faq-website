import { IsString, IsInt, MaxLength } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @MaxLength(750)
  questionText: string;

  @IsString()
  @MaxLength(3000)
  answerText: string;

  @IsInt()
  questionGroupId: number;
}
