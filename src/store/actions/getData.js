import $api from '@/utils/api';

export function doAction(params, url, dispatchType, stateData, other = {}) {
  console.log('e', params, url, dispatchType, stateData);
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      console.log($api, '$api');
      $api[url](params)
        .then((res) => {
          if (!res) {
            return;
          }
          let resData = res.data.display;
          if (!resData) {
            resData = res.data;
          }
          if (other.key) {
            resData = resData[other.key];
          }
          if (other.arrayOne) {
            resData = resData[0];
          }
          let newRes;
          if (other.model) {
            newRes = other.model(resData);
          } else {
            if (!resData) {
              newRes = [];
            } else {
              newRes = resData;
            }
          }
          let reducer = {
            type: '',
            payload: {},
          };
          reducer.type = dispatchType;

          reducer.payload[stateData] = newRes;
          console.log(reducer, 'reducer');
          dispatch(reducer);
          resolve(newRes);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}
