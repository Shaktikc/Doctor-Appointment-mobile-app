# 🏥 Doctor Appointment Booking App

A React Native + Expo mobile app for browsing doctors, viewing 30-minute availability slots, and booking appointments.

---

## ✨ Features

- Browse all active doctors fetched from the  API
- View 30-minute appointment slots generated from doctor schedules
- Book, confirm, and cancel appointments
- Double-booking prevention (per doctor and per time slot)
- Persistent storage via AsyncStorage — bookings survive app restarts
- Loading and error state feedback throughout the UI

---

## 🗂️ Project Structure

```
src/
├── screens/
│   ├── HomeScreen.js           # Doctors list
│   ├── DoctorDetails.js        # Weekly schedule + 30-min slots
│   ├── BookAppointment.js      # Booking confirmation
│   └── MyAppointment.js        # View & cancel bookings
├── components/
│   ├── CustomButton/
│   ├── TimeSlot/
│   ├── TopDoctor/
│   └── ErrorHandler/
├── navigation/
│   └── AppNavigation.js        # Stack + Tab navigation
├── context/
│   └── BookAppointmentContext.js
├── hooks/
│   └── useBookAppointment.js
├── mockApi/
│   ├── data.js
│   ├── getAllDoctors.js
│   └── DoctorAvailability.js   # Slot generation logic
├── constants/
│   ├── colors.js
│   ├── config.js               # API_URL, booking range config
│   └── index.js
├── storage/
│   └── appointmentStorage.js   # AsyncStorage read/write
└── styles/
    ├── Theme.js
    └── Fonts.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (macOS) or Android Emulator

### Installation

```bash
# Clone the repo
git clone <repository-url>
cd Appointment-Booking-app-

# Install dependencies
npm install

# Start the dev server
npx expo start --clear
```

### Run on Device

```bash
Press 'i'   # iOS Simulator
Press 'a'   # Android Emulator
Press 'w'   # Web browser
# Or scan QR code with Expo Go app
```

### Verify Setup

1. Open the app — doctors should load from the API
2. Tap a doctor → view availability
3. Book a slot → confirm
4. Check "My Appointments" — booking should appear
5. Close and reopen app — booking should persist

---

## 📡 API

**Endpoint:**
```
https://raw.githubusercontent.com/suyogshiftcare/jsontest/main/available.json
```

**Response Shape:**
```json
{
  "doctors": [
    {
      "id": "1",
      "name": "Dr. John Smith",
      "specialty": "Cardiology",
      "photo": "https://...",
      "location": "NYC",
      "availableSlots": [
        { "day": "Monday", "start": "09:00", "end": "17:00" }
      ]
    }
  ]
}
```

**Data Pipeline:**
1. Fetch doctors from API
2. Parse availability windows (day + time range)
3. Generate 30-minute slots per window
4. Filter already-booked slots via AsyncStorage
5. Return available slots to UI

---

## ⏰ Slot Generation

Doctor schedules are split into 30-minute slots:

```javascript
// Input from API:
{ day: "Monday", start: "09:00", end: "17:00" }

// Generated slots:
[
  { time: "09:00-09:30", isBooked: false },
  { time: "09:30-10:00", isBooked: false },
  // ... every 30 min until 16:30-17:00
]
```

### Double-Booking Prevention

```javascript
// Prevents booking same doctor twice
isSlotBooked(doctorName) {
  return bookedAppointments.some(apt => apt.doctorName === doctorName);
}

