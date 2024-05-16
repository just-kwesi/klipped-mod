# Admin Page for Video Management

This repository contains a Next.js application with an admin page for managing videos. Admins can accept or reject videos from this interface.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Admin Page Features](#admin-page-features)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/video-management-admin.git
   cd video-management-admin
   ```

2. Install the dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

### Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```plaintext
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Running the Application

Start the development server:

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Admin Page Features

The admin page allows you to manage the videos submitted by users. The main features include:

- Viewing a list of videos pending review.
- Accepting or rejecting videos.
- Accepted videos are marked as reviewed and approved.
- Rejected videos are marked as reviewed but not approved.
- Integration with Supabase to fetch and update video statuses.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
