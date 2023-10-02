import { convertArrayToCSV } from './formatter';

describe('convertArrayToCSV', () => {
  it('converts a simple array to a CSV string without headers', () => {
    const data = [
      ['John', 'Doe'],
      ['Jane', 'Doe'],
    ];
    expect(convertArrayToCSV(data)).toBe('"John","Doe"\n"Jane","Doe"');
  });

  it('converts an array to a CSV string with headers', () => {
    const data = [['John'], ['Jane']];
    const headers = ['First Name'];
    expect(convertArrayToCSV(data, headers)).toBe('"First Name"\n"John"\n"Jane"');
  });

  it('handles custom separators', () => {
    const data = [
      ['John', 'Doe'],
      ['Jane', 'Doe'],
    ];
    expect(convertArrayToCSV(data, undefined, { separator: ';' })).toBe('"John";"Doe"\n"Jane";"Doe"');
  });

  it('handles custom enclosing characters', () => {
    const data = [
      ['John', 'Doe'],
      ['Jane', 'Doe'],
    ];
    expect(convertArrayToCSV(data, undefined, { separator: ',', enclosingCharacter: "'" })).toBe(
      "'John','Doe'\n'Jane','Doe'"
    );
  });

  it('escapes enclosing characters within data', () => {
    const data = [
      ['Jo"hn', 'Doe'],
      ['Ja"ne', 'Doe'],
    ];
    expect(convertArrayToCSV(data)).toBe('"Jo""hn","Doe"\n"Ja""ne","Doe"');
  });

  it('handles combinations of custom settings', () => {
    const data = [
      ['Jo;hn', 'Do,e'],
      ['Ja;ne', 'Doe'],
    ];
    const headers = ['First; Name', 'Last, Name'];
    expect(convertArrayToCSV(data, headers, { separator: ';', enclosingCharacter: "'" })).toBe(
      "'First; Name';'Last, Name'\n'Jo;hn';'Do,e'\n'Ja;ne';'Doe'"
    );
  });

  it('properly handles empty rows and cells', () => {
    const data = [['John', ''], ['', 'Doe'], []];
    expect(convertArrayToCSV(data)).toBe('"John",""\n"","Doe"');
  });

  it('throws an error when the header length does not match data columns', () => {
    const data = [['John'], ['Jane']];
    const headers = ['First Name', 'Last Name'];
    expect(() => convertArrayToCSV(data, headers)).toThrow();
  });
});
