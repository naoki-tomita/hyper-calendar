export class Storage<T> {
  key: string;
  cache: any;
  constructor(key: string) {
    this.key = key;
  }
  get(): T {
    if (this.cache) {
      return this.cache;
    }
    return this.cache = JSON.parse(localStorage.getItem(this.key));
  }
  set(parameter: T) {
    this.cache = parameter;
    localStorage.setItem(this.key, JSON.stringify(parameter));
  }
}