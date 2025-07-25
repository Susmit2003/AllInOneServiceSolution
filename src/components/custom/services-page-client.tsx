
// "use client";

// import { useState, useMemo, useTransition, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { ServiceCard } from '@/components/custom/service-card';
// import type { Service } from '@/types';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Filter, Search, X, Star, MapPin, Tag, LayoutGrid, ListFilter, ArrowRight } from 'lucide-react';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
// import { Skeleton } from '@/components/ui/skeleton';
// import Link from 'next/link';
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
//   SheetClose,
//   SheetFooter,
//   SheetDescription
// } from "@/components/ui/sheet";
// import { serviceHierarchy } from '@/lib/constants';

// interface ServicesPageClientProps {
//   initialServices: Service[];
//   initialFilters: {
//     category: string;
//     subcategory: string;
//     searchTerm: string;
//     pincode: string;
//     rating: string;
//   };
// }


// export function ServicesPageClient({ initialServices, initialFilters }: ServicesPageClientProps) {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();

//   const [filters, setFilters] = useState(initialFilters);
//   const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

//   useEffect(() => {
//     setFilters(initialFilters);
//   }, [initialFilters]);

//   const selectedCategoryData = useMemo(() => 
//       serviceHierarchy.find(c => c.query === filters.category),
//       [filters.category]
//   );
  
//   const handleFilterChange = (key: keyof typeof filters, value: string) => {
//     setFilters(prev => ({...prev, [key]: value}));
//   };

//   const updateUrl = () => {
//     const params = new URLSearchParams();
//     if (filters.category) params.set('category', filters.category);
//     if (filters.subcategory) params.set('subcategory', filters.subcategory);
//     if (filters.searchTerm) params.set('searchTerm', filters.searchTerm);
//     if (filters.pincode) params.set('pincode', filters.pincode);
//     if (filters.rating) params.set('rating', filters.rating);
    
//     startTransition(() => {
//       router.push(`/all-services?${params.toString()}`);
//     });
//     setIsFilterSheetOpen(false);
//   };
  
//   const clearFiltersAndUrl = () => {
//     setFilters({ category: '', subcategory: '', searchTerm: '', pincode: '', rating: '' });
//     startTransition(() => {
//       router.push('/all-services');
//     });
//     setIsFilterSheetOpen(false);
//   };

//   const FilterInputs = () => (
//     <>
//       <div className="space-y-1">
//         <Label htmlFor="search-filter" className="text-sm font-medium text-muted-foreground flex items-center"><Search className="w-4 h-4 mr-1" /> Service or Provider</Label>
//         <Input
//           id="search-filter"
//           placeholder="e.g., House Cleaning, Alice Wonderland"
//           value={filters.searchTerm}
//           onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
//           className="h-11 bg-background"
//         />
//       </div>
//       <div className="space-y-1">
//         <Label htmlFor="pincode-filter" className="text-sm font-medium text-muted-foreground flex items-center"><MapPin className="w-4 h-4 mr-1" /> PIN/ZIP Code</Label>
//         <Input
//           id="pincode-filter"
//           placeholder="Enter your PIN/ZIP code"
//           value={filters.pincode}
//           onChange={(e) => handleFilterChange('pincode', e.target.value)}
//           className="h-11 bg-background"
//         />
//       </div>
//        <div className="space-y-1">
//         <Label htmlFor="rating-filter" className="text-sm font-medium text-muted-foreground flex items-center"><Star className="w-4 h-4 mr-1" /> Minimum Rating</Label>
//         <Select 
//           value={filters.rating} 
//           onValueChange={(value) => handleFilterChange('rating', value === 'all' ? '' : value)}
//         >
//           <SelectTrigger id="rating-filter" className="h-11 bg-background">
//             <SelectValue placeholder="Any Rating" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">Any Rating</SelectItem>
//             <SelectItem value="4.5">4.5+ Stars</SelectItem>
//             <SelectItem value="4">4+ Stars</SelectItem>
//             <SelectItem value="3.5">3.5+ Stars</SelectItem>
//             <SelectItem value="3">3+ Stars</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//     </>
//   );

//   const FilterControls = ({ inSheet }: { inSheet?: boolean }) => {
//     if (inSheet) {
//       return (
//         <div className="space-y-4 p-4">
//           <FilterInputs />
//           <SheetFooter className="pt-4">
//             <Button variant="ghost" onClick={() => setFilters({category: filters.category, subcategory: filters.subcategory, searchTerm: '', pincode: '', rating: ''})} className="w-full sm:w-auto">
//               <X className="w-4 h-4 mr-1" /> Clear
//             </Button>
//             <Button onClick={updateUrl} className="w-full sm:w-auto">
//               <ListFilter className="w-4 h-4 mr-1" /> Apply Filters
//             </Button>
//           </SheetFooter>
//         </div>
//       );
//     }
    
