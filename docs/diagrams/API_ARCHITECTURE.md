# Mouthouq API Architecture

```mermaid
flowchart TD
    subgraph Client Layer
        Web[Web Application]
        Mobile[Mobile App]
    end

    subgraph API Gateway
        Auth[Authentication API]
        Rate[Rate Limiter]
        Cache[Cache Layer]
    end

    subgraph Core Services
        Users[Users Service]
        Services[Services API]
        Posts[Posts Service]
        Reviews[Reviews Service]
        Notif[Notification Service]
    end

    subgraph Data Layer
        PostgreSql[(PostgreSql)]
        Redis[(Redis Cache)]
    end

    Web & Mobile --> Auth
    Auth --> Users
    Auth --> Rate
    Rate --> Cache
    Cache --> Users & Services & Posts & Reviews & Notif
    Users & Services & Posts & Reviews --> PostgreSql
    Notif --> Redis