import { apiClient } from './apiClient';

export interface LoginCredentials {
  phone: string;
  password?: string;
}

export interface RegisterData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  role: 'comprador' | 'vendedor';
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'comprador' | 'vendedor';
}

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  private tokenKey = 'deliveryapp_token';
  private userKey = 'deliveryapp_user';

  // Login with phone/password
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      this.setAuthData(response);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // Register new user
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', userData);
      this.setAuthData(response);
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  // Send OTP code
  async sendOTP(phone: string): Promise<{ success: boolean; message: string }> {
    try {
      return await apiClient.post('/auth/send-otp', { phone });
    } catch (error) {
      console.error('Send OTP failed:', error);
      throw error;
    }
  }

  // Verify OTP code
  async verifyOTP(phone: string, code: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/verify-otp', { phone, code });
      this.setAuthData(response);
      return response;
    } catch (error) {
      console.error('OTP verification failed:', error);
      throw error;
    }
  }

  // Password recovery
  async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    try {
      return await apiClient.post('/auth/password-reset', { email });
    } catch (error) {
      console.error('Password reset request failed:', error);
      throw error;
    }
  }

  // Logout
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const userStr = localStorage.getItem(this.userKey);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  // Get auth token
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.tokenKey);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  }

  // Set auth data in localStorage
  private setAuthData(authResponse: AuthResponse): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.tokenKey, authResponse.token);
      localStorage.setItem(this.userKey, JSON.stringify(authResponse.user));
    }
  }

  // Get auth headers for API requests
  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

export const authService = new AuthService();
export default authService;