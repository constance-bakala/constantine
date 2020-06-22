import {ReduceStringPipe} from './reduce-string.pipe';

xdescribe('Reduce string', () => {
  it('create an instance', () => {
    const pipe = new ReduceStringPipe();
    expect(pipe).toBeTruthy();
  });
  it('reduce string more 15', () => {
    const pipe = new ReduceStringPipe();
    expect(pipe).toBeTruthy();
    expect(pipe.transform('BURGE_SANTE_4950011')).toBe('BURGE_SANTE_4950...');
  });
  it('reduce string les 15', () => {
    const pipe = new ReduceStringPipe();
    expect(pipe).toBeTruthy();
    expect(pipe.transform('BURGE_SANTE_4950')).toBe('BURGE_SANTE_4950');
  });
});
