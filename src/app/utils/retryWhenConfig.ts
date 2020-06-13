import { Observable, throwError, timer } from "rxjs";
import { flatMap } from "rxjs/operators";

export function retryWhenConfig(maxRetry = 3, delayIncrease = 1000) {
  return (attempts: Observable<any>) => {
    return attempts.pipe(
      flatMap((error, i) => {
        const retryAttempt = i + 1;
        if (retryAttempt > maxRetry) {
          return throwError(error);
        }

        return timer(retryAttempt * delayIncrease);
      })
    );
  };
}
