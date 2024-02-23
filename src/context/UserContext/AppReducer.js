export default function UserReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        user: action.payload,
      }
    case 'LOGOUT_USER':
      return {
        user: null,
      }
    default:
      return state
  }
}