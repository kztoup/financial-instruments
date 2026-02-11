import sampleData from "./sampleData.json";
import { Instrument } from "./types";

/**
 * Fetches instruments from a local JSON file.
 *
 * @returns A promise resolving to an array of `Instrument`.
 */

export const fetchInstruments = async (): Promise<Instrument[]> =>
  sampleData as Instrument[];