//     // For desktop, render inputs and a button that will be placed in a grid.
//     return (
//       <>
//         <FilterInputs />
//         <Button onClick={updateUrl} className="w-full h-11 self-end">
//           <ListFilter className="w-4 h-4 mr-1" /> Update Search
//         </Button>
//       </>
//     );
//   };


//   const Breadcrumbs = () => {
//     if (!filters.category) return null;
//     return (
//       <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
//         <button onClick={clearFiltersAndUrl} className="hover:text-primary">All Categories</button>
//         {selectedCategoryData && (
//           <>
//             <span>/</span>
//             {filters.subcategory ? (
//               <button onClick={() => {
//                   startTransition(() => {
//                     router.push(`/all-services?category=${filters.category}`);
//                   });
//               }} className="hover:text-primary">{selectedCategoryData.name}</button>
//             ) : (
//               <span className="font-semibold text-foreground">{selectedCategoryData.name}</span>
//             )}
//           </>
//         )}
//         {filters.subcategory && selectedCategoryData && (
//           <>
//             <span>/</span>
//             <span className="font-semibold text-foreground">
//                 {selectedCategoryData.subcategories.find(sc => sc.query === filters.subcategory)?.name}
//             </span>
//           </>
//         )}
//       </div>
//     );
//   };
  
//   const getPageTitle = () => {
//     if (filters.subcategory && selectedCategoryData) {
//       return selectedCategoryData.subcategories.find(sc => sc.query === filters.subcategory)?.name || 'Services';
//     }
//     if (selectedCategoryData) {
//       return selectedCategoryData.name;
//     }
//     return 'Browse Services By Category';
//   };
  
//   const getPageDescription = () => {
//     if (filters.category) return "Find top-rated professionals for your needs.";
//     return "Select a category to find top-rated professionals for your home service needs.";
//   }

//   const isLoading = isPending;
//   const services = initialServices;

//   // Determine which view to show based on filters
//   const showMainCategories = !filters.category;
//   const showSubcategories = selectedCategoryData && selectedCategoryData.subcategories.length > 0 && !filters.subcategory;
//   const showServicesList = (selectedCategoryData && selectedCategoryData.subcategories.length === 0) || !!filters.subcategory;

//   return (
//     <div className="container mx-auto py-8">
//       <header className="mb-8">
//          <Breadcrumbs />
//         <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
//           {getPageTitle()}
//         </h1>
//         <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
//           {getPageDescription()}
//         </p>
//       </header>

//       <div className="lg:hidden mb-6 flex justify-end">
//         <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
//           <SheetTrigger asChild>
//             <Button variant="outline" size="lg">
//               <ListFilter className="mr-2 h-5 w-5" /> Filters
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="bottom" className="h-[85vh] flex flex-col">
//             <SheetHeader className="p-4 border-b">
//               <SheetTitle className="text-xl font-headline">Filter Services</SheetTitle>
//               <SheetDescription>Refine your search to find the perfect provider.</SheetDescription>
//             </SheetHeader>
//             <div className="flex-grow overflow-y-auto">
//               <FilterControls inSheet />
//             </div>
//           </SheetContent>
//         </Sheet>
//       </div>
      
//       {filters.category && !showSubcategories && (
//         <>
//           <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 mb-8 p-6 bg-muted/50 dark:bg-muted/20 rounded-xl shadow">
//             <FilterControls />
//           </div>
//           <div className="hidden md:flex justify-end mb-8">
//             <Button variant="ghost" onClick={clearFiltersAndUrl} className="text-sm text-muted-foreground hover:text-primary">
//                 <X className="w-4 h-4 mr-1" /> Clear All Filters
//             </Button>
//           </div>
//         </>
//       )}
      
//       <Separator className="my-8" />

//       {isLoading && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {[...Array(8)].map((_, i) => (
//             <Card key={i} className="overflow-hidden">
//               <Skeleton className="h-48 w-full" />
//               <CardContent className="p-4 space-y-3">
//                 <Skeleton className="h-6 w-3/4 rounded" />
//                 <Skeleton className="h-4 w-1/2 rounded" />
//                 <Skeleton className="h-4 w-full rounded" />
//                 <Skeleton className="h-4 w-2/3 rounded" />
//               </CardContent>
//               <CardFooter className="p-4 border-t">
//                  <Skeleton className="h-10 w-full rounded" />
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}

