import {TimestampPipe} from './timestamp.pipe';
import {TimeStamp} from '../utils/TimeStamp';

describe('TimestampPipe', () => {

  let timeStampPipe: TimestampPipe;

  beforeAll(() => {
    timeStampPipe = new TimestampPipe();
  });

  it('providing minute should return true', () => {
    expect(timeStampPipe.transform(new Date())).toBe(TimeStamp.getTimeStamp(new Date()));
  });
});
