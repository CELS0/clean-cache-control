import { ICacheStore } from '@/data/prococols/cache'
import { CachePolicy } from '@/data/prococols/cache/cache-policy';
import { LoadPurchases, SavePurchases } from '@/domain/usecases';

class LocalLoadPurchases implements SavePurchases, LoadPurchases {
  private readonly key = 'purchases';

  constructor(
    private cacheStore: ICacheStore,
    private currentDate: Date
  ) { }

  async save(purchases: Array<SavePurchases.Params>): Promise<void> {
    this.cacheStore.replace(this.key, { timestamp: this.currentDate, value: purchases });
  }

  async loadAll(): Promise<Array<LoadPurchases.Result>> {
    try {
      const cache = this.cacheStore.fetch(this.key);

      if (CachePolicy.validate(cache.timestamp, this.currentDate)) {
        return cache.value;
      }

      this.cacheStore.delete(this.key);
      return []

    } catch {
      return []
    }
  }

  validate(): void {
    try {
      this.cacheStore.fetch(this.key);
    } catch(error)
    { 
      this.cacheStore.delete(this.key);
    }
  }
}

export { LocalLoadPurchases }