import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Initialize Sanity client
export const sanityClient = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.REACT_APP_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-10-01',
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => builder.image(source);

// GROQ Queries
export const queries = {
  // Get all products
  products: `*[_type == "product"] {
    _id,
    name,
    slug,
    price,
    originalPrice,
    description,
    category,
    inStock,
    images[] {
      asset-> {
        _id,
        url
      },
      alt
    },
    featured
  }`,

  // Get featured products
  featuredProducts: `*[_type == "product" && featured == true] {
    _id,
    name,
    slug,
    price,
    originalPrice,
    description,
    category,
    inStock,
    images[] {
      asset-> {
        _id,
        url
      },
      alt
    }
  }`,

  // Get product by slug
  productBySlug: `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    originalPrice,
    description,
    category,
    inStock,
    images[] {
      asset-> {
        _id,
        url
      },
      alt
    },
    specifications,
    details
  }`,

  // Get all collections
  collections: `*[_type == "collection"] {
    _id,
    name,
    slug,
    description,
    image {
      asset-> {
        _id,
        url
      },
      alt
    },
    products[]-> {
      _id,
      name,
      slug,
      price,
      images[] {
        asset-> {
          _id,
          url
        },
        alt
      }
    }
  }`,

  // Get collection by slug
  collectionBySlug: `*[_type == "collection" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    image {
      asset-> {
        _id,
        url
      },
      alt
    },
    products[]-> {
      _id,
      name,
      slug,
      price,
      originalPrice,
      description,
      category,
      inStock,
      images[] {
        asset-> {
          _id,
          url
        },
        alt
      }
    }
  }`
};

// Helper functions
export const fetchProducts = async () => {
  try {
    return await sanityClient.fetch(queries.products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchFeaturedProducts = async () => {
  try {
    return await sanityClient.fetch(queries.featuredProducts);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

export const fetchCollections = async () => {
  try {
    return await sanityClient.fetch(queries.collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
};

export const fetchProductBySlug = async (slug: string) => {
  try {
    return await sanityClient.fetch(queries.productBySlug, { slug });
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const fetchCollectionBySlug = async (slug: string) => {
  try {
    return await sanityClient.fetch(queries.collectionBySlug, { slug });
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
};