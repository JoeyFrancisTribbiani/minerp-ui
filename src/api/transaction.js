import request from '@/utils/request'

// 查询ErpFinanceTransaction列表
export function listErpFinanceTransaction(query) {
  return request({
    url: '/api/v1/finance/transaction',
    method: 'get',
    params: query
  })
}

// 查询ErpFinanceTransaction详细
export function getErpFinanceTransaction(id) {
  return request({
    url: '/api/v1/finance/transaction/' + id,
    method: 'get'
  })
}

// 新增ErpFinanceTransaction
export function addErpFinanceTransaction(data) {
  return request({
    url: '/api/v1/finance/transaction',
    method: 'post',
    data: data
  })
}

// 修改ErpFinanceTransaction
export function updateErpFinanceTransaction(data) {
  return request({
    url: '/api/v1/finance/transaction/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除ErpFinanceTransaction
export function delErpFinanceTransaction(data) {
  return request({
    url: '/api/v1/finance/transaction',
    method: 'delete',
    data: data
  })
}

