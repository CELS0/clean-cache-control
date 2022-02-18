import { ICacheStore } from '@/data/prococols/cache'
import { LoadPurchases, SavePurchases } from '@/domain/usecases';

class LocalLoadPurchases implements SavePurchases, LoadPurchases {
  private readonly key = 'purchases';

  constructor(
    private cacheStore: ICacheStore,
    private timestamp: Date
  ) { }

  async save(purchases: Array<SavePurchases.Params>): Promise<void> {
    this.cacheStore.replace(this.key, { timestamp: this.timestamp, value: purchases });
  }

  async loadAll(): Promise<Array<LoadPurchases.Result>> {
    try {
      this.cacheStore.fetch(this.key);
      return []
    } catch {
      this.cacheStore.delete(this.key);
      return []
    }
  }
}

export { LocalLoadPurchases }