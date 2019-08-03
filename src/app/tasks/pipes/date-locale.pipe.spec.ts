import {DateLocalePipe} from './date-locale.pipe';

describe('DateLocalePipe', () => {

  let pipe: DateLocalePipe;

  beforeAll(() => {
    pipe = new DateLocalePipe();
  });
  it('providing wrong locale returns false', () => {
    expect(pipe.transform(new Date())).not.toBe(new Date().toLocaleString('uk'));
  });

  it('providing correct locale returns true', () => {
    expect(pipe.transform(new Date())).toBe(new Date().toLocaleString('hr'));
  });
});
