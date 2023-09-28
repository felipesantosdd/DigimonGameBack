import { Body, Controller, Get, Post } from '@nestjs/common';
import { TrainingService } from './training.service';
import { ApiBody } from '@nestjs/swagger';
import { TrainingDto } from './dto/training.dto';

@Controller('training')
export class TrainingController {

    constructor(private readonly trainingService: TrainingService) { }

    @Post()
    @ApiBody({ type: TrainingDto })
    async create(@Body() training: TrainingDto): Promise<TrainingDto> {
        return await this.trainingService.create(training);
    }

    @Get()
    async getAll(): Promise<TrainingDto[]> {
        return await this.trainingService.getAll();
    }

}
