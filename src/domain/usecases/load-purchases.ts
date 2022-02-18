import { PurchasesModel } from "../models/purchase-model"

interface LoadPurchases {
    loadAll:() => Promise<Array<LoadPurchases.Result>>;
}

namespace LoadPurchases {
    export type Result = PurchasesModel;
}


export { LoadPurchases }