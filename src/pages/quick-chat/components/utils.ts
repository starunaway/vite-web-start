export function getMsgFromOperation(operation: any) {
  return `${operation.bondCode},${operation.direction === 0 ? 'Bid' : 'Ofr'},${operation.price},${operation.amount},${
    operation.delivery || ''
  }`;
}

export function getSettlement(settle: any) {
  let newSettleType = settle;

  if (settle.includes('今天')) {
    newSettleType = '+' + settle.split('+')[1];
  } else {
    newSettleType = settle.split('+').reduce((pre: string, cur: string) => {
      pre += cur.trim() + '+';
      return pre;
    }, '');

    newSettleType = newSettleType.substring(0, newSettleType.length - 1);
  }

  return newSettleType;
}

//   export function getFeedBackMsg() {
// 	return {
// 	  ...this.operation,
// 	  bondCode: this.bondCode || this.operation.bondCode,
// 	  direction: this.direction !== undefined ? this.direction : this.operation.direction,
// 	  price: this.price !== undefined ? this.price : this.operation.price,
// 	  priceType: this.priceType !== undefined ? this.priceType : this.operation.priceType,
// 	  amount: this.amount ? this.amount * 1000 : this.operation.amount,
// 	  trustDegree: this.trustDegree !== undefined ? this.trustDegree : this.operation.trustDegree,
// 	  delivery: this.delivery !== undefined ? this.delivery : this.operation.delivery,
// 	  isDark: this.isDark !== undefined ? this.isDark : this.operation.isDark,
// 	};
//   }
