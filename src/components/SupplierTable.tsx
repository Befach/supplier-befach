import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Supplier } from '@/types/supplier';

interface SupplierTableProps {
  suppliers: Supplier[];
  isLoading: boolean;
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: string) => void;
}

export const SupplierTable: React.FC<SupplierTableProps> = ({
  suppliers,
  isLoading,
  onEdit,
  onDelete
}) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 animate-pulse rounded"></div>
        ))}
      </div>
    );
  }

  if (suppliers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No suppliers found</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-x-auto rounded-lg border border-gray-200">
      <div className="min-w-full divide-y divide-gray-200">
        <div className="bg-gray-50">
          <div className="grid grid-cols-12 gap-4 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-2">Logo</div>
            <div className="col-span-2">Name</div>
            <div className="col-span-2">City</div>
            <div className="col-span-2">Categories</div>
            <div className="col-span-1">Years</div>
            <div className="col-span-1">Website</div>
            <div className="col-span-1">Contact</div>
            <div className="col-span-1">Products</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>
        </div>
        <div className="bg-white divide-y divide-gray-200">
          {suppliers.map(supplier => (
            <div key={supplier.id} className="grid grid-cols-12 gap-4 px-4 py-4 hover:bg-gray-50 items-center">
              {/* Logo */}
              <div className="col-span-2 flex items-center">
                {supplier.logo_url ? (
                  <img
                    src={supplier.logo_url}
                    alt={supplier.name}
                    className="w-8 h-8 rounded object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-semibold">
                      {supplier.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              {/* Name */}
              <div className="col-span-2 min-w-0">
                <p className="font-medium truncate">{supplier.name}</p>
              </div>
              {/* City */}
              <div className="col-span-2">
                <p className="text-sm text-gray-900">{supplier.city || '-'}</p>
              </div>
              {/* Categories */}
              <div className="col-span-2">
                <div className="flex flex-wrap gap-1">
                  {supplier.categories.slice(0, 5).map(category => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {category}
                    </span>
                  ))}
                  {supplier.categories.length > 5 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{supplier.categories.length - 5}
                    </span>
                  )}
                </div>
              </div>
              {/* Partnership Years */}
              <div className="col-span-1">
                {supplier.partnership_years ? (
                  <span className="text-xs text-gray-700">{supplier.partnership_years} yrs</span>
                ) : '-'}
              </div>
              {/* Website */}
              <div className="col-span-1">
                {supplier.website ? (
                  <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-700 underline truncate block max-w-[80px]">{supplier.website.replace(/^https?:\/\//, '')}</a>
                ) : '-'}
              </div>
              {/* Contact */}
              <div className="col-span-1 text-xs text-gray-700">
                {supplier.email && <div className="truncate">{supplier.email}</div>}
                {supplier.phone && <div className="truncate">{supplier.phone}</div>}
                {!(supplier.email || supplier.phone) && '-'}
              </div>
              {/* Products */}
              <div className="col-span-1">
                <div className="flex flex-wrap gap-1">
                  {supplier.products && supplier.products.slice(0, 2).map(product => (
                    <span key={product} className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded">
                      {product}
                    </span>
                  ))}
                  {supplier.products && supplier.products.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{supplier.products.length - 2}
                    </span>
                  )}
                  {(!supplier.products || supplier.products.length === 0) && '-'}
                </div>
              </div>
              {/* Actions */}
              <div className="col-span-1 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(supplier)}
                  className="whitespace-nowrap"
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(supplier.id)}
                  className="whitespace-nowrap"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
