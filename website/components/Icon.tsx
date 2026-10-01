import { Wrench, UtensilsCrossed, HeartPulse, Scissors, Dumbbell, Car, Briefcase, ShoppingBag, GraduationCap, PartyPopper, PawPrint, Users, BedDouble, Store } from "lucide-react";

const map = { Wrench, UtensilsCrossed, HeartPulse, Scissors, Dumbbell, Car, Briefcase, ShoppingBag, GraduationCap, PartyPopper, PawPrint, Users, BedDouble, Store } as const;

export default function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const C = map[name as keyof typeof map] ?? Store;
  return <C size={size} aria-hidden="true" />;
}
