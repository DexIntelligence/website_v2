# Dex Intelligence Website

## ⚠️ Known Issues

### Netlify Environment Variables Not Loading
**Critical Issue**: Netlify is not properly injecting `VITE_*` environment variables into the build process, breaking client authentication.

**Current Workaround**: Using `.env.production` file committed to the repository.

**See `CLAUDE.md` for**:
- Full details about the issue
- List of affected variables
- Debug tools available at `/client/debug`
- Instructions for proper fix

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

### further notes:
## Deployment (Netlify)

When deploying this React (Vite) single-page app to Netlify, you need to configure client-side routing so that deep links (e.g., `/about`, `/products`) load correctly instead of returning a 404.

To do this, create a file named `_redirects` in the `public/` folder with the following content:

/* /index.html 200

This tells Netlify to serve `index.html` for all routes, allowing React Router to handle navigation in the browser.
