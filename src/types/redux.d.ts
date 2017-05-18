type Action<type> = type & { type: string };

interface Reducer<state,type,result> {
  (state: state, action: Action<type> ): result
}

interface Dispatch {
  (action: Action<any>): void
}

interface AsyncAction<type> {
  (dispatch: Dispatch): (data: type) => Promise<void>;
}

interface AsyncMultiAction<type> {
  (dispatch: Dispatch): (data: type[]) => Promise<void>;
}

declare type ErrorResponse = {
  type: string;
  message: string;
}
