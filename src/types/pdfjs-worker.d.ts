import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Tell pdfjs where the worker file is
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
