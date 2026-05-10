-- Minimal intelligence spine: event log + visitor profile snapshot.
-- Keep tables private (RLS enabled, no public policies). Server writes via service role.

create extension if not exists pgcrypto;

create table if not exists public.site_events (
  id uuid primary key default gen_random_uuid(),
  distinct_id text not null,
  event_name text not null,
  idempotency_key text,
  route_path text,
  tool_slug text,
  proof_slug text,
  result_id text,
  properties jsonb,
  created_at timestamptz not null default now()
);

create unique index if not exists site_events_idempotency_key_unique
  on public.site_events (idempotency_key)
  where idempotency_key is not null;

create index if not exists site_events_distinct_id_idx on public.site_events (distinct_id);
create index if not exists site_events_event_name_idx on public.site_events (event_name);
create index if not exists site_events_tool_slug_idx on public.site_events (tool_slug);
create index if not exists site_events_created_at_idx on public.site_events (created_at desc);

alter table public.site_events enable row level security;

create table if not exists public.visitor_profiles (
  distinct_id text primary key,
  email_normalized text,
  first_seen timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  last_route_path text,
  last_tool_slug text,
  last_tool_result_id text,
  updated_at timestamptz not null default now()
);

create index if not exists visitor_profiles_email_normalized_idx on public.visitor_profiles (email_normalized);
create index if not exists visitor_profiles_last_seen_idx on public.visitor_profiles (last_seen desc);

alter table public.visitor_profiles enable row level security;

-- Intentionally no public select or insert policies.
