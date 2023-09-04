import request from "@/utils/request";

const apiVersions = "/emp/work/api/dp";

// 获取地图数据
export function getGeo(data) {
  return request({
    url: apiVersions + "/Getjson_dpdt",
    method: "post",
    data,
  });
}

// 获取客户投标数据
export function getCustomer(data) {
  return request({
    url: apiVersions + "/Getjson_dpkh",
    method: "post",
    data,
  });
}

// 获取险种投标数据
export function getKind(data) {
  return request({
    url: apiVersions + "/Getjson_dpxz",
    method: "post",
    data,
  });
}

// 获取商机投标数据
export function getBusiness(data) {
  return request({
    url: apiVersions + "/Getjson_dpsj",
    method: "post",
    data,
  });
}

// 获取商机投标数据
export function getMaterial(data) {
  return request({
    url: apiVersions + "/Getjson_dpsx",
    method: "post",
    data,
  });
}
