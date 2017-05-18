
export const fetchData = <type>(path: string): Promise<type> => firebase
  .database()
  .ref(path)
  .once('value')
  .then((snapshot: firebase.database.DataSnapshot): type => snapshot.val<type>());

export const setData = <type>(path: string, value: type): Promise<type> => firebase
  .database()
  .ref(path)
  .set(value);

export const updateData = (updates: { [path: string]: any }): Promise<void> => firebase
  .database()
  .ref()
  .update(updates);

export const postData = <type>(path: string, value: type): Promise<string> => {
  const ref = firebase.database().ref(path).push();
  const key = ref.key;
  return ref.set(value)
    .then(() => key);
}

export const removeData = (path: string): Promise<null> => firebase
  .database()
  .ref(path)
  .remove();

export const subscribeData = <type>(path: string, subscription: (value: type) => void): (() => void) => {
  const ref = firebase.database().ref(path);
  ref.on('value', snapshot => snapshot && subscription(snapshot.val<type>()));
  return () => ref.off();
}