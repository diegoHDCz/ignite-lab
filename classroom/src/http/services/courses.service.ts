import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class CoursesServices {
  constructor(private prisma: PrismaService) {}
}