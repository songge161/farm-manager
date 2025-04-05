import { request } from "../utils/request.js";
const urlBook={
  "record":"/recordInf/record",
  "method":"/recordInf/method",
  "combine":"/recordInf/combine",
  "mention":"/userInf/mention",
  "user":"/userInf/user",
}
export function apiQuick(book,data = {}) {
  if(!urlBook[book]){
    return Promise.reject("url not found");
  }else{
    return request({
      url:urlBook[book],
      data,
    });
  }
}

export function apiGetRecord(data = {}) {
  return request({
    url:"/recordInf/record",
    data,
  });
}
export function apiGetMethod(data = {}) {
  return request({
    url: "/recordInf/method",
    data,
  });
}

export function apiGetMention(data = {}) {
  return request({
    url: "/mention",
    data,
  });
}


export function apiGetRemind(data = {}) {
  return request({
    url: "/userInf/mention",
    data, 
  })
}
export function apiGetUser(data = {}) {
  return request({
    url: "/userInf/user",
    data, 
  })
}
export function apiWriteRecord(data = {}) {
  return request({
    url: "/recordInf/record",
    method: "POST",
    data,
  });
}
export function apiWriteMethod(data = {}) {
  return request({
    url: "/recordInf/method",
    method: "POST",
    data,
  });
}
export function apiWriteMention(data = {}) {
  return request({
    url: "/userInf/mention",
    method: "POST",
    data, 
  })
}
export function apiWriteUser(data = {}) {
  return request({
    url: "/userInf/user",
    method: "POST",
    data, 
  })
}

export function apiChangeRecord(data = {}) {
  return request({
    url: "/recordInf/combine",
    method: "PUT",
    data, 
  })
}
export function apiChangeMethod(data = {}) {
  return request({
    url: "/recordInf/method",
    method: "PUT",
    data, 
  })
}

export function apiDeleteRecord(data = {}) {
  return request({
    url: "/recordInf/record",
    method: "PATCH",
    data, 
  })
}
export function apiDeleteMethod(data = {}) {
  return request({
    url: "/recordInf/method",
    method: "PATCH",
    data, 
  })
}


