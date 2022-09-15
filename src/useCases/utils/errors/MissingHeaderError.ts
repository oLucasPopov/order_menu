export class MissingHeaderError implements Error {
  name: string;
  message: string;

  constructor(headerName: string) {
    this.name = 'MissingHeaderError';
    this.message = `Missing header: ${headerName}`;
  }
}