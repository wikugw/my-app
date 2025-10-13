export const pdfToApplicationData = async (file: File) => {
  // ⏳ Dynamically import pdfjs only when this function is called
  const pdfjsLib = await import('pdfjs-dist');
  const pdfWorker = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;

  // Configure worker at runtime
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

  // Load and parse PDF
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    fullText += ' ' + pageText;
  }

  const cleanText = fullText.replace(/\s+/g, ' ').trim();

  const emailMatch = cleanText.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );
  const email = emailMatch ? emailMatch[0] : '';

  const nameMatch = cleanText.match(/^([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)/);
  const name = nameMatch ? nameMatch[1].trim() : '';

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

  return { name, email, skills };
};
