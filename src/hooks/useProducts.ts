
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stock: number | null;
  requires_prescription: boolean | null;
  brand: string | null;
  dosage: string | null;
  side_effects: string | null;
  manufacturer: string | null;
  category_id: string | null;
  categories?: {
    name: string;
    icon: string | null;
  };
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name,
            icon
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Product[];
    }
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return data;
    }
  });
}
