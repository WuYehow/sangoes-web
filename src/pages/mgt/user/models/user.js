import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { createAction, net } from '@/utils';
import { message } from 'antd';
import { addUser, getUserPage } from '../services/user';

export default {
  namespace: 'user',

  state: {
    userList: {},
    pagination: {},
  },

  effects: {
    // 添加用户
    *addUser({ payload, callback }, { call, put }) {
      const response = yield call(addUser, payload);
      if (net(response)) {
        callback && callback();
        // 添加成功
        message.success(response.msg);
      }
    },
    // 获取用户分页
    *getUserPage({ payload, callback }, { call, put }) {
      const response = yield call(getUserPage, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ userList: response.data }));
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};