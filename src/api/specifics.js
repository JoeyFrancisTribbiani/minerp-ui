import request from '@/utils/request'

// 查询ErpProductSpecifics列表
export function listErpProductSpecifics(query) {
  return request({
    url: '/api/v1/product/specifics',
    method: 'get',
    params: query
  })
}

// 查询ErpProductSpecifics详细
export function getErpProductSpecifics(id) {
  return request({
    url: '/api/v1/product/specifics/' + id,
    method: 'get'
  })
}

// 新增ErpProductSpecifics
export function addErpProductSpecifics(data) {
  return request({
    url: '/api/v1/product/specifics',
    method: 'post',
    data: data
  })
}

// 修改ErpProductSpecifics
export function updateErpProductSpecifics(data) {
  return request({
    url: '/api/v1/product/specifics/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除ErpProductSpecifics
export function delErpProductSpecifics(data) {
  return request({
    url: '/api/v1/product/specifics',
    method: 'delete',
    data: data
  })
}

