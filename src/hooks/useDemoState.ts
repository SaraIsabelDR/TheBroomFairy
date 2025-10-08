import { useState } from 'react'

export type Screen = 'login' | 'dashboard' | 'nft' | 'services' | 'calendar' | 'statistics'

export interface DemoState {
  user: { name: string; email: string }
  auth: { logged: boolean; method: string }
  payment: {
    type: 'card' | 'wallet'
    card: { brand: string; masked: string; number: string; holder: string }
    wallet: { provider: string; address: string; balanceUSD: number }
  }
  service: {
    id: string
    worker: string
    start: Date
    window: string
  }
  favorites: Array<{ name: string; rating: number; avatar: string }>
  nfts: Array<{ id: number; name: string; collection: string; owners: number; views: number; favorites: number; discount: number; image: string }>
  notifications: Array<{
    id: string; title: string; price: number; date: string; time: string; address: string; tasks: string[]; distanceKm: number; ago: string
  }>
  chat: any[]
  recording: { active: boolean; started: number; maxMs: number }
}

const initialState: DemoState = {
  user: { name: 'Antonio Merez', email: 'lombook@gmail.com' },
  auth: { logged: false, method: 'password' },
  payment: {
    type: 'card',
    card: {
      brand: 'Mastercard',
      masked: '3******33***',
      number: '3424 2345 4524 4545',
      holder: 'ANTONIO MEREZ',
    },
    wallet: {
      provider: 'Metamask',
      address: '0x50E12E085189F1a272',
      balanceUSD: 21,
    },
  },
  service: {
    id: '001010011010',
    worker: 'Sonia Pilar Agudelo',
    start: new Date(Date.now() + 13 * 60 * 60 * 1000),
    window: '08:00 AM a 06:00 PM',
  },
  favorites: [
    { name: 'Alexandra Ramo', rating: 4.9, avatar: 'https://via.placeholder.com/80' },
    { name: 'Paola Ja', rating: 4.8, avatar: 'https://via.placeholder.com/80' },
    { name: 'Monica Aguirre', rating: 4.7, avatar: 'https://via.placeholder.com/80' },
  ],
  nfts: [
    { id: 1, name: 'American Ape x Boom', collection: 'Queens', owners: 10, views: 961, favorites: 20, discount: 15, image: 'https://via.placeholder.com/200' },
  ],
  notifications: [
    {
      id: 'n1',
      title: 'Felipe Andres Varga Lleras te ha solicitado',
      price: 180000,
      date: '02/05/2024',
      time: '8:00am a 4:00pm',
      address: 'CL 63 B 54-30',
      tasks: ['Lavar la nevera', 'Lavar el baño'],
      distanceKm: 1.2,
      ago: 'Hace 1 día',
    },
    {
      id: 'n2',
      title: 'Luisa Rendón Acosta, te ha solicitado',
      price: 220000,
      date: '05/05/2024',
      time: '9:00am a 1:00pm',
      address: 'Calle 10 # 20-30',
      tasks: ['Cocina', 'Baño'],
      distanceKm: 9.7,
      ago: 'Hace 3 horas',
    },
  ],
  chat: [],
  recording: { active: false, started: 0, maxMs: 120000 },
}

export function useDemoState() {
  const [screen, setScreen] = useState<Screen>('login')
  const [state, setState] = useState<DemoState>(initialState)

  // Ejemplo de función para cambiar de pantalla
  function showScreen(id: Screen) {
    setScreen(id)
  }

  // Puedes agregar aquí funciones para simular login, pagos, chat, etc.

  return {
    screen,
    setScreen: showScreen,
    state,
    setState,
  }
}
