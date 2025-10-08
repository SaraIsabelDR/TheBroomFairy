import { apiService } from './api'
import type { 
  User, 
  LoginCredentials, 
  RegisterData, 
  WalletProvider, 
  WalletInfo, 
  ApiResponse 
} from '@/types'

class AuthService {
  
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    return apiService.post('/auth/login', credentials)
  }

  async register(userData: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> {
    return apiService.post('/auth/register', userData)
  }

  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout')
    } catch (error) {
      // Silent fail on logout
      console.warn('Logout request failed:', error)
    }
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiService.get<User>('/auth/me')
    return response.data
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return apiService.post('/auth/refresh')
  }

  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return apiService.post('/auth/forgot-password', { email })
  }

  async resetPassword(
    token: string, 
    newPassword: string
  ): Promise<ApiResponse<{ message: string }>> {
    return apiService.post('/auth/reset-password', { token, newPassword })
  }

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<{ message: string }>> {
    return apiService.post('/auth/change-password', {
      currentPassword,
      newPassword
    })
  }

  async verifyEmail(token: string): Promise<ApiResponse<{ message: string }>> {
    return apiService.post('/auth/verify-email', { token })
  }

  async resendVerificationEmail(): Promise<ApiResponse<{ message: string }>> {
    return apiService.post('/auth/resend-verification')
  }

  // OAuth methods
  async loginWithGoogle(): Promise<ApiResponse<{ user: User; token: string }>> {
    // In a real implementation, this would redirect to Google OAuth
    // For now, we'll simulate it
    window.location.href = `${process.env.VITE_API_URL}/auth/google`
    return Promise.resolve({
      success: true,
      data: {
        user: {} as User,
        token: ''
      },
      message: 'Redirecting to Google...'
    })
  }

  async loginWithFacebook(): Promise<ApiResponse<{ user: User; token: string }>> {
    window.location.href = `${process.env.VITE_API_URL}/auth/facebook`
    return Promise.resolve({
      success: true,
      data: {
        user: {} as User,
        token: ''
      },
      message: 'Redirecting to Facebook...'
    })
  }

  // Wallet connection methods
  async connectWallet(walletType: WalletProvider): Promise<WalletInfo> {
    switch (walletType) {
      case 'metamask':
        return this.connectMetaMask()
      case 'bitcoin':
        return this.connectBitcoinWallet()
      case 'binance':
        return this.connectBinanceWallet()
      case 'bybit':
        return this.connectBybitWallet()
      default:
        throw new Error(`Unsupported wallet type: ${walletType}`)
    }
  }

  private async connectMetaMask(): Promise<WalletInfo> {
    if (!window.ethereum) {
      throw new Error('MetaMask no está instalado')
    }

    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      })
      
      return {
        type: 'metamask',
        address: accounts[0],
        balance: '0', // Get actual balance
        connected: true
      }
    } catch (error) {
      throw new Error('Error al conectar con MetaMask')
    }
  }

  private async connectBitcoinWallet(): Promise<WalletInfo> {
    // Placeholder for Bitcoin wallet connection
    // In production, you'd integrate with actual Bitcoin wallet providers
    throw new Error('Bitcoin wallet integration not implemented')
  }

  private async connectBinanceWallet(): Promise<WalletInfo> {
    // Placeholder for Binance wallet connection
    throw new Error('Binance wallet integration not implemented')
  }

  private async connectBybitWallet(): Promise<WalletInfo> {
    // Placeholder for Bybit wallet connection
    throw new Error('Bybit wallet integration not implemented')
  }

  async disconnectWallet(): Promise<void> {
    // Implementation depends on wallet type
    // For now, just clear local storage
    localStorage.removeItem('walletInfo')
  }

  // Profile management
  async updateProfile(profileData: Partial<User>): Promise<ApiResponse<User>> {
    return apiService.put('/auth/profile', profileData)
  }

  async uploadAvatar(file: File): Promise<ApiResponse<{ avatarUrl: string }>> {
    return apiService.uploadFile('/auth/avatar', file)
  }

  async deleteAccount(): Promise<ApiResponse<{ message: string }>> {
    return apiService.delete('/auth/account')
  }
}

export const authService = new AuthService()

// Types for window.ethereum (MetaMask)
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      isMetaMask?: boolean
    }
  }
}