
/**
 * 获取一个随机数
 * 
 * @exports randomNum
 * 
 * @param  {Number} precision 精度，返回数据小数点后多少位
 * @return {Number}           返回[0, 1)之间的数据
 */
function randomNum(precision = 7) {
  let num = '';
  for (let i = 0; i < precision; i++) {
    const nativeArr = new Uint8Array(1);
    const crypto = window.crypto || window.msCrypto;
    crypto.getRandomValues(nativeArr);
    const random = nativeArr[0];
    num += parseInt(random % 10, 10);
  }
  return Number(parseFloat(`0.${num}`));
}

export default randomNum;
