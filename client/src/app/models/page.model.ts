export class Page<T> {
  content: T[] = [];
  totalElements!: number;
  totalPages!: number;
  size!: number;
  number!: number;
  sort!: string;
  numberOfElements!: number;
  first!: boolean;
  last!: boolean;
  empty!: boolean;
}
