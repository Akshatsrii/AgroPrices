import api from './api'

export const getPrediction = (crop) => {
  return api.post('/predict', { crop })
}