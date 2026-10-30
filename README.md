# RideNow Frontend

## Requirements
- Node.js (LTS recommended)
- npm

## Run
1. Extract/open this folder in VS Code.
2. Open a terminal in this folder.
3. Run `npm install`
4. Run `npm run dev`
5. Open the localhost URL shown by Vite.

## Production build
Run `npm run build`.

## Notes
- This is a frontend prototype. It does not provide live fleet inventory, online booking, accounts, or payments.
- Vehicle cards and details use sample images, vehicle information, prices, locations, and availability statuses for demonstration only. They are dummy values and do not describe RideNow's real fleet or live inventory.
- Availability is not checked online. Search validates the form but does not fetch live availability or create a booking.
- Search validates the form but does not yet fetch live availability.
- Vehicle cards open detail pages containing additional sample vehicle and rental information.
- The home page hero starts with a "Select Location" prompt and the default scenic image. Choosing Vijayapura, Bengaluru, Mysuru, or Hubballi displays that city and its auto-advancing attraction photo slider; use the arrows, dots, or pause button to control it. Clicking the RideNow logo resets the page to the default image and "Select Location" prompt.
- The About Us section presents RideNow's prototype status and product roadmap without implying that live rental operations are available.
- Hero photos are curated Wikimedia Commons images. Their creator, license, and source metadata are retained in `src/data/locations.js`; no photo-credit line is shown over the hero. These highlights are trip inspiration, not live directions or travel-time estimates.
- Sign-in and sign-up forms demonstrate required fields and browser validation only. They do not create accounts, send, or store credentials.
- Vehicle details include a Book Now demo flow through sign-in/sign-up, rider and rental details, an itemized estimate, simulated payment outcomes, confirmation, and My Bookings. The booking draft is kept in the current browser tab; sample booking history is stored locally in the browser and can be cleared from My Bookings. Credentials and payment details are not stored.
- Booking prices, fees, estimated taxes, deposits, payment results, and booking references in this flow are mock data only. No account, availability check, vehicle reservation, payment, notification, or real booking is created. Replace `src/services/mockBookingService.js` with API integration when the backend and payment gateway are ready.
- Support links open focused contact, FAQ, or policy pages; each link displays only its selected topic. Use the page-level back arrow, browser Back, or a deliberate rightward swipe starting just inside the left screen edge on an inner page to return to the previous page. The contact form validates and displays a notice; it does not transmit or store messages. The support email link opens the user's email application.
- Rental, cancellation, privacy, and terms content is prototype guidance, not a finalized contract. Unconfigured fees, deposits, eligibility rules, and legal/business details are explicitly identified as pending.
- Newsletter submission remains a placeholder until connected to a backend.
- External landmark, vehicle, and manufacturer images and Google Fonts require internet access.
