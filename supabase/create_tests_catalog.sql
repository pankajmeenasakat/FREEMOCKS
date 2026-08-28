-- ============================================================
-- RUN THIS IN: Supabase Dashboard → SQL Editor → New Query
-- Then click the green RUN button ▶️
-- ============================================================

CREATE TABLE IF NOT EXISTS tests_catalog (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(300) NOT NULL,
    exam_name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'SSC Exams',
    total_tests INT NOT NULL DEFAULT 0,
    free_tests INT NOT NULL DEFAULT 0,
    duration_seconds INT NOT NULL DEFAULT 3600,
    total_marks NUMERIC(6,2) NOT NULL DEFAULT 200.0,
    total_questions INT NOT NULL DEFAULT 100,
    languages TEXT[] NOT NULL DEFAULT '{"English","Hindi"}',
    features TEXT[] NOT NULL DEFAULT '{}',
    logo VARCHAR(20) NOT NULL DEFAULT '🏛️',
    user_count VARCHAR(50) DEFAULT '0 Users',
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE tests_catalog ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'tests_catalog'
    AND policyname = 'Public read published tests_catalog'
  ) THEN
    CREATE POLICY "Public read published tests_catalog"
      ON tests_catalog FOR SELECT USING (is_published = true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'tests_catalog'
    AND policyname = 'Service role full access tests_catalog'
  ) THEN
    CREATE POLICY "Service role full access tests_catalog"
      ON tests_catalog FOR ALL
      USING (auth.jwt() ->> 'role' = 'service_role');
  END IF;
END $$;

-- Confirm it worked:
SELECT 'tests_catalog table created successfully ✅' AS status;
