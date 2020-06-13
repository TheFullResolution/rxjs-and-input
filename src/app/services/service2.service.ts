import { Injectable } from "@angular/core";
import { from } from "rxjs";
import { delay, flatMap, map, reduce } from "rxjs/operators";
import { shouldFail } from "../utils/shouldFail";
import randomatic from "randomatic";

const ERROR_MESSAGE = "I am failing";

@Injectable({
  providedIn: "root",
})
export class Service2Service {
  constructor() {}

  processValue(value: string, service1Val: number | null) {
    return from([value]).pipe(
      delay(3000),
      map((val) => {
        if (shouldFail()) {
          throw new Error(ERROR_MESSAGE);
        }
        return randomatic("?", service1Val ?? 10, { chars: value });
      })
    );
  }
}
