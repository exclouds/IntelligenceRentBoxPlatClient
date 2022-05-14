import fetch from 'utils/fetch';
//个人注册
export function PersonRegist(obj) {
  return fetch({
    url: '/DBService/api/services/app/CustRegist/PersonRegist',
    method: 'post',
    data:obj
  });
}

//公司注册
export function CompanyRegist(obj) {
return fetch({
  url: '/DBService/api/services/app/CustRegist/CompanyRegist',
  method: 'post',
  data:obj
});
}
      //上传
export function getAnnexUpload(obj) {
  return fetch({
    url: '/DBService/api/services/app/Annex/AnnexUpload',
    method: 'post',
    data:obj
  });
}
//检验公司名是否存在
export function getCompanyByCompanyCNName(obj) {
  return fetch({
    url: '/DBService/api/services/app/Register/GetCompanyByCompanyCNName',
    method: 'get',
    params:obj
  });
}