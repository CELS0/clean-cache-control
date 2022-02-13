import { ICacheStore } from '@/data/prococols/cache'

class LocalSavePurchases {
  constructor(private cacheStore: ICacheStore) { }

  async save(key: string): Promise<void> {
    this.cacheStore.delete(key);
  }
}

export { LocalSavePurchases }