/*
  # Initial Schema Setup

  1. New Tables
    - academies: Base table for academy information
    - users: User accounts with role-based access
    - students: Student profiles linked to users and academies
    - classes: Class management
    - modules: Learning modules and curriculum

  2. Security
    - Enable RLS on all tables
    - Add policies for user and academy access control
*/

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- Create academies table first since it's referenced by other tables
create table if not exists academies (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  business_type text not null,
  status text not null default 'trial',
  subscription_plan text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create users table with reference to academies
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  full_name text,
  role text not null check (role in ('superadmin', 'admin', 'teacher', 'student')),
  academy_id uuid references academies(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create students table
create table if not exists students (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  academy_id uuid references academies(id),
  status text not null default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create classes table
create table if not exists classes (
  id uuid primary key default uuid_generate_v4(),
  academy_id uuid references academies(id),
  name text not null,
  teacher_id uuid references users(id),
  type text not null check (type in ('individual', 'group')),
  capacity int not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create modules table
create table if not exists modules (
  id uuid primary key default uuid_generate_v4(),
  academy_id uuid references academies(id),
  name text not null,
  description text,
  level text not null check (level in ('basic', 'intermediate', 'advanced')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table academies enable row level security;
alter table users enable row level security;
alter table students enable row level security;
alter table classes enable row level security;
alter table modules enable row level security;

-- Create security policies
create policy "Users can read own data"
  on users for select
  using (auth.uid() = id);

create policy "Superadmins can manage all academies"
  on academies for all
  using (exists (
    select 1 from users
    where users.id = auth.uid()
    and users.role = 'superadmin'
  ));

create policy "Academy admins can read own academy"
  on academies for select
  using (id in (
    select academy_id from users
    where users.id = auth.uid()
    and users.role = 'admin'
  ));