import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MailListDTO } from 'src/dto/mailList';
import { MailList } from 'src/interfaces/mailList';
import { MailListService } from 'src/services/mail-list/mail-list.service';


@Controller('mail-list')
export class MailListController {
  constructor(private readonly mailListService: MailListService) {}

  @Post()
  async create(@Body() mailListDto: MailListDTO): Promise<MailList> {
    return this.mailListService.create(mailListDto);
  }

  @Get()
  async findAll(): Promise<MailList[]> {
    return this.mailListService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MailList> {
    return this.mailListService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() mailListDto: MailListDTO): Promise<MailList> {
    return this.mailListService.update(id, mailListDto);
  }

  @Delete('unsubscribe/:id')
  async delete(@Param('id') id: string): Promise<MailList> {
    return this.mailListService.delete(id);
  }

  
}
