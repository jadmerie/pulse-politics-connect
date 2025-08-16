import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      toast.success('Signed out successfully');
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/lovable-uploads/29753492-911c-4f06-8174-0828d933693d.png"
                alt="PoliPulse logo – political influencer marketing platform"
                className="h-8 w-auto"
                width="128"
                height="128"
                loading="eager"
              />
              <span className="sr-only">PoliPulse</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/discovery" className="story-link text-foreground hover:text-primary transition-colors font-medium">
              Discovery
            </Link>
            <Link to="/campaigns" className="story-link text-foreground hover:text-primary transition-colors font-medium">
              Campaigns
            </Link>
            <Link to="/submissions" className="story-link text-foreground hover:text-primary transition-colors font-medium">
              Submissions
            </Link>
            <Link to="/compliance" className="story-link text-foreground hover:text-primary transition-colors font-medium">
              Compliance
            </Link>
            <Link to="/analytics" className="story-link text-foreground hover:text-primary transition-colors font-medium">
              Analytics
            </Link>
            <Link to="/payments" className="story-link text-foreground hover:text-primary transition-colors font-medium">
              Payments
            </Link>
            <Link to="/profiles" className="story-link text-foreground hover:text-primary transition-colors font-medium">
              Profiles
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.email?.split('@')[0]}
                </span>
                <Button variant="ghost" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost">
                    Sign In
                  </Button>
                </Link>
                <Link to="/campaigns">
                  <Button variant="cta">
                    Launch Campaign
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link to="/discovery" className="story-link text-foreground hover:text-primary transition-colors">
                Discovery
              </Link>
              <Link to="/campaigns" className="story-link text-foreground hover:text-primary transition-colors">
                Campaigns
              </Link>
              <Link to="/submissions" className="story-link text-foreground hover:text-primary transition-colors">
                Submissions
              </Link>
              <Link to="/compliance" className="story-link text-foreground hover:text-primary transition-colors">
                Compliance
              </Link>
              <Link to="/analytics" className="story-link text-foreground hover:text-primary transition-colors">
                Analytics
              </Link>
              <Link to="/payments" className="story-link text-foreground hover:text-primary transition-colors">
                Payments
              </Link>
              <Link to="/profiles" className="story-link text-foreground hover:text-primary transition-colors">
                Profiles
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                {user ? (
                  <>
                    <div className="text-sm text-muted-foreground px-3 py-2">
                      Welcome, {user.email?.split('@')[0]}
                    </div>
                    <Button variant="ghost" className="justify-start w-full" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" className="w-full">
                      <Button variant="ghost" className="justify-start w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/campaigns" className="w-full">
                      <Button variant="professional" className="justify-start w-full">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;