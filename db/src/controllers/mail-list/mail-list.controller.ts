import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailListDTO } from 'src/dto/mailList';
import { MailList } from 'src/interfaces/mailList';
import { ValidateObjectIdPipe } from 'src/pipes/validate-object-id.pipe';
import { MailListService } from 'src/services/mail-list/mail-list.service';

@ApiTags('Newsletters')
@Controller('mail-list')
export class MailListController {
  constructor(private readonly mailListService: MailListService) {}
  
  @Post()
  async create(@Body() mailListDto: MailListDTO): Promise<MailList> {
      return this.mailListService.create(mailListDto);
    }
    @Get('unsubscribe/:email')
    async unsubscribe(@Param('email') email: string) {
      return this.mailListService.unsubscribe(email);
    }

  @Get()
  async findAll(): Promise<MailList[]> {
    return this.mailListService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ValidateObjectIdPipe) id: string): Promise<MailList> {
    return this.mailListService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ValidateObjectIdPipe) id: string, @Body() mailListDto: MailListDTO): Promise<MailList> {
    return this.mailListService.update(id, mailListDto);
  }

  @Delete(':id')
  async delete(@Param('id', ValidateObjectIdPipe) id: string): Promise<MailList> {
    return this.mailListService.delete(id);
  }


  
}
