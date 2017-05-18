export const $user = (state: State): State.auth.user | null => state.auth.user;
export const $authError = (state: State): ErrorResponse  | null => state.auth.error;