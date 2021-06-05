import request from '@/utils/request'

// 查询ErpFinanceAsinSummary列表
export function listErpFinanceAsinSummary(query) {
  return request({
    url: '/api/v1/finance/asin_summary',
    method: 'get',
    params: query
  })
}

// 查询ErpFinanceAsinSummary详细
export function getErpFinanceAsinSummary(id) {
  return request({
    url: '/api/v1/finance/asin_summary/' + id,
    method: 'get'
  })
}

// 新增ErpFinanceAsinSummary
export function addErpFinanceAsinSummary(data) {
  return request({
    url: '/api/v1/finance/asin_summary',
    method: 'post',
    data: data
  })
}

// 修改ErpFinanceAsinSummary
export function updateErpFinanceAsinSummary(data) {
  return request({
    url: '/api/v1/finance/asin_summary/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除ErpFinanceAsinSummary
export function delErpFinanceAsinSummary(data) {
  return request({
    url: '/api/v1/finance/asin_summary',
    method: 'delete',
    data: data
  })
}

