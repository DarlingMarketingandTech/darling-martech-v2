-- Soft identity: email + report (tool completion) for saved teardowns.
-- user_id reserved for future Supabase Auth linkage.

create table if not exists public.report_saves (
  id uuid primary key default gen_random_uuid(),
  tool_completion_id uuid not null references public.tool_completions (id) on delete cascade,
  email text not null,
  email_normalized text not null,
  user_id uuid,
  created_at timestamptz not null default now(),
  constraint report_saves_completion_email_unique unique (tool_completion_id, email_normalized)
);

create index if not exists report_saves_tool_completion_id_idx on public.report_saves (tool_completion_id);
create index if not exists report_saves_email_normalized_idx on public.report_saves (email_normalized);
create index if not exists report_saves_user_id_idx on public.report_saves (user_id) where user_id is not null;

alter table public.report_saves enable row level security;

-- API uses service role; no public policies until productized listing.
