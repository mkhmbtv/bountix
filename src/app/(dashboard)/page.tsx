import Link from "next/link";
import { Button } from "@/components/ui/button";
import { features, steps } from "@/constants";
import { dashboardPath } from "@/paths";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent pb-24 pt-40 text-foreground">
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h1 className="mb-6 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-7xl">
              Manage Your Projects with Ease
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-muted-foreground md:text-2xl">
              Create, track, and resolve tickets effortlessly with our powerful
              management board
            </p>
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
              asChild
            >
              <Link href={dashboardPath()}>Get Started Now</Link>
            </Button>
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-[url('/grid.svg')] bg-[length:40px_40px] bg-repeat"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-background py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-16 text-center text-4xl font-bold">
              Powerful Features
            </h2>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon, title, description }, index) => (
                <FeatureCard
                  key={index}
                  icon={icon}
                  title={title}
                  description={description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-muted/30 py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-16 text-center text-4xl font-bold">
              How It Works
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 transform bg-primary/20"></div>
              {steps.map((item, index) => (
                <div
                  key={item.step}
                  className={`mb-12 flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                  >
                    <h3 className="mb-2 text-2xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="flex w-2/12 justify-center">
                    <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-8 text-4xl font-bold leading-tight md:text-5xl">
              Ready to Streamline Your Project Management?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-muted-foreground">
              Join thousands of teams already using our ticket management system
              to boost productivity and collaboration
            </p>
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
              asChild
            >
              <Link href={dashboardPath()}>Sign Up Now</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg bg-card p-8 text-card-foreground shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="mb-6 text-primary">{icon}</div>
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
