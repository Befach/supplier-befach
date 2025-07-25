export interface Supplier {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  description?: string;
  city?: string;
  categories: string[];
  logo_url?: string;
  slug: string;
  products?: string[];
  partnership_years?: number;
  catalogue_file_url?: string;
  founded?: number;
  total_exports?: number;
  last_year_exports?: number;
  created_at: Date;
  updated_at: Date;
}

export interface SupplierFilters {
  search?: string;
  categories?: string[];
  city?: string;
  page?: number;
  limit?: number;
}

export interface CSVSupplier {
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  description?: string;
  city?: string;
  categories?: string;
  partnership_years?: number;
  catalogue_file_url?: string;
}
