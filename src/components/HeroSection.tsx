import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Users, Calendar, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-alumni-connect.jpg";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
}

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Connect with Alumni Network",
      description: "Bridge the gap between current students and successful alumni. Get mentorship, career guidance, and unlock opportunities.",
      image: heroImage,
      cta: "Join Network",
      ctaLink: "/signup"
    },
    {
      id: 2,
      title: "Annual Alumni Meet 2024",
      description: "Join us for the biggest networking event of the year. Connect, share experiences, and celebrate achievements together.",
      image: heroImage,
      cta: "Register Now",
      ctaLink: "/events/alumni-meet-2024"
    },
    {
      id: 3,
      title: "100+ New Opportunities Posted",
      description: "Discover internships, jobs, and collaboration opportunities posted by our thriving alumni community.",
      image: heroImage,
      cta: "Explore Jobs",
      ctaLink: "/opportunities"
    }
  ];

  const stats = [
    { icon: Users, label: "Active Alumni", value: "2,500+" },
    { icon: Calendar, label: "Events This Year", value: "150+" },
    { icon: Briefcase, label: "Opportunities", value: "300+" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full h-[600px] lg:h-[700px] overflow-hidden">
      {/* Carousel */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <Button 
                    size="lg" 
                    className="btn-hero"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    {slide.cta}
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="btn-hero-outline"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-sm z-20"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-sm z-20"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent backdrop-blur-sm border-t border-border/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="card-floating border-0 bg-white/10 backdrop-blur-md animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="flex items-center space-x-4 p-4">
                  <div className="p-3 rounded-xl bg-primary/20">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;