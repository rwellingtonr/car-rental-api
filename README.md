# 🚗 Car Rental API

An API RESTful for vehicle rental management, developed with NestJS, Prisma and PostgreSQL.

## 🚀 Technologies

- **Node.js** - Execution environment
- **NestJS** - Framework for building server-side applications
- **Prisma** - ORM for database
- **PostgreSQL** - Relational database
- **Docker** - Containerization
- **JWT** - Authentication
- **Swagger** - API documentation

## 📋 Prerequisites

- Node.js (version 18+)
- Docker and Docker Compose
- PNPM

## 🛠️ Environment Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/wellingtonleardiniramos/car-rental-api.git
   cd car-rental-api
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run migrations**

   ```bash
   pnpm prisma migrate deploy
   ```

4. **Run the seed (just for the first time)**

   ```bash
   pnpm prisma db seed
   ```

5. **Run the application**

   ```bash
   pnpm start:dev
   ```

6. **Access the API documentation**

   Interactive documentation is available at:

   ```bash
   http://localhost:3333/api/docs
   ```

## 🏗️ Project Structure

```text
src/
├── application/          # Use cases and business rules
│   └── use-cases/        # Organized by domain
├── domain/               # Domain entities and interfaces
├── infra/                # Infrastructure layer
│   ├── controller/       # Controllers
│   ├── database/         # Database configuration
│   └── repositories/     # Repository implementations
└── main.ts               # Application entry point
```

## 🔐 Authentication

The API uses JWT for authentication. To access protected routes, include the token in the header:

```http
Authorization: Bearer your_jwt_token_here
```

## 🌐 API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Authenticate user

### Car Rental

- `GET /car-rental/available` - List available cars
- `POST /car-rental` - Request a car rental

### Seasons

- `GET /seasons` - List all seasons

## 🧪 Testing

Run unit tests:

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm test:watch
```

## 🐳 Docker Commands

Start the application with Docker:

```bash
docker-compose up -d
```

Stop the application:

```bash
docker-compose down
```

View logs:

```bash
docker-compose logs -f
```

## 🛠️ Development

### Database Management

Access Prisma Studio for database management:

```bash
pnpm prisma studio
```

Run database migrations:

```bash
pnpm prisma migrate dev
```

## 📚 API Documentation

Interactive API documentation is available at `/api/docs` when the application is running.

## 🏛️ Project Architecture

### Clean Architecture Implementation

The project follows a clean architecture approach with clear separation of concerns:

- **Domain Layer**: Contains core business logic and entities (e.g., `User`, `Car`, `Season`)
- **Application Layer**: Implements use cases (e.g., `GetAvailableCarsUseCase`, `RequestRentUseCase`)
- **Infrastructure Layer**: Handles database operations and external services
- **Presentation Layer**: Controllers that handle HTTP requests and responses

### Key Architectural Patterns

1. **Repository Pattern**
   - Abstract interfaces define data access contracts (e.g., `AbsCarRentalRepository`)
   - Multiple implementations (e.g., Database and In-Memory) for different environments
   - Enables easy switching between data sources without changing business logic

2. **Dependency Injection**
   - Heavy use of NestJS's DI container
   - Dependencies are injected through constructors
   - Makes the code more testable and maintainable

3. **In-Memory Testing**
   - In-memory repositories for fast, deterministic unit tests
   - No database required for testing business logic
   - Clear separation between test and production data

4. **Domain-Driven Design**
   - Rich domain models with behavior
   - Value objects for type safety and validation
   - Clear boundaries between different domain contexts

### Testing Approach

- **Unit Tests**: Focus on individual use cases with mocked/in-memory dependencies
- **Integration Tests**: Test the interaction between components with real implementations
- **E2E Tests**: Full application testing with a test database

The architecture emphasizes testability, with clear boundaries between different layers and concerns, making the codebase maintainable and scalable.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)
