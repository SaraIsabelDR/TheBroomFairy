# 🧙‍♀️ The Broom Fairy - Plataforma de Servicios de Limpieza Premium

![The Broom Fairy Logo](./public/logo.png)

Una plataforma moderna y elegante para conectar clientes con expertos en servicios de limpieza verificados. Construida con las tecnologías más avanzadas y las mejores prácticas de desarrollo frontend.

## ✨ Características Destacadas

### 🎨 **Diseño Moderno y Accesible**
- Interfaz elegante con tema "fairy" personalizado
- Dark mode completo con transiciones suaves
- Componentes reutilizables y consistentes
- Totalmente responsive y mobile-first
- Animaciones fluidas con Framer Motion

### 🔐 **Autenticación Avanzada**
- Login tradicional con email/password
- Autenticación social (Google, Facebook)
- Conexión con wallets cripto (MetaMask, Bitcoin, Binance, ByBit)
- Protección de rutas y roles de usuario
- Gestión segura de tokens JWT

### 🏗️ **Arquitectura Robusta**
- TypeScript para máxima seguridad de tipos
- React 18 con hooks modernos
- Estado global con Context API
- React Query para manejo de datos del servidor
- Arquitectura modular y escalable

### 🎯 **Funcionalidades Clave**
- Sistema de reservas en tiempo real
- Chat integrado entre clientes y expertos
- Geolocalización y mapas interactivos
- Sistema de calificaciones y reseñas
- Colección de NFTs exclusivos
- Notificaciones push en tiempo real

## 🚀 Tecnologías Utilizadas

### Frontend Core
- **React 18** - Librería UI moderna con Concurrent Features
- **TypeScript 5** - Tipado estático y IntelliSense avanzado
- **Vite** - Build tool ultrarrápido y HMR optimizado
- **React Router Dom 6** - Navegación declarativa

### Styling & UI
- **Tailwind CSS 3** - Framework CSS utility-first
- **Framer Motion** - Animaciones fluidas y gestos
- **Lucide React** - Iconos modernos y consistentes
- **Headless UI** - Componentes accesibles sin estilos

### State Management
- **React Query (TanStack)** - Server state management
- **Context API** - Estado global de la aplicación
- **React Hook Form** - Manejo optimizado de formularios

### Networking & Real-time
- **Axios** - Cliente HTTP con interceptores
- **Socket.IO Client** - Comunicación en tiempo real
- **Web3** - Integración blockchain
- **Ethers.js** - Interacción con contratos inteligentes

### Development Tools
- **ESLint** - Linting con reglas personalizadas
- **Prettier** - Formateo automático de código
- **Husky** - Git hooks para calidad de código
- **Vitest** - Testing framework rápido

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes base (Button, Input, Modal)
│   ├── features/       # Componentes específicos por feature
│   ├── layout/         # Componentes de layout (Navbar, Footer)
│   └── common/         # Componentes comunes (ErrorBoundary, Loading)
├── pages/              # Páginas de la aplicación
├── context/            # Context providers (Auth, Theme, App)
├── hooks/              # Custom hooks
├── services/           # Servicios API y externos
├── types/              # Definiciones TypeScript
├── utils/              # Utilidades y helpers
└── assets/             # Recursos estáticos
```

## 🛠️ Instalación y Configuración

### Prerequisitos
- Node.js 18+ 
- npm 9+ o yarn
- Git

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/the-broom-fairy-web.git
   cd the-broom-fairy-web
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   # Editar .env.local con tus configuraciones
   ```

4. **Iniciar en modo desarrollo**
   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:3000`

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo con HMR
npm run type-check       # Verificación de tipos TypeScript

# Build
npm run build           # Build de producción optimizado
npm run preview         # Preview del build de producción

# Calidad de Código
npm run lint            # Ejecutar ESLint
npm run lint:fix        # Ejecutar ESLint con auto-fix
npm run format          # Formatear código con Prettier
npm run format:check    # Verificar formato de código

# Testing
npm run test            # Ejecutar tests
npm run test:ui         # Ejecutar tests con interfaz visual
npm run coverage        # Generar reporte de cobertura
```

## 🎨 Sistema de Diseño

### Colores Principales
```css
Primary: #a855f7 (Purple)
Secondary: #d946ef (Fairy Pink)
Accent: #fbbf24 (Magic Gold)
Success: #22c55e
Warning: #f59e0b
Error: #ef4444
```

