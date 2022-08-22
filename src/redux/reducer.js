import * as types from './actionTypes'

const initialState = {
  users: [],
  loading: false,
  error: null,

  filteredUsers: [],

  editUser: {},
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    // LOAD USER //
    case types.LOAD_USER_REQUEST:
    case types.DELETE_USER_REQUEST:
    case types.EDIT_USER_REQUEST:
      return {
        ...state,
        loading: false
      };
    case types.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      }

    case types.SET_FILTERED_USERS:
      return {
        ...state,
        filteredUsers: action.payload
      }

    // CREATE USER //
    case types.CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.CREATE_USER_SUCCESS:
    case types.EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case types.CREATE_USER_FAIL:
    case types.DELETE_USER_FAIL:
    case types.EDIT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    // DELETE
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter(item => item.id !== action.payload)
      }

    case types.CREATE_NEW_USER_REQUEST:
      return {
        ...state,
        users: [...state.users, action.payload]
      }

    case types.EDIT_USER_IN_TABLE:
      let newAllUsers = [...state.users];
      newAllUsers.forEach(user => {
        if (user.id === action.payload.id) {
          user = action.payload;
        }
      })

      let newFilteredUsers = [...state.filteredUsers];
      newFilteredUsers.forEach(item => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
      })

      return {
        ...state,
        users: newAllUsers,
        filteredUsers: newFilteredUsers,
      }

    default:
      return state;
  }
};

export default usersReducer;