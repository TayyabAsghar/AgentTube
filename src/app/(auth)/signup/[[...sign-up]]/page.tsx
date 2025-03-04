"use client";

import * as Clerk from "@clerk/elements/common";
import AgentPulse from "@/components/AgentPulse";
import * as SignUp from "@clerk/elements/sign-up";
import GoogleLogo from "@/components/icons/GoogleIcon";

const SignUpPage = () => {
  return (
    <div className="grid h-full w-full flex-grow items-center px-4 sm:justify-center">
      <SignUp.Root fallback={<AgentPulse />}>
        <SignUp.Step
          name="start"
          className="w-full space-y-6 rounded-2xl backdrop-blur px-4 py-10 shadow-md ring-1 ring-accent sm:w-96 sm:px-8"
        >
          <header className="flex items-center justify-center flex-col">
            <AgentPulse size="small" color="blue" />
            <h1 className="mt-3 text-xl font-medium tracking-tight">
              Create your account
            </h1>
          </header>

          <Clerk.GlobalError className="block text-sm text-red-400" />
          <div className="space-y-2">
            <Clerk.Connection
              name="google"
              className="flex w-full items-center justify-center gap-x-3 rounded-md bg-gradient-to-b from-white to-neutral-50 px-2 py-1.5 
              text-sm font-medium text-neutral-950 shadow outline-none ring-1 ring-black/5 hover:to-neutral-100 cursor-pointer
              focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:text-neutral-950/60"
            >
              <GoogleLogo />
              Continue with Google
            </Clerk.Connection>
          </div>

          <div className="flex w-full items-center justify-center gap-2">
            <div className="w-full border-b border-foreground/30 pt-1"></div>
            <div className="opacity-30">or</div>
            <div className="w-full border-b border-foreground/30 pt-1"></div>
          </div>

          <div className="space-y-4">
            <Clerk.Field name="identifier" className="space-y-2">
              <Clerk.Label className="text-sm font-medium">
                Email address
              </Clerk.Label>

              <Clerk.Input
                required
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-md bg-fore px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 
                focus:ring-[1.5px] focus:ring-primary data-[invalid]:ring-red-400 dark:bg-white text-black"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>

            <Clerk.Field name="password" className="space-y-2">
              <Clerk.Label className="text-sm  font-medium">
                Password
              </Clerk.Label>
              <Clerk.Input
                required
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-md bg-fore px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 
                focus:ring-[1.5px] focus:ring-primary data-[invalid]:ring-red-400 dark:bg-white text-black"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
          </div>

          <SignUp.Action
            submit
            className="w-full rounded-md bg-primary px-3.5 py-1.5 text-center text-sm font-medium text-accent shadow outline-none cursor-pointer"
          >
            Sign Up
          </SignUp.Action>
          <p className="text-center text-sm text-zinc-500">
            Already have a account?{" "}
            <Clerk.Link
              navigate="sign-in"
              className="font-medium underline-offset-4 outline-none hover:underline text-accent-foreground"
            >
              Sign in
            </Clerk.Link>
          </p>
        </SignUp.Step>
      </SignUp.Root>
    </div>
  );
};

export default SignUpPage;
