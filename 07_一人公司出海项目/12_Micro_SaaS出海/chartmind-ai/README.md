# ChartMind AI

AI-Powered Chart Recognition & Generation Tool

## Features

- **Chart Recognition**: Upload charts and automatically recognize data patterns
- **Chart Generation**: Generate professional charts from your data
- **Data Visualization**: Transform raw data into beautiful visualizations
- **Export Functionality**: Export charts in multiple formats

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env.local` and configure environment variables:
```bash
cp .env.example .env.local
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints

- `GET /api/features` - List all features
- `GET /api/health` - Health check
- `GET /api/export` - Export functionality

## Technologies Used

- Next.js
- React
- TypeScript

## License

MIT
