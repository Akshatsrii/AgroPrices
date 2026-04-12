import api from './api'

export const getPrices = (crop) => {
  return api.get(`/prices?crop=${crop}`)
}