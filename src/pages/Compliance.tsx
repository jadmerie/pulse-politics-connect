import { useState } from "react";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, ClipboardList, Download, FileText, AlertTriangle, TrendingUp } from "lucide-react";
import PatrioticBanner from "@/components/PatrioticBanner";
import ComplianceOverview from "@/components/ComplianceOverview";
import ComplianceQueue from "@/components/ComplianceQueue";
import AuditTrail from "@/components/AuditTrail";
import { useCompliance } from "@/hooks/useCompliance";
import { toast } from "sonner";
import capitolHero from "@/assets/capitol-hero.jpg";

const Compliance = () => {
  const {
    stats,
    pendingItems,
    auditLog,
    loading,
    approveSubmission,
    requestRevision,
    generateComplianceReport,
    refreshData
  } = useCompliance();

  const [reportLoading, setReportLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleGenerateReport = async () => {
    setReportLoading(true);
    const { data, error } = await generateComplianceReport();
    
    if (error) {
      toast.error('Failed to generate compliance report');
    } else {
      toast.success('Compliance report generated successfully');
      // In a real implementation, you would process and download the report
      console.log('Report data:', data);
    }
    setReportLoading(false);
  };

  return (
    <>
      <SEO
        title="PAC Compliance & Audit Trail - PoliPulse"
        description="Automated disclosures, immutable logs, and compliance status across campaigns. Ensure FEC compliance with comprehensive tracking and reporting."
        canonicalPath="/compliance"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Compliance Dashboard",
          description: "Political campaign compliance management system"
        }}
      />
      
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-6 py-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Compliance Dashboard</h1>
            <p className="text-xl text-muted-foreground">
              FEC compliance tracking, content review, and audit trail management
            </p>
          </header>

          <PatrioticBanner
            title="Democratic Transparency"
            subtitle="Automated compliance tracking and disclosure management that upholds the highest standards of political advertising integrity."
            image={capitolHero}
            alt="US Capitol dome representing democratic compliance and governance"
          />

          <div className="mt-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="queue" className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" />
                  Review Queue
                </TabsTrigger>
                <TabsTrigger value="audit" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Audit Trail
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Reports
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <ComplianceOverview stats={stats} loading={loading} />
                
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Button 
                        variant="outline" 
                        className="h-auto p-4 flex flex-col items-center gap-2"
                        onClick={refreshData}
                      >
                        <Shield className="w-6 h-6" />
                        <span>Refresh Status</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto p-4 flex flex-col items-center gap-2"
                        onClick={() => setActiveTab("queue")}
                      >
                        <ClipboardList className="w-6 h-6" />
                        <span>Review Queue</span>
                        {pendingItems.length > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {pendingItems.length}
                          </Badge>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto p-4 flex flex-col items-center gap-2"
                        onClick={handleGenerateReport}
                        disabled={reportLoading}
                      >
                        <Download className="w-6 h-6" />
                        <span>Generate Report</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Review Queue Tab */}
              <TabsContent value="queue">
                <ComplianceQueue
                  items={pendingItems}
                  onApprove={approveSubmission}
                  onRequestRevision={requestRevision}
                  loading={loading}
                />
              </TabsContent>

              {/* Audit Trail Tab */}
              <TabsContent value="audit">
                <AuditTrail auditLog={auditLog} loading={loading} />
              </TabsContent>

              {/* Reports Tab */}
              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Compliance Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">FEC Disclosure Report</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                              Generate comprehensive FEC compliance reports for all campaigns and expenditures.
                            </p>
                            <div className="flex gap-2">
                              <Button onClick={handleGenerateReport} disabled={reportLoading}>
                                <Download className="w-4 h-4 mr-2" />
                                Generate FEC Report
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Campaign Summary</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                              Detailed breakdown of compliance status by campaign and time period.
                            </p>
                            <div className="flex gap-2">
                              <Button variant="outline" onClick={handleGenerateReport} disabled={reportLoading}>
                                <FileText className="w-4 h-4 mr-2" />
                                Campaign Report
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {stats && stats.compliance_rate < 95 && (
                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center gap-2 text-yellow-800 text-sm font-medium mb-2">
                            <AlertTriangle className="w-4 h-4" />
                            Compliance Recommendation
                          </div>
                          <p className="text-yellow-700 text-sm">
                            Consider reviewing your compliance processes. We recommend maintaining a compliance rate above 95% 
                            for optimal regulatory standing and campaign effectiveness.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  );
};

export default Compliance;
