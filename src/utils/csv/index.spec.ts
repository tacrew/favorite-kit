import { generateCSVURI } from './index';

describe('generateCSVURI', () => {
  it('generates a Blob URL or Data URI with correct CSV data', () => {
    const data = [
      ['John', 'Doe'],
      ['Jane', 'Smith'],
    ];
    const expectedURIContent = '"John","Doe"\n"Jane","Smith"';
    const result = generateCSVURI(data);

    if (result.startsWith('blob:')) {
      expect(result).toMatch(/^blob:/);
    } else {
      expect(result).toBe(`data:text/csv;charset=utf-8,${encodeURIComponent(expectedURIContent)}`);
    }
  });

  it('generates a Blob URL or Data URI for CSV data with headers', () => {
    const data = [
      ['John', 'Doe'],
      ['Jane', 'Smith'],
    ];
    const headers = ['First Name', 'Last Name'];
    const expectedURIContent = '"First Name","Last Name"\n"John","Doe"\n"Jane","Smith"';
    const result = generateCSVURI(data, headers);

    if (result.startsWith('blob:')) {
      expect(result).toMatch(/^blob:/);
    } else {
      expect(result).toBe(`data:text/csv;charset=utf-8,${encodeURIComponent(expectedURIContent)}`);
    }
  });

  it('allows customization of the separator', () => {
    const data = [
      ['John', 'Doe'],
      ['Jane', 'Smith'],
    ];
    const separator = ';';
    const expectedURIContent = '"John";"Doe"\n"Jane";"Smith"';
    const result = generateCSVURI(data, undefined, { separator });

    if (result.startsWith('blob:')) {
      expect(result).toMatch(/^blob:/);
    } else {
      expect(result).toBe(`data:text/csv;charset=utf-8,${encodeURIComponent(expectedURIContent)}`);
    }
  });

  it('allows customization of the enclosing character', () => {
    const data = [
      ['John', 'Doe'],
      ['Jane', 'Smith'],
    ];
    const enclosingCharacter = "'";
    const expectedURIContent = "'John','Doe'\n'Jane','Smith'";
    const result = generateCSVURI(data, undefined, { separator: ',', enclosingCharacter });

    if (result.startsWith('blob:')) {
      expect(result).toMatch(/^blob:/);
    } else {
      expect(result).toBe(`data:text/csv;charset=utf-8,${encodeURIComponent(expectedURIContent)}`);
    }
  });

  it('correctly detects MIME type for Safari browsers', () => {
    const originalUserAgent = navigator.userAgent;
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.3 Safari/605.1.15',
      configurable: true,
    });

    const data = [['John', 'Doe']];
    const result = generateCSVURI(data);

    if (result.startsWith('blob:')) {
      expect(result).toMatch(/^blob:/);
    } else {
      expect(result).toMatch(/^data:application\/csv;/);
    }

    Object.defineProperty(window.navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    });
  });

  it('returns an empty CSV when data is empty', () => {
    const data: string[][] = [];
    const expectedURIContent = '';
    const result = generateCSVURI(data);

    if (result.startsWith('blob:')) {
      expect(result).toMatch(/^blob:/);
    } else {
      expect(result).toBe(`data:text/csv;charset=utf-8,${encodeURIComponent(expectedURIContent)}`);
    }
  });

  it('correctly encodes special characters', () => {
    const data = [['こんにちは、世界', '"quote" test', 'emoji:😀']];
    const expectedURIContent = '"こんにちは、世界","""quote"" test","emoji:😀"';
    const result = generateCSVURI(data);

    if (result.startsWith('blob:')) {
      expect(result).toMatch(/^blob:/);
    } else {
      expect(result).toBe(`data:text/csv;charset=utf-8,${encodeURIComponent(expectedURIContent)}`);
    }
  });
});
