Hello


Users
│
├── Roles
│
├── Reservations
│   └── Tickets
│
├── VisitorPreferences
│
Exhibitions
│
├── ExhibitionSlots
│
├── Venues
│
└── Exhibitors

RecommendationLogs

AuditLogs

CREATE TABLE users (
    id UUID PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


roles
VISITOR
EXHIBITOR
ORGANIZER


lieux d'exposition 
CREATE TABLE venues (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    address TEXT,
    max_capacity INT NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    created_at TIMESTAMP DEFAULT NOW()
);


exhibitors4
CREATE TABLE exhibitors (
    id UUID PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL,
    company_name VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);


expositions 
CREATE TABLE exhibitions (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    exhibitor_id UUID NOT NULL,
    venue_id UUID NOT NULL,
    estimated_duration INT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (exhibitor_id) REFERENCES exhibitors(id),
    FOREIGN KEY (venue_id) REFERENCES venues(id)
);


exhibition_slots
CREATE TABLE exhibition_slots (
    id UUID PRIMARY KEY,
    exhibition_id UUID NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    max_visitors INT NOT NULL,
    current_bookings INT DEFAULT 0,

    FOREIGN KEY (exhibition_id)
        REFERENCES exhibitions(id)
);


visitor_preferences
CREATE TABLE visitor_preferences (
    id UUID PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL,
    preferred_categories TEXT,
    available_duration INT,
    mobility_level VARCHAR(50),

    FOREIGN KEY (user_id)
        REFERENCES users(id)
);

{
  "categories": [
    "Nature",
    "Portrait"
  ],
  "available_duration": 180,
  "mobility_level": "HIGH"
}


Reservations 
CREATE TABLE reservations (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    slot_id UUID NOT NULL,

    status VARCHAR(50) NOT NULL,

    created_at TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (user_id)
        REFERENCES users(id),

    FOREIGN KEY (slot_id)
        REFERENCES exhibition_slots(id)
);
PENDING
CONFIRMED
CANCELLED
CHECKED_IN



Tickets 
CREATE TABLE tickets (
    id UUID PRIMARY KEY,
    reservation_id UUID UNIQUE NOT NULL,
    qr_code TEXT UNIQUE,
    issued_at TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (reservation_id)
        REFERENCES reservations(id)
);

checkins 
CREATE TABLE checkins (
    id UUID PRIMARY KEY,
    ticket_id UUID NOT NULL,
    checkin_time TIMESTAMP DEFAULT NOW(),
    validated_by UUID,

    FOREIGN KEY (ticket_id)
        REFERENCES tickets(id),

    FOREIGN KEY (validated_by)
        REFERENCES users(id)
);




Domain
│
├── User
├── Role
├── Venue
├── Exhibition
├── Slot
├── Reservation
├── Ticket
│

Application
│
├── RegisterUserUseCase
├── LoginUseCase
├── CreateReservationUseCase
├── GenerateTicketUseCase
├── RecommendVisitUseCase
│

Infrastructure
│
├── PostgreSQL
├── JWTService
├── PasswordHasher
├── QRCodeService
│

Presentation
│
├── AuthController
├── ReservationController
├── RecommendationController
└── ExhibitionController