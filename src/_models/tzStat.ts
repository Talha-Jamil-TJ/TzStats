export class TzStat implements ITzStat {
  constructor(
    public row_id: number = null,
    public time: Date = null,
    public type: string = '',
    public sender: string = '',
    public volume: number = null
  ) {}
}

export interface ITzStat {
  row_id: number;
  time: Date;
  type: string;
  sender: string;
  volume: number;
}
