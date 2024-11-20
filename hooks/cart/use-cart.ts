import { Product } from "@/types/types";
import { useState } from "react";

const useCart = () => {
  const [items, setItems] = useState<
    Array<Product & { quantity: number; total: number }>
  >([]);
  const [total, setTotal] = useState(0);

  const addToCart = (item: Product) => {
    const itemIndex = items.findIndex((i) => i.id === item.id);
    const isItemInCart = itemIndex !== -1;

    const newItems = [...items];

    if (!isItemInCart) {
      newItems.push({ ...item, quantity: 1, total: item.price * 1 });
    } else {
      newItems[itemIndex].quantity += 1;
      newItems[itemIndex].total = newItems[itemIndex].quantity * item.price;
    }

    setItems(newItems);
    setTotal(newItems.reduce((acc, i) => acc + i.total, 0));
  };

  const removeFromCart = (itemId: string) => {
    const itemIndex = items.findIndex((i) => i.id === itemId);
    const isItemInCart = itemIndex !== -1;

    if (!isItemInCart) {
      return;
    }

    const newItems = [...items];

    if (newItems[itemIndex].quantity === 1) {
      newItems.splice(itemIndex, 1);
    } else {
      newItems[itemIndex].quantity -= 1;
      newItems[itemIndex].total =
        newItems[itemIndex].quantity * newItems[itemIndex].price;
    }

    setItems(newItems);
    setTotal(newItems.reduce((acc, i) => acc + i.total, 0));
  };

  return {
    addToCart,
    removeFromCart,
    items,
    total,
  };
};

export { useCart };
