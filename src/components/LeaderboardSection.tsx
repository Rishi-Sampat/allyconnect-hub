import { Trophy, Medal, Award, Star, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LeaderboardEntry {
  id: string;
  rank: number;
  previousRank: number;
  name: string;
  avatar: string;
  points: number;
  department: string;
  graduationYear: number;
  badges: number;
  contributions: {
    doubtsResolved: number;
    eventsHosted: number;
    opportunitiesPosted: number;
  };
}

const LeaderboardSection = () => {
  const leaderboard: LeaderboardEntry[] = [
    {
      id: "1",
      rank: 1,
      previousRank: 2,
      name: "Arjun Patel",
      avatar: "/api/placeholder/48/48",
      points: 3200,
      department: "Information Technology",
      graduationYear: 2017,
      badges: 12,
      contributions: {
        doubtsResolved: 45,
        eventsHosted: 8,
        opportunitiesPosted: 15
      }
    },
    {
      id: "2",
      rank: 2,
      previousRank: 1,
      name: "Priya Sharma",
      avatar: "/api/placeholder/48/48",
      points: 2450,
      department: "Computer Science",
      graduationYear: 2019,
      badges: 10,
      contributions: {
        doubtsResolved: 38,
        eventsHosted: 5,
        opportunitiesPosted: 12
      }
    },
    {
      id: "3",
      rank: 3,
      previousRank: 4,
      name: "Rohan Kumar",
      avatar: "/api/placeholder/48/48",
      points: 2180,
      department: "Mechanical Engineering",
      graduationYear: 2018,
      badges: 9,
      contributions: {
        doubtsResolved: 32,
        eventsHosted: 6,
        opportunitiesPosted: 8
      }
    },
    {
      id: "4",
      rank: 4,
      previousRank: 3,
      name: "Neha Singh",
      avatar: "/api/placeholder/48/48",
      points: 1890,
      department: "Business Administration",
      graduationYear: 2020,
      badges: 8,
      contributions: {
        doubtsResolved: 28,
        eventsHosted: 4,
        opportunitiesPosted: 10
      }
    },
    {
      id: "5",
      rank: 5,
      previousRank: 5,
      name: "Vikram Gupta",
      avatar: "/api/placeholder/48/48",
      points: 1650,
      department: "Electrical Engineering",
      graduationYear: 2019,
      badges: 7,
      contributions: {
        doubtsResolved: 25,
        eventsHosted: 3,
        opportunitiesPosted: 6
      }
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-xl font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankChange = (rank: number, previousRank: number) => {
    if (rank < previousRank) {
      return { icon: ArrowUp, color: "text-success", text: "up" };
    } else if (rank > previousRank) {
      return { icon: ArrowDown, color: "text-destructive", text: "down" };
    } else {
      return { icon: Minus, color: "text-muted-foreground", text: "same" };
    }
  };

  const getRankCardStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "ring-2 ring-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50";
      case 2:
        return "ring-2 ring-gray-200 bg-gradient-to-r from-gray-50 to-slate-50";
      case 3:
        return "ring-2 ring-amber-200 bg-gradient-to-r from-amber-50 to-orange-50";
      default:
        return "";
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Leaderboard</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrating our most active alumni who contribute to the community through mentorship, events, and opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top 3 Podium */}
          <div className="lg:col-span-2">
            <Card className="card-floating animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-primary" />
                  Top Contributors This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.slice(0, 3).map((entry, index) => {
                    const rankChange = getRankChange(entry.rank, entry.previousRank);
                    const RankChangeIcon = rankChange.icon;
                    
                    return (
                      <div
                        key={entry.id}
                        className={`flex items-center p-4 rounded-xl ${getRankCardStyle(entry.rank)} card-interactive`}
                      >
                        {/* Rank and Change */}
                        <div className="flex items-center mr-4">
                          <div className="flex flex-col items-center">
                            {getRankIcon(entry.rank)}
                            <div className={`flex items-center mt-1 ${rankChange.color}`}>
                              <RankChangeIcon className="h-3 w-3 mr-1" />
                              <span className="text-xs font-medium">
                                {Math.abs(entry.rank - entry.previousRank) || ""}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Avatar and Info */}
                        <div className="flex items-center flex-1">
                          <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src={entry.avatar} alt={entry.name} />
                            <AvatarFallback className="bg-gradient-primary text-white">
                              {entry.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold text-lg">{entry.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {entry.department} • Class of {entry.graduationYear}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-primary">
                                  {entry.points.toLocaleString()}
                                </div>
                                <p className="text-xs text-muted-foreground">points</p>
                              </div>
                            </div>
                            
                            {/* Badges and Mini Stats */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <span>{entry.contributions.doubtsResolved} doubts</span>
                                <span>{entry.contributions.eventsHosted} events</span>
                                <span>{entry.contributions.opportunitiesPosted} jobs</span>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                {entry.badges} badges
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rest of Leaderboard */}
          <div className="space-y-6">
            {/* Quick Stats Card */}
            <Card className="card-floating animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Points Earned</span>
                    <span className="font-bold text-primary">15,420</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Contributors</span>
                    <span className="font-bold text-secondary">127</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Doubts Resolved</span>
                    <span className="font-bold text-success">284</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Remaining Rankings */}
            <Card className="card-floating animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Rankings 4-5</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.slice(3, 5).map((entry) => {
                    const rankChange = getRankChange(entry.rank, entry.previousRank);
                    const RankChangeIcon = rankChange.icon;
                    
                    return (
                      <div key={entry.id} className="flex items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center mr-3">
                          <span className="text-lg font-bold text-muted-foreground mr-2">#{entry.rank}</span>
                          <RankChangeIcon className={`h-3 w-3 ${rankChange.color}`} />
                        </div>
                        
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src={entry.avatar} alt={entry.name} />
                          <AvatarFallback className="bg-gradient-primary text-white text-sm">
                            {entry.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <p className="font-medium text-sm">{entry.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {entry.points.toLocaleString()} pts
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* View Full Leaderboard */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button variant="outline" className="w-full">
                View Full Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;