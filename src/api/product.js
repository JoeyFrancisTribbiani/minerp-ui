import request from '@/utils/request'

// 查询Product列表
export function listProduct(query) {
  return request({
    url: '/api/v1/erp',
    method: 'get',
    params: query
  })
}

// 查询Product详细
export function getProduct(id) {
  return request({
    url: '/api/v1/erp/' + id,
    method: 'get'
  })
}

// 新增Product
export function addProduct(data) {
  return request({
    url: '/api/v1/erp',
    method: 'post',
    data: data
  })
}

// 修改Product
export function updateProduct(data) {
  return request({
    url: '/api/v1/erp/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除Product
export function delProduct(data) {
  return request({
    url: '/api/v1/erp',
    method: 'delete',
    data: data
  })
}

