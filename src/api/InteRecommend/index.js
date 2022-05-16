import fetch from 'utils/fetch';


//查询
export function GetIntelligRcommendList(obj) {
  return fetch({
    url: '/DBService/api/services/app/Recommend/GetIntelligRcommendList',
    method: 'get',
    params:obj
  });
}
