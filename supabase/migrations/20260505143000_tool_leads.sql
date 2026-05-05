-- General-purpose tool lead capture. Keep this separate from any simulator-specific schema.

create extension if not exists pgcrypto;

create table if not exists public.tool_leads (
  id uuid primary key default gen_random_uuid(),
  tool_slug text not null,
  email text not null,
  name text,
  company text,
  role text,
  result_summary jsonb,
  source text not null default 'site',
  distinct_id text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text,
  page_path text,
  created_at timestamptz not null default now()
);

create index if not exists tool_leads_tool_slug_idx on public.tool_leads (tool_slug);
create index if not exists tool_leads_email_idx on public.tool_leads (email);
create index if not exists tool_leads_created_at_idx on public.tool_leads (created_at desc);

alter table public.tool_leads enable row level security;

-- Intentionally no public select or insert policies.
-- Writes happen server-side with the service role only.
