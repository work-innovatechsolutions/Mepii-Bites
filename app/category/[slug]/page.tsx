import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { CATEGORIES, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.name);
  const otherCategories = CATEGORIES.filter((c) => c.slug !== category.slug);

  return (
    <div className="py-8 sm:py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-dark uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Snacks</span>
          </Link>
        </div>

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-md mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
            <div className="lg:col-span-7">
              {category.badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  {category.badge}
                </span>
              )}
              <h1 className="editorial-headline text-3xl sm:text-5xl font-black text-dark tracking-tight mb-4">
                {category.name}
              </h1>
              <p className="text-sm sm:text-base text-dark/75 leading-relaxed max-w-xl mb-4">
                {category.description}
              </p>
              <span className="text-xs font-bold text-sage">
                {products.length} hand-crafted recipes available
              </span>
            </div>

            <div className="lg:col-span-5 relative aspect-16/10 sm:aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 shadow-sm">
              <Image
                src={category.image}
                alt={category.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 mb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-dark">
              Available in {category.name}
            </h2>
            <span className="text-xs text-muted font-medium">
              Showing {products.length} items
            </span>
          </div>

          <ProductGrid products={products} />
        </div>

        {/* Other Categories to Explore */}
        <div className="border-t border-stone-200 pt-12">
          <h3 className="font-serif text-xl font-bold text-dark mb-6 text-center sm:text-left">
            Explore Other Crunch Categories
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {otherCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="p-4 bg-white rounded-2xl border border-stone-200/80 hover:border-terracotta/50 hover:shadow-md transition-all group"
              >
                <span className="block text-xs sm:text-sm font-bold text-dark group-hover:text-terracotta transition-colors">
                  {cat.name}
                </span>
                <span className="text-[11px] text-muted block mt-1">
                  {cat.count} items →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
