import {TextTransformPipe} from './text-transform.pipe';

xdescribe('TextTransformPipe', () => {
  it('create an instance', () => {
    const pipe = new TextTransformPipe();
    expect(pipe).toBeTruthy();
  });
});
