export default function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_PROVIDER':
      return {
        ...state,
        providers: [...state.providers, action.payload],
      };
    case 'LOAD_PROVIDERS':
      return {
        ...state,
        providers: action.payload,
      };
    case 'UPDATE_PROVIDER':
      const updatedProvider = action.payload;
      console.log(action.payload);

      const updatedProviders = state.providers.map((provider) => {
        if (provider._id === updatedProvider._id) {
          return updatedProvider;
        }
        return provider;
      });
      return {
        ...state,
        providers: updatedProviders,
      };
    case 'DELETE_PROVIDER':
      return {
        ...state,
        providers: state.providers.filter(
          (provider) => provider._id !== action.payload,
        ),
      };
    default:
      return state;
  }
}
