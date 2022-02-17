import { mockPurchases, CacheStoreSpy } from '@/data/tests';
import { SavePurchases } from '@/domain/usecases';
import { LocalSavePurchases } from '../'


type SutTypes = {
  sut: LocalSavePurchases;
  cacheStore: CacheStoreSpy;
  purchases: Array<SavePurchases.Params>;
}

const makeSut = (timestamp = new Date()): SutTypes => {
  const cacheStore = new CacheStoreSpy();

  const sut = new LocalSavePurchases(cacheStore, timestamp)

  const purchases = mockPurchases();

  return { cacheStore, sut, purchases }
}

describe('LocalSavePurchases', () => {
  test('Should not delete or insert cache on sut.init', () => {
    const { cacheStore } = makeSut();

    expect(cacheStore.messages).toEqual([])
  });

  test('Should delete old cache on sut.save', async () => {
    const { sut, cacheStore, purchases } = makeSut();

    await sut.save(purchases);

    expect(cacheStore.messages).toEqual([CacheStoreSpy.Message.delete, CacheStoreSpy.Message.insert]);
    expect(cacheStore.insertKey).toBe('purchases')
  });

  test('Should insert new Cache if delete succeds', async () => {
    const timestamp = new Date();

    const { sut, cacheStore, purchases } = makeSut(timestamp);

    await sut.save(purchases);

    expect(cacheStore.messages).toEqual([CacheStoreSpy.Message.delete, CacheStoreSpy.Message.insert]);
    expect(cacheStore.deletekey).toBe('purchases');
    expect(cacheStore.insertKey).toBe('purchases');
    expect(cacheStore.insertValues).toEqual({
      timestamp,
      value: purchases
    }
    );
  });

  test('Should throw if insert throws', async () => {
    const { sut, cacheStore, purchases } = makeSut();

    cacheStore.simulateInsertError();

    const promise = sut.save(purchases);

    expect(cacheStore.messages).toEqual([CacheStoreSpy.Message.delete, CacheStoreSpy.Message.insert]);
    await expect(promise).rejects.toThrow();
  });
});
