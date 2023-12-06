export type EntryEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  allDay: boolean;
  rooms: string[];
  type: string;
  confirmed: string;
  repeatType: string;
  repInterval: string;
  repEndDt: string;
  skip: boolean;
  repDay0: string;
  repDay1: string;
  repDay2: string;
  repDay3: string;
  repDay4: string;
  repDay5: string;
  repDay6: string;
  monthlySelect: string;
  monthAbsolute: string;
  monthRelativeOrd: string;
  monthRelativeDay: string;
  duration?: string;
  lastUpdated?: string;
  createdBy?: string;
  modifiedBy?: string;
};