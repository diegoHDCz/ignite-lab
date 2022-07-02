import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrnetUser } from '../../auth/current-user';
import { CoursesServices } from '../../services/courses.service';
import { EnrollmentServices } from '../../services/enrollments.service';
import { StudentsService } from '../../services/students.service';
import { createCourseInput } from '../inputs/create-course-inputs';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesServices,
    private studentService: StudentsService,
    private enrollmentService: EnrollmentServices,
  ) {}

  @Query()
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.listAllCourses();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrnetUser() user: AuthUser) {
    const student = await this.studentService.getStudentByAuthUserId(user.sub);
    if (!student) {
      throw new Error('student not found');
    }
    const enrollment = await this.enrollmentService.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id,
    });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.coursesService.getCourseById(id);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') data: createCourseInput) {
    return this.coursesService.createCourse(data);
  }
}
