import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePenLine, ShieldCheck, Landmark, FileText, Star, Clock, ExternalLink } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import presidential1 from "@/assets/avatars/presidential-1.webp";
import presidential2 from "@/assets/avatars/presidential-2.webp";
import presidential3 from "@/assets/avatars/presidential-3.webp";
import submissionsHeaderImage from "@/assets/submissions-genz-rally-hero.webp";
import { useSubmissions } from "@/hooks/useSubmissions";
import { useToast } from "@/hooks/use-toast";

const Submissions = () => {
  const { submissions, loading, updateSubmissionStatus } = useSubmissions();
  const { toast } = useToast();

  const handleApprove = async (id: string) => {
    const { error } = await updateSubmissionStatus(id, 'approved', 'Content approved and ready for publishing');
    if (error) {
      toast({
        title: "Error",
        description: "Failed to approve submission",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Submission approved successfully"
      });
    }
  };

  const handleRequestChanges = async (id: string) => {
    const { error } = await updateSubmissionStatus(id, 'revision_requested', 'Please revise content according to compliance guidelines');
    if (error) {
      toast({
        title: "Error",
        description: "Failed to request changes",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Changes requested successfully"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'revision_requested':
        return 'text-orange-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <ShieldCheck className="w-3.5 h-3.5 mr-1" />;
      case 'pending':
        return <Clock className="w-3.5 h-3.5 mr-1" />;
      case 'revision_requested':
        return <FilePenLine className="w-3.5 h-3.5 mr-1" />;
      default:
        return <Clock className="w-3.5 h-3.5 mr-1" />;
    }
  };

  return (
    <>
      <SEO
        title="Content Submissions & Review"
        description="Approve influencer drafts, request changes, and ensure required disclosures."
        canonicalPath="/submissions"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Content Submissions",
        }}
      />
      <main className="container mx-auto px-6 pt-24 pb-16">
        <header className="mb-8 relative overflow-hidden rounded-xl border bg-gradient-patriot text-primary-foreground p-6 shadow-card shadow-red animate-fade-in">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute inset-y-0 right-0 w-1/2">
              <img
                src={submissionsHeaderImage}
                alt="Gen Z influencer speaking at a patriotic rally"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-background/40" />
              <div
                className="absolute inset-0"
                style={{ backgroundImage: "repeating-linear-gradient(45deg, hsl(var(--primary-foreground) / 0.05) 0 10px, transparent 10px 20px)" }}
              />
            </div>
          </div>
          <div className="absolute -right-6 -top-8 hidden md:block opacity-10" aria-hidden>
            <Landmark className="w-48 h-48 text-primary-foreground" />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-primary-foreground">Submissions</h1>
            <p className="text-primary-foreground/90 mt-2">Drafts awaiting review and approval.</p>
            <div className="mt-3 flex items-center gap-1 text-primary-foreground/90" aria-hidden>
              {new Array(5).fill(0).map((_, i) => (
                <Star key={i} className="w-4 h-4" />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-primary-foreground/90 text-sm">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> FEC Compliance
              </span>
              <span className="inline-flex items-center gap-2">
                <FileText className="w-4 h-4" /> Public Disclosures
              </span>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 mt-6">
          {loading ? (
            <div className="col-span-2 text-center py-8">
              <p className="text-muted-foreground">Loading submissions...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="col-span-2 text-center py-8">
              <p className="text-muted-foreground">No submissions yet.</p>
            </div>
          ) : (
            submissions.map((submission) => (
              <Card key={submission.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 ring-2 ring-background shadow-elegant">
                      <AvatarImage 
                        src={presidential1} 
                        alt={`${submission.influencers?.profiles?.display_name || 'Influencer'} headshot`} 
                        loading="lazy" 
                      />
                      <AvatarFallback className="text-xs bg-muted">
                        {submission.influencers?.profiles?.display_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold text-foreground text-sm">
                        {submission.content_type.charAt(0).toUpperCase() + submission.content_type.slice(1)} • {submission.platform.charAt(0).toUpperCase() + submission.platform.slice(1)}
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        {submission.influencers?.profiles?.display_name || 'Unknown Creator'}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium inline-flex items-center capitalize ${getStatusColor(submission.status)}`}>
                    {getStatusIcon(submission.status)}
                    {submission.status.replace('_', ' ')}
                  </span>
                </div>
                
                {submission.caption && (
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{submission.caption}</p>
                )}
                
                {submission.fec_disclosure && (
                  <p className="text-xs text-blue-600 mb-3 bg-blue-50 p-2 rounded">
                    <ShieldCheck className="w-3 h-3 inline mr-1" />
                    {submission.fec_disclosure}
                  </p>
                )}
                
                {submission.content_url && (
                  <div className="mb-3">
                    <a 
                      href={submission.content_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline inline-flex items-center"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Content
                    </a>
                  </div>
                )}
                
                {submission.status === 'pending' && (
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" onClick={() => handleApprove(submission.id)}>
                      <ShieldCheck className="w-4 h-4 mr-2" /> Approve
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => handleRequestChanges(submission.id)}>
                      <FilePenLine className="w-4 h-4 mr-2" /> Request Changes
                    </Button>
                  </div>
                )}
                
                {submission.review_notes && (
                  <div className="mt-3 p-2 bg-muted rounded text-xs">
                    <strong>Review Notes:</strong> {submission.review_notes}
                  </div>
                )}
              </Card>
            ))
          )}
        </section>
      </main>
    </>
  );
};

export default Submissions;
