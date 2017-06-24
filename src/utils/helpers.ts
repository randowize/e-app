export function permutations(str: string) {
  let chars: string[] = str.split('');
  let result: string[] = [];
  if (str.length < 2) {
    return [str];
  }
  if (str.length == 2) {

    return  [chars[0] + chars[1], chars[1] + chars[0]];
  }
  for (let i = 0; i < chars.length; i++) {
    let rmn = chars.filter(function(e, j){
      return j != i;
    });
    permutations(rmn.join('')).forEach(function(v){
      result.push(chars[i] + v);
    });
  }
  return  result;
}