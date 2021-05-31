import request from '@/utils/request'

// 查询TransactionDetail列表
export function listTransactionDetail(query) {
  return request({
    url: '/api/v1/finance',
    method: 'get',
    params: query
  })
}

// 查询TransactionDetail详细
export function getTransactionDetail(id) {
  return request({
    url: '/api/v1/finance/' + id,
    method: 'get'
  })
}

// 新增TransactionDetail
export function addTransactionDetail(data) {
  return request({
    url: '/api/v1/finance',
    method: 'post',
    data: data
  })
}

// 修改TransactionDetail
export function updateTransactionDetail(data) {
  return request({
    url: '/api/v1/finance/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除TransactionDetail
export function delTransactionDetail(data) {
  return request({
    url: '/api/v1/finance',
    method: 'delete',
    data: data
  })
}

