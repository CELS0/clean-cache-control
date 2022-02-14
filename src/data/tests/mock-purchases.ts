import { SavePurchases } from "@/domain/usecases";

export const mockPurchases = (): Array<SavePurchases.Params> => [
    {
      id: '1',
      date: new Date(),
      value: 50
    },
    {
      id: '2',
      date: new Date(),
      value: 100
    },
    {
      id: '3',
      date: new Date(),
      value: 150
    }
  ]