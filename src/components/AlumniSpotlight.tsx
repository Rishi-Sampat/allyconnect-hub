import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Building, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface AlumniProfile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  location: string;
  graduationYear: number;
  department: string;
  achievements: string[];
  bio: string;
  points: number;
  verified: boolean;
}

const AlumniSpotlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredAlumni: AlumniProfile[] = [
    {
      id: "1",
      name: "Priya Sharma",
      avatar: "/api/placeholder/80/80",
      title: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      graduationYear: 2019,
      department: "Computer Science",
      achievements: ["Tech Innovation Award", "Mentor of the Year", "Published 5 Research Papers"],
      bio: "Passionate about AI/ML and committed to giving back to the community through mentorship and knowledge sharing.",
      points: 2450,
      verified: true
    },
    {
      id: "2",
      name: "Arjun Patel",
      avatar: "/api/placeholder/80/80",
      title: "Co-Founder & CTO",
      company: "TechStart Inc.",
      location: "Bangalore, India",
      graduationYear: 2017,
      department: "Information Technology",
      achievements: ["Forbes 30 Under 30", "Startup Success Story", "Angel Investor"],
      bio: "Building the future of fintech while helping the next generation of entrepreneurs turn their ideas into reality.",
      points: 3200,
      verified: true
    },
    {
      id: "3",
      name: "Neha Singh",
      avatar: "/api/placeholder/80/80",
      title: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      graduationYear: 2020,
      department: "Business Administration",
      achievements: ["Product Excellence Award", "Women in Tech Leader", "50+ Mentees"],
      bio: "Driving product innovation at scale and passionate about empowering women in technology through mentorship programs.",
      points: 1890,
      verified: true
    }
  ];

  const itemsPerPage = 1;
  const totalPages = Math.ceil(featuredAlumni.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentAlumni = featuredAlumni[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Alumni <span className="bg-gradient-secondary bg-clip-text text-transparent">Spotlight</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our successful alumni who are making a difference in their fields and giving back to the community.
          </p>
        </div>

        {/* Spotlight Carousel */}
        <div className="relative max-w-4xl mx-auto mb-8">
          <Card className="card-floating overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-0">
              <div className="md:flex">
                {/* Alumni Profile Image */}
                <div className="md:w-1/3 bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex flex-col items-center justify-center">
                  <div className="relative mb-6">
                    <Avatar className="h-32 w-32 ring-4 ring-white shadow-lg">
                      <AvatarImage src={currentAlumni.avatar} alt={currentAlumni.name} />
                      <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                        {currentAlumni.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {currentAlumni.verified && (
                      <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground rounded-full p-2">
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{currentAlumni.name}</h3>
                    <p className="text-primary font-semibold mb-1">{currentAlumni.title}</p>
                    <div className="flex items-center justify-center text-muted-foreground mb-3">
                      <Building className="h-4 w-4 mr-1" />
                      <span className="text-sm">{currentAlumni.company}</span>
                    </div>
                    <div className="flex items-center justify-center text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{currentAlumni.location}</span>
                    </div>
                    
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {currentAlumni.points} points
                    </Badge>
                  </div>
                </div>

                {/* Alumni Details */}
                <div className="md:w-2/3 p-8">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Class of {currentAlumni.graduationYear}</span>
                        <p className="text-lg font-semibold text-secondary">{currentAlumni.department}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {currentAlumni.bio}
                    </p>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Key Achievements</h4>
                    <div className="space-y-2">
                      {currentAlumni.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center">
                          <Star className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-gradient-primary hover:shadow-primary flex-1">
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background shadow-md"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background shadow-md"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center space-x-2 mb-8">
          {featuredAlumni.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary scale-110' 
                  : 'bg-muted hover:bg-primary/50'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* View All Alumni Button */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button variant="outline" size="lg" className="group border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
            Explore All Alumni
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AlumniSpotlight;