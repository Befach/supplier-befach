// Firebase configuration (using environment variables for production)
// For demo purposes, we'll use placeholder values
export const firebaseConfig = {
  apiKey: "AIzaSyAo5_sSq75D2gmwy1lDYlrUsWGlHCWxrk8",
  authDomain: "supplier-befach.firebaseapp.com",
  projectId: "supplier-befach",
  storageBucket: "supplier-befach.firebasestorage.app",
  messagingSenderId: "933528813253",
  appId: "1:933528813253:web:6bebeb792224580f857aac"

};

// Mock Firebase implementation for demo
export class MockFirestore {
  private suppliers: any[] = [
    {
      id: "1",
      name: "EcoGreen Materials",
      email: "partners@ecogreen.example",
      phone: "+1 (555) 123-4567",
      website: "https://ecogreen-materials.example",
      description: "Sustainable packaging and eco-friendly raw materials supplier with global reach.",
      city: "Portland, OR",
      categories: ["Packaging", "Raw Materials", "Sustainable Products"],
      logo_url: "",
      slug: "ecogreen-materials",
      products: [
        "Fully compostable packaging solutions made from plant-based materials",
        "High-quality paper products made from 100% post-consumer recycled materials",
        "Eco-friendly raw materials sourced from renewable and sustainable sources"
      ],
      partnership_years: 10,
      catalogue_button: "Download EcoGreen Catalogue",
      created_at: new Date("2024-01-15"),
      updated_at: new Date("2024-01-15")
    },
    {
      id: "2", 
      name: "TechParts International",
      email: "contact@techparts.example",
      phone: "+1 (555) 987-6543",
      website: "https://techparts.example",
      description: "Premium electronics components and precision manufacturing parts.",
      city: "Munich, Germany",
      categories: ["Electronics", "Manufacturing"],
      logo_url: "",
      slug: "techparts-international",
      products: [
        "High-performance microprocessors and integrated circuits",
        "Precision-engineered connectors and cables",
        "Custom PCB design and manufacturing services"
      ],
      partnership_years: 10,
      catalogue_button: "View Product Catalogue",
      created_at: new Date("2024-01-20"),
      updated_at: new Date("2024-01-20")
    },
    {
      id: "3",
      name: "GlobalTextiles Co.",
      email: "sales@globaltextiles.example", 
      phone: "+1 (555) 456-7890",
      website: "https://globaltextiles.example",
      description: "High-quality textiles and fabrics from sustainable sources worldwide.",
      city: "Mumbai, India",
      categories: ["Textiles", "Fabrics"],
      logo_url: "",
      slug: "globaltextiles-co",
      products: [
        "Premium organic cotton fabrics",
        "Sustainable bamboo textile products",
        "Custom fabric dyeing and printing services"
      ],
      partnership_years: 10,
      catalogue_button: "Browse Textile Catalogue",
      created_at: new Date("2024-02-01"),
      updated_at: new Date("2024-02-01")
    },
    {
      id: "4",
      name: "Precision Metals",
      email: "info@precisionmetals.example",
      phone: "+1 (555) 321-0987", 
      website: "https://precisionmetals.example",
      description: "High-grade metal components and custom fabrication services.",
      city: "Detroit, MI",
      categories: ["Manufacturing", "Raw Materials"],
      logo_url: "",
      slug: "precision-metals",
      products: [
        "CNC machined aluminum and steel components",
        "Custom metal fabrication and welding services",
        "High-grade alloy materials for aerospace applications"
      ],
      partnership_years: 10,
      catalogue_button: "Metal Products Catalogue",
      created_at: new Date("2024-02-10"),
      updated_at: new Date("2024-02-10")
    },
    {
      id: "5",
      name: "Organic Harvest",
      email: "orders@organicharvest.example",
      phone: "+1 (555) 654-3210",
      website: "https://organicharvest.example", 
      description: "Certified organic food ingredients from sustainable farms.",
      city: "Sacramento, CA",
      categories: ["Food", "Organic", "Agriculture"],
      logo_url: "",
      slug: "organic-harvest",
      products: [
        "Certified organic grains and cereals",
        "Fresh organic vegetables and herbs",
        "Organic dairy products and free-range eggs"
      ],
      partnership_years: 10,
      catalogue_button: "Organic Products Catalogue",
      created_at: new Date("2024-02-15"),
      updated_at: new Date("2024-02-15")
    },
    {
      id: "6",
      name: "ChemTech Solutions",
      email: "support@chemtech.example", 
      phone: "+1 (555) 789-0123",
      website: "https://chemtech.example",
      description: "Specialized chemical compounds for industrial and laboratory applications.",
      city: "Boston, MA",
      categories: ["Manufacturing", "Raw Materials"],
      logo_url: "",
      slug: "chemtech-solutions",
      products: [
        "Industrial-grade chemical compounds and solvents",
        "Laboratory reagents and analytical standards",
        "Custom chemical synthesis and formulation services"
      ],
      partnership_years: 10,
      catalogue_button: "Chemical Products Catalogue",
      created_at: new Date("2024-02-20"),
      updated_at: new Date("2024-02-20")
    }
  ];

  async getSuppliers(filters?: any) {
    let filtered = [...this.suppliers];
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(search) ||
        s.description.toLowerCase().includes(search) ||
        s.city.toLowerCase().includes(search)
      );
    }
    
    if (filters?.categories?.length) {
      filtered = filtered.filter(s => 
        s.categories.some(cat => filters.categories.includes(cat))
      );
    }
    
    if (filters?.city) {
      filtered = filtered.filter(s => s.city === filters.city);
    }
    
    return filtered;
  }

  async getSupplierBySlug(slug: string) {
    return this.suppliers.find(s => s.slug === slug);
  }

  async addSupplier(supplier: any) {
    const newSupplier = {
      ...supplier,
      id: Date.now().toString(),
      slug: supplier.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      partnership_years: supplier.partnership_years || 10,
      created_at: new Date(),
      updated_at: new Date()
    };
    this.suppliers.push(newSupplier);
    return newSupplier;
  }

  async updateSupplier(id: string, updates: any) {
    const index = this.suppliers.findIndex(s => s.id === id);
    if (index !== -1) {
      this.suppliers[index] = {
        ...this.suppliers[index],
        ...updates,
        updated_at: new Date()
      };
      return this.suppliers[index];
    }
    throw new Error('Supplier not found');
  }

  async deleteSupplier(id: string) {
    const index = this.suppliers.findIndex(s => s.id === id);
    if (index !== -1) {
      this.suppliers.splice(index, 1);
      return true;
    }
    throw new Error('Supplier not found');
  }

  async bulkAddSuppliers(suppliers: any[]) {
    const newSuppliers = suppliers.map(supplier => ({
      ...supplier,
      id: Date.now().toString() + Math.random(),
      slug: supplier.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      partnership_years: supplier.partnership_years || 10,
      created_at: new Date(),
      updated_at: new Date()
    }));
    this.suppliers.push(...newSuppliers);
    return newSuppliers;
  }
}

export const db = new MockFirestore();
