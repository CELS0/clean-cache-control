interface ICacheStore {
  delete: (key: string) => void;
}

class CacheStoreSpy implements ICacheStore {
  deleteCallsCount = 0;
  key: string;

  delete(key: string): void {
    this.deleteCallsCount++
    this.key = key;
  }
}

export { ICacheStore, CacheStoreSpy }