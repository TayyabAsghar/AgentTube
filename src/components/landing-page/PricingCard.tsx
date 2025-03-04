import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  name: string;
  quote: string;
  popular?: boolean;
  features: string[];
  yearlyPrice: number;
  monthlyPrice: number;
  billingType: "Monthly" | "Yearly";
}

const PricingCard = ({
  name,
  quote,
  popular,
  features,
  billingType,
  yearlyPrice,
  monthlyPrice,
}: PricingCardProps) => {
  return (
    <div className="border border-accent-foreground/10 rounded-lg shadow-sm divide-y divide-accent-foreground/10 bg-accent/60 hover:border-primary">
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl leading-6 font-bold">{name}</h2>
          {popular && (
            <span className="px-3 py-1 text-sm ring bg-purple-400 rounded-full">
              Popular
            </span>
          )}
        </div>
        <p className="mt-2 text-base text-muted-foreground leading-tight">
          {quote}
        </p>
        <p className="mt-8">
          <span className="text-4xl font-bold tracking-tighter">
            ${billingType === "Monthly" ? monthlyPrice : yearlyPrice}
          </span>

          <span className="text-base font-medium text-slate-500">
            {billingType === "Monthly" ? "/mo" : "/yr"}
          </span>
        </p>

        <Button asChild>
          <Link
            href="/manage-plan"
            className="mt-8 block w-full rounded-md py-2 text-sm font-semibold text-center"
          >
            Join as a {name}
          </Link>
        </Button>
      </div>
      <div className="pt-6 pb-8 px-6">
        <h3 className="text-sm font-bold tracking-wide uppercase">
          What&apos;s included
        </h3>
        <ul role="list" className="mt-4 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex space-x-3 items-center">
              <Check className="size-4 text-primary" />
              <span className="text-base text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
