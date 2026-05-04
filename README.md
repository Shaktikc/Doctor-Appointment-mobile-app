Here's a condensed version of the README:

---

# 🏥 Doctor Appointment Booking App — ShiftCare Technical Challenge

A React Native + Expo app for booking 30-minute doctor appointments with offline persistence.

---

## ✨ Features

- Browse active doctors from ShiftCare API
- View & select 30-minute availability slots by day
- Book, confirm, and cancel appointments
- Double-booking prevention (per doctor & per slot)
- Offline persistence via AsyncStorage (survives app restart)

---

## 🏗️ Project Structure

```
src/
├── screens/          # HomeScreen, DoctorDetails, BookAppointment, MyAppointment
├── components/       # CustomButton, TimeSlot, TopDoctor, ErrorHandler
├── navigation/       # Stack & Tab navigation (AppNavigation.js)
├── context/          # BookAppointmentContext (global booking state)
├── hooks/            # useBookAppointment (appointment logic)
├── mockApi/          # API fetch + 30-min slot generation
├── constants/        # colors, config (API_URL, booking range)
├── storage/          # AsyncStorage persistence layer
└── styles/           # Theme, Fonts
```

---

## 📡 API

**Endpoint**: `https://raw.githubusercontent.com/suyogshiftcare/jsontest/main/available.json`

Returns a list of doctors with `id`, `name`, `specialty`, `photo`, `location`, and `availableSlots` (day + start/end times). The app converts these into 30-minute slots.

---

## 🚀 Getting Started

```bash
npm install
npx expo start --clear
# Press i (iOS), a (Android), or w (Web)
```

**Prerequisites**: Node.js v18+, Expo CLI

---

## 📊 State & Persistence

Uses **Context API** for global state. Bookings are saved to AsyncStorage on every change and reloaded on app start.

```
saveAppointment() → AsyncStorage.setItem('bookings', ...) → persists across restarts
```

**Booking shape**: `{ id, doctorName, doctorPhoto, specialization, location, appointmentDate, appointmentTime, bookedDate }`

---

## ⏰ Slot Generation

Doctor schedules (e.g. Mon 09:00–17:00) are split into 30-minute slots. Booked slots are filtered from AsyncStorage before display.

**Double-booking prevention**:
- One appointment per doctor per user
- One booking per doctor + date + time combination

---

## 🧪 Testing

```bash
npm test              # Run all tests
npm test -- --coverage
```

Coverage includes slot generation edge cases, booking/cancellation flows, API error scenarios, and AsyncStorage failure handling.

---

## ⚠️ Known Limitations

| Limitation | Fix |
|---|---|
| Local-only storage (no cloud sync) | Backend API + database |
| No user authentication | JWT/OAuth auth system |
| Fixed 30-min slot duration | Configurable duration |
| No retry on API failure | Exponential backoff |
| No real-time slot updates | WebSockets or polling |

---

## 💭 JavaScript vs TypeScript

JavaScript was chosen to prioritise shipping core functionality within the time constraint. The codebase is structured for straightforward TypeScript migration (modular files, clear data flows). Trade-offs include no compile-time type checking and increased reliance on runtime validation.

**Mitigation**: API response validation, centralised utility functions, and defensive checks are implemented throughout.

---

## 🔮 Future Roadmap

**Phase 1**: Backend API, user auth, Redux Toolkit, retry logic  
**Phase 2**: Push notifications, doctor search/filter, ratings  
**Phase 3**: Video consultations, payments, admin dashboard

---

*Built for the ShiftCare Technical Challenge*