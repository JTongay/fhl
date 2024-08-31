export type Nullable<T> = null | T;

export interface ValidResult<T> {
  isValid: true;
  errors: null;
  data: T;
}

export interface InvalidResult<T> {
  isValid: false;
  errors: Nullable<T>;
  data: unknown;
}
