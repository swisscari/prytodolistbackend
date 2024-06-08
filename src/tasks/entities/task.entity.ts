import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    uuid: number;

    @ApiProperty()
    @Column({ nullable: false })
    title: string;

    @ApiProperty()
    @Column({ nullable: true })
    description: string;

    @ApiProperty()
    @Column({ default: false })
    done: boolean;
}