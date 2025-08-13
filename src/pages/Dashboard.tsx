// TODO: THIS IS THE DEFAULT DASHBOARD PAGE THAT THE USER WILL SEE AFTER AUTHENTICATION. ADD MAIN FUNCTIONALITY HERE.
// This is the entry point for users who have just signed in

import { AddTodo } from "@/components/AddTodo";
import { TodoItem } from "@/components/TodoItem";
import { UserButton } from "@/components/auth/UserButton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Protected } from "@/lib/protected-page";
import { motion } from "framer-motion";
import { CheckCircle, Filter } from "lucide-react";
import { useQuery } from "convex/react";
import { useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const todos = useQuery(api.todos.list) || [];
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | "high" | "medium" | "low">("all");

  const filteredTodos = todos.filter(todo => {
    const statusMatch = filter === "all" || 
      (filter === "active" && !todo.completed) || 
      (filter === "completed" && todo.completed);
    
    const priorityMatch = priorityFilter === "all" || todo.priority === priorityFilter;
    
    return statusMatch && priorityMatch;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <Protected>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10"
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">TodoFlow</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {user?.name || user?.email}
                </p>
              </div>
            </div>
            <UserButton />
          </div>
        </motion.header>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="p-4 rounded-lg bg-card border text-center">
              <div className="text-2xl font-bold text-primary">{totalCount}</div>
              <div className="text-sm text-muted-foreground">Total Tasks</div>
            </div>
            <div className="p-4 rounded-lg bg-card border text-center">
              <div className="text-2xl font-bold text-green-500">{completedCount}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="p-4 rounded-lg bg-card border text-center">
              <div className="text-2xl font-bold text-blue-500">{totalCount - completedCount}</div>
              <div className="text-sm text-muted-foreground">Remaining</div>
            </div>
          </motion.div>

          {/* Add Todo */}
          <div className="mb-6">
            <AddTodo />
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4 mb-6 items-center"
          >
            <Filter className="h-4 w-4 text-muted-foreground" />
            
            <Select value={filter} onValueChange={(value: "all" | "active" | "completed") => setFilter(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={(value: "all" | "high" | "medium" | "low") => setPriorityFilter(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Todo List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            {filteredTodos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 text-muted-foreground"
              >
                <CheckCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">
                  {filter === "completed" ? "No completed tasks yet" : 
                   filter === "active" ? "No active tasks" : 
                   "No todos yet"}
                </p>
                <p className="text-sm">
                  {filter === "all" && "Add your first todo above to get started!"}
                </p>
              </motion.div>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem key={todo._id} todo={todo} />
              ))
            )}
          </motion.div>
        </div>
      </div>
    </Protected>
  );
}