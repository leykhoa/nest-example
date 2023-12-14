import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class exportPDFService {
  async generatePdf(data = '') {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const margins = {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm',
    };

    await page.setContent(data);

    const pdfBuffer = await page.pdf({ format: 'A4', margin: margins });

    await browser.close();

    return {
      config: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=test.pdf',
        'Content-Length': pdfBuffer.length,
      },
      data: pdfBuffer,
    };
  }

  orderContentPDF() {
    return ``;
  }
}
