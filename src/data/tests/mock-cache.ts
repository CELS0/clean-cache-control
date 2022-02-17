import { SavePurchases } from "@/domain/usecases";
import { ICacheStore } from "../prococols/cache";

  
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

    simulateDeleteError (): void {
      jest
      .spyOn(CacheStoreSpy.prototype, 'delete')
      .mockImplementationOnce(()=>{throw new Error()})
    }

    simulateInsertError (): void {
      jest
      .spyOn(CacheStoreSpy.prototype, 'insert')
      .mockImplementationOnce(()=>{throw new Error()})
    }
  }
  
  export { ICacheStore, CacheStoreSpy }