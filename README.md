# My Watch Tower

> **Advanced satellite tracking and pass prediction system with intelligent filtering and horizon masking**

A high-performance satellite tracking application that provides accurate pass predictions for ground stations with real-world visibility calculations based on actual horizon obstacles.

[![Status](https://img.shields.io/badge/status-WIP-yellow)](https://github.com)
[![NestJS](https://img.shields.io/badge/NestJS-11.x-red)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-19.x-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.x-darkgreen)](https://www.prisma.io/)

---

## 🎯 Project Vision

**My Watch Tower** is designed to solve the real-world challenges faced by satellite observers, radio amateurs, and space enthusiasts who need more than basic orbital predictions.

### Why This Project?

Traditional satellite tracking tools often fall short in these key areas:

- **Precise Filtering**: Quickly filter thousands of satellites by name, NORAD ID, custom tags, or specific transmitter frequency bands
- **Time-Based Pass Filtering**: Find passes during specific times of day or days of week that fit your schedule
- **Real-World Visibility**: Account for actual horizon obstacles (buildings, trees, mountains) at your observation station, not just theoretical calculations
- **High-Value Pass Extraction**: Automatically identify and extract "high-value" passes based on your criteria and sync them to your calendar
- **Accurate Pass Properties**: Get visibility duration and maximum elevation based on *actual* pass visibility, considering your local horizon mask

---

## ✨ Key Features

### 🔍 Advanced Satellite Filtering

- **Multi-criteria Search**: Filter by satellite name, NORAD ID, custom tags, or frequency bands
- **Frequency Band Filtering**: Support for multiple frequency ranges with uplink/downlink direction
- **Tag Management**: Organize satellites with custom tags (Amateur, METEOR, Orbcomm, etc.)
- **Tracked Satellites**: Mark and filter your favorite satellites for quick access

### 📡 Ground Station Management

- **Multiple Stations**: Manage unlimited observation locations
- **Horizon Mask Editor**: Interactive polar plot editor to mark obstacles
- **Geographic Visualization**: Interactive maps with geodesic lines and satellite footprints. Real-time visualization of satellite positions and paths

### 🛰️ Pass Prediction Engine

- **High-Performance Calculation**: Background job queue (BullMQ + Redis) for efficient processing
- **Orbit-Based Predictions**: Calculate passes for specific satellites over multiple days
- **Visibility Segmentation**: Split passes into visible segments based on horizon masks
- **Pass Comparison**: Compare the same orbital pass across different ground stations
- **Time Filtering**: Filter passes by time of day and day of week

### 📊 Real-Time Tracking

- **Live Satellite Position**: Real-time position updates with Doppler shift calculations
- **Pass Progress**: Visual progress indicators for ongoing passes
- **Sky Charts**: Polar plot visualization showing current satellite position and predicted path
- **Footprint Mapping**: Display satellite visibility footprint on interactive maps

### 🔧 Data Management

- **Automatic TLE Updates**: Configurable TLE sources with automatic refresh
- **SatNOGS DB Integration**: Import transmitter data and satellite information
- **Database Schema**: PostgreSQL schema with Prisma ORM
- **API-First Design**: Full REST API with OpenAPI/Swagger documentation

---

## 🏗️ Technology Stack

### Backend

- **Framework**: NestJS 11.x (TypeScript, Node.js)
- **Database**: PostgreSQL 18 with Prisma ORM
- **Queue System**: BullMQ + Redis for background jobs
- **API Documentation**: Swagger/OpenAPI
- **Orbital Mechanics**: satellite.js, tle.js
- **Scheduling**: @nestjs/schedule for cron jobs

### Frontend

- **Framework**: React 19.x with TypeScript
- **Build Tool**: Vite 7.x
- **State Management**: Zustand + React Query (TanStack Query)
- **Routing**: React Router v7
- **Forms**: React Hook Form
- **Styling**: SCSS with responsive mixins
- **Maps**: Leaflet with geodesic line support
- **Icons**: Lucide React
- **API Client**: Orval-generated TypeScript client from OpenAPI spec

### Infrastructure

- **Containerization**: Docker Compose
- **Database Admin**: pgAdmin 4
- **Development**: Hot reload for both frontend and backend

---

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ and npm
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ivan.petrushev/my-watch-tower.git
   cd my-watch-tower
   ```

2. **Start infrastructure services**

   ```bash
   docker compose up -d
   ```

   This starts PostgreSQL, pgAdmin, and Redis.

3. **Install dependencies**

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

4. **Configure environment**
  
   Copy `backend/.env.sample` to `backend/.env`, probably no need to adjust anything.

5. **Run database migrations**

   ```bash
   cd backend
   npx prisma migrate deploy
   npx prisma generate
   ```

6. **Start development servers**

  Start separately:

   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

7. **Access the application**

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - API Docs: http://localhost:3000/api
   - pgAdmin: http://localhost:8080 (admin@example.com / admin123)

---

## 🔧 Development Workflow

### Backend Development

```bash
cd backend

# Start dev server with hot reload
npm run dev

# Run database migrations
npx prisma migrate dev --name migration_name

# Generate Prisma client after schema changes
npx prisma generate

# View database in Prisma Studio
npx prisma studio
```

### Frontend Development

```bash
cd frontend

# Start dev server
npm run dev

# Regenerate API client after backend changes
npm run orval

```

### Database Management

**pgAdmin** is available at http://localhost:8080

Default credentials:

- Email: admin@example.com
- Password: admin123

Server connection is pre-configured in `docker-confs/pgadmin-servers.json`.

---

---

## 🗺️ Roadmap & TODOs

### High Priority

- [ ] **Timeline view**: Visualize upcoming passes in a timeline format
- [ ] **Current sky**: Real-time sky chart with all visible satellites
- [ ] **Production Docker Images**: Create optimized Docker images for backend and frontend
- [ ] **Complete Docker Compose**: Production-ready compose file with all services
- [ ] **Calendar Integration**: Sync high-value passes to Google Calendar/iCal

### Features

- [ ] **Satellite info page**: Detailed satellite information,  transmitter list and citations
- [ ] **Pass Logging**: Ability to log observations and attach media
- [ ] **Weather Integration**: Filter passes by weather conditions
- [ ] **Satellite custom tags**: Ability to assign cutom tags to satellite for filtering
- [ ] **Filter saving**: Save and load custom filter presets
- [ ] **Tests**: Both backend and frontend need tests
- [ ] **Pass Statistics**: Historical pass analytics
- [ ] **Multi-language Support**: i18n implementation
- [ ] **News aggregation**: Aggregating news for tracked satellites from several sources

### Infrastructure

- [ ] **CI/CD Pipeline**: GitHub Actions for testing and deployment
- [ ] **Backup Strategy**: Automated database backups
- [ ] **Performance Testing**: Load testing and optimization

---

## 📖 API Documentation

Once the backend is running, access the interactive API documentation:

**Swagger UI**: http://localhost:3000/api

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

```env
# Database
DATABASE_URL="postgresql://admin:admin123@localhost:5432/my_watch_tower"
```

---

## 🤝 Contributing

This project is currently in active development (WIP). Contributions, issues, and feature requests are welcome!

### Development Guidelines

1. Follow existing code style and patterns
2. Write meaningful commit messages
3. Update documentation for new features
4. Add tests for new functionality
5. Run linters before committing

---

## 📄 License

This project is licensed under the MIT license - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Claude 4.5** and **Gemini 3 Pro** - AI assistance in coding, brainstorming and documentation. All hail our future robot overlords!
- **satellite.js** - SGP4 propagation library
- **TLE.js** - TLE parsing and analysis
- **Leaflet** & **leaflet.geodesic** - Interactive mapping
- **SatNOGS** - Satellite and transmitter database, TLE data sources

---

**Status**: 🚧 Work in Progress - Active Development

Built with ❤️ for the satellite tracking community
