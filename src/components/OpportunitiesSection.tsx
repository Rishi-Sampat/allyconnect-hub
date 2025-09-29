import { Briefcase, MapPin, Clock, Building, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: 'internship' | 'job' | 'volunteer' | 'project';
  location: string;
  description: string;
  requirements: string[];
  postedBy: {
    name: string;
    avatar: string;
    title: string;
  };
  postedDate: string;
  deadline: string;
  applicants: number;
  featured: boolean;
}

const OpportunitiesSection = () => {
  const opportunities: Opportunity[] = [
    {
      id: "1",
      title: "Software Engineering Intern",
      company: "TechCorp Solutions",
      type: "internship",
      location: "San Francisco, CA",
      description: "Join our engineering team to work on cutting-edge web applications using React, Node.js, and cloud technologies.",
      requirements: ["React.js", "Node.js", "JavaScript", "Git"],
      postedBy: {
        name: "Sarah Chen",
        avatar: "/api/placeholder/40/40",
        title: "Senior Software Engineer"
      },
      postedDate: "2 days ago",
      deadline: "Nov 30, 2024",
      applicants: 23,
      featured: true
    },
    {
      id: "2",
      title: "Product Manager",
      company: "InnovateLabs",
      type: "job",
      location: "New York, NY",
      description: "Lead product strategy and development for our AI-powered analytics platform. Work with cross-functional teams.",
      requirements: ["Product Management", "Analytics", "Agile", "SQL"],
      postedBy: {
        name: "Michael Rodriguez",
        avatar: "/api/placeholder/40/40",
        title: "VP of Product"
      },
      postedDate: "5 days ago",
      deadline: "Dec 15, 2024",
      applicants: 45,
      featured: false
    },
    {
      id: "3",
      title: "Research Assistant",
      company: "University Research Lab",
      type: "volunteer",
      location: "Remote",
      description: "Contribute to groundbreaking research in machine learning and artificial intelligence. Flexible hours, great learning opportunity.",
      requirements: ["Python", "Machine Learning", "Research", "Statistics"],
      postedBy: {
        name: "Dr. Emily Watson",
        avatar: "/api/placeholder/40/40",
        title: "Research Director"
      },
      postedDate: "1 week ago",
      deadline: "Dec 1, 2024",
      applicants: 12,
      featured: true
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'internship': return 'bg-primary text-primary-foreground';
      case 'job': return 'bg-secondary text-secondary-foreground';
      case 'volunteer': return 'bg-success text-success-foreground';
      case 'project': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'internship': return <Clock className="h-4 w-4" />;
      case 'job': return <Briefcase className="h-4 w-4" />;
      case 'volunteer': return <Star className="h-4 w-4" />;
      case 'project': return <Building className="h-4 w-4" />;
      default: return <Briefcase className="h-4 w-4" />;
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest <span className="bg-gradient-secondary bg-clip-text text-transparent">Opportunities</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover internships, jobs, and projects posted by our alumni network. Your next career step starts here.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {opportunities.map((opportunity, index) => (
            <Card 
              key={opportunity.id} 
              className={`card-floating card-interactive group animate-fade-in-up ${
                opportunity.featured ? 'ring-2 ring-secondary/20' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getTypeColor(opportunity.type)} flex items-center space-x-1`}>
                      {getTypeIcon(opportunity.type)}
                      <span className="capitalize">{opportunity.type}</span>
                    </Badge>
                    {opportunity.featured && (
                      <Badge variant="outline" className="border-secondary text-secondary">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>{opportunity.postedDate}</div>
                    <div className="text-xs">{opportunity.applicants} applicants</div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-secondary transition-colors">
                    {opportunity.title}
                  </h3>
                  
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Building className="h-4 w-4 mr-2" />
                    <span className="font-medium">{opportunity.company}</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{opportunity.location}</span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {opportunity.description}
                  </p>
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {opportunity.requirements.slice(0, 3).map((req, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                    {opportunity.requirements.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{opportunity.requirements.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Posted By */}
                <div className="flex items-center space-x-3 mb-4 p-3 bg-muted/50 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={opportunity.postedBy.avatar} alt={opportunity.postedBy.name} />
                    <AvatarFallback className="bg-gradient-primary text-white text-xs">
                      {opportunity.postedBy.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {opportunity.postedBy.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {opportunity.postedBy.title}
                    </p>
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-muted-foreground">Deadline:</span>
                  <span className="font-medium text-destructive">{opportunity.deadline}</span>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button className="w-full bg-gradient-secondary hover:shadow-primary group">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button variant="outline" size="lg" className="group">
            View All Opportunities
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;