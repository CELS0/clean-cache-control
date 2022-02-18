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

describe('LocalValidadePurchases', () => {
  test('Should not delete or insert cache on sut.init', () => {
    const { cacheStore } = makeSut();

    expect(cacheStore.actions).toEqual([])
  });

  test('Should delete cache if load fails', () => {
    const { cacheStore, sut } = makeSut();

    cacheStore.simulateFetchError();

    sut.validate();

    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch, CacheStoreSpy.Action.delete])
    expect(cacheStore.deletekey).toBe('purchases');
  });
});
