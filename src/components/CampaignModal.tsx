import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolderPlus } from "lucide-react";
import { usePACs } from "@/hooks/usePACs";
import { useToast } from "@/hooks/use-toast";

interface CampaignModalProps {
  onCreateCampaign: (data: {
    name: string;
    pac_id: string;
    description?: string;
    budget?: number;
  }) => Promise<{ error: Error | null }>;
}

const CampaignModal = ({ onCreateCampaign }: CampaignModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    pac_id: '',
    description: '',
    budget: ''
  });
  const { pacs } = usePACs();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.pac_id) return;

    setLoading(true);
    const { error } = await onCreateCampaign({
      name: formData.name,
      pac_id: formData.pac_id,
      description: formData.description || undefined,
      budget: formData.budget ? Number(formData.budget) : undefined
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Campaign created successfully"
      });
      setFormData({ name: '', pac_id: '', description: '', budget: '' });
      setOpen(false);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="professional">
          <FolderPlus className="w-4 h-4 mr-2" /> New Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter campaign name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pac">Select PAC</Label>
            <Select value={formData.pac_id} onValueChange={(value) => setFormData({ ...formData, pac_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a PAC" />
              </SelectTrigger>
              <SelectContent>
                {pacs.map((pac) => (
                  <SelectItem key={pac.id} value={pac.id}>
                    {pac.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Campaign description (optional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget ($)</Label>
            <Input
              id="budget"
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="Campaign budget"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !formData.name || !formData.pac_id}>
              {loading ? 'Creating...' : 'Create Campaign'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignModal;