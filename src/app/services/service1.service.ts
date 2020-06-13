import { Injectable } from "@angular/core";
import { from } from "rxjs";
import { delay, flatMap, map, reduce } from "rxjs/operators";
import { shouldFail } from "../utils/shouldFail";

const ERROR_MESSAGE = "Numbers are against you";

@Injectable({
  providedIn: "root",
})
export class Service1Service {
  constructor() {}

  processValue(value: string) {
    return from([value]).pipe(
      delay(1000),
      flatMap((val) => {
        if (shouldFail()) {
          throw new Error(ERROR_MESSAGE);
        }
        return from(val).pipe(
          map((el) => {
            if (isNaN(el as any)) throw new Error(ERROR_MESSAGE);
            return Number(el);
          }),
          reduce((acc, value1) => {
            return acc + value1;
          }, 0)
        );
      })
    );
  }
}
