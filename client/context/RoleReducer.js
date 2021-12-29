export default function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_ROLE':
      return {
        ...state,
        roles: [...state.roles, action.payload],
      };
    case 'LOAD_ROLES':
      return {
        ...state,
        roles: action.payload,
      };
    case 'UPDATE_ROLE':
      const updatedRole = action.payload;

      const updatedRoles = state.roles.map((role) => {
        if (role._id === updatedRole._id) {
          return updatedRole;
        }
        return role;
      });
      return {
        ...state,
        roles: updatedRoles,
      };
    case 'DELETE_ROLE':
      return {
        ...state,
        roles: state.roles.filter(
          (role) => role._id !== action.payload,
        ),
      };
    default:
      return state;
  }
}
