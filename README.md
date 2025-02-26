# Artly

![Artly Logo](https://via.placeholder.com/150x50?text=Artly)

## Overview

Artly is a modern platform connecting artists with clients seeking custom artwork. The platform streamlines the commission process, provides secure transactions, and fosters a community of creative professionals.

## Features

### For Artists
- **Portfolio Management**: Showcase your work, manage commission slots, and set availability status
- **Commission Workflow**: Track projects through different stages (sketch, lineart, coloring)
- **Business Tools**: Analytics dashboard to track earnings, client demographics, and portfolio performance

### For Clients
- **Artist Discovery**: Find the perfect artist with advanced search filters by style, price range, and availability
- **Commission Process**: Easy submission of project briefs with reference images, budget specifications, and timeline discussion
- **Account Features**: Track commission history, save favorite artists, and leave reviews

## Technology Stack

- **Frontend**: React.js with TypeScript
- **Styling**: TailwindCSS with custom theming
- **Icons**: Lucide React
- **State Management**: React Context API
- **Authentication**: JWT with secure HTTP-only cookies
- **Form Handling**: React Hook Form with validation
- **API Requests**: Axios
- **Template Engine**: Blade (Laravel)
- **Frontend Build**: Vite
- **Testing**: Jest and React Testing Library

## Project Structure

```
artly/
├── app/                   # Server-side code
├── resources/             # Frontend source code
│   ├── js/                # React components
│   ├── css/               # Global styles
│   └── views/             # Blade templates
├── public/                # Static assets
├── routes/                # API routes
├── tests/                 # Test files
└── docs/                  # Documentation
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- PHP (v8.1+)
- Composer
- MySQL (v8.0+)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/artly.git
   cd artly
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Install JavaScript dependencies:
   ```bash
   npm install
   ```

4. Copy the environment file and update with your settings:
   ```bash
   cp .env.example .env
   ```

5. Generate application key:
   ```bash
   php artisan key:generate
   ```

6. Run database migrations:
   ```bash
   php artisan migrate --seed
   ```

7. Start the development server:
   ```bash
   php artisan serve
   ```

8. In a separate terminal, compile and watch frontend assets:
   ```bash
   npm run dev
   ```

## Development Guidelines

### Code Style

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use TypeScript for all new components
- Write meaningful component and function names
- Comment complex logic

### Component Guidelines

- Create reusable components in the `resources/js/Components` directory
- Use Tailwind utility classes for styling
- Make components responsive by default
- Implement accessibility standards (WCAG 2.1)

### Design System

Our design system is based on Tailwind with custom extensions:

- **Colors**: 
  - Primary: `purple-600` (`#9333EA`)
  - Secondary: `indigo-700` (`#4338CA`)
  - Neutral: Gray scale from 50 to 900
  - Success: `green-500` (`#10B981`)
  - Warning: `yellow-400` (`#FBBF24`)
  - Error: `red-500` (`#EF4444`)

- **Typography**:
  - Headings: Inter (sans-serif)
  - Body: Inter (sans-serif)
  - Sizes: Follow Tailwind's scale (xs, sm, base, lg, xl, 2xl, etc.)

- **Spacing**:
  - Use Tailwind's spacing scale (m-1, p-2, etc.)
  - Maintain consistent spacing between components

- **Shadows**:
  - Use Tailwind's shadow utilities (shadow-sm, shadow, shadow-lg, etc.)

- **Border Radius**:
  - Buttons and inputs: `rounded-lg`
  - Cards and larger elements: `rounded-xl` or `rounded-2xl`
  - Pills and tags: `rounded-full`

### Icons

Use Lucide React for icons. Example:

```jsx
import { Search, Palette, Users } from 'lucide-react';

// In component
<Search className="w-5 h-5 text-gray-400" />
```

### Form Fields

Form fields should include:
- Appropriate label
- Placeholder text
- Validation messages
- Focus states with `ring-2 ring-purple-500`

### Links & Routing

For internal links in development, use hash placeholders to prevent Laravel trying to render dynamic routes:

```jsx
<a href="#" className="text-purple-600 hover:text-purple-500">Link Text</a>
```

For production, replace with the appropriate route:

```jsx
<a href="{{ route('artists.show', ['id' => 1]) }}" className="text-purple-600 hover:text-purple-500">Link Text</a>
```

## Testing

### Unit Tests

Run unit tests:

```bash
npm run test
```

### End-to-End Tests

Run end-to-end tests:

```bash
npm run test:e2e
```

## Deployment

Our CI/CD pipeline uses GitHub Actions to deploy to our staging and production environments:

1. Push to `develop` branch triggers deployment to staging
2. Push to `main` branch triggers deployment to production

## Contributing

1. Create a new branch from `develop`
2. Make your changes
3. Submit a pull request to `develop`
4. Ensure all tests pass before merging

## License

© 2025 Artly. All rights reserved.