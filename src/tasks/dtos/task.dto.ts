import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Matches } from 'class-validator'

export class TaskDto {
    uuid?: number;

    @ApiProperty()
    @IsString({ message: 'Title required' })
    @Matches(/^[\w\s_,.]+$/im, { message: 'Title not valid' })
    title: string;

    @ApiProperty()
    @IsString({ message: 'Description required' })
    @Matches(/^[\w\s_,.]+$/im, { message: 'Description not valid' })
    description?: string;

    @ApiProperty()
    @IsBoolean({ message: 'Done required' })
    done: boolean;
}