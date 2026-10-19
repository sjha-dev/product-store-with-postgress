import { useEffect, useState } from 'react'
import { ArrowLeft, Image, Package, Save, Tag, Trash2 } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore'

function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { fetchProduct, updateProduct, deleteProduct } = useProductStore()
  const [product, setProduct] = useState(null)
  const [form, setForm] = useState({ name: '', price: '', image: '' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchProduct(id).then((data) => {
      setProduct(data)
      setForm({ name: data.name, price: data.price, image: data.image })
    }).catch((err) => setError(err.message))
  }, [fetchProduct, id])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    try {
      await updateProduct(id, { ...form, price: Number(form.price) })
      navigate('/')
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this product?')) return
    try {
      await deleteProduct(id)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  if (error) return <main className='mx-auto max-w-5xl px-4 py-12'><div className='rounded-2xl border border-error/20 bg-error/10 p-4 text-error'>{error}</div></main>
  if (!product) return <main className='flex justify-center py-24'><span className='loading loading-spinner loading-lg text-primary' /></main>

  return (
    <main className='mx-auto max-w-5xl px-4 py-8 sm:py-12'>
      <Link to='/' className='mb-8 inline-flex items-center gap-2 text-sm font-medium text-base-content/60 transition-colors hover:text-primary'>
        <ArrowLeft className='size-4' /> Back to Products
      </Link>
      <div className='grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch'>
        <div className='group relative min-h-[360px] overflow-hidden rounded-3xl border border-base-content/10 bg-base-100 shadow-xl shadow-base-content/5'>
          <img src={form.image} alt={form.name} className='h-full min-h-[360px] w-full object-cover transition-transform duration-700 group-hover:scale-105' />
          <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent' />
          <div className='absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md'>
            Product preview
          </div>
        </div>
        <form onSubmit={handleSubmit} className='rounded-3xl border border-base-content/10 bg-base-100 p-6 shadow-xl shadow-base-content/5 sm:p-8'>
          <div className='mb-8'>
            <p className='mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary'>Product details</p>
            <h1 className='text-3xl font-bold tracking-tight'>Edit Product</h1>
            <p className='mt-2 text-sm text-base-content/60'>Keep your product information clear and up to date.</p>
          </div>
          <label className='form-control mb-5'>
            <span className='mb-2 text-sm font-semibold'>Product Name</span>
            <div className='input input-bordered flex h-12 items-center gap-3 rounded-xl bg-base-200/50 transition-colors focus-within:border-primary focus-within:bg-base-200'>
              <Package className='size-4 text-base-content/50' />
              <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className='grow bg-transparent' />
            </div>
          </label>
          <label className='form-control mb-5'>
            <span className='mb-2 text-sm font-semibold'>Price</span>
            <div className='input input-bordered flex h-12 items-center gap-3 rounded-xl bg-base-200/50 transition-colors focus-within:border-primary focus-within:bg-base-200'>
              <Tag className='size-4 text-base-content/50' />
              <span className='text-base-content/50'>$</span>
              <input required min='0.01' step='0.01' type='number' value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} className='grow bg-transparent' />
            </div>
          </label>
          <label className='form-control mb-8'>
            <span className='mb-2 text-sm font-semibold'>Image URL</span>
            <div className='input input-bordered flex h-12 items-center gap-3 rounded-xl bg-base-200/50 transition-colors focus-within:border-primary focus-within:bg-base-200'>
              <Image className='size-4 text-base-content/50' />
              <input required type='url' value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} className='grow bg-transparent' />
            </div>
          </label>
          <div className='flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center'>
            <button type='button' onClick={handleDelete} className='btn h-12 flex-1 rounded-xl border border-error/20 bg-error/10 text-error shadow-none transition-all hover:bg-error hover:text-error-content sm:min-w-[170px]'>
              <Trash2 className='size-4' /> Delete Product
            </button>
            <button type='submit' disabled={saving} className='btn btn-primary h-12 flex-1 rounded-xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 sm:min-w-[170px]'>
              {saving ? <span className='loading loading-spinner loading-sm' /> : <Save className='size-4' />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default ProductPage