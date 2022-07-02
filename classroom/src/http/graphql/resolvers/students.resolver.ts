import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrnetUser } from '../../auth/current-user';
import { EnrollmentServices } from '../../services/enrollments.service';
import { StudentsService } from '../../services/students.service';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentService: EnrollmentServices,
  ) {}
  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  me(@CurrnetUser() user: AuthUser) {
    return this.studentsService.getStudentByAuthUserId(user.sub);
  }
  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents();
  }
  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentService.listEnrollmentsbyStudent(student.id);
  }
}
