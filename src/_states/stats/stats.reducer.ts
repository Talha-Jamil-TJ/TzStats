import {ITzStat} from '@models/tzStat';
import {Action, createReducer, on} from '@ngrx/store';

import * as StatsActions from './stats.actions';

export interface IStatsState {
  tzStats: ITzStat[];
  cursor: number;
}

export class StatsState implements IStatsState {
  constructor(public tzStats = [], public cursor = 0) {}
}

const initialState: IStatsState = new StatsState();

const reducer = createReducer(
  initialState,
  on(StatsActions.BeginGetStatsAction, (state: IStatsState, { cursor }) => {
    return { ...state, cursor };
  }),
  on(StatsActions.SuccessGetStatsAction, (state: IStatsState, { stats }) => {
    return { ...state, tzStats: [...state.tzStats, ...stats] };
  })
);

export function StatsReducer(
  state: IStatsState | undefined,
  action: Action
): IStatsState {
  return reducer(state, action);
}
