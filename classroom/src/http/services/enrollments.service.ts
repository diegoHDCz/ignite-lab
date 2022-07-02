import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

interface GetByCourseAndStudentIdParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentServices {
  constructor(private prisma: PrismaService) {}

  getByCourseAndStudentId({
    courseId,
    studentId,
  }: GetByCourseAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  listEnrollmentsbyStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
