import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Supplier } from '@/types/supplier';
import { X, Plus } from 'lucide-react';

interface SupplierFormProps {
  initialData?: Partial<Supplier>;
  onSubmit: (data: Partial<Supplier>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const steps = [
  'Business Details',
  'Contact Info',
  'Partnership Info',
  'Categories & Products',
];

export const SupplierForm: React.FC<SupplierFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    website: initialData?.website || '',
    description: initialData?.description || '',
    city: initialData?.city || '',
    categories: initialData?.categories?.join(', ') || '',
    logo_url: initialData?.logo_url || '',
    partnership_years: initialData?.partnership_years || 10,
    catalogue_file_url: initialData?.catalogue_file_url || '',
    founded: initialData?.founded || '',
    total_exports: initialData?.total_exports || '',
    last_year_exports: initialData?.last_year_exports || '',
  });
  const [products, setProducts] = useState<string[]>(initialData?.products || []);
  const [newProduct, setNewProduct] = useState('');
  const [step, setStep] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categories = formData.categories
      .split(',')
      .map(cat => cat.trim())
      .filter(cat => cat.length > 0);
    onSubmit({
      ...formData,
      founded: formData.founded,
      total_exports: formData.total_exports,
      last_year_exports: formData.last_year_exports,
      categories,
      products: products.filter(product => product.trim().length > 0)
    });
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addProduct = () => {
    if (newProduct.trim() && !products.includes(newProduct.trim())) {
      setProducts([...products, newProduct.trim()]);
      setNewProduct('');
    }
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // Step content rendering
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                placeholder="Company name"
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="City location"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Brief description of the company..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="logo_url">Logo URL</Label>
              <Input
                id="logo_url"
                type="url"
                value={formData.logo_url}
                onChange={(e) => handleChange('logo_url', e.target.value)}
                placeholder="https://example.com/logo.jpg"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://company.com"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="contact@company.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1-555-0123"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="founded">Founded Year</Label>
              <Input
                id="founded"
                type="number"
                value={formData.founded}
                onChange={(e) => handleChange('founded', parseInt(e.target.value) || '')}
                placeholder="2015"
                min="1800"
              />
            </div>
            <div>
              <Label htmlFor="total_exports">Total Exports</Label>
              <Input
                id="total_exports"
                type="number"
                value={formData.total_exports}
                onChange={(e) => handleChange('total_exports', parseInt(e.target.value) || '')}
                placeholder="50"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="last_year_exports">Last Year Exports</Label>
              <Input
                id="last_year_exports"
                type="number"
                value={formData.last_year_exports}
                onChange={(e) => handleChange('last_year_exports', parseInt(e.target.value) || '')}
                placeholder="32"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="partnership_years">Partnership Duration (Years)</Label>
              <Input
                id="partnership_years"
                type="number"
                value={formData.partnership_years}
                onChange={(e) => handleChange('partnership_years', parseInt(e.target.value) || 10)}
                placeholder="10"
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="catalogue_file_url">Catalogue File URL</Label>
              <Input
                id="catalogue_file_url"
                type="url"
                value={formData.catalogue_file_url}
                onChange={(e) => handleChange('catalogue_file_url', e.target.value)}
                placeholder="https://example.com/catalogue.pdf"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="categories">Categories</Label>
              <Input
                id="categories"
                value={formData.categories}
                onChange={(e) => handleChange('categories', e.target.value)}
                placeholder="IT Equipment, Technology, Software (comma separated)"
              />
            </div>
            <div>
              <Label htmlFor="products">Products & Services</Label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    placeholder="Add a product or service..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProduct())}
                  />
                  <Button type="button" onClick={addProduct} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {products.length > 0 && (
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {products.map((product, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <span className="flex-1 text-sm">{product}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProduct(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {steps.map((label, idx) => (
          <div key={label} className="flex items-center">
            <div
              className={`rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold
                ${idx === step ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              {idx + 1}
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-8 h-1 ${idx < step ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 p-1">
        {renderStep()}
        <div className="flex justify-between pt-4 border-t bg-white sticky bottom-0">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <div className="flex gap-2">
            {step > 0 && (
              <Button type="button" variant="secondary" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button type="button" onClick={() => setStep(step + 1)} disabled={isLoading || (step === 0 && !formData.name.trim())}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !formData.name.trim()}>
                {isLoading ? 'Saving...' : 'Save Supplier'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
