"use client";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Subscribed to the newsletter!");
      setEmail("");
    }
  };

  return (
    <section className="py-10 container mx-auto px-4">
      <div className="glass-card rounded-2xl p-6 md:p-10 text-center max-w-3xl mx-auto">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Mail size={24} className="text-primary" />
        </div>
        
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-3 text-foreground">
          Never miss a chapter!
        </h2>
        <p className="text-muted-foreground text-sm max-w-prose mx-auto mb-6">
          Subscribe to our newsletter to get notified about the latest manga releases, exclusive events, and premium content directly in your inbox.
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input 
            type="email" 
            required 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 bg-background/50 border-border flex-1" 
          />
          <Button type="submit" className="h-11 rounded-lg px-6">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
