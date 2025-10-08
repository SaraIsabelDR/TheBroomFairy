import { useQuery, useMutation } from '@tanstack/react-query'
import { apiService } from '@/services/api'

export const useApi = <T>(endpoint: string, params?: Record<string, any>) => {
  return useQuery([endpoint, params], () => apiService.get<T>(endpoint, { params }))
}

export const useApiMutation = <T = any, V = any>(
  endpoint: string, 
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST'
) => {
  return useMutation({
    mutationFn: async (data: V) => {
      switch (method) {
        case 'POST':
          return apiService.post<T>(endpoint, data)
        case 'PUT':
          return apiService.put<T>(endpoint, data)
        case 'PATCH':
          return apiService.patch<T>(endpoint, data)
        case 'DELETE':
          return apiService.delete<T>(endpoint)
        default:
          throw new Error(`Unsupported method: ${method}`)
      }
    }
  })
}
