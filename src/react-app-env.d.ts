/// <reference types="react-scripts" />

import { Entries } from "type-fest";
declare global {
	type Dictionary<Thing> = Record<string, Thing>;

  interface ObjectConstructor {
    entries<T extends object>(o: T): Entries<T>;
    keys<T extends object>(o: T): Array<keyof T>;
  }
}


