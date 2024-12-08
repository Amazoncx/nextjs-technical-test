export type Theme =
  | "light"
  | "dark"
  | "cupcake"
  | "bumblebee"
  | "emerald"
  | "corporate"
  | "synthwave"
  | "retro"
  | "cyberpunk"
  | "valentine"
  | "halloween"
  | "garden"
  | "forest"
  | "aqua"
  | "lofi"
  | "pastel"
  | "fantasy"
  | "wireframe"
  | "black"
  | "luxury"
  | "dracula"
  | "";

export interface ConfigProps {
  appName: string;
  appDescription: string;
  domainName: string;
  crisp: {
    id?: string;
    onlyShowOnRoutes?: string[];
  };
  stripe: {
    plans: {
      isFeatured?: boolean;
      priceId: string;
      name: string;
      description?: string;
      price: number;
      priceAnchor?: number;
      features: {
        name: string;
      }[];
    }[];
  };
  aws?: {
    bucket?: string;
    bucketUrl?: string;
    cdn?: string;
  };
  resend: {
    fromNoReply: string;
    fromAdmin: string;
    supportEmail?: string;
  };
  colors: {
    theme: Theme;
    main: string;
  };
  auth: {
    loginUrl: string;
    callbackUrl: string;
  };
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
};

export type Sortables = 'id'|'name'|'price'|'description'
export const sortableArray: Sortables[] = ['id', 'name', 'price', 'description'];

export interface ProductSort {
  column?: Sortables
  asc?: boolean
}

export interface TableOptions {
  page?: number
  sort?: ProductSort
  filter?: ProductFilter
}

export interface ProductFilter {
  searchString?: string
  minPrice?: number
  maxPrice?: number
}

export type SearchParams = { [key: string]: string | undefined }