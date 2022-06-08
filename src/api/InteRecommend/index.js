import fetch from 'utils/fetch';


//查询
export function GetIntelligRcommendList(obj) {
  return fetch({
    url: '/DBService/api/services/app/Recommend/GetIntelligRcommendList',
    method: 'get',
    params:obj
  });
}

//查询
export function GetSingleInfo(obj) {
  return fetch({
    url: '/DBService/api/services/app/Recommend/GetSingleInfo',
    method: 'get',
    params:obj
  });
}