//       {!isLoading && showMainCategories && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//           {serviceHierarchy.map((category) => (
//             <Link key={category.name} href={`/all-services?category=${category.query}`}>
//               <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col">
//                 <CardHeader className="items-center text-center p-6">
//                   <div className={`p-4 rounded-full ${category.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
//                     <category.icon className={`h-10 w-10 ${category.color}`} />
//                   </div>
//                   <CardTitle className="font-headline text-xl">{category.name}</CardTitle>
//                 </CardHeader>
//                 <CardContent className="flex-grow flex items-end justify-center p-4 pt-0">
//                   <Button variant="ghost" className="text-sm text-primary group-hover:underline">
//                     Explore <ArrowRight className="ml-1 h-4 w-4" />
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       )}
      
//       {!isLoading && showSubcategories && selectedCategoryData && (
//         <div className="mb-12">
//             <h2 className="font-headline text-2xl font-semibold mb-6">Subcategories in {selectedCategoryData.name}</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//               {selectedCategoryData.subcategories.map((subcategory) => (
//                 <Link key={subcategory.name} href={`/all-services?category=${selectedCategoryData.query}&subcategory=${subcategory.query}`}>
//                   <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col">
//                     <CardHeader className="items-center text-center p-6 flex-grow">
//                         {subcategory.icon && (
//                           <div className={`p-3 rounded-full ${selectedCategoryData.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
//                             <subcategory.icon className={`h-8 w-8 ${subcategory.color || selectedCategoryData.color}`} />
//                           </div>
//                         )}
//                         <CardTitle className="font-headline text-lg">{subcategory.name}</CardTitle>
//                     </CardHeader>
//                     <CardContent className="flex-shrink-0 flex items-end justify-center p-4 pt-0">
//                       <Button variant="ghost" className="text-sm text-primary group-hover:underline">
//                         View Services <ArrowRight className="ml-1 h-4 w-4" />
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 </Link>
//               ))}
//             </div>
//           </div>
//       )}

//       {!isLoading && showServicesList && (
//         <>
//           {services.length > 0 ? (
//             <div>
//               <h2 className="font-headline text-2xl font-semibold mb-6">Available Services</h2>
//               <div className="mb-4 text-sm text-muted-foreground">
//                 Showing <span className="font-semibold text-foreground">{services.length}</span> service{services.length === 1 ? '' : 's'}.
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
//                 {services.map(service => (
//                   <ServiceCard key={service.id} service={service} />
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <Card className="text-center py-16 shadow-md col-span-full">
//               <CardHeader>
//                 <LayoutGrid className="mx-auto h-16 w-16 text-primary/50 mb-4" />
//                 <CardTitle className="font-headline text-2xl">No Services Found</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="mt-2 text-muted-foreground">
//                   There are currently no services available matching your criteria.
//                 </p>
//               </CardContent>
//               <CardFooter className="justify-center">
//                 <Button variant="outline" onClick={clearFiltersAndUrl}>
//                     <X className="w-4 h-4 mr-2" /> Clear Filters & View All Categories
//                 </Button>
//               </CardFooter>
//             </Card>
//           )}
//         </>
//       )}

//     </div>
//   );
// }



// services/service/src/components/custom/services-page-client.tsx

"use client";

import { useState, useMemo, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ServiceCard } from '@/components/custom/service-card';
import type { Service } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Search, X, Star, MapPin, Tag, LayoutGrid, ListFilter, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
  SheetDescription
} from "@/components/ui/sheet";
import { serviceHierarchy } from '@/lib/constants';

interface ServicesPageClientProps {
  initialServices: Service[];
  initialFilters: {
    category: string;
    subcategory: string;
    searchTerm: string;
    pincode: string;
    rating: string;
  };
}

// Helper Type for Filters
type Filters = ServicesPageClientProps['initialFilters'];

