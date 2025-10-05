import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import type { TextItem } from 'pdfjs-dist/types/src/display/api';

// Tell pdfjs where the worker file is
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const pdfToApplicationData = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';

  // Extract text from each page
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => (item as TextItem).str).join(' ');
    fullText += ' ' + pageText;
  }

  console.log('Extracted text:', fullText);

  // 🧩 Normalize
  const cleanText = fullText.replace(/\s+/g, ' ').trim();

  // 📧 Email
  const emailMatch = cleanText.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );
  const email = emailMatch ? emailMatch[0] : '';

  // 🧍 Name (usually the first line, before address or contact info)
  const nameMatch = cleanText.match(/^([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)/);
  const name = nameMatch ? nameMatch[1].trim() : '';

  // 🧠 Extract skills from the “Skills & Abilities” section
  const skillsSectionMatch = cleanText.match(
    /Skills & Abilities(.*?)(?:Portfolio|Education)/i
  );
  let skills: string[] = [];
  if (skillsSectionMatch) {
    const section = skillsSectionMatch[1];
    skills = section
      .split(/[\n•,]/)
      .map(s => s.trim())
      .filter(
        s =>
          s &&
          !s.toLowerCase().includes('skill') &&
          !s.toLowerCase().includes('abilities') &&
          !s.includes('TECHNICAL') &&
          !s.includes('PERSONAL')
      );
  }

  return {
    name,
    email,
    skills,
  };
};
