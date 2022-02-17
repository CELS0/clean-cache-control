import { mockPurchases, CacheStoreSpy } from '@/data/tests';
import { SavePurchases } from '@/domain/usecases';
import { LocalSavePurchases } from '../'


type SutTypes = {
  sut: LocalSavePurchases;
  cacheStore: CacheStoreSpy;
  purchases: Array<SavePurchases.Params>;
}

const makeSut = (): SutTypes => {
  const cacheStore = new CacheStoreSpy();

  const sut = new LocalSavePurchases(cacheStore)

  const purchases = mockPurchases();

  return { cacheStore, sut, purchases }
}

describe('LocalSavePurchases', () => {
  test('Should not delete cache on sut.init', () => {
    const { cacheStore } = makeSut();

    expect(cacheStore.deleteCallsCount).toBe(0)
  });

  test('Should delete old cache on sut.save', async () => {
    const { sut, cacheStore, purchases } = makeSut();

    await sut.save(purchases);

    expect(cacheStore.deleteCallsCount).toBe(1)
    expect(cacheStore.insertKey).toBe('purchases')
  });

  test('Should not insert new Cache if delete fails', () => {
    const { sut, cacheStore, purchases } = makeSut();

    cacheStore.simulateDeleteError();

    const promise = sut.save(purchases);

    expect(cacheStore.insertCallsCount).toBe(0);
    expect(promise).rejects.toThrow();
  });

  test('Should insert new Cache if delete succeds', async () => {
    const { sut, cacheStore, purchases } = makeSut();

    await sut.save(purchases);

    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.insertCallsCount).toBe(1);
    expect(cacheStore.insertValues).toEqual(purchases);
  });

  test('Should throw if insert throws', async () => {
    const { sut, cacheStore, purchases } = makeSut();

    cacheStore.simulateInsertError();

    const promise = sut.save(purchases);

    expect(promise).rejects.toThrow();
  });
});
