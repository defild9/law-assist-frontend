export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { content, messageId } = await request.json();

    const { marked } = await import('marked');
    const htmlContent = marked(content);

    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <style>
            /* Базові стилі */
            body {
              font-family: Arial, sans-serif;
              font-size: 13px;
              margin: 0;
              padding: 10mm;
              color: #333;
              line-height: 1.5;
            }
            h1, h2, h3, h4, h5, h6 {
              margin-top: 1.4em;
              margin-bottom: 0.6em;
            }
            p {
              margin: 0 0 1em 0;
            }
            pre {
              background: #f5f5f5;
              padding: 1em;
              overflow-x: auto;
            }
            code {
              background: #eef;
              padding: 2px 4px;
              border-radius: 3px;
              font-family: monospace;
            }
            blockquote {
              border-left: 4px solid #ccc;
              margin: 1em 0;
              padding-left: 1em;
              color: #555;
            }
            table {
              border-collapse: collapse;
              margin: 1em 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 4px 8px;
            }
            th {
              background: #f0f0f0;
            }
            img {
              max-width: 100%;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    const { default: puppeteer } = await import('puppeteer');

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="message-${messageId}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
