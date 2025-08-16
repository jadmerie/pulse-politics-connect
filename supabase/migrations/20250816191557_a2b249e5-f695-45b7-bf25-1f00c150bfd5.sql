-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'pac_admin', 'influencer', 'admin')),
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  political_party TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create PACs table
CREATE TABLE public.pacs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  fec_id TEXT,
  admin_user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  campaign_budget DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create campaigns table
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pac_id UUID NOT NULL REFERENCES public.pacs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  budget DECIMAL(10,2) NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'cancelled')),
  target_demographics JSONB,
  compliance_notes TEXT,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create influencers table
CREATE TABLE public.influencers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  platforms JSONB NOT NULL DEFAULT '{}',
  follower_counts JSONB NOT NULL DEFAULT '{}',
  engagement_rates JSONB NOT NULL DEFAULT '{}',
  political_affiliations TEXT[],
  content_categories TEXT[],
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  rate_per_post DECIMAL(8,2),
  availability_status TEXT DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'unavailable')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create campaign_invitations table
CREATE TABLE public.campaign_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  influencer_id UUID NOT NULL REFERENCES public.influencers(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'cancelled')),
  offered_amount DECIMAL(8,2),
  message TEXT,
  terms TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(campaign_id, influencer_id)
);

-- Create content_submissions table
CREATE TABLE public.content_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  influencer_id UUID NOT NULL REFERENCES public.influencers(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('post', 'story', 'video', 'article')),
  content_url TEXT,
  caption TEXT,
  platform TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'revision_requested', 'rejected')),
  compliance_checked BOOLEAN DEFAULT FALSE,
  fec_disclosure TEXT,
  submission_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  review_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create campaign_analytics table
CREATE TABLE public.campaign_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  submission_id UUID REFERENCES public.content_submissions(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  engagement_count INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  date_recorded DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  influencer_id UUID REFERENCES public.influencers(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_type TEXT NOT NULL CHECK (payment_type IN ('campaign_funding', 'influencer_payment', 'platform_fee', 'refund')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  payment_method TEXT,
  transaction_id TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pacs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for PACs
CREATE POLICY "Users can view all PACs" ON public.pacs FOR SELECT USING (true);
CREATE POLICY "PAC admins can manage their PACs" ON public.pacs FOR ALL USING (admin_user_id = auth.uid());
CREATE POLICY "Users can create PACs" ON public.pacs FOR INSERT WITH CHECK (admin_user_id = auth.uid());

-- Create RLS policies for campaigns
CREATE POLICY "Users can view campaigns from their PACs or as invited influencers" ON public.campaigns FOR SELECT USING (
  pac_id IN (SELECT id FROM public.pacs WHERE admin_user_id = auth.uid()) OR
  id IN (SELECT campaign_id FROM public.campaign_invitations WHERE influencer_id IN (
    SELECT id FROM public.influencers WHERE user_id = auth.uid()
  ))
);
CREATE POLICY "PAC admins can manage campaigns" ON public.campaigns FOR ALL USING (
  pac_id IN (SELECT id FROM public.pacs WHERE admin_user_id = auth.uid())
);

-- Create RLS policies for influencers
CREATE POLICY "Users can view all verified influencers" ON public.influencers FOR SELECT USING (verification_status = 'verified');
CREATE POLICY "Users can manage their own influencer profile" ON public.influencers FOR ALL USING (user_id = auth.uid());

-- Create RLS policies for campaign invitations
CREATE POLICY "Users can view invitations for their campaigns or themselves" ON public.campaign_invitations FOR SELECT USING (
  campaign_id IN (
    SELECT c.id FROM public.campaigns c 
    JOIN public.pacs p ON c.pac_id = p.id 
    WHERE p.admin_user_id = auth.uid()
  ) OR
  influencer_id IN (SELECT id FROM public.influencers WHERE user_id = auth.uid())
);
CREATE POLICY "PAC admins can manage campaign invitations" ON public.campaign_invitations FOR ALL USING (
  campaign_id IN (
    SELECT c.id FROM public.campaigns c 
    JOIN public.pacs p ON c.pac_id = p.id 
    WHERE p.admin_user_id = auth.uid()
  )
);

-- Content submissions policies
CREATE POLICY "Users can view submissions for their campaigns or their own" ON public.content_submissions FOR SELECT USING (
  campaign_id IN (
    SELECT c.id FROM public.campaigns c 
    JOIN public.pacs p ON c.pac_id = p.id 
    WHERE p.admin_user_id = auth.uid()
  ) OR
  influencer_id IN (SELECT id FROM public.influencers WHERE user_id = auth.uid())
);
CREATE POLICY "Influencers can create their submissions" ON public.content_submissions FOR INSERT WITH CHECK (
  influencer_id IN (SELECT id FROM public.influencers WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update relevant submissions" ON public.content_submissions FOR UPDATE USING (
  campaign_id IN (
    SELECT c.id FROM public.campaigns c 
    JOIN public.pacs p ON c.pac_id = p.id 
    WHERE p.admin_user_id = auth.uid()
  ) OR
  influencer_id IN (SELECT id FROM public.influencers WHERE user_id = auth.uid())
);

-- Analytics policies  
CREATE POLICY "Users can view analytics for their campaigns" ON public.campaign_analytics FOR SELECT USING (
  campaign_id IN (
    SELECT c.id FROM public.campaigns c 
    JOIN public.pacs p ON c.pac_id = p.id 
    WHERE p.admin_user_id = auth.uid()
  )
);

-- Payments policies
CREATE POLICY "Users can view payments for their campaigns or payments to them" ON public.payments FOR SELECT USING (
  campaign_id IN (
    SELECT c.id FROM public.campaigns c 
    JOIN public.pacs p ON c.pac_id = p.id 
    WHERE p.admin_user_id = auth.uid()
  ) OR
  influencer_id IN (SELECT id FROM public.influencers WHERE user_id = auth.uid())
);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pacs_updated_at BEFORE UPDATE ON public.pacs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.campaigns FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_influencers_updated_at BEFORE UPDATE ON public.influencers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_campaign_invitations_updated_at BEFORE UPDATE ON public.campaign_invitations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_content_submissions_updated_at BEFORE UPDATE ON public.content_submissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();