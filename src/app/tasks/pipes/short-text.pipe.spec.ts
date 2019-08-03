import {ShortTextPipe} from './short-text.pipe';
import {environment} from '../../../environments/environment';

const TEST = 'Test word.';

describe('ShortTextPipe', () => {

  let shortText: ShortTextPipe;

  beforeAll(() => {
    shortText = new ShortTextPipe();
  });

  it('providing string should return true', () => {
    expect(shortText.transform(TEST, 3)).toBe(TEST.substring(0, 3));
  });

  it('providing string should return false', () => {
    expect(shortText.transform(TEST, 3)).not.toBe(TEST.substring(0, 4));
  });

  it('providing null should return constant', () => {
    expect(shortText.transform(null, 3)).toBe(environment.no_task_description);
  });

  it('providing empty string should return constant', () => {
    expect(shortText.transform('', 3)).toBe(environment.no_task_description);
  });
});
