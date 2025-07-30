import { useEffect } from 'react';
import { gsap } from 'gsap';
import { FiX, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';

const CartSlideout = () => {
  const { 
    items, 
    isOpen, 
    toggleCart, 
    updateQuantity, 
    removeItem, 
    getTotalPrice, 
    getTotalItems 
  } = useCartStore();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  useEffect(() => {
    if (isOpen) {
      // Animate cart items when cart opens
      gsap.fromTo('.cart-item', 
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [isOpen, items.length]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
    
    // Add subtle scale animation
    gsap.to(`[data-product-id="${productId}"]`, {
      scale: 1.02,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  const handleRemoveItem = (productId: string) => {
    // Animate item removal
    gsap.to(`[data-product-id="${productId}"]`, {
      x: 100,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => removeItem(productId)
    });
  };

  if (items.length === 0 && isOpen) {
    return (
      <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent side="right" className="w-full sm:w-96">
          <SheetHeader>
            <SheetTitle className="text-left">Shopping Cart</SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col items-center justify-center h-full -mt-20">
            <FiShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground text-center mb-6">
              Add some items to get started
            </p>
            <Button onClick={toggleCart} asChild>
              <Link to="/collections">Continue Shopping</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent side="right" className="w-full sm:w-96 flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-left">
            Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            {items.map((item) => (
              <div 
                key={item.id}
                data-product-id={item.id}
                className="cart-item flex items-center space-x-4 p-4 bg-card rounded-lg border"
              >
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{item.name}</h4>
                  <p className="text-primary font-semibold">${item.price}</p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center mt-2 space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <FiMinus className="h-3 w-3" />
                    </Button>
                    
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <FiPlus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveItem(item.id)}
                  className="flex-shrink-0"
                >
                  <FiX className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Footer */}
        <div className="border-t pt-4 space-y-4">
          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-bold text-primary">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button asChild className="w-full btn-neon">
              <Link to="/checkout" onClick={toggleCart}>
                Checkout
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              asChild 
              className="w-full"
              onClick={toggleCart}
            >
              <Link to="/cart">View Cart</Link>
            </Button>
          </div>

          {/* Continue Shopping */}
          <Button 
            variant="ghost" 
            className="w-full text-muted-foreground"
            onClick={toggleCart}
            asChild
          >
            <Link to="/collections">Continue Shopping</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSlideout;