import ProductDetailView from '@/components/ProductDetailView'

interface ProductDetailPageProps {
  params: {
    id: string
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return <ProductDetailView productId={params.id} />
}