import { mockPurchases, CacheStoreSpy } from '@/data/tests';
import { SavePurchases } from '@/domain/usecases';
import { LocalLoadPurchases } from './local-load-purchases';


type SutTypes = {
  sut: LocalLoadPurchases;
  cacheStore: CacheStoreSpy;
  purchases: Array<SavePurchases.Params>;
}

const makeSut = (timestamp = new Date()): SutTypes => {
  const cacheStore = new CacheStoreSpy();

  const sut = new LocalLoadPurchases(cacheStore, timestamp)

  const purchases = mockPurchases();

  return { cacheStore, sut, purchases }
}

describe('LocalSavePurchases', () => {
  test('Should not delete or insert cache on sut.init', () => {
    const { cacheStore } = makeSut();

    expect(cacheStore.actions).toEqual([])
  });

  test('Should call correct key on load', async () => {
    const { cacheStore, sut } = makeSut();

    await sut.loadAll();

    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch]);
    expect(cacheStore.fetchKey).toBe('purchases');
  });

  test('Should return empty list if load fails', async () => {
    const { cacheStore, sut } = makeSut();

    cacheStore.simulateFetchError();

    const purchases = await sut.loadAll();

    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch, CacheStoreSpy.Action.delete]);
    expect(cacheStore.deletekey).toBe('purchases');
    expect(purchases).toEqual([]);
  });
});
