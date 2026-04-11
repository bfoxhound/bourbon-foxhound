-- BourbonFoxhound Database Schema
-- Run this in Supabase SQL Editor

-- Enable Row Level Security
alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;

-- Users table (extends Supabase auth.users)
create table if not exists public.users (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  username text unique not null,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.users enable row level security;

create policy "Users can view all profiles"
  on public.users for select
  using (true);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- Bourbons table
create table if not exists public.bourbons (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  distillery text,
  proof decimal,
  age integer,
  mashbill text,
  msrp decimal,
  image_url text,
  description text,
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.bourbons enable row level security;

create policy "Bourbons are viewable by everyone"
  on public.bourbons for select
  using (true);

create policy "Only agents can insert bourbons"
  on public.bourbons for insert
  with check (false); -- Will be handled by service role

-- Reviews table
create table if not exists public.reviews (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  bourbon_id uuid references public.bourbons(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  notes text,
  location_name text,
  location_lat decimal,
  location_lng decimal,
  photo_urls text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.reviews enable row level security;

create policy "Reviews are viewable by everyone"
  on public.reviews for select
  using (true);

create policy "Users can create own reviews"
  on public.reviews for insert
  with check (auth.uid() = user_id);

create policy "Users can update own reviews"
  on public.reviews for update
  using (auth.uid() = user_id);

create policy "Users can delete own reviews"
  on public.reviews for delete
  using (auth.uid() = user_id);

-- Locations table (for map)
create table if not exists public.locations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  address text,
  lat decimal not null,
  lng decimal not null,
  type text check (type in ('bar', 'store', 'distillery', 'restaurant', 'other')) default 'other',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.locations enable row level security;

create policy "Locations are viewable by everyone"
  on public.locations for select
  using (true);

-- Follows table
create table if not exists public.follows (
  id uuid default gen_random_uuid() primary key,
  follower_id uuid references public.users(id) on delete cascade not null,
  following_id uuid references public.users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(follower_id, following_id)
);

alter table public.follows enable row level security;

create policy "Follows are viewable by everyone"
  on public.follows for select
  using (true);

create policy "Users can follow others"
  on public.follows for insert
  with check (auth.uid() = follower_id);

create policy "Users can unfollow"
  on public.follows for delete
  using (auth.uid() = follower_id);

-- Indexes for performance
create index idx_reviews_user_id on public.reviews(user_id);
create index idx_reviews_bourbon_id on public.reviews(bourbon_id);
create index idx_reviews_location on public.reviews(location_lat, location_lng);
create index idx_bourbons_name on public.bourbons(name);
create index idx_locations_coords on public.locations(lat, lng);

-- Functions
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, username)
  values (new.id, new.email, split_part(new.email, '@', 1));
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create user profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
