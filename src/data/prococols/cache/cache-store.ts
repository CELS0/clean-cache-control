interface ICacheStore {
  delete: (key: string) => void;
  insert: (insertKey: string) => void;
}

class CacheStoreSpy implements ICacheStore {
  deleteCallsCount = 0;
  deletekey: string;
  insertCallsCount = 0;
  insertKey: string
  
  insert(insertKey: string): void{
    this.insertCallsCount++;
    this.insertKey = insertKey;
  };

  delete(deletekey: string): void {
    this.deleteCallsCount++;
    this.deletekey = deletekey;
  }
}

export { ICacheStore, CacheStoreSpy }