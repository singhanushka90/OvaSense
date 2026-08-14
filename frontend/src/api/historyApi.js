import api from './api'

export const historyApi = {
  getHistory: async (page = 1, limit = 10) => {
    const response = await api.get('/predictions/', {
      params: {
        page,
        limit,
      },
    })
    return response.data
  },

  deletePrediction: async (predictionId) => {
    const response = await api.delete(`/predictions/${predictionId}`)
    return response.data
  },
}
