function getPicture(product) {
  if (product.pictures && product.pictures.length > 0) {
    return product.pictures[0].url;
  }
  return product.thumbnail;
}

function productSerializer(product) {
  const mainProduct = {
    id: product.id,
    title: product.title,
    location: product?.address?.state_name ?? product.seller_address.city.name,
    price: {
      currency: product.currency_id,
      amount: product.price,
      decimals: "00",
    },
    picture: getPicture(product),
    condition: product.attributes.find((attr) => attr.id === 'ITEM_CONDITION')
      .value_name,
    free_shipping: product.shipping.free_shipping,
    sold_quantity: product.sold_quantity,
  };
  if (product.description) {
    mainProduct.description = product.description;
  }
  return mainProduct;
}

module.exports = productSerializer;
