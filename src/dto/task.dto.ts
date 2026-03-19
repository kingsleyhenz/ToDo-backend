import { IsNotEmpty, IsString, IsEnum, IsOptional, IsDateString, IsInt, Min, Max, IsMongoId } from "class-validator";
import { TaskStatus, PriorityLevel } from "../types/enums";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsMongoId()
  @IsNotEmpty()
  category!: string;

  @IsEnum(TaskStatus)
  status!: TaskStatus;

  @IsEnum(PriorityLevel)
  priorityLevel!: PriorityLevel;

  @IsInt()
  @Min(0)
  @Max(100)
  progress!: number;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsMongoId()
  category?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(PriorityLevel)
  priorityLevel?: PriorityLevel;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  progress?: number;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;
}

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
