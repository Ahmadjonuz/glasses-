# VisionVogue - Online Ko'zoynak Do'koni

Zamonaviy va sifatli ko'zoynaklar uchun onlayn do'kon.
![image](https://github.com/user-attachments/assets/007c6b34-631b-4af3-8262-8c3c2419a417)
![image](https://github.com/user-attachments/assets/6a066742-d099-4e0c-9bba-0b6c60900ecc)



## Texnologiyalar

- [Next.js 14](https://nextjs.org/) - React frameworki
- [Supabase](https://supabase.com/) - Backend va ma'lumotlar bazasi
- [Tailwind CSS](https://tailwindcss.com/) - Stillar
- [Shadcn UI](https://ui.shadcn.com/) - UI komponentlar
- [TypeScript](https://www.typescriptlang.org/) - Type xavfsizligi

## O'rnatish

1. Repozitoriyani clone qiling:
```bash
git clone https://github.com/Ahmadjonuz/glasses-
cd glasses-
```

2. Kerakli paketlarni o'rnating:
```bash
npm install
```

3. `.env` faylini yarating va quyidagi o'zgaruvchilarni qo'shing:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

4. Ma'lumotlar bazasini yarating:
```sql
-- Supabase SQL Editorida quyidagi so'rovni bajaring
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  items jsonb not null,
  total_price numeric not null,
  status text not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS politikalarini qo'shish
alter table orders enable row level security;

create policy "Users can view their own orders"
  on orders for select
  using (auth.uid() = user_id);

create policy "Users can insert their own orders"
  on orders for insert
  with check (auth.uid() = user_id);
```

5. Development serverni ishga tushiring:
```bash
npm run dev
```

## Deployment

Loyiha [Vercel](https://vercel.com)da joylashtirilgan. Yangi deploymentni amalga oshirish uchun:

1. Vercel dashboardiga o'ting
2. "Settings" > "Environment Variables" bo'limiga o'ting
3. Quyidagi environment o'zgaruvchilarini qo'shing:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. O'zgarishlarni `main` branchga push qiling - Vercel avtomatik ravishda yangi deploymentni boshlaydi

## Funksionallik

- 👤 Foydalanuvchi autentifikatsiyasi
- 🛍️ Mahsulotlar katalogi
- 🛒 Savat tizimi
- 💳 Buyurtma berish
- 📱 Responsive dizayn
- 🔍 Mahsulotlarni qidirish
- ⭐ Sevimlilarga qo'shish

## Litsenziya

MIT 
