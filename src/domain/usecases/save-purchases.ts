import { PurchasesModel } from "../models/purchase-model";

interface SavePurchases {
    save: (purchases: Array<SavePurchases.Params>) => Promise<void>;
}

namespace SavePurchases {
    export type Params = PurchasesModel;
}


export { SavePurchases }