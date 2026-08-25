# Akash Inter College Website

A modern, responsive school website built with Next.js 14, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Responsive Design** - Mobile-first approach with beautiful animations
- **Modern Tech Stack** - Next.js 14, Tailwind CSS, React 18
- **SEO Optimized** - Meta tags, structured data, and performance optimized
- **Interactive Components** - Animated sliders, forms, and smooth transitions
- **Accessibility** - ARIA labels, keyboard navigation, and screen reader support

## 📁 Project Structure

```
school-nextjs/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation with mobile menu
│   ├── Hero.js         # Hero section with animated slider
│   ├── Footer.js       # Footer with contact info
│   ├── Section.js      # Content section wrapper
│   ├── SEO.js          # SEO meta tags component
│   └── Slider.js       # Image slider component
├── pages/              # Next.js pages
│   ├── index.js        # Home page
│   ├── about.js        # About us page
│   ├── academics.js    # Academics information
│   ├── admissions.js   # Admissions and forms
│   ├── gallery.js      # Photo gallery
│   ├── contact.js      # Contact information
│   ├── _app.js         # App wrapper
│   └── _document.js    # Document wrapper
├── styles/             # Global styles and Tailwind CSS
│   └── globals.css     # Global CSS with Tailwind imports
├── public/             # Static assets
│   └── assets/         # Images, documents, etc.
├── tailwind.config.js  # Tailwind CSS configuration
├── next.config.js      # Next.js configuration
└── package.json        # Dependencies and scripts
```

## 🎨 Design Features

- **Color Scheme**: Blue and white theme with clean typography
- **Typography**: Google Fonts (Inter and Poppins)
- **Animations**: Smooth transitions and hover effects
- **Layout**: Responsive grid system with proper spacing
- **Components**: Modular design for easy customization

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Navigate to the project directory**
   ```bash
   cd school-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` with the following variables:

```
MONGODB_URI=
NOTIFY_EMAIL_USER=
NOTIFY_EMAIL_PASS=
```

## 📱 Pages Overview

### Home Page (`/`)
- Hero section with animated slider
- School features and highlights
- Upcoming events section
- Call-to-action for admissions

### About Us (`/about`)
- School history and story
- Vision and mission statements
- Principal's message
- Photo gallery

### Academics (`/academics`)
- Curriculum overview
- Classes offered (Primary to Senior Secondary)
- Timetable download
- Learning approach

### Admissions (`/admissions`)
- Admission process steps
- Fee structure table
- Online enquiry form with validation
- Requirements and documents

### Gallery (`/gallery`)
- Responsive image grid
- Lightbox popup for viewing
- Hover effects and animations
- Organized by categories

### Contact (`/contact`)
- Google Maps integration
- Contact information
- Contact form
- Location details

## 🎯 Customization

### Colors
Update the primary colors in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    DEFAULT: "#1d4ed8", // Main blue
    light: "#60a5fa",   // Light blue
    dark: "#1e40af"     // Dark blue
  }
}
```

### Content
- Replace placeholder text in component files
- Update contact information in Footer and Contact components
- Add your school's actual images to the `public/assets/` folder

### Images
- **Gallery**: Add images to `public/assets/gallery/`
- **Timetable**: Place PDF at `public/assets/sample-timetable.pdf`
- **Hero**: Update slider images in Hero component

## 🔧 Technical Details

### Dependencies
- **Next.js 14**: React framework with Pages Router
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React 18**: Latest React features

### Performance
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Optimized fonts and CSS
- Responsive images

### SEO
- Meta tags for each page
- Open Graph and Twitter Card support
- Structured data markup
- Semantic HTML

## 📊 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions:
- Email: akashinterclg@gmail.com
- Phone: +91 9839035500/8423594986

---

**Built with ❤️ for Akash Inter College**
"# aa" 
