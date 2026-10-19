import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { useProductStore } from '../store/useProductStore'
import ProductFormModal from '../components/ProductFormModal'


function HomePage() {
  const { products, loading, error, fetchProducts, createProduct, deleteProduct } = useProductStore()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    console.log('products', products)
  }, [products])

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) await deleteProduct(id)
  }

  return (
    <main className='mx-auto max-w-5xl px-4 py-8'>
      <div className='mb-8 flex items-center justify-between'>
        <button type='button' onClick={() => setShowModal(true)} className='btn btn-primary gap-2'>
          <Plus className='size-4' /> Add Product
        </button>
        <button type='button' onClick={fetchProducts} className='btn btn-ghost btn-sm' aria-label='Refresh products'>
          <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      {error && <div className='alert alert-error mb-6'>{error}</div>}
      {loading && products.length === 0 ? (
        <div className='flex justify-center py-20'><span className='loading loading-spinner loading-lg' /></div>
      ) : products.length === 0 ? (
        <div className='rounded-xl border border-base-content/10 bg-base-100 px-6 py-16 text-center'>
          <h1 className='text-2xl font-bold'>No products yet</h1>
          <p className='mt-2 opacity-70'>Add your first product to get started.</p>
        </div>
      ) : (
        <section className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3' aria-label='Products'>
          {products.map((product) => (
            <article key={product.id} className='group overflow-hidden rounded-2xl border border-base-content/10 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-base-content/10'>
              <Link to={`/product/${product.id}`} className='relative block aspect-[1.45] overflow-hidden bg-base-200'>
                <img src={product.image} alt={product.name} className='h-full w-full object-cover transition-transform duration-300 hover:scale-105' />
                <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              </Link>
              <div className='p-5'>
                <div className='flex items-start justify-between gap-3'>
                  <h2 className='font-semibold leading-6'>{product.name}</h2>
                  <p className='shrink-0 text-lg font-bold text-primary'>${Number(product.price).toFixed(2)}</p>
                </div>
                <div className='mt-5 flex gap-2'>
                  <Link to={`/product/${product.id}`} className='btn btn-sm flex-1 rounded-lg border-0 bg-base-200 shadow-none hover:bg-primary hover:text-primary-content' aria-label={`Edit ${product.name}`}><Pencil className='size-3.5' /> Edit</Link>
                  <button type='button' onClick={() => handleDelete(product.id)} className='btn btn-sm rounded-lg border-0 bg-error/10 px-3 text-error shadow-none hover:bg-error hover:text-error-content' aria-label={`Delete ${product.name}`}><Trash2 className='size-3.5' /></button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
      {showModal && <ProductFormModal onClose={() => setShowModal(false)} onSubmit={createProduct} />}
    </main>
  )
}

export default HomePage