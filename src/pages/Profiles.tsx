import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, BadgeCheck, Edit, Save, X } from "lucide-react";
import PatrioticBanner from "@/components/PatrioticBanner";
import votersHero from "@/assets/voters-hero.jpg";
import { useProfile } from "@/hooks/useProfile";
import { usePACs } from "@/hooks/usePACs";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Profiles = () => {
  const { profile, loading: profileLoading, updateProfile } = useProfile();
  const { pacs, loading: pacsLoading } = usePACs();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    location: '',
    politicalParty: ''
  });

  const handleEdit = () => {
    if (profile) {
      setFormData({
        displayName: profile.display_name || '',
        bio: profile.bio || '',
        location: profile.location || '',
        politicalParty: profile.political_party || ''
      });
    }
    setEditing(true);
  };

  const handleSave = async () => {
    const { error } = await updateProfile({
      display_name: formData.displayName,
      bio: formData.bio,
      location: formData.location,
      political_party: formData.politicalParty
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
      setEditing(false);
    }
  };

  return (
    <>
      <SEO
        title="Verified Profiles"
        description="Browse verified influencer and organization profiles with trust signals."
        canonicalPath="/profiles"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Profiles",
        }}
      />
      <main className="container mx-auto px-6 pt-24 pb-16">
        <header className="mb-8 animate-fade-in">
          <h1 className="font-brand text-3xl font-bold text-foreground">Profiles</h1>
          <p className="text-muted-foreground mt-2">Manage your profile and view organizations.</p>
        </header>

        <PatrioticBanner
          title="Voices of Democracy"
          subtitle="Verified creators who champion civic engagement with integrity and authenticity."
          image={votersHero}
          alt="Diverse group of American voters representing democratic participation"
        />

        <section className="grid gap-6 lg:grid-cols-2 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Users className="w-5 h-5" />
                Your Profile
              </h2>
              {!editing && (
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>

            {profileLoading ? (
              <p className="text-muted-foreground">Loading profile...</p>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 ring-2 ring-background shadow-elegant">
                    <AvatarImage src={profile?.avatar_url || ''} alt="Profile picture" />
                    <AvatarFallback className="bg-muted text-lg">
                      {profile?.display_name?.charAt(0) || profile?.email?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    {editing ? (
                      <Input
                        value={formData.displayName}
                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                        placeholder="Display name"
                        className="mb-2"
                      />
                    ) : (
                      <h3 className="font-semibold text-foreground">
                        {profile?.display_name || 'No name set'}
                      </h3>
                    )}
                    <p className="text-sm text-muted-foreground">{profile?.email}</p>
                  </div>
                </div>

                {editing && (
                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleSave} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setEditing(false)} size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-4">
              <BadgeCheck className="w-5 h-5" />
              Your Organizations
            </h2>

            {pacsLoading ? (
              <p className="text-muted-foreground">Loading organizations...</p>
            ) : pacs.length === 0 ? (
              <p className="text-muted-foreground">No organizations yet.</p>
            ) : (
              <div className="space-y-3">
                {pacs.map((pac) => (
                  <Card key={pac.id} className="p-4 border-muted">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {pac.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-foreground">{pac.name}</h3>
                        {pac.description && (
                          <p className="text-sm text-muted-foreground">{pac.description}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </section>
      </main>
    </>
  );
};

export default Profiles;
