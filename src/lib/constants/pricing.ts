type PricingType = {
  name: string;
  quote: string;
  popular?: boolean;
  features: string[];
  yearlyPrice: number;
  monthlyPrice: number;
};

const Pricing: PricingType[] = [
  {
    name: "Free",
    yearlyPrice: 0,
    monthlyPrice: 0,
    quote: "For new makers who want to fine-tune and test an idea.",
    features: ["5 Transcriptions per month", "5 Video Analyses per month"],
  },
  {
    name: "Starter",
    popular: true,
    monthlyPrice: 9.99,
    yearlyPrice: 97,
    quote:
      "For uses with multiple ideas who want to efficiently test and refine them.",
    features: [
      "Script Generation",
      "50 Title Generations per month",
      "50 Transcriptions per month",
      "50 Video Analyses per month",
    ],
  },
  {
    name: "Creator",
    monthlyPrice: 29.99,
    yearlyPrice: 269,
    quote: "For productive shippers who want to work more efficiently.",
    features: [
      "Script Generation",
      "300 Title Generations per month",
      "300 Transcriptions per month",
      "300 Video Analyses per month",
    ],
  },
];

export default Pricing;
