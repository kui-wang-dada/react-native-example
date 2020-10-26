import $api from '@/utils/api';

export function doAction(
  params,
  url,
  dispatchType,
  stateData,
  model,
  replaceUrl,
) {
  console.log('e', params, url, dispatchType, stateData, model, replaceUrl);
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      console.log($api, '$api');
      $api[url](params, replaceUrl)
        .then((res) => {
          let newRes;
          if (model) {
            newRes = model(res.data.display);
          } else {
            newRes = res.data.display;
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
