import { Application, ApplicationDocument, CreateApplicationDto } from '@monorepo/type';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ApplicationService {
    constructor(
        @InjectModel(Application.name) private readonly applicationModel: Model<ApplicationDocument>,
    ) {}

    create(createApplicationDto: CreateApplicationDto) {
        const createdApplication = new this.applicationModel(createApplicationDto);
        return createdApplication.save();
    }
}
