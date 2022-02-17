import { SavePurchases } from "@/domain/usecases";
import { ICacheStore } from "../prococols/cache";

  
  class CacheStoreSpy implements ICacheStore {
    messages: Array<CacheStoreSpy.Message> = [];
    deletekey: string;
    insertKey: string
    insertValues: Array<SavePurchases.Params>;
    
    insert(insertKey: string, value:any): void{
      this.messages.push(CacheStoreSpy.Message.insert);
      this.insertKey = insertKey;
      this.insertValues = value;
    };
  
    delete(deletekey: string): void {
      this.messages.push(CacheStoreSpy.Message.delete);
      this.deletekey = deletekey;
    }

    simulateDeleteError (): void {
      jest
      .spyOn(CacheStoreSpy.prototype, 'delete')
      .mockImplementationOnce(()=>{
        this.messages.push(CacheStoreSpy.Message.delete);
        throw new Error()
      })
    }

    simulateInsertError (): void {
      jest
      .spyOn(CacheStoreSpy.prototype, 'insert')
      .mockImplementationOnce(()=>{
        this.messages.push(CacheStoreSpy.Message.insert);
        throw new Error()
      })
    }
  }

  namespace CacheStoreSpy {
    export enum Message {
      delete,
      insert,
    }
  }
  
  export { ICacheStore, CacheStoreSpy }