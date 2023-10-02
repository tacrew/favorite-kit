import type { CsvConfig } from './type';

const escapeValueForCSV = (value: string, enclosingCharacter: string): string => {
  return value.replace(new RegExp(enclosingCharacter, 'g'), `${enclosingCharacter}${enclosingCharacter}`);
};

const formatDataForCSV = (dataRows: string[][], config: CsvConfig = {}): string => {
  const { separator = ',', enclosingCharacter = '"' } = config;

  return dataRows
    .filter((row) => row.some((cell) => cell.trim() !== ''))
    .map((row) =>
      row
        .map((value) => `${enclosingCharacter}${escapeValueForCSV(value, enclosingCharacter)}${enclosingCharacter}`)
        .join(separator)
    )
    .join(`\n`);
};

export const convertArrayToCSV = (data: string[][], headers?: string[], config?: CsvConfig): string => {
  // headersの数とdataのカラム数が一致するかのバリデーション
  if (headers && !data.every((row) => row.length === headers.length)) {
    throw new Error('Headers length does not match data columns count.');
  }

  return formatDataForCSV(headers ? [headers, ...data] : data, config);
};
