// Centralized API Configuration for Local & Render.com Cloud Deployment
const getBackendBaseUrl = () => {
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:8080/shopping-cart';
  }
  return '';
};

export const API_BASE_URL = getBackendBaseUrl();

export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const base = getBackendBaseUrl();
  if (base) {
    // If base doesn't have /shopping-cart and endpoint needs it, handle gracefully
    if (!base.endsWith('/shopping-cart') && !cleanEndpoint.startsWith('/shopping-cart')) {
      return `${base}/shopping-cart${cleanEndpoint}`;
    }
    return `${base}${cleanEndpoint}`;
  }
  return cleanEndpoint;
};

export default API_BASE_URL;
