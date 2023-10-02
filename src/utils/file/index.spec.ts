import { downloadFile } from '.';

describe('downloadFile', () => {
  beforeEach(() => {
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
  });

  it('creates an anchor element and triggers a click event', () => {
    const linkClickMock = jest.fn();
    window.HTMLAnchorElement.prototype.click = linkClickMock;

    downloadFile('sample-uri', 'sample-file.csv');

    expect(linkClickMock).toHaveBeenCalled();
  });

  it("generated anchor element's href attribute matches the specified URI", () => {
    downloadFile('sample-uri', 'sample-file.csv');

    const appendedElement = (document.body.appendChild as jest.Mock).mock.calls[0][0] as HTMLAnchorElement;
    expect(appendedElement.href).toContain('sample-uri');
  });

  it("generated anchor tag's download attribute matches the specified filename", () => {
    downloadFile('sample-uri', 'sample-file.csv');

    const appendedElement = (document.body.appendChild as jest.Mock).mock.calls[0][0] as HTMLAnchorElement;
    expect(appendedElement.download).toBe('sample-file.csv');
  });

  it('anchor tag is properly removed from the DOM after being added', () => {
    downloadFile('sample-uri', 'sample-file.csv');

    expect(document.body.appendChild).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalled();
  });

  it('handles URIs and filenames with special characters correctly', () => {
    downloadFile('sample-uri?query=value', 'sample$file.csv');

    const appendedElement = (document.body.appendChild as jest.Mock).mock.calls[0][0] as HTMLAnchorElement;
    expect(appendedElement.href).toContain('sample-uri?query=value');
    expect(appendedElement.download).toBe('sample$file.csv');
  });
});
