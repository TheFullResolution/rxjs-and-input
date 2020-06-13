import { Injectable } from "@angular/core";
import { Item, itemDefault } from "../types/item";
import * as uniqid from "uniqid";
import { BehaviorSubject, from, Subject } from "rxjs";
import { filter, map, scan, shareReplay, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ListService {
  private list: Subject<Item> = new Subject();

  public list$ = this.list.asObservable().pipe(
    scan((array, item) => {
      array.unshift(item);
      return array;
    }, [] as Item[]),
    shareReplay(1)
  );

  constructor() {}

  processNewInput(value: string) {
    from(value.split(/[\s,.]+/))
      .pipe(
        filter((val) => !!val),
        map((val) => ({
          ...itemDefault,
          value: val,
          id: uniqid(),
        })),
      )
      .subscribe((el) => this.list.next(el));
  }
}
