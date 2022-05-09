import cloudbase from './cloudbase';
import store from '@/store';

const fetch = (funcName: string, data: any) => {
  const res = cloudbase
    .callFunction({
      name: funcName,
      data: {
        ...data,
        userName: store.state.user.userName,
        token: store.state.user.token,
      },
    })
    .then((res) => {
      if (res.result.err_code) {
        console.log(res.result);
      }
      return res.result;
    });
  return res;
};

export default fetch;
