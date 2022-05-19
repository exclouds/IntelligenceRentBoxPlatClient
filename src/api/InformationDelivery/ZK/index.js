import fetch from 'utils/fetch';


//查询
export function GetZKDelInfoList(obj) {
  return fetch({
    url: '/DBService/api/services/app/ZKInforDelivery/GetZKDelInfoList',
    method: 'get',
    params:obj
  });
}
//获取单个信息
export function GetZKDelInfoSingle(obj) {
  return fetch({
    url: '/DBService/api/services/app/ZKInforDelivery/GetZKDelInfoSingle',
    method: 'get',
    params:obj
   
  });
}
//编辑
export function ZKDelInfoAddEdit(obj,msg) {
  return fetch({
    url: '/DBService/api/services/app/ZKInforDelivery/ZKDelInfoAddEdit',
    method: 'post',
    data:obj,
    msg:msg
   
  });
}
//删除
export function BatchDelete(obj) {
  return fetch({
    url: '/DBService/api/services/app/ZKInforDelivery/BatchDelete',
    method: 'post',
    data:obj
   
  });
}
//批量启用或者停用
export function BatchOP(obj) {
  return fetch({
    url: '/DBService/api/services/app/ZKInforDelivery/BatchOP',
    method: 'post',
    data:obj
   
  });
}
//获取箱信息
export function GetBoxDetail(obj) {
  return fetch({
    url: '/DBService/api/services/app/ZKInforDelivery/GetBoxDetail',
    method: 'get',
    params:obj
   
  });
}




