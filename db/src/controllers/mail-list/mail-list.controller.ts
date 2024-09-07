import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MailListDTO } from 'src/dto/mailList';
import { MailList } from 'src/interfaces/mailList';
import { ValidateObjectIdPipe } from 'src/pipes/validate-object-id.pipe';
import { MailListService } from 'src/services/mail-list/mail-list.service';

@ApiTags('Newsletters')
@Controller('mail-list')
export class MailListController {
  constructor(private readonly mailListService: MailListService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new email to the mailing list' })
  @ApiBody({ type: MailListDTO, description: 'Mailing list data' })
  @ApiResponse({
    status: 201,
    description: 'Email added successfully',
    type: MailListDTO,
  })
  async create(@Body() mailListDto: MailListDTO): Promise<MailList> {
    return this.mailListService.create(mailListDto);
  }
  @Get('unsubscribe/:email')
  @ApiOperation({ summary: 'Unsubscribe from the mailing list' })
  @ApiParam({ name: 'email', description: 'The email address to unsubscribe' })
  @ApiResponse({ status: 200, description: 'Email unsubscribed successfully' })
  async unsubscribe(@Param('email') email: string) {
    return this.mailListService.unsubscribe(email);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all emails from the mailing list' })
  @ApiResponse({
    status: 200,
    description: 'Mailing list retrieved successfully',
    type: [MailListDTO],
  })
  async findAll(): Promise<MailList[]> {
    return this.mailListService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a single email from the mailing list by ID',
  })
  @ApiParam({ name: 'id', description: 'ID of the mailing list entry' })
  @ApiResponse({
    status: 200,
    description: 'Mailing list entry retrieved successfully',
    type: MailListDTO,
  })
  async findOne(
    @Param('id', ValidateObjectIdPipe) id: string,
  ): Promise<MailList> {
    return this.mailListService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an email in the mailing list' })
  @ApiParam({ name: 'id', description: 'ID of the mailing list entry' })
  @ApiBody({ type: MailListDTO, description: 'Updated mailing list data' })
  @ApiResponse({
    status: 200,
    description: 'Mailing list entry updated successfully',
    type: MailListDTO,
  })
  async update(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() mailListDto: MailListDTO,
  ): Promise<MailList> {
    return this.mailListService.update(id, mailListDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an email from the mailing list' })
  @ApiParam({ name: 'id', description: 'ID of the mailing list entry' })
  @ApiResponse({
    status: 200,
    description: 'Mailing list entry deleted successfully',
    type: MailListDTO,
  })
  async delete(
    @Param('id', ValidateObjectIdPipe) id: string,
  ): Promise<MailList> {
    return this.mailListService.delete(id);
  }
}
