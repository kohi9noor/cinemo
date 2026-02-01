export interface Result<T> {
  data: T | null;
  error: Error | null;
}

export const ok = <T>(value: T): Result<T> => {
  return { data: value, error: null };
};

export const err = <T = never>(error: Error): Result<T> => {
  return { data: null, error };
};
