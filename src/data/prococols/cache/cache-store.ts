import { SavePurchases } from "@/domain/usecases";

interface ICacheStore {
  delete: (key: string) => void;
  insert: (insertKey: string, value: any) => void;
  replace: (key: string, value:any)=> void;
}

class CacheStoreSpy implements ICacheStore {
  deleteCallsCount = 0;
  deletekey: string;
  insertCallsCount = 0;
  insertKey: string
  insertValues: Array<SavePurchases.Params>;
  
  insert(insertKey: string, value:any): void{
    this.insertCallsCount++;
    this.insertKey = insertKey;
    this.insertValues = value;
  };

  delete(deletekey: string): void {
    this.deleteCallsCount++;
    this.deletekey = deletekey;
  }
  replace: () => void;
}

export { ICacheStore, CacheStoreSpy }