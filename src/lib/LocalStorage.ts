import { forEach } from './array';

type LocalStorageConnection = {
  update: <V>(value: V) => void;
  pullData: () => string;
}

export default class LocalStorage extends Map<string, LocalStorageConnection> {

  constructor() {
    super();
    this.load();
  }

  load() {
    forEach([...this.keys()], key => {
      if (!!localStorage.getItem(key)) {
        const item = this.get(key);
        if (item) {
          item.update(localStorage.getItem(key));
        }
      }
    });
    return this;
  }

  save() {
    forEach([...this.keys()], key => {
      const item = this.get(key);
      if (item) {
        localStorage.setItem(key, item.pullData());
      }
    });
    return this;
  }

  reset() {
    localStorage.clear();
    return this.save();
  }

}