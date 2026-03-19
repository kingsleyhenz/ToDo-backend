import { IsNotEmpty, IsString, IsEnum, IsOptional, IsDateString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  head!: string;

  @IsString()
  @IsNotEmpty()
  item!: string;

  @IsEnum(["Crucial", "Personal", "Work"])
  category!: string;

  @IsEnum(["Completed", "Incomplete"])
  status!: string;

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
  head?: string;

  @IsOptional()
  @IsString()
  item?: string;

  @IsOptional()
  @IsEnum(["Completed", "Incomplete"])
  status?: string;

  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
