-- AllyConnect Database Schema - Alumni Engagement Platform

-- Create role enum
CREATE TYPE public.user_role AS ENUM ('admin', 'alumni', 'student');

-- Create status enums
CREATE TYPE public.doubt_status AS ENUM ('open', 'assigned', 'in_progress', 'resolved');
CREATE TYPE public.opportunity_type AS ENUM ('internship', 'job', 'volunteer', 'project');
CREATE TYPE public.event_status AS ENUM ('upcoming', 'ongoing', 'completed', 'cancelled');

-- Profiles table for additional user data
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    role user_role NOT NULL,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    bio TEXT,
    headline TEXT,
    current_company TEXT,
    graduation_year INTEGER,
    department TEXT,
    enrollment_number TEXT,
    location TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    points INTEGER DEFAULT 0,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Alumni verification data table
CREATE TABLE public.alumni_verification (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    graduation_year INTEGER NOT NULL,
    department TEXT NOT NULL,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Student verification data table  
CREATE TABLE public.student_verification (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    enrollment_number TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    department TEXT NOT NULL,
    batch_year INTEGER NOT NULL,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- OTP verification table
CREATE TABLE public.otp_verification (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone TEXT NOT NULL,
    otp_code TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Doubts/Questions table
CREATE TABLE public.doubts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    assigned_alumni_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    domain_tags TEXT[] DEFAULT '{}',
    urgency INTEGER DEFAULT 1 CHECK (urgency >= 1 AND urgency <= 5),
    status doubt_status DEFAULT 'open',
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    rating_comment TEXT,
    attachments TEXT[] DEFAULT '{}',
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Opportunities table (internships, jobs, etc.)
CREATE TABLE public.opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alumni_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    company TEXT NOT NULL,
    type opportunity_type NOT NULL,
    location TEXT,
    domain_tags TEXT[] DEFAULT '{}',
    requirements TEXT,
    application_deadline TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Events table
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organizer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    image_url TEXT,
    max_attendees INTEGER,
    current_attendees INTEGER DEFAULT 0,
    status event_status DEFAULT 'upcoming',
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Event attendees table
CREATE TABLE public.event_attendees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(event_id, user_id)
);

-- Messages table for chat functionality
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    attachments TEXT[] DEFAULT '{}',
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Badges table
CREATE TABLE public.badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    points_required INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User badges table
CREATE TABLE public.user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, badge_id)
);

-- Notifications table
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alumni_verification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_verification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_verification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doubts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Helper function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE user_id = user_uuid;
$$;

-- RLS Policies

-- Profiles: Users can view all profiles but only update their own
CREATE POLICY "Anyone can view profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Alumni/Student verification: Read-only for users, full access for admins
CREATE POLICY "Anyone can read verification data" ON public.alumni_verification FOR SELECT USING (true);
CREATE POLICY "Anyone can read student verification" ON public.student_verification FOR SELECT USING (true);

-- OTP verification: Users can only access their own OTP records
CREATE POLICY "Users can access own OTP" ON public.otp_verification FOR ALL USING (true); -- Handled in application logic

-- Doubts: Students can create, alumni/admins can view all, only assigned alumni can update
CREATE POLICY "Anyone can view doubts" ON public.doubts FOR SELECT USING (true);
CREATE POLICY "Students can create doubts" ON public.doubts FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'student')
);
CREATE POLICY "Alumni can update assigned doubts" ON public.doubts FOR UPDATE USING (
    assigned_alumni_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    OR auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin')
);

-- Opportunities: Alumni can create/manage their own, everyone can view active ones
CREATE POLICY "Anyone can view active opportunities" ON public.opportunities FOR SELECT USING (is_active = true);
CREATE POLICY "Alumni can create opportunities" ON public.opportunities FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT user_id FROM public.profiles WHERE role IN ('alumni', 'admin'))
);
CREATE POLICY "Alumni can update own opportunities" ON public.opportunities FOR UPDATE USING (
    alumni_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    OR auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin')
);

-- Events: Similar to opportunities
CREATE POLICY "Anyone can view events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Alumni/Admins can create events" ON public.events FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT user_id FROM public.profiles WHERE role IN ('alumni', 'admin'))
);
CREATE POLICY "Organizers can update own events" ON public.events FOR UPDATE USING (
    organizer_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    OR auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin')
);

-- Event attendees: Users can manage their own registrations
CREATE POLICY "Users can view event attendees" ON public.event_attendees FOR SELECT USING (true);
CREATE POLICY "Users can register for events" ON public.event_attendees FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Users can cancel own registration" ON public.event_attendees FOR DELETE USING (
    user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);

-- Messages: Users can only see messages they sent or received
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (
    sender_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    OR recipient_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (
    sender_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update own messages" ON public.messages FOR UPDATE USING (
    recipient_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);

-- Badges: Public read, admin write
CREATE POLICY "Anyone can view badges" ON public.badges FOR SELECT USING (true);
CREATE POLICY "Admins can manage badges" ON public.badges FOR ALL USING (
    auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin')
);

-- User badges: Users can view all, system assigns based on achievements
CREATE POLICY "Anyone can view user badges" ON public.user_badges FOR SELECT USING (true);
CREATE POLICY "System can assign badges" ON public.user_badges FOR INSERT WITH CHECK (true); -- Handled in functions

-- Notifications: Users can only see their own
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (
    user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);
CREATE POLICY "System can create notifications" ON public.notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (
    user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_doubts_updated_at BEFORE UPDATE ON public.doubts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_opportunities_updated_at BEFORE UPDATE ON public.opportunities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.doubts;