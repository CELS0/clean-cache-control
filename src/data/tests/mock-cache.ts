import {  SavePurchases } from "@/domain/usecases";
import { ICacheStore } from "../prococols/cache";

const maxAgeInDays = 3;

type DateExpiration = {
  timestamp: Date,
  currentDate: Date,
}

export const getCacheExpirationDate = (): DateExpiration => {
  const currentDate = new Date();

  const timestamp = new Date(currentDate);
  timestamp.setDate(timestamp.getDate() - maxAgeInDays);

  return { timestamp, currentDate }
}
class CacheStoreSpy implements ICacheStore {
  actions: Array<CacheStoreSpy.Action> = [];
  deletekey: string;
  insertKey: string;
  fetchKey: string;
  insertValues: Array<SavePurchases.Params>;
  fetchResults: any;

  insert(insertKey: string, value: any): void {
    this.actions.push(CacheStoreSpy.Action.insert);
    this.insertKey = insertKey;
    this.insertValues = value;
  };

  delete(deletekey: string): void {
    this.actions.push(CacheStoreSpy.Action.delete);
    this.deletekey = deletekey;
  };

  fetch(key: string): any {
    this.actions.push(CacheStoreSpy.Action.fetch);
    this.fetchKey = key;

    return this.fetchResults;
  };

  replace(key: string, value: any): void {
    this.delete(key);
    this.insert(key, value);
  };

  simulateDeleteError(): void {
    jest
      .spyOn(CacheStoreSpy.prototype, 'delete')
      .mockImplementationOnce(() => {
        this.actions.push(CacheStoreSpy.Action.delete);
        throw new Error()
      })
  }

  simulateInsertError(): void {
    jest
      .spyOn(CacheStoreSpy.prototype, 'insert')
      .mockImplementationOnce(() => {
        this.actions.push(CacheStoreSpy.Action.insert);
        throw new Error()
      })
  }

  simulateFetchError(): void {
    jest
      .spyOn(CacheStoreSpy.prototype, 'fetch')
      .mockImplementationOnce(() => {
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