import { RegistrationForm } from "@/components/registration-form";

export function RegistrationSection() {
  return (
    <section
      id="register"
      className="w-full py-16 md:py-28 lg:py-36 bg-secondary/50"
    >
      <div className="container grid items-center justify-center gap-6 px-4 text-center md:px-6">
        <div className="space-y-4">
          <h2 className="font-headline text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
            Register
          </h2>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl lg:text-2xl">
            Punan ang form sa ibaba para makasali.
          </p>
        </div>
        <div className="mx-auto w-full max-w-2xl">
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}
