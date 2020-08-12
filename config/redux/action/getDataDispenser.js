import dataType from './action';

export const getDataDispenser = (data) => {
  return (dispatch) => {
    dispatch({
      type: dataType.GETDISPENSER,
      data: data,
    });
  };
};
