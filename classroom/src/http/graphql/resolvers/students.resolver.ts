import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { StudentsService } from '../../services/students.service';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private studentsService: StudentsService) {}
  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents();
  }
}
