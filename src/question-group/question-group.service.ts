import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateQuestionGroupDto } from './dto/question-group.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestionGroupService {
    constructor(private readonly databaseService: DatabaseService) { }

    async findAll(email: string, parentUser: any) {
        if(email){
            let userObj = await this.databaseService.user.findUnique({
                where: {
                    email,
                },
            })
            console.log(parentUser);
            console.log(userObj);
            if(userObj && parentUser.userId == userObj.id){
                return this.databaseService.questionGroup.findMany({
                    where: {
                        userId: userObj.id
                    },
                    include: {questions: true}});
            }
            else {
                throw new BadRequestException("User Id ile Token User Id Eşleşmiyor");
            }

        }else {
            return this.databaseService.questionGroup.findMany();
        }

    }

    async findOne(id: number) {
        const found = this.databaseService.questionGroup.findUnique({
            where: {
                id,
            },
            include: {questions: true}
        });
        if (!found) {
            throw new NotFoundException("Faq Not Found");
        }
        return found;
    }

    async createQuestionGroup(createQuestionGroupDto: CreateQuestionGroupDto) {
        const { userId, questions } = createQuestionGroupDto;

        const questionGroup = await this.databaseService.questionGroup.create({
            data: {
                userId,
                questions: {
                    create: questions.map((question) => ({
                        questionText: question.questionText,
                        answerText: question.answerText,
                    })),
                },
            },
            include: { questions: true },
        });

        return questionGroup;
    }

    async update(id: number, updateQuestionGroupDto: Prisma.QuestionGroupUpdateInput) {
        return this.databaseService.questionGroup.update({
            where: {
                id,
            },
            data: updateQuestionGroupDto
        })
    }

    async delete(id: number){
        return this.databaseService.questionGroup.delete({
          where: {
            id,
          }
        });
      }
}
