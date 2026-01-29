import MobileFrame from "@/components/MobileFrame";
import { CartProvider } from "@/context/CartContext";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <MobileFrame>
        {children}
      </MobileFrame>
    </CartProvider>
  );
}
