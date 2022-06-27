import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class EnrollmentServices {
  constructor(private prisma: PrismaService) {}
}
