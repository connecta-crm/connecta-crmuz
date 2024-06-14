export type LogType = { title: string; message: string };
export interface DistributionDataType {
  logs: LogType[];
  id: number;
  multiple: string;
  startHour: string;
  finishHour: string;
  status: string;
  user: number;
  updatedFrom: number;
  receivedToday?: string;
  queueNow?: string;
  userEmail:string
}
