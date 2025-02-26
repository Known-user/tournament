# Gaming Tournament Platform Frontend

This repository contains the frontend implementation for the Gaming Tournament Platform. The frontend is built using Next.js with TypeScript and styled with Tailwind CSS. It integrates with a Spring Boot backend to fetch and display tournament data.

## Features

- **Tournament Dashboard**: Displays a list of gaming tournaments with filters for "Upcoming" and "Completed" statuses.
- **Tournament Details**: View detailed information about each tournament.
- **Create Tournament**: Form to create new tournaments.
- **Responsive Design**: Ensures the application looks good on various screen sizes.
- **Search Functionality**: Allows users to search for tournaments by title or game name.

## Tech Stack

- **Frontend**: Next.js (TypeScript), Tailwind CSS
- **State Management**: React's useState and useEffect hooks
- **API Integration**: Fetch API to communicate with the backend
- **Animations**: Framer Motion for smooth animations

## Setup Instructions

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn package manager

### Steps to Run the Frontend

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory of the project with the following content:
   ```
   NEXT_PUBLIC_API_URL=https://game-backend-0o62.onrender.com/api
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the Application**:
   Open your browser and navigate to `https://tournament-45zp.onrender.com/` to view the application.

## API Endpoints

The frontend communicates with the following backend API endpoints:
- **GET /api/tournaments**: Fetch all tournaments.
- **GET /api/tournaments/{id}**: Fetch a single tournament by ID.
- **GET /api/tournaments/search?query={query}**: Search tournaments by title or game name.
- **POST /api/tournaments**: Create a new tournament.

## Screenshots

- **Dashboard**:![Screenshot 2025-02-26 195604](https://github.com/user-attachments/assets/64933a6f-e8ec-4c91-b452-d7b7c5b3d12a)
- **Filtered Views**:![Screenshot 2025-02-26 195611](https://github.com/user-attachments/assets/6ea3b667-5a02-428b-b263-ff2d1d53c9bf)
- **Tournament Details**:![Screenshot 2025-02-26 195706](https://github.com/user-attachments/assets/b9e72d77-146e-44af-857a-157df439018c)

- **Create Tournament**:![Screenshot 2025-02-26 195625](https://github.com/user-attachments/assets/55da03b6-83dd-43ab-969a-9f0c46e26e90)
- **Search Tournament**:![Screenshot 2025-02-26 195647](https://github.com/user-attachments/assets/394ef6a3-b151-4438-b284-e79e59f586cc)

- **Phone View**:
- ![Screenshot 2025-02-26 195728](https://github.com/user-attachments/assets/aabbb156-deb7-4e0f-b86a-c47a453febf9)
![Screenshot 2025-02-26 195743](https://github.com/user-attachments/assets/98668013-d6dc-46da-9972-316031848776)
![Screenshot 2025-02-26 195759](https://github.com/user-attachments/assets/46b93fcd-4819-4295-ae12-f081758960ae)

## Deployment

The frontend can be deployed on platforms like Vercel. Ensure that the environment variables are correctly set for the deployment environment.

## Bonus

- The application is deployed and accessible at [Live URL](https://tournament-45zp.onrender.com/).

## Assumptions and Trade-offs

- Due to the 2-day timeline, the focus was on delivering a polished frontend experience with essential features.
- Error handling and validation are basic and can be enhanced for production use.
- The backend integration is assumed to be functional, with the frontend consuming the necessary API endpoints.

---

This README provides a comprehensive guide to setting up and running the frontend for the Gaming Tournament Platform. For any questions or further details, feel free to reach out.
