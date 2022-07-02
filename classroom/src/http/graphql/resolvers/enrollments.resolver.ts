import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CoursesServices } from '../../services/courses.service';
import { EnrollmentServices } from '../../services/enrollments.service';
import { StudentsService } from '../../services/students.service';
import { Enrollment } from '../models/enrollment';

@Resolver(() => Enrollment)
export class CoursesResolver {
  constructor(
    private enrollmentsService: EnrollmentServices,
    private coursesService: CoursesServices,
    private studentsService: StudentsService,
  ) {}

  @Query()
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.enrollmentsService.listAllEnrollments();
  }
  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.getStudendById(enrollment.studentId);
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.getCourseById(enrollment.courseId);
  }
}
