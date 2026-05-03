# Migration Guide: Old → New Architecture

## 🔄 What Changed

Your codebase has been restructured from a flat, scattered structure to a **professional, scalable, layered architecture** following enterprise React Native patterns.

## 📊 Before vs After

### Before: Flat Structure
```
components/
  ├── AppNavigation.js
  ├── BookAppointment/
  │   └── utils/
  ├── Button/
  ├── styles/
  │   ├── Theme.js
  │   └── Fonts.js
  └── utils/
screens/
data/
BookAppointmentContext.js (at root)
App.js
```

### After: Layered, Scalable Structure
```
src/
├── components/          ← Pure UI components
├── screens/             ← Page containers
├── services/            ← Business logic
├── context/             ← State management
├── hooks/               ← Custom hooks
├── utils/               ← Helper functions
├── constants/           ← Configuration
├── styles/              ← Global theme
├── navigation/          ← Navigation setup
├── data/                ← Static data
└── index exports        ← Clean imports
App.js (root)
```

## 🎯 Key Improvements

| Aspect | Before | After |
|--------|--------|-------|
| **Imports** | `../../../components/...` | `../components` |
| **State** | Mixed in components | Separated in context/hooks |
| **Logic** | Scattered in components | Centralized in services |
| **Constants** | Hardcoded strings | `src/constants/` |
| **Styles** | Multiple Theme.js files | Unified in `src/styles/` |
| **Navigation** | In components folder | Dedicated `src/navigation/` |
| **Exports** | Direct file imports | index.js for clean exports |
| **Scalability** | Hard to maintain | Enterprise-ready |

## 📦 File Migration Map

### Context
```
Before: BookAppointmentContext.js (root)
After:  src/context/BookAppointmentContext.js
```

### Components
```
Before: components/TopDoctor.js
After:  src/components/TopDoctor/
        ├── TopDoctor.js
        └── index.js
```

### Screens
```
Before: screens/HomeScreen.js
After:  src/screens/HomeScreen.js (with updated imports)
```

### Navigation
```
Before: components/AppNavigation.js
After:  src/navigation/AppNavigation.js
```

### Utilities
```
Before: components/utils/UserImageUtils.js
After:  src/utils/imageUtils.js
```

### Styling
```
Before: components/styles/Theme.js
After:  src/styles/Theme.js
```

## 🔍 Import Changes

### Example 1: Using TopDoctor Component

**Before:**
```javascript
import TopDoctor from "../components/TopDoctor";
import { colors } from "../components/styles/Theme";
```

**After:**
```javascript
import { TopDoctor } from "../components";
import { colors } from "../styles";
```

### Example 2: Using Doctor Service

**Before:**
```javascript
import { doctorsData } from "../data/data";
import { getAvailableSlotsForDoctor } from "../data/DoctorAvailability";
```

**After:**
```javascript
import { getAllDoctors, getAvailableTimeSlotsForDoctor } from "../services";
```

### Example 3: Using Context

**Before:**
```javascript
import { useBookAppointment } from "../BookAppointmentContext";
```

**After:**
```javascript
import { useBookAppointment } from "../hooks";
```

### Example 4: Using Constants

**Before:**
```javascript
const primaryColor = "#6A5ACD";
const timeInterval = 30;
```

**After:**
```javascript
import { colors, APPOINTMENT_TIME_INTERVAL } from "../constants";
const primaryColor = colors.color_primary;
```

## 🛠️ Development Guidelines

### ✅ DO: Following New Patterns

**1. Import from index.js files**
```javascript
// Good
import { Button, CustomButton } from "../components";
import { validateAppointment } from "../services";

// Avoid
import Button from "../components/Button/Button";
import { validateAppointment } from "../services/appointmentService";
```

**2. Keep components pure**
```javascript
// Good - No business logic
const MyComponent = ({ data, onPress }) => (
  <View>
    <Text>{data.name}</Text>
    <Button onPress={onPress} />
  </View>
);

// Avoid - Business logic in component
const MyComponent = () => {
  const data = fetchFromAPI(); // No!
  const result = complexCalculation(); // No!
};
```

**3. Use services for business logic**
```javascript
// Good - Business logic in service
import { isSlotAvailable } from "../services/appointmentService";

// In component
const available = isSlotAvailable(doctorName, date, time, appointments);

// Avoid - Business logic in component
const available = !appointments.some(apt => /* ... */); // In component
```

