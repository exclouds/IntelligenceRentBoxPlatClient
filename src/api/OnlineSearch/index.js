import fetch from 'utils/fetch';


//查询
export function GetXDDelInfoList(obj) {
  return fetch({
    url: '/DBService/api/services/app/OnlineSearch/GetXDDelInfoList',
    method: 'get',
    params:obj
  });
}
//获取集装箱信息
export function GetXDBoxDetail(obj) {
  return fetch({
    url: '/DBService/api/services/app/OnlineSearch/GetXDBoxDetail',
    method: 'get',
    params:obj
   
  });
}
//租客信息查询
export function GetZKDelInfoList(obj) {
  return fetch({
    url: '/DBService/api/services/app/OnlineSearch/GetZKDelInfoList',
    method: 'get',
    params:obj
   
  });
}
