import request from '@/utils/request'

export function getChainList(params) {
  return request({
    url: '/chain/query',
    method: 'post',
    params
  })
}

export function getRelationGraphList(params) {
  return request({
    url: '/relation-graph/query',
    method: 'post',
    params
  })
}

export function getBothwayTreeList(params) {
  return request({
    url: '/bothway-tree/query',
    method: 'post',
    params
  })
}

export function getGeneralTreeRightList(params) {
  return request({
    url: '/general-tree/queryRight',
    method: 'post',
    params
  })
}

export function getGeneralTreeLeftList(params) {
  return request({
    url: '/general-tree/queryLeft',
    method: 'post',
    params
  })
}
