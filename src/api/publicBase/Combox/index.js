import fetch from 'utils/fetch';


//获取基础信息下拉
export function GetComboBox(obj) {
  return fetch({
    url: '/DBService/baseinfo',
    method: 'post',
    data:obj
  });
}
//获取公司
export function GetCountryList(obj) {
  return fetch({
    url: '/DBService/api/services/app/PublicComboxAppSevrice/GetCountryList',
    method: 'get',
    params:obj
   
  });
}
//获取站点
export function GetSiteList(obj) {
  return fetch({
    url: '/DBService/api/services/app/PublicComboxAppSevrice/GetSiteList',
    method: 'get',
    params:obj
   
  });
}
//获取路线
export function GetLineList(obj) {
  return fetch({
    url: '/DBService/api/services/app/PublicComboxAppSevrice/GetLineList',
    method: 'get',
    params:obj
   
  });
}




