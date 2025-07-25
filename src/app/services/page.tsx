
import { getServices } from '@/lib/actions/service.actions';
import { ServicesPageClient } from '@/components/custom/services-page-client';
import { serviceHierarchy } from '@/lib/constants';
import type { Service } from '@/types';

// This is the new Server Component that fetches data
export default async function ServicesPage({ searchParams }: { searchParams?: { [key:string]: string | undefined } }) {
  const categorySlug = searchParams?.category || '';
  const subcategorySlug = searchParams?.subcategory || '';

  const categoryData = serviceHierarchy.find(c => c.query === categorySlug);
  const categoryName = categoryData?.name || '';
  const subcategoryName = categoryData?.subcategories.find(sc => sc.query === subcategorySlug)?.name || '';

  const filters = {
    category: categorySlug,
    subcategory: subcategorySlug,
    searchTerm: searchParams?.searchTerm || '',
    pincode: searchParams?.pincode || '',
    rating: searchParams?.rating || '',
  };

  let initialServices: Service[] = [];
  // Only fetch services if a subcategory is selected, OR if the selected category has NO subcategories.
  if (categorySlug && (subcategorySlug || (categoryData && categoryData.subcategories.length === 0))) {
      initialServices = await getServices({
        category: categoryName,
        subcategory: subcategoryName,
        query: filters.searchTerm,
        pincode: filters.pincode,
        minRating: parseFloat(filters.rating) || undefined,
      });
  }


  return (
    // The client component receives the data and the original slug filters
    <ServicesPageClient 
        initialServices={initialServices} 
        initialFilters={filters} 
    />
  );
}
