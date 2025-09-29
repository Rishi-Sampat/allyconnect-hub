import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  featured: boolean;
}

const EventsSection = () => {
  const events: Event[] = [
    {
      id: "1",
      title: "Tech Career Panel Discussion",
      description: "Join successful alumni from top tech companies as they share insights about building a career in technology.",
      date: "Nov 15, 2024",
      time: "6:00 PM",
      location: "Main Auditorium",
      attendees: 85,
      maxAttendees: 150,
      image: "/api/placeholder/400/200",
      status: "upcoming",
      featured: true
    },
    {
      id: "2",
      title: "Startup Funding Workshop",
      description: "Learn about venture capital, angel investing, and funding strategies from successful entrepreneurs.",
      date: "Nov 22, 2024",
      time: "2:00 PM",
      location: "Innovation Hub",
      attendees: 42,
      maxAttendees: 80,
      image: "/api/placeholder/400/200",
      status: "upcoming",
      featured: false
    },
    {
      id: "3",
      title: "Alumni Networking Mixer",
      description: "Casual networking event with refreshments, perfect for making new connections and catching up.",
      date: "Nov 28, 2024",
      time: "7:00 PM",
      location: "Student Center",
      attendees: 120,
      maxAttendees: 200,
      image: "/api/placeholder/400/200",
      status: "upcoming",
      featured: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-primary text-primary-foreground';
      case 'ongoing': return 'bg-secondary text-secondary-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAttendancePercentage = (attendees: number, maxAttendees: number) => {
    return Math.round((attendees / maxAttendees) * 100);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Upcoming <span className="bg-gradient-primary bg-clip-text text-transparent">Events</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our vibrant community events designed to foster connections, share knowledge, and celebrate achievements.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event, index) => (
            <Card 
              key={event.id} 
              className={`card-floating card-interactive group animate-fade-in-up ${
                event.featured ? 'ring-2 ring-primary/20' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Event Image */}
              <div className="relative overflow-hidden rounded-t-2xl">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Calendar className="h-12 w-12 text-primary/60" />
                </div>
                {event.featured && (
                  <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                    Featured
                  </Badge>
                )}
                <Badge className={`absolute top-3 right-3 ${getStatusColor(event.status)}`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </Badge>
              </div>

              <CardContent className="p-6">
                {/* Event Title */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>

                {/* Event Description */}
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                    <Clock className="h-4 w-4 ml-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.attendees}/{event.maxAttendees} attendees</span>
                    <span className="ml-2 text-xs text-primary font-medium">
                      ({getAttendancePercentage(event.attendees, event.maxAttendees)}% full)
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${getAttendancePercentage(event.attendees, event.maxAttendees)}%` }}
                  />
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button 
                  className="w-full bg-gradient-primary hover:shadow-primary group"
                  disabled={event.attendees >= event.maxAttendees}
                >
                  {event.attendees >= event.maxAttendees ? 'Event Full' : 'Register Now'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button variant="outline" size="lg" className="group">
            View All Events
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;