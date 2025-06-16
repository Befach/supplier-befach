import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Supplier } from '@/types/supplier';
import { Clock, FileText } from 'lucide-react';

interface SupplierCardProps {
  supplier: Supplier;
}

export const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {
  const handleCatalogueDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (supplier.catalogue_file_url) {
      window.open(supplier.catalogue_file_url, '_blank');
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 flex flex-col">
      {/* Mobile Layout (screens < 768px) */}
      <div className="md:hidden">
        {/* Large Image at top for mobile */}
        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
          {supplier.logo_url ? (
            <img
              src={supplier.logo_url}
              alt={supplier.name}
              className="w-24 h-24 rounded-lg object-cover shadow-lg"
              loading="lazy"
            />
          ) : (
            <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-blue-600 font-semibold text-2xl">
                {supplier.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          {/* Company name */}
          <h3 className="text-2xl sm:text-xl font-bold text-gray-900 mb-2 text-center">{supplier.name}</h3>
          
          {/* Location */}
          {supplier.city && (
            <p className="text-base sm:text-sm text-gray-600 mb-3 text-center">{supplier.city}</p>
          )}
          
          {/* Description */}
          {supplier.description && (
            <p className="text-base sm:text-sm text-gray-600 mb-3 line-clamp-3 text-center leading-relaxed">
              {supplier.description}
            </p>
          )}
          
          {/* Tags after description (moved below description) */}
          {supplier.categories.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4 justify-center">
              {supplier.categories.slice(0, 5).map(category => (
                <span
                  key={category}
                  className="px-4 py-2 text-base sm:text-xs bg-orange-50 border border-orange-200 text-orange-700 rounded-lg font-semibold"
                >
                  {category}
                </span>
              ))}
              {supplier.categories.length > 5 && (
                <span className="px-4 py-2 text-base sm:text-xs bg-gray-50 border border-gray-200 text-gray-600 rounded-lg font-semibold">
                  +{supplier.categories.length - 5}
                </span>
              )}
            </div>
          )}
          
          {/* Stats block - three columns side by side */}
          <div className="bg-gray-50 px-3 py-3 rounded-lg mb-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-xs text-gray-600 font-semibold mb-1">Founded</div>
                <div className="text-sm font-bold text-gray-900">{supplier.founded !== undefined && supplier.founded !== null ? supplier.founded : '-'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 font-semibold mb-1">Total Exports</div>
                <div className="text-sm font-bold text-gray-900">{supplier.total_exports !== undefined && supplier.total_exports !== null ? `${supplier.total_exports} shipments` : '-'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 font-semibold mb-1">Last Year Exports</div>
                <div className="text-sm font-bold text-gray-900">{supplier.last_year_exports !== undefined && supplier.last_year_exports !== null ? `${supplier.last_year_exports} shipments` : '-'}</div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-2">
            <Link to={`/supplier/${supplier.slug}`} className="block">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 text-base sm:py-3 sm:text-sm">
                View Details
              </Button>
            </Link>
            
            {supplier.catalogue_file_url && (
              <Button 
                variant="outline" 
                className="w-full text-orange-500 border-orange-500 hover:bg-orange-50 font-semibold py-4 text-base sm:py-3 sm:text-sm"
                onClick={handleCatalogueDownload}
              >
                <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Download Catalogue</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout (screens >= 768px) - Original layout */}
      <div className="hidden md:flex md:flex-col md:h-full">
        <CardHeader className="flex-none">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center space-x-3 min-w-0">
              {supplier.logo_url ? (
                <img
                  src={supplier.logo_url}
                  alt={supplier.name}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  loading="lazy"
                />
              ) : (
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-lg">
                    {supplier.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg truncate">{supplier.name}</CardTitle>
                {supplier.city && (
                  <p className="text-sm text-gray-600 truncate">{supplier.city}</p>
                )}
                {supplier.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {supplier.categories.slice(0, 5).map(category => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full whitespace-nowrap"
                      >
                        {category}
                      </span>
                    ))}
                    {supplier.categories.length > 5 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full whitespace-nowrap">
                        +{supplier.categories.length - 5} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          {supplier.description && (
            <p className="text-gray-600 mb-2 line-clamp-2 text-sm sm:text-base">
              {supplier.description}
            </p>
          )}
          
          {supplier.website && (
            <div className="flex items-center text-xs text-blue-700 mb-1">
              <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="truncate underline hover:text-blue-900">
                {supplier.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          
          {(supplier.email || supplier.phone) && (
            <div className="flex flex-col text-xs text-gray-700 mb-1">
              {supplier.email && <span className="truncate">{supplier.email}</span>}
              {supplier.phone && <span className="truncate">{supplier.phone}</span>}
            </div>
          )}
          
          {supplier.products && supplier.products.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {supplier.products.slice(0, 2).map(product => (
                <span key={product} className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded">
                  {product}
                </span>
              ))}
              {supplier.products.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  +{supplier.products.length - 2} more
                </span>
              )}
            </div>
          )}
          
          <div className="space-y-2 mt-auto">
            <Link to={`/supplier/${supplier.slug}`} className="block">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
            
            {supplier.catalogue_file_url && (
              <Button 
                variant="outline" 
                className="w-full text-orange-500 border-orange-500 hover:bg-orange-50"
                onClick={handleCatalogueDownload}
              >
                <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Download Catalogue</span>
              </Button>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