// Prevents booking same slot twice
const isSlotAvailable = !bookedAppointments.some(apt =>
  apt.doctorName === doctor &&
  apt.appointmentDate === selectedDate &&
  apt.appointmentTime === selectedTime
);
```

---

## 📊 State Management

Global state via **React Context API**:

```javascript
// BookAppointmentContext.js exports:
{
  bookedAppointments: Array<{
    id: string,
    doctorName: string,
    doctorPhoto: string,
    specialization: string,
    location: string,
    appointmentDate: string,   // YYYY-MM-DD
    appointmentTime: string,   // HH:mm
    bookedDate: string         // ISO timestamp
  }>,
  saveAppointment: (appointment) => void,
  cancelAppointment: (id) => void,
  isSlotBooked: (doctorName: string) => boolean,
  loadBookingsFromStorage: () => void
}
```

### Persistence Flow

```
User books appointment
    → saveAppointment() called
    → AsyncStorage.setItem('bookings', JSON.stringify(bookings))
    → Persisted to device storage
    → Survives app restart
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React Native (v0.71+), Expo |
| Navigation | React Navigation v6 |
| State | Context API + Custom Hooks |
| Storage | AsyncStorage |
| Date/Time | Moment.js |
| UI | React Native Calendars, Expo Vector Icons |
| Language | JavaScript (ES6+) |
| Testing | Jest, React Native Testing Library |

---

## 💭 Why JavaScript Over TypeScript

TypeScript was recommended in the brief. JavaScript was chosen to prioritise shipping core functionality within the time constraint. The architecture is modular and ready for incremental TypeScript migration.

**Trade-offs accepted:**

| ❌ Lost | ✅ Gained |
|--------|---------|
| Compile-time type safety | Faster development iteration |
| IDE structural checks | More time on core logic & UX |
| Explicit API contracts | Cleaner, smaller codebase |

**Mitigation strategies applied:**
- Runtime validation on API responses
- Centralised utility functions (`isValidTime`, `isValidDate`)
- Defensive checks before all external data processing
- Clear component boundaries and single-responsibility design

**Migration path (if needed):**
```bash
# 1. Rename files (.js → .ts/.tsx)
# 2. Add interfaces for core data shapes
# 3. Enable strict mode in tsconfig.json
# 4. Incrementally add type annotations per module
```


## 📝 Key Design Decisions

| Decision | Reason | Trade-off |
|----------|--------|-----------|
| Context API over Redux | Simpler for this scope | Limited for large state trees |
| AsyncStorage persistence | Works offline, no server needed | Lost on app uninstall |
| Mock API layer | Easy to swap for real backend | Extra abstraction initially |
| JavaScript over TypeScript | Faster iteration in constrained time | Less type safety |
| Bottom Tab + Stack Nav | Familiar mobile pattern | Limited future screen expansion |
| Moment.js | Rich date/timezone API | ~70KB bundle overhead |

---

## ⚠️ Known Limitations

1. **No server persistence** — bookings are device-local only; no cloud sync
2. **No authentication** — all users share the same doctor pool
3. **Fixed 30-min slots** — no support for variable appointment durations
4. **No retry logic** — failed API calls show an error but don't retry
5. **No real-time updates** — no WebSocket or polling for concurrent bookings
6. **Device timezone only** — no user-selectable timezone support

---

## 🔮 Future Improvements

**Phase 1 — Foundation**
- Backend API with real database (Node.js/Express + PostgreSQL)
- User authentication (JWT/OAuth)
- Exponential backoff retry for network failures
- Redux Toolkit migration for scalable state management

**Phase 2 — Core Features**
- Push notifications (appointment reminders, cancellations)
- Doctor search and filtering (by name, specialty, location)
- Enhanced calendar UI with highlighted available dates
- Ratings and reviews system

**Phase 3 — Advanced**
- Video consultation integration (Twilio/Agora)
- Payment processing (Stripe/PayPal)
- Admin dashboard with analytics

---

## 📖 User Flow

1. **Home** — Browse all doctors; pull-to-refresh reloads list
2. **Doctor Details** — View weekly schedule; see booked slots visually marked
3. **Book Appointment** — Pick date → pick 30-min slot → confirm details
4. **My Appointments** — View all bookings; cancel to free the slot
5. **Persistence** — Close and reopen the app; all bookings remain

---

## 📄 License

MIT — free to use and modify for learning purposes.

---

**Built with 💚 for the ShiftCare Technical Challenge**
