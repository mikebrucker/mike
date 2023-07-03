/// <reference types="react-scripts" />

import { Entries } from "type-fest";
declare global {
  type Dictionary<Thing, TypeOfThing = string> = Record<TypeOfThing, Thing>;

  interface ObjectConstructor {
    entries<T extends object>(o: T): Entries<T>;
    keys<T extends object>(o: T): Array<keyof T>;
  }
}
