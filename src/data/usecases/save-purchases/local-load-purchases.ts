import { ICacheStore } from '@/data/prococols/cache'
import { SavePurchases } from '@/domain/usecases';

class LocalLoadPurchases implements SavePurchases {
  private readonly key = 'purchases';

  constructor(
    private cacheStore: ICacheStore,
    private timestamp: Date
  ) { }

  async save(purchases: Array<SavePurchases.Params>): Promise<void> {
    this.cacheStore.replace(this.key, { timestamp: this.timestamp, value:  purchases  });
  }

  async loadAll(): Promise<void>{
    this.cacheStore.fetch(this.key);
  };
}

export { LocalLoadPurchases }