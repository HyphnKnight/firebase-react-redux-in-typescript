
export const makeErrorCreator =
  (type: string) =>
    (message: string): ErrorResponse => ({
      type,
      message,
    });

export const makeEmptyAction =
  (type: string) =>
    (): Action<{}> =>
      ({ type });