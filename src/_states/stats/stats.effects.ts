import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {map, mergeMap, tap, throttleTime} from 'rxjs/operators';
import {Observable} from 'rxjs';

import * as StatsActions from './stats.actions';
import {TzStat} from '@models/tzStat';

@Injectable()
export class StatsEffects {
  baseApi = `https://api.tzstats.com/tables/op?`;

  constructor(private http: HttpClient, private action$: Actions) {}

  GetStats: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(StatsActions.BeginGetStatsAction),
      throttleTime(500),
      mergeMap((action) =>
        this.http
          .get<[number, number, string, string, number][]>(
            `${this.baseApi}columns=row_id,time,type,sender,volume&receiver=tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo&type=transaction&limit=10&row_id.gt=${action.cursor}`
          )
          .pipe(
            map((xx) => {
              const stats = xx.map(
                ([row_id, time, type, sender, volume]) =>
                  new TzStat(row_id, new Date(time), type, sender, volume)
              );
              return StatsActions.SuccessGetStatsAction({ stats });
            }),
            tap({
              error: (err) => console.error(`Get Stats Error: `, err),
            })
          )
      )
    )
  );
}
