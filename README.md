# 📌 Movie Explorer Dashboard

Movie Explorer Dashboard is a modern React-based web application designed to search, explore, filter, and manage a personalized movie watchlist. The application demonstrates structured architecture and the practical implementation of multiple software design patterns and performance optimization techniques.

## 🏗 Architecture Overview

The application is structured into clearly defined layers:
- **Presentation Layer**: Reusable React components (`SearchBar`, `MovieCard`, `MovieList`, `Analytics`)
- **State Layer**: Context API combined with the Reducer Pattern
- **Domain Layer**: Business logic and service abstraction (`MovieFactory`)
- **Data Layer**: API communication and local storage persistence (`MovieService`)

## 🔁 Key Architectural Patterns
- **Module Pattern**: Organized into self-contained modules.
- **Provider Pattern**: Global state management via Context Providers.
- **Singleton Service Layer**: Unified API interaction via `MovieService`.
- **Debounce Pattern**: Optimized search input processing.
- **Factory Normalization**: Consistent data models via `MovieFactory`.
- **Observer Pattern**: Reactive UI updates on state changes.
- **Reducer Pattern**: Predictable state transitions.

## ⚙ Performance Optimizations
- Debouncing user input to limit API calls.
- Memoized derived state using `useMemo`.
- Controlled re-renders using `React.memo`.
- Local data persistence for a seamless offline-first experience.

## 🚀 Getting Started
```bash
npm install
npm run dev
```
