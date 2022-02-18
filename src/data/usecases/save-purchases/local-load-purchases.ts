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

      throw new Error();

    } catch {
      this.cacheStore.delete(this.key);
      return []
    }
  }
}

export { LocalLoadPurchases }