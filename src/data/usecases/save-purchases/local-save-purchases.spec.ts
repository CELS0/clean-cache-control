import { LocalSavePurchases } from '../'
import { CacheStoreSpy } from '@/data/prococols/cache'

type SutTypes = {
  sut: LocalSavePurchases;
  cacheStore: CacheStoreSpy;
}

const makeSut = (): SutTypes => {
  const cacheStore = new CacheStoreSpy();

  const sut = new LocalSavePurchases(cacheStore)

  return { cacheStore, sut }
}

describe('LocalSavePurchases', () => {
  test('Should not delete cache on sut.init', () => {
    const { cacheStore } = makeSut();

    expect(cacheStore.deleteCallsCount).toBe(0)
  });

  test('Should delete old cache on sut.save', async () => {
    const { sut, cacheStore } = makeSut();

    await sut.save('purchases');

    expect(cacheStore.deleteCallsCount).toBe(1)
    expect(cacheStore.key).toBe('purchases')
  });
});
