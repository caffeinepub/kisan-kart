import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { Sprout, ShoppingBag, Users, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sprout,
      title: 'Fresh Products',
      description: 'Direct from farmers to your doorstep',
    },
    {
      icon: ShoppingBag,
      title: 'Easy Marketplace',
      description: 'Browse and list products with ease',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Connect with local farmers and buyers',
    },
    {
      icon: TrendingUp,
      title: 'Fair Prices',
      description: 'Transparent pricing for everyone',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Welcome to <span className="text-primary">Kisan Kart</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Your trusted marketplace connecting farmers with buyers. Buy fresh produce directly from farmers or list your products to reach more customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => navigate({ to: '/browse' })}>
                  Browse Listings
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate({ to: '/create' })}>
                  Create Listing
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/kisan-kart-hero.dim_1600x600.png"
                alt="Kisan Kart Marketplace"
                className="w-full h-auto rounded-lg shadow-soft"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Kisan Kart?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're building a platform that empowers farmers and connects communities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Ready to Get Started?</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-lg">
                Join our growing community of farmers and buyers today
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate({ to: '/browse' })}
              >
                Explore Marketplace
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
