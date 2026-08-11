-- Esquema DDL para la gestión de Mi Gym
-- Tablas: gym_memberships, gym_clients, gym_attendance

-- 1. Crear tabla gym_memberships (Membresías)
CREATE TABLE IF NOT EXISTS public.gym_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    duration_days INTEGER NOT NULL DEFAULT 30,
    owner_id UUID NOT NULL REFERENCES public.wisbe_users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Crear tabla gym_clients (Clientes)
CREATE TABLE IF NOT EXISTS public.gym_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    membership_id UUID REFERENCES public.gym_memberships(id) ON DELETE SET NULL,
    membership_status TEXT NOT NULL DEFAULT 'Inactiva', -- 'Activa', 'Inactiva', 'Vencida'
    membership_start DATE,
    membership_end DATE,
    nfc_uid TEXT UNIQUE, -- UID único de la botella NFC vinculada al socio
    owner_id UUID NOT NULL REFERENCES public.wisbe_users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Crear tabla gym_attendance (Asistencias)
CREATE TABLE IF NOT EXISTS public.gym_attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.gym_clients(id) ON DELETE CASCADE,
    attended_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    status TEXT NOT NULL DEFAULT 'Permitido', -- 'Permitido', 'Denegado'
    notes TEXT,
    owner_id UUID NOT NULL REFERENCES public.wisbe_users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.gym_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_attendance ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si las hay (evitar duplicados)
DROP POLICY IF EXISTS "Admin has full access on gym_memberships" ON public.gym_memberships;
DROP POLICY IF EXISTS "Owners have full access on their own gym_memberships" ON public.gym_memberships;
DROP POLICY IF EXISTS "Admin has full access on gym_clients" ON public.gym_clients;
DROP POLICY IF EXISTS "Owners have full access on their own gym_clients" ON public.gym_clients;
DROP POLICY IF EXISTS "Admin has full access on gym_attendance" ON public.gym_attendance;
DROP POLICY IF EXISTS "Owners have full access on their own gym_attendance" ON public.gym_attendance;

-- 4. Políticas para gym_memberships
CREATE POLICY "Admin has full access on gym_memberships" ON public.gym_memberships
FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.wisbe_users
        WHERE public.wisbe_users.id = auth.uid() AND public.wisbe_users.role = 'gym-admin'
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.wisbe_users
        WHERE public.wisbe_users.id = auth.uid() AND public.wisbe_users.role = 'gym-admin'
    )
);

CREATE POLICY "Owners have full access on their own gym_memberships" ON public.gym_memberships
FOR ALL TO authenticated
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

-- 5. Políticas para gym_clients
CREATE POLICY "Admin has full access on gym_clients" ON public.gym_clients
FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.wisbe_users
        WHERE public.wisbe_users.id = auth.uid() AND public.wisbe_users.role = 'gym-admin'
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.wisbe_users
        WHERE public.wisbe_users.id = auth.uid() AND public.wisbe_users.role = 'gym-admin'
    )
);

CREATE POLICY "Owners have full access on their own gym_clients" ON public.gym_clients
FOR ALL TO authenticated
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

-- 6. Políticas para gym_attendance
CREATE POLICY "Admin has full access on gym_attendance" ON public.gym_attendance
FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.wisbe_users
        WHERE public.wisbe_users.id = auth.uid() AND public.wisbe_users.role = 'gym-admin'
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.wisbe_users
        WHERE public.wisbe_users.id = auth.uid() AND public.wisbe_users.role = 'gym-admin'
    )
);

CREATE POLICY "Owners have full access on their own gym_attendance" ON public.gym_attendance
FOR ALL TO authenticated
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());
