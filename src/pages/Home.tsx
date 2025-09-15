import { useState } from "react";
import { School, Calendar, Users, MapPin, BookOpen, CheckCircle, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Login from "./Login";

interface HomeProps {
  onLogin: (user: { name: string; role: string; email: string }) => void;
}

const features = [
  {
    icon: Calendar,
    title: "Smart Timetable Generation",
    description: "Automatically generate optimized schedules with conflict resolution and constraint satisfaction."
  },
  {
    icon: Users,
    title: "Faculty Management",
    description: "Manage faculty workloads, availability, and specializations for better resource allocation."
  },
  {
    icon: MapPin,
    title: "Room Optimization",
    description: "Maximize room utilization and prevent double bookings with intelligent space management."
  },
  {
    icon: BookOpen,
    title: "Course Planning",
    description: "Organize subjects, batches, and academic programs with comprehensive data management."
  },
  {
    icon: CheckCircle,
    title: "Approval Workflow",
    description: "Streamlined approval process with version control and collaborative review features."
  }
];

const stats = [
  { label: "Educational Institutions", value: "500+" },
  { label: "Timetables Generated", value: "10K+" },
  { label: "Faculty Members", value: "25K+" },
  { label: "Student Satisfaction", value: "98%" }
];

export default function Home({ onLogin }: HomeProps) {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <Login onLogin={onLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
              <School className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">EduSchedule</h1>
              <p className="text-xs text-muted-foreground">Smart Timetable Management</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => setShowLogin(true)}>
              Sign In
            </Button>
            <Button onClick={() => setShowLogin(true)} className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <Badge variant="secondary" className="px-4 py-2">
            <Play className="mr-2 h-4 w-4" />
            Now Supporting AI-Powered Scheduling
          </Badge>
          
          <h1 className="text-5xl font-bold text-foreground leading-tight">
            Smart Timetable Management for
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Modern Education</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Automate your academic scheduling with intelligent conflict resolution, resource optimization, 
            and collaborative approval workflows. Built for universities, colleges, and schools.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg"
            >
              Start for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/30 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything You Need for Academic Scheduling
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From simple course planning to complex multi-campus scheduling, EduSchedule provides 
            all the tools you need to manage your academic timetables efficiently.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="kpi-card hover:scale-[1.02] transition-transform">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to Transform Your Academic Scheduling?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join hundreds of educational institutions already using EduSchedule to create 
              perfect timetables with zero conflicts and maximum efficiency.
            </p>
            <Button 
              size="lg" 
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <School className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-semibold text-foreground">EduSchedule</div>
                <div className="text-xs text-muted-foreground">Smart Timetable Management</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 EduSchedule. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}