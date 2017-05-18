import { map } from '../../../lib/array';
import { fetchData } from '../../api';

export const createFetch =
  <type>(path: string, successAC: (data: { [TypeId: string]: type }) => Action<any>, errorAC: (message: string) => Action<ErrorResponse>): AsyncAction<string> =>
    dispatch =>
      () =>
        fetchData(path)
          .then((value: { [key: string]: type; }) => dispatch(successAC(value)))
          .catch(error => dispatch(errorAC(error.message)));

export const createSingleFetch =
  <type>(path: string, successAC: (data: { [TypeId: string]: type }) => Action<any>, errorAC: (message: string) => Action<ErrorResponse>): AsyncAction<string> =>
    dispatch =>
      (id: string) =>
        fetchData(`${path}/${id}`)
          .then((value: { [key: string]: type; }) => dispatch(successAC(value)))
          .catch(error => dispatch(errorAC(error.message)));

export const createMultiFetch =
  <typeId extends string, type>(path: string, successAC: (data: { [TypeId: string]: type }) => Action<any>, errorAC: (message: string) => Action<ErrorResponse>): AsyncMultiAction<string> =>
    dispatch =>
      (ids: typeId[]): Promise<void> => {
        const result: { [key: string]: type; } = {};

        return Promise.all(map(
          ids,
          (id: typeId) => fetchData(`${path}/${id}`)
            .then((value: type) => result[id] = value)
        ))
          .then(() => dispatch(successAC(result)))
          .catch(error => dispatch(errorAC(error.message)));

      }