**4. Use hooks for reusable logic**
```javascript
// Good
const { bookedAppointments, saveAppointment } = useBookAppointment();

// Avoid
const context = useContext(BookAppointmentContext); // Direct context access
```

## 🚀 Running the App

The app works exactly the same way:

```bash
npm start
# or
expo start
```

All functionality is preserved, but the code is now:
- ✅ More maintainable
- ✅ More scalable
- ✅ More testable
- ✅ More professional

## 📚 Learning the New Structure

### Quick Tour

1. **Start at** `src/navigation/AppNavigation.js` - See the navigation structure
2. **Explore** `src/screens/HomeScreen.js` - See how screens use components
3. **Check** `src/services/doctorService.js` - See business logic patterns
4. **Review** `src/context/BookAppointmentContext.js` - See state management
5. **Browse** `src/components/Button/` - See component structure

### Common Tasks

**Add a new component:**
1. Create folder `src/components/YourComponent/`
2. Create `YourComponent.js` and `index.js`
3. Export in `src/components/index.js`
4. Use: `import { YourComponent } from "../components"`

**Add a new service:**
1. Create `src/services/yourService.js`
2. Export functions
3. Export in `src/services/index.js`
4. Use: `import { yourFunction } from "../services"`

**Add a new constant:**
1. Create or update in `src/constants/`
2. Export in `src/constants/index.js`
3. Use: `import { YOUR_CONST } from "../constants"`

## ⚠️ Common Mistakes to Avoid

1. ❌ **Deep nested imports**
   ```javascript
   // Bad
   import from "../../../../../services/doctorService";
   
   // Good
   import from "../services";
   ```

2. ❌ **Business logic in components**
   ```javascript
   // Bad
   const MyScreen = () => {
     const result = complexValidation(); // In component
   };
   
   // Good
   const MyScreen = () => {
     const result = useValidation(); // In hook or service
   };
   ```

3. ❌ **Not using context properly**
   ```javascript
   // Bad
   const context = useContext(BookAppointmentContext);
   
   // Good
   const context = useBookAppointment();
   ```

4. ❌ **Mixing concerns**
   ```javascript
   // Bad - Component has styling, logic, and API calls
   const MyComponent = () => { /* everything here */ };
   
   // Good - Separate concerns
   // MyComponent.js - only UI
   // myComponentService.js - logic
   // MyComponent.style.js - styling (optional)
   ```

## 🔧 Troubleshooting

### Issue: Import not found
**Solution**: Check if file is exported in corresponding `index.js`

```javascript
// src/components/index.js should have
export { default as YourComponent } from "./YourComponent";
```

### Issue: Context not available
**Solution**: Ensure provider wraps the component in `App.js`

```javascript
// App.js should have
<BookAppointmentProvider>
  <NavigationContainer>
    <AppNavigation />
  </NavigationContainer>
</BookAppointmentProvider>
```

### Issue: Constants not updating
**Solution**: Update in `src/constants/` not in individual files

```javascript
// Update in src/constants/colors.js, not elsewhere
export const colors = {
  color_primary: "#newColor"
};
```

## 📈 Migration Checklist

- ✅ App.js updated with new imports
- ✅ All screens in src/screens/ with updated imports
- ✅ All components in src/components/ with index.js files
- ✅ Services created for business logic
- ✅ Context in src/context/
- ✅ Hooks in src/hooks/
- ✅ Constants in src/constants/
- ✅ Styles in src/styles/
- ✅ Navigation in src/navigation/
- ✅ Tests passing (if you have them)

## 💡 Tips for Success

1. **Always use index.js files** for clean imports
2. **Keep components presentational** - logic in services
3. **Centralize constants** - no magic strings
4. **Use meaningful names** - clear intent
5. **Add comments** - especially for complex logic
6. **Follow the patterns** - consistency is key
7. **Keep services pure** - no side effects
8. **Test early** - prevent bugs

## 📚 Resources

- See `ARCHITECTURE.md` for detailed architecture documentation
- Check individual service files for usage examples
- Review component folder structure as templates

## ❓ Questions?

Refer to the `ARCHITECTURE.md` file or check existing code patterns in the new structure.

---

**Happy coding!** 🚀

Your codebase is now production-ready and scalable!
