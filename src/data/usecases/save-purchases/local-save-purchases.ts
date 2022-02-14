import { ICacheStore } from '@/data/prococols/cache'
import { SavePurchases } from '@/domain/usecases';

class LocalSavePurchases implements SavePurchases {
  constructor(private cacheStore: ICacheStore) { }

  async save(purchases: Array<SavePurchases.Params>): Promise<void> {
    this.cacheStore.delete('purchases');
    this.cacheStore.insert('purchases', purchases);
  }
}

export { LocalSavePurchases }