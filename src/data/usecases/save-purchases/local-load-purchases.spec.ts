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

  test('Should return empty list if load fails', async () => {
    const { cacheStore, sut } = makeSut();

    cacheStore.simulateFetchError();

    const purchases = await sut.loadAll();

    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch, CacheStoreSpy.Action.delete]);
    expect(cacheStore.deletekey).toBe('purchases');
    expect(purchases).toEqual([]);
  });

  test('Should return a list of purchases if cache is less than 3 day old', async () => {
    const currentDate = new Date();
    const timestamp = new Date(currentDate);
    timestamp.setDate(timestamp.getDate() - 3);
    timestamp.setSeconds(timestamp.getSeconds() + 1);

    const { cacheStore, sut, purchases } = makeSut(currentDate);

    cacheStore.fetchResults = {
      timestamp,
      value: purchases,
    }

    const result = await sut.loadAll();

    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch])
    expect(cacheStore.fetchKey).toBe('purchases');
    expect(result).toEqual(cacheStore.fetchResults.value);
  });

  test('Should return an empty list if cache is more than 3 days old', async () => {
    const currentDate = new Date();
    const timestamp = new Date(currentDate);
    timestamp.setDate(timestamp.getDate() - 3);
    timestamp.setSeconds(timestamp.getSeconds() - 1);

    const { cacheStore, sut, purchases } = makeSut(currentDate);

    cacheStore.fetchResults = {
      timestamp,
      value: purchases,
    }

    const result = await sut.loadAll();

    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch, CacheStoreSpy.Action.delete])
    expect(cacheStore.fetchKey).toBe('purchases');
    expect(cacheStore.deletekey).toBe('purchases');
    expect(result).toEqual([]);
  });

});
