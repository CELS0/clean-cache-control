import { PurchasesModel } from "../models/purchase-model"

interface LoadPurchases {
    loadll: (purchases: Promise<Array<LoadPurchases.Result>>) => Promise<void>;
}

namespace LoadPurchases {
    export type Result = PurchasesModel;
}


export { LoadPurchases }