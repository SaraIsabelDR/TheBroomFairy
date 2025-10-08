// ============================================================================
// USER TYPES
// ============================================================================

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  role: 'client' | 'expert' | 'admin'
  isVerified: boolean
  createdAt: string
  updatedAt: string
  profile?: UserProfile
  walletInfo?: WalletInfo
}

export interface UserProfile {
  address?: string
  city?: string
  country?: string
  timezone?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say'
  preferences?: UserPreferences
}

export interface UserPreferences {
  language: 'es' | 'en'
  currency: 'USD' | 'EUR' | 'COP'
  theme: 'light' | 'dark' | 'system'
  notifications: NotificationSettings
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  marketing: boolean
  bookingUpdates: boolean
  promotions: boolean
}

// ============================================================================
// EXPERT TYPES
// ============================================================================

export interface Expert extends User {
  role: 'expert'
  expertProfile: ExpertProfile
  services: Service[]
  rating: number
  reviewCount: number
  isAvailable: boolean
  location: Location
  verificationStatus: 'pending' | 'verified' | 'rejected'
}

export interface ExpertProfile {
  bio: string
  experience: number
  specialties: string[]
  hourlyRate: number
  availability: Availability[]
  certifications: Certification[]
  portfolio: PortfolioItem[]
  languages: string[]
  backgroundCheckStatus: 'pending' | 'approved' | 'failed'
}

export interface Certification {
  id: string
  name: string
  issuedBy: string
  issuedDate: string
  expiryDate?: string
  credentialId?: string
  verificationUrl?: string
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  images: string[]
  beforeImage?: string
  afterImage?: string
  completedDate: string
  rating?: number
  clientFeedback?: string
}

export interface Service {
  id: string
  name: string
  description: string
  category: ServiceCategory
  duration: number // minutes
  price: number
  isActive: boolean
}

export interface ServiceCategory {
  id: string
  name: string
  icon: string
  description: string
}

export interface Booking {
  id: string
  clientId: string
  expertId: string
  serviceId: string
  date: string
  startTime: string
  endTime: string
  status: BookingStatus
  price: number
  paymentMethod: PaymentMethod
  location: Location
  notes?: string
  createdAt: string
  updatedAt: string
  contractAddress?: string // blockchain
}

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled' 
  | 'disputed'

export interface Location {
  lat: number
  lng: number
  address: string
  city: string
  country: string
}

export interface PaymentMethod {
  type: 'card' | 'wallet' | 'cash'
  provider?: string
  last4?: string
  walletAddress?: string
  isDefault: boolean
}

export interface WalletInfo {
  type: WalletProvider
  address: string
  balance: string
  connected: boolean
}

export type WalletProvider = 'metamask' | 'bitcoin' | 'binance' | 'bybit'

export interface NFT {
  id: string
  tokenId: string
  contractAddress: string
  name: string
  description: string
  image: string
  attributes: NFTAttribute[]
  owner: string
  benefits: string[]
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  createdAt: string
}

export interface NFTAttribute {
  trait_type: string
  value: string | number
}

export interface ChatRoom {
  id: string
  participants: User[]
  bookingId?: string
  lastMessage?: Message
  isActive: boolean
  createdAt: string
}

export interface Message {
  id: string
  senderId: string
  content: string
  type: 'text' | 'image' | 'file' | 'system'
  timestamp: string
  isRead: boolean
}

export interface Availability {
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  startTime: string // HH:mm format
  endTime: string // HH:mm format
  isAvailable: boolean
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
  role: 'client' | 'expert'
}

export interface BookingFormData {
  serviceId: string
  date: string
  startTime: string
  notes?: string
  location: Location
}

// ============================================================================
// AUTH CONTEXT TYPES
// ============================================================================

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
  walletConnected: boolean
  walletAddress: string | null
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<ApiResponse<{ user: User; token: string }>>
  loginWithGoogle: () => Promise<ApiResponse<{ user: User; token: string }>>
  connectWallet: (walletType: WalletProvider) => Promise<WalletInfo>
  logout: () => Promise<void>
  register: (userData: RegisterData) => Promise<ApiResponse<{ user: User; token: string }>>
}

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

export interface BaseComponentProps {
  className?: string
  children?: any
}

export interface LoadingState {
  isLoading: boolean
  error?: string | null
}

export interface AsyncState<T> extends LoadingState {
  data?: T | null
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export interface AppConfig {
  apiUrl: string
  socketUrl: string
  environment: 'development' | 'staging' | 'production'
  features: {
    walletConnect: boolean
    socialLogin: boolean
    realTimeChat: boolean
    notifications: boolean
  }
}

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

export interface NotificationPayload {
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  userId?: string
  data?: Record<string, any>
}

export interface PushNotificationConfig {
  vapidKey: string
  serviceWorkerPath: string
}

// ============================================================================
// THEME TYPES
// ============================================================================

export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
  }
  spacing: Record<string, string>
  borderRadius: Record<string, string>
  shadows: Record<string, string>
}

// ============================================================================
// SEARCH & FILTER TYPES
// ============================================================================

export interface SearchFilters {
  query?: string
  category?: string
  priceMin?: number
  priceMax?: number
  rating?: number
  location?: {
    lat: number
    lng: number
    radius: number
  }
  availability?: {
    date: string
    timeSlot: string
  }
  expertLevel?: 'beginner' | 'intermediate' | 'expert' | 'master'
}

export interface SortOption {
  field: string
  direction: 'asc' | 'desc'
  label: string
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: string
}

export interface ValidationError {
  field: string
  message: string
}

export interface ApiError extends AppError {
  status: number
  endpoint: string
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface AnalyticsEvent {
  name: string
  properties: Record<string, any>
  userId?: string
  timestamp: string
}

export interface UserAnalytics {
  userId: string
  sessionId: string
  events: AnalyticsEvent[]
  metadata: {
    device: string
    browser: string
    os: string
    location: string
  }
}

// Auth Context Types
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
  walletConnected: boolean
  walletAddress: string | null
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<ApiResponse<{ user: User; token: string }>>
  loginWithGoogle: () => Promise<ApiResponse<{ user: User; token: string }>>
  connectWallet: (walletType: WalletProvider) => Promise<WalletInfo>
  logout: () => Promise<void>
  register: (userData: RegisterData) => Promise<ApiResponse<{ user: User; token: string }>>
}
