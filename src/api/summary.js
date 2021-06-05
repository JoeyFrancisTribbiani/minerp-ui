import request from '@/utils/request'

// 查询ErpFinanceSummary列表
export function listErpFinanceSummary(query) {
  return request({
    url: '/api/v1/finance/summary',
    method: 'get',
    params: query
  })
}

// 查询ErpFinanceSummary详细
export function getErpFinanceSummary(id) {
  return request({
    url: '/api/v1/finance/summary/' + id,
    method: 'get'
  })
}

// 新增ErpFinanceSummary
export function addErpFinanceSummary(data) {
  return request({
    url: '/api/v1/finance/summary',
    method: 'post',
    data: data
  })
}

// 修改ErpFinanceSummary
export function updateErpFinanceSummary(data) {
  return request({
    url: '/api/v1/finance/summary/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除ErpFinanceSummary
export function delErpFinanceSummary(data) {
  return request({
    url: '/api/v1/finance/summary',
    method: 'delete',
    data: data
  })
}
