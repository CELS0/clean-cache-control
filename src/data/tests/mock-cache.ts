import { SavePurchases } from "@/domain/usecases";
import { ICacheStore } from "../prococols/cache";

  
  class CacheStoreSpy implements ICacheStore {
    actions: Array<CacheStoreSpy.Action> = [];
    deletekey: string;
    insertKey: string;
    fetchKey: string;
    insertValues: Array<SavePurchases.Params>;
    
    insert(insertKey: string, value:any): void{
      this.actions.push(CacheStoreSpy.Action.insert);
      this.insertKey = insertKey;
      this.insertValues = value;
    };
  
    delete(deletekey: string): void {
      this.actions.push(CacheStoreSpy.Action.delete);
      this.deletekey = deletekey;
    };

    fetch(key: string): void {
      this.actions.push(CacheStoreSpy.Action.fetch);
      this.fetchKey = key;
    };

    replace(key: string, value:any): void {
      this.delete(key);
      this.insert(key,value);
    };

    simulateDeleteError (): void {
      jest
      .spyOn(CacheStoreSpy.prototype, 'delete')
      .mockImplementationOnce(()=>{
        this.actions.push(CacheStoreSpy.Action.delete);
        throw new Error()
      })
    }

    simulateInsertError (): void {
      jest
      .spyOn(CacheStoreSpy.prototype, 'insert')
      .mockImplementationOnce(()=>{
        this.actions.push(CacheStoreSpy.Action.insert);
        throw new Error()
      })
    }

    simulateFetchError (): void {
      jest
      .spyOn(CacheStoreSpy.prototype, 'fetch')
      .mockImplementationOnce(()=>{
        this.actions.push(CacheStoreSpy.Action.fetch);
        throw new Error()
      })
    }
  }

  namespace CacheStoreSpy {
    export enum Action {
      delete,
      insert,
      fetch,
    }
  }
  
  export { ICacheStore, CacheStoreSpy }