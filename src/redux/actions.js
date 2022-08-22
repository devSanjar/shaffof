import * as types from './actionTypes';

// LOAD USERS
export const loadUsersRequest = () => ({
  type: types.LOAD_USER_REQUEST,
})

export const loadUsersSuccess = (users) => ({
  type: types.LOAD_USER_SUCCESS,
  payload: users
})

export const setFilteredUsers = (users) => ({
  type: types.SET_FILTERED_USERS,
  payload: users
})

export const loadUsersError = (error) => ({
  type: types.LOAD_USER_ERROR,
  payload: error.message
})

// CREATE USERS
export const createUserRequest = (user) => ({
  type: types.CREATE_USER_REQUEST,
  payload: user
})

export const createNewUser = (user) => ({
  type: types.CREATE_NEW_USER_REQUEST,
  payload: user
})

export const createUserSuccess = () => ({
  type: types.CREATE_USER_SUCCESS,
})

export const createUserFail = (error) => ({
  type: types.CREATE_USER_FAIL,
  payload: error.message
})

// DELETE USER
export const deleteUserRequest = (userId) => ({
  type: types.DELETE_USER_REQUEST,
  payload: userId
})

export const deleteUserSuccess = (userId) => ({
  type: types.DELETE_USER_SUCCESS,
  payload: userId
})

export const deleteUserFail = (error) => ({
  type: types.DELETE_USER_FAIL,
  payload: error.message
})

// EDIT USER
export const editUserRequest = (userInfo) => ({
  type: types.EDIT_USER_REQUEST,
  payload: userInfo
})

export const edtiUserInTable = (user) => ({
  type: types.EDIT_USER_IN_TABLE,
  payload: user
})

export const editUserSuccess = () => ({
  type: types.EDIT_USER_SUCCESS,
})

export const editUserFail = (error) => ({
  type: types.EDIT_USER_FAIL,
  payload: error.message
})
