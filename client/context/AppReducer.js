export default function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case 'LOAD_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      };
    case 'UPDATE_CATEGORY':
      const updatedCategory = action.payload;

      const updatedCategories = state.categories.map((category) => {
        if (category._id === updatedCategory._id) {
          return updatedCategory;
        }
        return category;
      });
      return {
        ...state,
        categories: updatedCategories,
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.payload,
        ),
      };
    default:
      return state;
  }
}
