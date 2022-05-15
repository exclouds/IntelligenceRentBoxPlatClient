import fetch from 'utils/fetch';


//查询
export function GetXDDelInfoList(obj) {
  return fetch({
    url: '/DBService/api/services/app/XDInforDelivery/GetXDDelInfoList',
    method: 'get',
    params:obj
  });
}
//获取单个信息
export function GetXDDelInfoSingle(obj) {
  return fetch({
    url: '/DBService/api/services/app/XDInforDelivery/GetXDDelInfoSingle',
    method: 'get',
    params:obj
   
  });
}
//编辑
export function XDDelInfoAddEdit(obj) {
  return fetch({
    url: '/DBService/api/services/app/XDInforDelivery/XDDelInfoAddEdit',
    method: 'post',
    data:obj
   
  });
}
//删除
export function BatchDelete(obj) {
  return fetch({
    url: '/DBService/api/services/app/XDInforDelivery/BatchDelete',
    method: 'post',
    data:obj
   
  });
}

//批量启用或者停用
export function BatchOP(obj) {
  return fetch({
    url: '/DBService/api/services/app/XDInforDelivery/BatchOP',
    method: 'post',
    data:obj
   
  });
}


