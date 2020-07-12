import {createAction, props} from '@ngrx/store';
import {ITzStat} from '@models/tzStat';

export const BeginGetStatsAction = createAction(
  `[STATS] - Begin Get Stats`,
  props<{ cursor: number }>()
);

export const SuccessGetStatsAction = createAction(
  `[STATS] - Success Get Stats`,
  props<{ stats: ITzStat[] }>()
);
