import { Request, Controller, Get, Post, Query, Param, Body, ParseIntPipe, ValidationPipe, Patch, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { QuestionGroupService } from './question-group.service';
import { Prisma } from '@prisma/client';
import { CreateQuestionGroupDto } from './dto/question-group.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('question-group')
@UseGuards(AuthGuard('jwt'))
export class QuestionGroupController {

  constructor(private readonly questionGroupService: QuestionGroupService) { }

  @Get() // GET /question-group
  findAll(@Query('email') email: string, @Request() req : any) {
    return this.questionGroupService.findAll(email, req.user);
  }

  @Get(':id') // GET /question-group/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questionGroupService.findOne(id);
  }

  @Post() // POST /question-group
  create(@Body() questionGroupDto: CreateQuestionGroupDto) {
    return this.questionGroupService.createQuestionGroup(questionGroupDto);
  }

  @Patch(':id') // PATCH /question-group/:id
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: Prisma.QuestionGroupUpdateInput) {
    return this.questionGroupService.update(id, updateUserDto);
  }

  @Delete(':id') // DELETE /question-group/:id
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.questionGroupService.delete(id);
  }
}
