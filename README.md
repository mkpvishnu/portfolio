# Portfolio Website

A modern, responsive portfolio website built with React showcasing professional experience, skills, and projects.

## 🚀 Features

- **Dynamic GitHub Integration**: Automatically fetches and displays your latest repositories
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Navigation**: Smooth animations and intuitive user experience
- **Skills Showcase**: Organized display of technical skills and technologies
- **Experience Timeline**: Detailed work experience with expandable project details
- **Project Details**: Rich project information with README integration
- **Professional Contact**: Easy-to-find contact information and social links

## 🛠 Technology Stack

- **Frontend**: React 18.2.0
- **Styling**: CSS3 with modern animations and responsive design
- **API Integration**: Axios for GitHub API calls
- **Build Tool**: Create React App
- **Fonts**: Google Fonts (Poppins, Roboto)

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mkpvishnu/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your GitHub username**
   - Open `src/App.js`
   - Update the `GITHUB_USERNAME` constant with your GitHub username

4. **Update portfolio data**
   - Edit `src/portfolioData.json` with your personal information
   - Update education, experience, skills, and contact details

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header/                 # Main navigation header
│   ├── ContentDisplay/         # Content area manager
│   ├── BranchNavigation/       # Navigation menu
│   ├── ExperienceDisplay/      # Work experience section
│   ├── SkillsDisplay/          # Skills and technologies
│   ├── ProjectsList/           # GitHub projects grid
│   ├── ProjectDetail/          # Individual project details
│   └── LoadingSpinner/         # Loading states
├── portfolioData.json          # Static portfolio content
├── App.js                      # Main application component
└── index.js                    # Application entry point
```

## 🎨 Customization

### Personal Information
Update `src/portfolioData.json` with your details:
- Education background
- Work experience and projects
- Skills and technologies
- Contact information

### Styling
- Global styles: `src/index.css`
- Component-specific styles: Each component has its own CSS file
- Color scheme: Modify CSS custom properties for consistent theming

### GitHub Integration
The portfolio automatically fetches your public repositories. To customize:
- Update `GITHUB_USERNAME` in `src/App.js`
- Modify repository filtering logic in `fetchGitHubRepos()`

## 🔧 Recent Improvements

### ✅ Completed
- Fixed typos in education section
- Added comprehensive skills showcase
- Updated meta tags for better SEO
- Improved responsive design
- Enhanced navigation UX
- Fixed missing asset references

### 🚧 In Progress
- Better project categorization
- Enhanced mobile experience
- Performance optimizations

### 📋 Planned Features
- Dark/light theme toggle
- Project filtering and search
- Contact form integration
- Blog section
- Analytics integration
- PWA features

## 🐛 Known Issues

1. **Company logos**: Logo paths may need adjustment for production deployment
2. **Project descriptions**: Some GitHub repositories lack detailed descriptions
3. **Mobile navigation**: Could benefit from improved touch interactions

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Configure environment variables if needed

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically build and deploy on push

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json
3. Run: `npm run deploy`

## 📈 Performance Tips

- Optimize images in the `public` and `data` directories
- Consider lazy loading for project images
- Implement service worker for caching
- Use React.memo for expensive components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: mkpvishnu@gmail.com
- **LinkedIn**: [linkedin.com/in/mkpvishnu](https://www.linkedin.com/in/mkpvishnu/)
- **GitHub**: [github.com/mkpvishnu](https://github.com/mkpvishnu)

---

Built with ❤️ using React 