// -- COMPONENT 1: MOVED OUTSIDE --
// This component now receives filters and the handler function as props.
const FilterInputs = ({ filters, handleFilterChange }: { filters: Filters, handleFilterChange: (key: keyof Filters, value: string) => void }) => (
  <>
    <div className="space-y-1">
      <Label htmlFor="search-filter" className="text-sm font-medium text-muted-foreground flex items-center"><Search className="w-4 h-4 mr-1" /> Service or Provider</Label>
      <Input
        id="search-filter"
        placeholder="e.g., House Cleaning, Alice Wonderland"
        value={filters.searchTerm}
        onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
        className="h-11 bg-background"
      />
    </div>
    <div className="space-y-1">
      <Label htmlFor="pincode-filter" className="text-sm font-medium text-muted-foreground flex items-center"><MapPin className="w-4 h-4 mr-1" /> PIN/ZIP Code</Label>
      <Input
        id="pincode-filter"
        placeholder="Enter your PIN/ZIP code"
        value={filters.pincode}
        onChange={(e) => handleFilterChange('pincode', e.target.value)}
        className="h-11 bg-background"
      />
    </div>
    <div className="space-y-1">
      <Label htmlFor="rating-filter" className="text-sm font-medium text-muted-foreground flex items-center"><Star className="w-4 h-4 mr-1" /> Minimum Rating</Label>
      <Select 
        value={filters.rating} 
        onValueChange={(value) => handleFilterChange('rating', value === 'all' ? '' : value)}
      >
        <SelectTrigger id="rating-filter" className="h-11 bg-background">
          <SelectValue placeholder="Any Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any Rating</SelectItem>
          <SelectItem value="4.5">4.5+ Stars</SelectItem>
          <SelectItem value="4">4+ Stars</SelectItem>
          <SelectItem value="3.5">3.5+ Stars</SelectItem>
          <SelectItem value="3">3+ Stars</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </>
);

// -- COMPONENT 2: MOVED OUTSIDE --
// This component also receives all necessary state and functions as props.
const FilterControls = ({ inSheet = false, filters, handleFilterChange, updateUrl, setFilters }: { 
    inSheet?: boolean,
    filters: Filters, 
    handleFilterChange: (key: keyof Filters, value: string) => void,
    updateUrl: () => void,
    setFilters: React.Dispatch<React.SetStateAction<Filters>>
}) => {
  if (inSheet) {
    return (
      <div className="space-y-4 p-4">
        <FilterInputs filters={filters} handleFilterChange={handleFilterChange} />
        <SheetFooter className="pt-4">
          <Button variant="ghost" onClick={() => setFilters({category: filters.category, subcategory: filters.subcategory, searchTerm: '', pincode: '', rating: ''})} className="w-full sm:w-auto">
            <X className="w-4 h-4 mr-1" /> Clear
          </Button>
          <Button onClick={updateUrl} className="w-full sm:w-auto">
            <ListFilter className="w-4 h-4 mr-1" /> Apply Filters
          </Button>
        </SheetFooter>
      </div>
    );
  }
  
  return (
    <>
      <FilterInputs filters={filters} handleFilterChange={handleFilterChange} />
      <Button onClick={updateUrl} className="w-full h-11 self-end">
        <ListFilter className="w-4 h-4 mr-1" /> Update Search
      </Button>
    </>
  );
};


