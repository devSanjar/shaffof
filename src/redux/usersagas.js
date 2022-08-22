import * as types from './actionTypes'

import { take, takeEvery, takeLatest, put, all, delay, fork, call } from 'redux-saga/effects';

import { loadUsersSuccess, loadUsersError, createUserSuccess, createUserFail, deleteUserSuccess, deleteUserFail, editUserFail, editUserSuccess, setEditUser } from './actions';
import { createUserApi, deleteUserApi, editUserApi, loadUsersApi } from './api';

export function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    console.log('RESPONSE', response);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUsersError(error.response.data));
  }
}

export function* setFilteredUsers() {
  try {
    console.log('setFilteredUsers');

    yield put()
  } catch (error) {

  }
}


function* onCreateUserRequestAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    console.log('RESPONSE', response);
    if (response.status === 200) {
      yield put(createUserSuccess(response.data));
    }
  } catch (error) {
    yield put(createUserFail(error.response.data));
  }
}

function* onDeleteUserRequestAsync(userId) {
  try {
    const response = yield call(deleteUserApi, userId);
    console.log('RESPONSE', response);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (error) {
    yield put(deleteUserFail(error.response.data));
  }
}

function* onEditUserRequestAsync({ payload: { oneUser, values } }) {
  try {
    const response = yield call(editUserApi, oneUser, values)
    if (response.status === 200) {
      yield put(editUserSuccess())
    }
  } catch (error) {
    yield put(editUserFail(error.response.data));
  }
}

function* onDeleteUsers() {
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USER_REQUEST);
    yield call(onDeleteUserRequestAsync, userId)
  }
}

function* onLoadUsers() {
  yield takeEvery(types.LOAD_USER_REQUEST, onLoadUsersStartAsync)
}

function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_REQUEST, onCreateUserRequestAsync)
}

function* onEditUser() {
  yield takeLatest(types.EDIT_USER_REQUEST, onEditUserRequestAsync)
}

const userSagas = [fork(onLoadUsers), fork(onCreateUser), fork(onDeleteUsers), fork(onEditUser)];

export default function* rootSaga(onCreateUserRequestAsync) {
  yield all([...userSagas]);
}