-- ==============================================================================
-- Freemocks.in CBT Assessment & Mock Test Platform - PostgreSQL Schema
-- Supabase Architecture with Row Level Security (RLS)
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Exam Hierarchy
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE, 
    slug VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL, 
    duration_seconds INT NOT NULL DEFAULT 3600,
    total_marks NUMERIC(6,2) NOT NULL DEFAULT 200.0,
    total_questions INT NOT NULL DEFAULT 100,
    is_published BOOLEAN DEFAULT FALSE,
    manifest_r2_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. The Bilingual Question Bank
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_id UUID REFERENCES tests(id) ON DELETE CASCADE,
    section_name VARCHAR(100) NOT NULL, 
    order_index INT NOT NULL,
    
    -- Holds bilingual question & options: {"en": {"question": "...", "options": [...]}, "hi": {...}}
    content JSONB NOT NULL,
    
    -- Correct answer isolated for backend scoring only
    correct_option_id VARCHAR(50) NOT NULL, 
    scoring JSONB NOT NULL DEFAULT '{"positive": 2.0, "negative": -0.50}'::jsonb,
    metadata JSONB DEFAULT '{"subject": "General", "topic": "General", "difficulty": "Medium"}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Analytics & User Test Attempts
CREATE TABLE IF NOT EXISTS user_test_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    test_id UUID REFERENCES tests(id) ON DELETE CASCADE,
    score NUMERIC(6,2) DEFAULT 0.0,
    accuracy NUMERIC(5,2) DEFAULT 0.0,
    percentile NUMERIC(5,2),
    time_taken_seconds INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'in_progress', 
    responses JSONB NOT NULL DEFAULT '[]'::jsonb, 
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    submitted_at TIMESTAMP WITH TIME ZONE
);

-- 4. Row Level Security (RLS) Anti-Cheat Rules
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_test_attempts ENABLE ROW LEVEL SECURITY;

-- Categories, Exams, and Published Tests are publicly readable
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read exams" ON exams FOR SELECT USING (true);
CREATE POLICY "Public read tests" ON tests FOR SELECT USING (is_published = true);

-- Block public direct access to questions table to hide correct answers
CREATE POLICY "Deny direct public read of raw questions"
ON questions FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role');

-- Users can only access and update their own test attempts
CREATE POLICY "Users access own attempts"
ON user_test_attempts FOR ALL USING (auth.uid() = user_id);

-- Sample Seed Data
INSERT INTO categories (name, slug) VALUES 
('SSC Exams', 'ssc'),
('Railways Exams', 'railways'),
('Banking Exams', 'banking'),
('Teaching Exams', 'teaching')
ON CONFLICT (slug) DO NOTHING;
