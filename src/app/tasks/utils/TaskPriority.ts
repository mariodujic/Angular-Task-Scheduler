import {TaskStatus} from './TaskStatus';
import {TimeStamp} from './TimeStamp';

export class TaskPriority {
  // Priority depends on time passed since task has been posted.
  public static getPriority(taskDate: Date): string {
    return TimeStamp.getSecondsPassed(taskDate) < 5 ? TaskStatus.LOW :
      TimeStamp.getSecondsPassed(taskDate) < 8 ? TaskStatus.NORMAL : TaskStatus.URGENT;
  }
}