### Tipografía
- **Display**: Poppins (Headings)
- **Body**: Inter (Texto general)
- **Mono**: JetBrains Mono (Código)

### Componentes Base
- **Button**: 6 variantes con estados de loading
- **Input**: 3 estilos con validación visual
- **Modal**: Sistema modular con animaciones
- **Alert**: 4 tipos de notificaciones
- **Card**: Glassmorphism effect integrado

## 📱 Características Responsive

- **Mobile First**: Diseñado primero para móviles
- **Breakpoints**:
  - `sm`: 640px (tablets)
  - `md`: 768px (laptops pequeñas)
  - `lg`: 1024px (desktops)
  - `xl`: 1280px (pantallas grandes)
  - `2xl`: 1536px (pantallas extra grandes)

## 🔐 Autenticación y Seguridad

### Flujos de Autenticación
1. **Email/Password**: Validación robusta con feedback visual
2. **OAuth Social**: Google y Facebook integrados
3. **Wallet Connect**: Soporte para múltiples wallets cripto
4. **Verificación 2FA**: Opcional para usuarios premium

### Medidas de Seguridad
- Tokens JWT con refresh automático
- Sanitización de inputs
- Protección CSRF
- Rate limiting en requests
- Validación de roles y permisos

## 🌐 Internacionalización

- Soporte para Español e Inglés
- Detección automática de idioma del navegador
- Formateo de fechas y números por región
- Textos externalizados en archivos JSON

## 📊 Performance y Optimización

### Optimizaciones Implementadas
- **Code Splitting**: Carga lazy de componentes
- **Tree Shaking**: Eliminación de código no utilizado
- **Bundle Analysis**: Optimización del tamaño de bundles
- **Image Optimization**: Compresión y lazy loading automático
- **Service Worker**: Cacheo inteligente para PWA

### Métricas Objetivo
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)
- **Bundle Size**: < 300KB gzipped

## 🧪 Testing

### Estrategia de Testing
- **Unit Tests**: Componentes individuales
- **Integration Tests**: Flujos de usuario
- **E2E Tests**: Cypress para testing end-to-end
- **Visual Regression**: Chromatic para UI consistency

### Herramientas
- **Vitest**: Framework de testing rápido
- **Testing Library**: Testing centrado en el usuario
- **MSW**: Mocking de APIs para tests
- **Playwright**: E2E testing moderno

## 🚀 Deployment

### Build de Producción
```bash
npm run build
```

### Variables de Entorno Requeridas
```env
VITE_API_URL=https://api.thebroomfairy.com
VITE_SOCKET_URL=https://socket.thebroomfairy.com
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_GOOGLE_MAPS_API_KEY=AIza...
```

### Platforms Soportadas
- **Vercel**: Deploy automático desde Git
- **Netlify**: Configuración optimizada incluida
- **AWS S3 + CloudFront**: Para máximo rendimiento
- **Docker**: Containerización disponible

## 📈 Roadmap

### V2.0 - Próximas Características
- [ ] PWA completa con modo offline
- [ ] Chat de video integrado
- [ ] Sistema de afiliados
- [ ] Marketplace de productos de limpieza
- [ ] AI para recomendaciones personalizadas

### V2.1 - Integraciones
- [ ] Calendario sincronizado
- [ ] Facturación automática
- [ ] Sistema de loyalty points
- [ ] Integración con IoT devices

## 🤝 Contribución

### Proceso de Contribución
1. Fork del repositorio
2. Crear branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### Estándares de Código
- Seguir las guías de ESLint y Prettier
- Escribir tests para nuevas funcionalidades
- Documentar APIs públicas
- Mantener cobertura de tests > 80%

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

- **Frontend Lead**: Tu nombre
- **UI/UX Designer**: Nombre del diseñador
- **Backend Lead**: Nombre del backend dev

## 📞 Soporte

- **Email**: soporte@thebroomfairy.com
- **Discord**: [Servidor de la comunidad](https://discord.gg/thebroomfairy)
- **Documentación**: [docs.thebroomfairy.com](https://docs.thebroomfairy.com)

---

⭐ **Si te gusta este proyecto, no olvides darle una estrella en GitHub!**

🧙‍♀️ **Hecho con magia por The Broom Fairy Team**