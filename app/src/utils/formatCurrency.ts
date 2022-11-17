function formatCurrency(price: number) {
  return  `R$ ${price.toFixed(2)}`;
}

export default formatCurrency;