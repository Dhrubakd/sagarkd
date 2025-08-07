// Utility functions for slug generation and management

/**
 * Generate a URL-friendly slug from a title
 * @param {string} title - The title to convert to a slug
 * @returns {string} - The generated slug
 */
export const generateSlug = (title) => {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .trim()
    // Replace special characters and spaces with hyphens
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Find an item by slug in an array of items
 * @param {Array} items - Array of items to search
 * @param {string} slug - The slug to search for
 * @returns {Object|null} - The found item or null
 */
export const findBySlug = (items, slug) => {
  if (!items || !Array.isArray(items) || !slug) return null;
  
  return items.find(item => item.slug === slug) || null;
};

/**
 * Generate a unique slug by adding a number suffix if needed
 * @param {string} baseSlug - The base slug
 * @param {Array} existingSlugs - Array of existing slugs to check against
 * @returns {string} - A unique slug
 */
export const generateUniqueSlug = (baseSlug, existingSlugs = []) => {
  let slug = baseSlug;
  let counter = 1;
  
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
};

/**
 * Validate if a slug is URL-safe
 * @param {string} slug - The slug to validate
 * @returns {boolean} - Whether the slug is valid
 */
export const isValidSlug = (slug) => {
  if (!slug || typeof slug !== 'string') return false;
  
  // Check if slug contains only allowed characters
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugPattern.test(slug);
};

/**
 * Create a breadcrumb-friendly title from a slug
 * @param {string} slug - The slug to convert
 * @returns {string} - A formatted title
 */
export const slugToTitle = (slug) => {
  if (!slug) return '';
  
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
