export default function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case 'LOAD_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    case 'UPDATE_PRODUCT':
      const updatedProduct = action.payload;
      console.log(action.payload);

      const updatedProducts = state.products.map((product) => {
        if (product._id === updatedProduct._id) {
          return updatedProduct;
        }
        return product;
      });
      return {
        ...state,
        products: updatedProducts,
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload,
        ),
      };
    default:
      return state;
  }
}
