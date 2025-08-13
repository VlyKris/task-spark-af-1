import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Star, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-6 flex justify-between items-center"
      >
        <div className="flex items-center gap-2">
          <CheckCircle className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold tracking-tight">TodoFlow</span>
        </div>
        <AuthButton 
          trigger={<Button size="lg" className="rounded-full">Get Started</Button>}
          dashboardTrigger={<Button size="lg" className="rounded-full">Open App</Button>}
        />
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-4 py-20 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Organize Your Life,
            <br />
            <span className="text-primary">One Task at a Time</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A beautiful, minimalist todo app that helps you stay focused and productive. 
            Set priorities, track deadlines, and accomplish more every day.
          </p>
          <div className="flex gap-4 justify-center">
            <AuthButton 
              trigger={<Button size="lg" className="rounded-full px-8">Start Organizing</Button>}
              dashboardTrigger={<Button size="lg" className="rounded-full px-8">Open App</Button>}
            />
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Learn More
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Everything You Need to Stay Productive
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple yet powerful features designed to help you manage your tasks efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: CheckCircle,
              title: "Simple Task Management",
              description: "Add, edit, and complete tasks with ease. Clean interface, zero clutter."
            },
            {
              icon: Star,
              title: "Priority Levels",
              description: "Set high, medium, or low priorities to focus on what matters most."
            },
            {
              icon: Clock,
              title: "Due Dates",
              description: "Never miss a deadline with optional due date tracking and reminders."
            },
            {
              icon: Zap,
              title: "Real-time Sync",
              description: "Your todos sync instantly across all your devices. Always up to date."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-card border hover:shadow-lg transition-shadow"
            >
              <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-20 text-center"
      >
        <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Ready to Get Organized?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of users who have transformed their productivity with TodoFlow.
          </p>
          <AuthButton 
            trigger={<Button size="lg" className="rounded-full px-8">Start Your Journey</Button>}
            dashboardTrigger={<Button size="lg" className="rounded-full px-8">Continue Organizing</Button>}
          />
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-primary" />
            <span className="font-semibold">TodoFlow</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ for productivity enthusiasts
          </p>
        </div>
      </footer>
    </div>
  );
}