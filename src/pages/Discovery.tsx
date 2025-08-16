import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileAvatar from "@/components/ProfileAvatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Users, TrendingUp, Instagram, Youtube, Twitter } from "lucide-react";
import { useInfluencers } from "@/hooks/useInfluencers";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useState } from "react";
import { toast } from "sonner";

const Discovery = () => {
  const { influencers, loading, inviteInfluencer } = useInfluencers();
  const { campaigns } = useCampaigns();
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [partyFilter, setPartyFilter] = useState('all');

  const filteredInfluencers = influencers.filter(influencer => {
    const matchesSearch = !searchQuery || 
      influencer.profiles?.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      influencer.profiles?.bio?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = !locationFilter || 
      influencer.profiles?.location?.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesParty = !partyFilter || partyFilter === 'all' || 
      influencer.profiles?.political_party?.toLowerCase() === partyFilter.toLowerCase();

    return matchesSearch && matchesLocation && matchesParty;
  });

  const handleInvite = async (influencerId: string, influencerName: string) => {
    if (!selectedCampaign) {
      toast.error('Please select a campaign first');
      return;
    }

    const { error } = await inviteInfluencer(selectedCampaign, influencerId, 500);
    
    if (error) {
      toast.error('Failed to send invitation');
    } else {
      toast.success(`Invitation sent to ${influencerName}!`);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const partyStyles: Record<string, string> = {
    'Republican': 'bg-red-100 text-red-800 border-red-300',
    'Democrat': 'bg-blue-100 text-blue-800 border-blue-300',
    'Independent': 'bg-green-100 text-green-800 border-green-300',
    'Libertarian': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-lg">Loading influencers...</div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Discovery | PoliPulse - Find Political Influencers"
        description="Discover and connect with verified political micro-influencers. Filter by location, demographics, platform, and political affiliation."
        canonicalPath="/discovery"
      />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Discover Influencers</h1>
            <p className="text-xl text-muted-foreground">
              Connect with verified political micro-influencers to amplify your message
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Campaign</label>
              <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                <SelectTrigger>
                  <SelectValue placeholder="Select campaign" />
                </SelectTrigger>
                <SelectContent>
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <Input
                placeholder="Search by name or bio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Input
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Party</label>
              <Select value={partyFilter} onValueChange={setPartyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All parties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All parties</SelectItem>
                  <SelectItem value="republican">Republican</SelectItem>
                  <SelectItem value="democrat">Democrat</SelectItem>
                  <SelectItem value="independent">Independent</SelectItem>
                  <SelectItem value="libertarian">Libertarian</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setLocationFilter('');
                  setPartyFilter('all');
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInfluencers.map((influencer) => (
              <Card key={influencer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <ProfileAvatar 
                      avatarUrl={influencer.profiles?.avatar_url}
                      displayName={influencer.profiles?.display_name}
                      size="md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">
                        {influencer.profiles?.display_name || 'Unknown'}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {influencer.profiles?.location || 'Location not specified'}
                      </div>
                      {influencer.profiles?.political_party && (
                        <Badge 
                          variant="outline" 
                          className={`mt-2 ${partyStyles[influencer.profiles.political_party] || 'bg-gray-100 text-gray-800'}`}
                        >
                          {influencer.profiles.political_party}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {influencer.profiles?.bio || 'No bio available'}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold">
                        {Object.values(influencer.follower_counts || {}).reduce((sum: number, count: any) => sum + (Number(count) || 0), 0).toLocaleString()}
                      </div>
                      <div className="text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">
                         {(() => {
                           const rates = Object.values(influencer.engagement_rates || {});
                           const numericRates = rates.map(rate => Number(rate) || 0);
                           const sum = numericRates.reduce((acc, rate) => acc + rate, 0);
                           const count = Math.max(numericRates.length, 1);
                           return Math.round((sum / count) * 10) / 10;
                         })()}%
                      </div>
                      <div className="text-muted-foreground">Engagement</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {Object.keys(influencer.platforms || {}).map((platform) => (
                      <div key={platform} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
                        {getPlatformIcon(platform)}
                        {platform}
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => handleInvite(influencer.id, influencer.profiles?.display_name || 'Unknown')}
                    disabled={!selectedCampaign}
                  >
                    Invite
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredInfluencers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No influencers found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Discovery;