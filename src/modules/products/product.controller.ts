import {
  Controller,
  Post,
  Req,
  Get,
  Put,
  Delete,
  Body,
  Query,
  Res,
} from '@nestjs/common';

import { Request } from 'express';

import { CreateProductDto } from './dto/createProduct.dto';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendMailService } from 'src/utils/sendMail.service';
import { ExportPDFService } from 'src/utils/exportPDF.service';
import { Response } from 'express';

// @UseGuards(AuthGuard)

// @ApiBearerAuth()
@ApiTags('Product')
@Controller('api/v1/product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private sendMailService: SendMailService,
    private exportPDFService: ExportPDFService,
  ) {}

  @ApiOperation({ summary: 'Get data product' })
  @Roles(Role.Admin, Role.Editor)
  @Get()
  async getProduct(@Query() query) {
    console.log('Kiểm tra query:', query);

    // Lấy query

    const data = await this.productService.getProduct({
      ...query,
    });

    return data;
  }
  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    try {
      return await this.productService.createProduct(body);
    } catch (error) {
      throw error;
    }
  }

  @Post('file')
  async createManyProduct(@Body() body) {
    return await this.productService.createManyProduct(body.dataCSV);
  }

  @Put(':id')
  async updateProduct(@Req() req: Request) {}
  @Delete(':id')
  async deleteProduct(@Req() req: Request) {}

  @Get('sendMail')
  async sendMail() {
    const createContentPdf = this.exportPDFService.orderContentPDF();
    const pdfBuffer = await this.exportPDFService.generatePdf(createContentPdf);
    const contentMail = this.sendMailService.mailOrderConent('');
    this.sendMailService.sendMail(contentMail, pdfBuffer.data);
  }

  @Get('pdf')
  async getPdf(@Res() res: Response) {
    const createContentPdf = this.exportPDFService.orderContentPDF();
    const pdfInfo = await this.exportPDFService.generatePdf(createContentPdf);


    res.set(pdfInfo.config)

    res.send(pdfInfo.data);
  }
}
