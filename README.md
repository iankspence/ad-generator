# Monorepo

## Table of Contents
1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Naming Conventions](#naming-conventions)
4. [Development](#development) (TBD)
5. [Deployment](#deployment) (TBD)

## Overview

This is a monorepo for a Next.js frontend and a Nest backend.

## Getting Started

1. Install dependencies: `yarn`
2. Serve the frontend and backend: `yarn nx serve frontend` and `yarn nx serve backend`
3. Navigate to `http://localhost:4200/` to view the frontend.

# Naming conventions
- camelCase
- PascalCase
- kebab-case

## General Rule
- Directories in any location should use kebab-case

## Nx apps and libs
Nx apps and libs use kebab-case (e.g. `nx g @nrwl/react:app my-app`).

## Frontend
The frontend is a Next.js app named `frontend`.

### Next Pages
Next pages are located in the `pages` directory. Next page file names use kebab-case (e.g. `pages/forgot-password.tsx`).

The `pages` directory is a special directory in Next.js. Any React component files inside it are treated as Next.js pages automatically.

The export from the pages uses PascalCase and includes the `Page` suffix (e.g. `ForgotPasswordPage`).

### React Components
React components are located in the `components` directory and use PascalCase (e.g. `components/MyComponent.tsx`).

### React Contexts
React contexts are located in the `contexts` directory and use PascalCase (e.g. `contexts/MyContext.tsx`).

### React Hooks
React hooks are located in the `hooks` directory and use camelCase (e.g. `hooks/useMyHook.ts`).

### React Utils
React utils are located in the `utils` directory and use camelCase (e.g. `utils/myUtil.ts`).

## Backend
The majority of the Nest backend code is located in the `backend-core` lib.

### Backend Modules
Backend modules are located in the `lib/modules` directory and use kebab-case (e.g. `modules/my-module`).

### Backend Controllers
Backend controllers are located in the `lib/modules` directory and use kebab-case (e.g. `modules/my-module/my-controller.controller.ts`).

### Backend Services
Backend services are located in the `lib/modules` directory and use kebab-case (e.g. `modules/my-module/my-service.service.ts`).

### Backend Utils
Backend utils are located in the `lib/utils` directory and use camelCase (e.g. `utils/myUtil.ts`).

## Type
Type files are located in the `type` lib.  This can be accessed anywhere via `@monorepo/type`.

DTO, interface, schema, and enum files use kebab-case (e.g. `dto/my-dto.ts`) and are exported in PascalCase (e.g. `MyDto`).


## Logging 

### Logtail
Logtail's Node.js library is used for logging (via logger.service.ts) in two ways:
- Fire and Forget
- Log Forwarding (from the console)

#### Fire and Forget
Each app has its own Logtail source: (eg. 'backend-local', 'backend-dev', 'backend-staging', 'backend-prod', 'frontend-local', 'frontend-dev', 'frontend-staging', 'frontend-prod').

This gives us greater control over context and log level filtering than forwarding console logs (as strings - without structure).

Logs can be viewed for one or many sources, and can be searched by log level, context, time, and message.

Because we aren't awaiting the log function, we don't have access to the response.  So if something goes wrong with logging, we won't know about it.

Example Fire and Forget log:

2023-06-08 04:40:15.245 [backend_dev] [VERBOSE] Created customer for accountId: 64815baed59b3fa0a04f1c75 with id: 64815bafd59b3fa0a04f1c77
- "context":"CustomerService"
- "dt":"2023-06-08T04:40:15.245Z"
- "level":"VERBOSE"
- "message":"Created customer for accountId: 64815baed59b3fa0a04f1c75 with id: 64815bafd59b3fa0a04f1c77"


#### Log Forwarding
To make sure that we don't miss any logs, we also forward all production environment console logs to Logtail via DigitalOcean's Log Forwarding.

For these, we have 2 additional sources: `backend-prod-console` and `frontend-prod-console`.

This let's us make sure that every log is logged to Logtail, and be able to check if there are any errors with our logging.

Example Log Forwarding log (this example is from dev, but we only forward logs from prod):

2023-06-08 07:04:15.546 [backend_dev_forwarding] [INFO] dev-backend dev-backend [Nest] 93  - 06/08/2023, 7:04:15 AM  ERROR [UserSignInService] Sign in attempt for user: ian@reviewdrum.com
- "dt":"2023-06-08T07:04:15.546516Z"
- "level":"info"
- "message":"[Nest] 93 - 06/08/2023, 7:04:15 AM ERROR [UserSignInService] Sign in attempt for user: ian@reviewdrum.com"
- "platform":"Syslog"

Note we call `logger.error` in the backend, but the log level is `info` in Logtail.  This is because all console logs are forwarded as `info` log messages.

### Backend
The backend uses an extended version Nest's built-in logger - globally accessible via logger.service.ts (no need for importing logger.module).

#### Logging Levels
- `error` - for logging errors (e.g. `logger.error('Something went wrong')`)
- `warn` - for logging warnings (e.g. `logger.warn('Something could go wrong')`)
- `verbose` - for logging verbose information (e.g. `logger.verbose('Something normal is happening')`)
- `log` - for logging general information (e.g. `logger.log('Something normal happened')`)
- `debug` - for logging debugging information (e.g. `logger.debug('Something happened - with extra info')`)

#### Logging Context
Whenever using logger.service, set the context to the current class.  

This will allow for easier debugging.  For example:

```
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class CustomerService {

    constructor(
        private readonly logger: LoggerService,
    ) {
        this.logger.setContext('CustomerService'); // Set the context for the logger
    }

    async createCustomer(customer: CreateCustomerDto): Promise<Customer> {
        this.logger.log(`Creating customer ${customer.email}`);
    }
}
```

#### Logging Output
The logger will output the following information:
- `timestamp` - the timestamp of the log
- `level` - the log level
- `context` - the context of the logger
- `message` - the message to log
- `trace` - the stack trace (if available)


