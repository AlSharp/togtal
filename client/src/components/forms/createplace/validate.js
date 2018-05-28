const validate = values => {
  const errors = {};
  errors.location = {};
  if (!values.category) {
    errors.category = 'Category required';
  }
  if (!values.name) {
    errors.name = 'error';
  }
  if (!values.location) {
    errors.location.long = 'Please add location';
  }
  if (!values.products || !values.products.length) {
    errors.products = { _error: 'At least one product must be entered' }
  } else {
    const productsArrayErrors = [];
    values.products.forEach((product, productIndex) => {
      const productErrors = {}
      if (!product || !product.title) {
        productErrors.title = 'error';
        productsArrayErrors[productIndex] = productErrors
      }
      if (!product || !product.amount) {
        productErrors.amount = 'error';
        productsArrayErrors[productIndex] = productErrors
      }
      if (!product || !product.units) {
        productErrors.units = 'error';
        productsArrayErrors[productIndex] = productErrors
      }
      if (!product || !product.price) {
        productErrors.price = 'error';
        productsArrayErrors[productIndex] = productErrors
      }
      if (!product || !product.date) {
        productErrors.date = 'error';
        productsArrayErrors[productIndex] = productErrors
      }
    })
    if (productsArrayErrors.length) {
      errors.products = productsArrayErrors;
    }
  }

  return errors
}

export default validate;