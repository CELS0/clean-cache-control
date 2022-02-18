import { mockPurchases, CacheStoreSpy, getCacheExpirationDate } from '@/data/tests';
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

  test('Should has no side effect if load succeds', () => {
    const { timestamp, currentDate } = getCacheExpirationDate();
    timestamp.setSeconds(timestamp.getSeconds() - 1);

    const { cacheStore, sut, purchases } = makeSut(currentDate);

    cacheStore.fetchResults = { timestamp };

    sut.validate();

    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch])
    expect(cacheStore.fetchKey).toBe('purchases');
  });
});
