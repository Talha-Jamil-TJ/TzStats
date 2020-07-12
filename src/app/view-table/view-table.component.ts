import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {Store} from '@ngrx/store';

import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ITzStat} from '@models/tzStat';
import {IStatsState} from '@states/stats/stats.reducer';
import * as StatsActions from '@states/stats/stats.actions';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss'],
})
export class ViewTableComponent implements OnInit {
  baseApi = `https://api.tzstats.com/tables/op?`;
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  limit = 10;
  offset = new BehaviorSubject(null);
  infinite: Observable<any[]>;
  theEnd = false;
  numbers = [];

  stats$: Observable<ITzStat[]>;
  stats: ITzStat[] = [];
  cursor = 0;

  constructor(
    private http: HttpClient,
    private store: Store<{ stats: IStatsState }>
  ) {
    this.stats$ = this.store.pipe(
      map((x: { stats: IStatsState }) => x.stats.tzStats)
    );
  }

  async ngOnInit(): Promise<any> {
    this.store.dispatch(
      StatsActions.BeginGetStatsAction({ cursor: this.cursor })
    );

    this.stats$.subscribe((stats) => {
      if (stats.length) {
        console.log(`stats: `, stats);

        this.stats = stats;
        this.cursor = this.stats[this.stats.length - 1].row_id;

        console.log(`cursor: `, this.cursor);
      }
    });
  }

  nextBatch = async (event): Promise<any> => {
    if (!this.stats.length) {
      return;
    }

    const end = this.viewPort.getRenderedRange().end;
    // const total = this.viewPort.getDataLength();

    if (end === this.stats.length) {
      // this.offset.next(offset);
      console.log(`end === total`);
      this.store.dispatch(
        StatsActions.BeginGetStatsAction({ cursor: this.cursor })
      );
    }
  };

}
