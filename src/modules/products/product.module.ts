import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { ProductRepository } from './product.repository';
import { SendMailService } from 'src/utils/sendMail.service';
import { ExportPDFService } from 'src/utils/exportPDF.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, SendMailService, ExportPDFService],
})
export class ProductModule {}
