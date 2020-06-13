import { Injectable } from "@angular/core";
import { from } from "rxjs";
import { delay, flatMap, map, reduce } from "rxjs/operators";
import { shouldFail } from "../utils/shouldFail";
import randomatic from "randomatic";

const ERROR_MESSAGE = "Service 2 failed";

@Injectable({
  providedIn: "root",
})
export class Service2Service {
  constructor() {}

  processValue(value: string, service1Val = 20) {
    return from([value]).pipe(
      delay(4000),
      map((val) => {
        if (shouldFail()) {
          throw new Error(ERROR_MESSAGE);
        }
        return randomatic("?", service1Val, { chars: value });
      })
    );
  }
}
