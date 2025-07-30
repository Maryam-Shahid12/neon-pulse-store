import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiShoppingBag } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { fetchFeaturedProducts, urlFor } from '@/lib/sanity';
import Layout from '@/components/layout/Layout';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Mock data for development (replace with Sanity data)
const mockFeaturedProducts = [
  {
    _id: '1',
    name: 'Neon Glow Sneakers',
    slug: { current: 'neon-glow-sneakers' },
    price: 199,
    originalPrice: 249,
    description: 'Futuristic sneakers with LED accents',
    inStock: true,
    images: [{ asset: { url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500' } }]
  },
  {
    _id: '2',
    name: 'Cyber Jacket',
    slug: { current: 'cyber-jacket' },
    price: 299,
    originalPrice: 399,
    description: 'High-tech jacket with smart fabric',
    inStock: true,
    images: [{ asset: { url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500' } }]
  },
  {
    _id: '3',
    name: 'Holographic Bag',
    slug: { current: 'holographic-bag' },
    price: 149,
    description: 'Shimmering holographic messenger bag',
    inStock: true,
    images: [{ asset: { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500' } }]
  }
];

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState(mockFeaturedProducts);
  const { addItem } = useCartStore();

  useEffect(() => {
    // Hero animations
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-title', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo('.hero-subtitle', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo('.hero-cta', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );

    // Floating animation for hero elements
    gsap.to('.hero-float', {
      y: -20,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    // Product cards animation on scroll
    gsap.fromTo('.product-card', 
      { y: 60, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.products-section',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Stats counter animation
    gsap.fromTo('.stat-number',
      { textContent: 0 },
      {
        textContent: (i, target) => target.getAttribute('data-value'),
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: '.stats-section',
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Load featured products from Sanity
    const loadProducts = async () => {
      try {
        const products = await fetchFeaturedProducts();
        if (products && products.length > 0) {
          setFeaturedProducts(products);
        }
      } catch (error) {
        console.error('Error loading featured products:', error);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: any) => {
    const cartProduct = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.asset?.url || '/placeholder.svg',
      description: product.description,
      slug: product.slug?.current
    };
    
    addItem(cartProduct);
    
    // Add success animation
    gsap.to('.cart-success', {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              The Future of
              <span className="block text-gradient hero-float">Fashion</span>
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover cutting-edge designs that blend technology with style. 
              Where innovation meets elegance.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="btn-neon text-lg px-8 py-6">
                <Link to="/collections">
                  Shop Collections
                  <FiArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 btn-ghost-neon">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="stat-number text-4xl font-bold text-primary mb-2" data-value="10000">0</div>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <div className="stat-number text-4xl font-bold text-primary mb-2" data-value="500">0</div>
              <p className="text-muted-foreground">Products</p>
            </div>
            <div>
              <div className="stat-number text-4xl font-bold text-primary mb-2" data-value="50">0</div>
              <p className="text-muted-foreground">Countries</p>
            </div>
            <div>
              <div className="stat-number text-4xl font-bold text-primary mb-2" data-value="99">0</div>
              <p className="text-muted-foreground">% Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked items that represent the pinnacle of design and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div 
                key={product._id}
                className="product-card group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.images?.[0]?.asset?.url || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Sale
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button 
                      size="sm" 
                      className="btn-neon"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FiShoppingBag className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 bg-card rounded-b-lg">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">(4.9)</span>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <Link 
                      to={`/products/${product.slug?.current || product._id}`}
                      className="text-primary hover:text-primary-glow transition-colors font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild className="btn-ghost-neon">
              <Link to="/collections">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of satisfied customers who have already discovered 
            the perfect blend of style and innovation.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
            <Link to="/collections">
              Start Shopping
              <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
