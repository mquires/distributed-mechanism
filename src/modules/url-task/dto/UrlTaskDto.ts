import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { UrlTaskStatus } from 'src/modules/url-task/constants/url-task-status';

export class UrlTaskDto {
  @ApiProperty({ description: 'Task identifier', type: Number })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({ description: 'URL task', type: String })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'Task status',
    enum: UrlTaskStatus,
  })
  @IsEnum(UrlTaskStatus)
  status: UrlTaskStatus;

  @ApiProperty({
    description: 'HTTP code, if available',
    type: Number,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  http_code?: number;
}
