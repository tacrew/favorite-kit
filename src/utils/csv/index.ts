import type { CsvConfig } from './type';

import { isSafariBrowser } from '@/utils/browser';

import { convertArrayToCSV } from './formatter';

export const generateCSVURI = (data: string[][], headers?: string[], config?: CsvConfig): string => {
  const csvString = convertArrayToCSV(data, headers, config);
  const mimeType = isSafariBrowser() ? 'application/csv' : 'text/csv';
  const csvBlob = new Blob([csvString], { type: mimeType });
  const dataURI = `data:${mimeType};charset=utf-8,${encodeURIComponent(csvString)}`;

  const URLObject = window.URL || window.webkitURL;

  return typeof URLObject.createObjectURL === 'undefined' ? dataURI : URLObject.createObjectURL(csvBlob);
};
