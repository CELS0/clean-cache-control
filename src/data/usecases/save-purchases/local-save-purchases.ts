import { ICacheStore } from '@/data/prococols/cache'
import { SavePurchases } from '@/domain/usecases';

class LocalSavePurchases implements SavePurchases {
  constructor(
    private cacheStore: ICacheStore,
    private timestamp: Date
  ) { }

  async save(purchases: Array<SavePurchases.Params>): Promise<void> {
    this.cacheStore.replace('purchases', { timestamp: this.timestamp, value:  purchases  });
  }
}

export { LocalSavePurchases }