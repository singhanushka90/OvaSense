import api from './api'

export const predictionApi = {
  predict: async (data) => {
    const response = await api.post('/predict/', data)
    return response.data
  },
}
