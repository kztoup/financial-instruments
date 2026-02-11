export enum AssetClass {
  Equities = "Equities",
  Macro = "Macro",
  Credit = "Credit",
}

export type Instrument = {
  ticker: string;
  price: number;
  assetClass: AssetClass;
};
