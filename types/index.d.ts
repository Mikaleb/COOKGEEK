import './vue'

declare global {
  interface Window {
    [key: string]: any
  }
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production'
      PORT?: string
      BASE_URL?: string
    }

    interface Global {
      [key: string]: any
    }
  }
}

export * from '@/types/article'
