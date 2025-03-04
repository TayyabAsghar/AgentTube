"use client";

import Link from "next/link";
import { useState } from "react";
import Pricing from "@/lib/constants/pricing";
import { Button } from "@/components/ui/button";
import PricingCard from "@/components/landing-page/PricingCard";

const PricingSection = () => {
  const [billingType, setBillingType] = useState<"Monthly" | "Yearly">(
    "Monthly"
  );

  return (
    <div id="pricing">
      <div className="sm:flex sm:flex-col sm:align-center p-10">
        <div className="relative self-center bg-accent rounded-lg p-0.5 flex">
          <Button
            type="button"
            tooltip="Monthly billing"
            onClick={() => setBillingType("Monthly")}
            variant={billingType === "Monthly" ? "default" : "ghost"}
            className="ml-0.5 relative w-1/2 border rounded-md py-2 text-sm font-medium whitespace-nowrap sm:w-auto sm:px-8 border-transparent hover:border cursor-pointer"
          >
            Monthly billing
          </Button>
          <Button
            type="button"
            tooltip="Yearly billing"
            onClick={() => setBillingType("Yearly")}
            variant={billingType === "Yearly" ? "default" : "ghost"}
            className="ml-0.5 relative w-1/2 border rounded-md py-2 text-sm font-medium whitespace-nowrap sm:w-auto sm:px-8 border-transparent hover:border cursor-pointer"
          >
            Yearly billing
          </Button>
        </div>
        <div className="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
          {Pricing.map((price, index) => (
            <PricingCard key={index} {...price} billingType={billingType} />
          ))}

          <div className="border border-accent-foreground/10 rounded-lg shadow-sm divide-y divide-accent-foreground/10 bg-accent/60 hover:border-primary">
            <div className="p-6">
              <h2 className="text-xl leading-6 font-bold">Enterprise</h2>
              <p className="mt-2 text-base text-muted-foreground leading-tight">
                Still not enough for you. Connect we us to make a plan that is
                specific for your needs
              </p>

              <Button asChild tooltip="Contact Sales">
                <Link
                  href="https://calendly.com/muhammadtayyabasghar/agenttube-sales-call"
                  className="mt-8 block w-full rounded-md py-2 text-sm font-semibold text-center"
                >
                  Contact Sales
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