// -- MAIN COMPONENT --
export function ServicesPageClient({ initialServices, initialFilters }: ServicesPageClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const selectedCategoryData = useMemo(() => 
      serviceHierarchy.find(c => c.query === filters.category),
      [filters.category]
  );
  
  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({...prev, [key]: value}));
  };

  const updateUrl = () => {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.subcategory) params.set('subcategory', filters.subcategory);
    if (filters.searchTerm) params.set('searchTerm', filters.searchTerm);
    if (filters.pincode) params.set('pincode', filters.pincode);
    if (filters.rating) params.set('rating', filters.rating);
    
    startTransition(() => {
      router.push(`/all-services?${params.toString()}`);
    });
    setIsFilterSheetOpen(false);
  };
  
  const clearFiltersAndUrl = () => {
    setFilters({ category: '', subcategory: '', searchTerm: '', pincode: '', rating: '' });
    startTransition(() => {
      router.push('/all-services');
    });
    setIsFilterSheetOpen(false);
  };

  const Breadcrumbs = () => {
    if (!filters.category) return null;
    return (
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
        <button onClick={clearFiltersAndUrl} className="hover:text-primary">All Categories</button>
        {selectedCategoryData && (
          <>
            <span>/</span>
            {filters.subcategory ? (
              <button onClick={() => {
                  startTransition(() => {
                    router.push(`/all-services?category=${filters.category}`);
                  });
              }} className="hover:text-primary">{selectedCategoryData.name}</button>
            ) : (
              <span className="font-semibold text-foreground">{selectedCategoryData.name}</span>
            )}
          </>
        )}
        {filters.subcategory && selectedCategoryData && (
          <>
            <span>/</span>
            <span className="font-semibold text-foreground">
                {selectedCategoryData.subcategories.find(sc => sc.query === filters.subcategory)?.name}
            </span>
          </>
        )}
      </div>
    );
  };
  
  const getPageTitle = () => {
    if (filters.subcategory && selectedCategoryData) {
      return selectedCategoryData.subcategories.find(sc => sc.query === filters.subcategory)?.name || 'Services';
    }
    if (selectedCategoryData) {
      return selectedCategoryData.name;
    }
    return 'Browse Services By Category';
  };
  
  const getPageDescription = () => {
    if (filters.category) return "Find top-rated professionals for your needs.";
    return "Select a category to find top-rated professionals for your home service needs.";
  }

  const isLoading = isPending;
  const services = initialServices;

  const showMainCategories = !filters.category;
  const showSubcategories = selectedCategoryData && selectedCategoryData.subcategories.length > 0 && !filters.subcategory;
  const showServicesList = (selectedCategoryData && selectedCategoryData.subcategories.length === 0) || !!filters.subcategory;

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
         <Breadcrumbs />
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          {getPageTitle()}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          {getPageDescription()}
        </p>
      </header>

      <div className="lg:hidden mb-6 flex justify-end">
        <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="lg">
              <ListFilter className="mr-2 h-5 w-5" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] flex flex-col">
            <SheetHeader className="p-4 border-b">
              <SheetTitle className="text-xl font-headline">Filter Services</SheetTitle>
              <SheetDescription>Refine your search to find the perfect provider.</SheetDescription>
            </SheetHeader>
            <div className="flex-grow overflow-y-auto">
              <FilterControls 
                inSheet 
                filters={filters}
                handleFilterChange={handleFilterChange}
                updateUrl={updateUrl}
                setFilters={setFilters}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {filters.category && !showSubcategories && (
        <>
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 mb-8 p-6 bg-muted/50 dark:bg-muted/20 rounded-xl shadow">
            <FilterControls 
              filters={filters}
              handleFilterChange={handleFilterChange}
              updateUrl={updateUrl}
              setFilters={setFilters}
            />
          </div>
          <div className="hidden md:flex justify-end mb-8">
            <Button variant="ghost" onClick={clearFiltersAndUrl} className="text-sm text-muted-foreground hover:text-primary">
                <X className="w-4 h-4 mr-1" /> Clear All Filters
            </Button>
          </div>
        </>
      )}
      
      <Separator className="my-8" />

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4 rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
              </CardContent>
              <CardFooter className="p-4 border-t">
                 <Skeleton className="h-10 w-full rounded" />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && showMainCategories && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {serviceHierarchy.map((category) => (
            <Link key={category.name} href={`/all-services?category=${category.query}`}>
              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col">
                <CardHeader className="items-center text-center p-6">
                  <div className={`p-4 rounded-full ${category.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className={`h-10 w-10 ${category.color}`} />
                  </div>
                  <CardTitle className="font-headline text-xl">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex items-end justify-center p-4 pt-0">
                  <Button variant="ghost" className="text-sm text-primary group-hover:underline">
                    Explore <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
      
      {!isLoading && showSubcategories && selectedCategoryData && (
        <div className="mb-12">
            <h2 className="font-headline text-2xl font-semibold mb-6">Subcategories in {selectedCategoryData.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {selectedCategoryData.subcategories.map((subcategory) => (
                <Link key={subcategory.name} href={`/all-services?category=${selectedCategoryData.query}&subcategory=${subcategory.query}`}>
                  <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col">
                    <CardHeader className="items-center text-center p-6 flex-grow">
                        {subcategory.icon && (
                          <div className={`p-3 rounded-full ${selectedCategoryData.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <subcategory.icon className={`h-8 w-8 ${subcategory.color || selectedCategoryData.color}`} />
                          </div>
                        )}
                        <CardTitle className="font-headline text-lg">{subcategory.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-shrink-0 flex items-end justify-center p-4 pt-0">
                      <Button variant="ghost" className="text-sm text-primary group-hover:underline">
                        View Services <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
      )}

      {!isLoading && showServicesList && (
        <>
          {services.length > 0 ? (
            <div>
              <h2 className="font-headline text-2xl font-semibold mb-6">Available Services</h2>
              <div className="mb-4 text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{services.length}</span> service{services.length === 1 ? '' : 's'}.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
                {services.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          ) : (
            <Card className="text-center py-16 shadow-md col-span-full">
              <CardHeader>
                <LayoutGrid className="mx-auto h-16 w-16 text-primary/50 mb-4" />
                <CardTitle className="font-headline text-2xl">No Services Found</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mt-2 text-muted-foreground">
                  There are currently no services available matching your criteria.
                </p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="outline" onClick={clearFiltersAndUrl}>
                    <X className="w-4 h-4 mr-2" /> Clear Filters & View All Categories
                </Button>
              </CardFooter>
            </Card>
          )}
        </>
      )}

    </div>
  );
}