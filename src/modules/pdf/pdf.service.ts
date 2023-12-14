import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  async generatePdf(): Promise<Buffer> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const margins = {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm',
    };

    await page.setContent('<h1>Hello World</h1>');

    const pdfBuffer = await page.pdf({ format: 'A4', margin: margins });

    await browser.close();

    return pdfBuffer;
  }
}
