import { useEffect, useState } from 'react'
import { Image, Package, Plus, Tag, X } from 'lucide-react'

const initialForm = { name: '', price: '', image: '' }

function ProductFormModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      await onSubmit({ ...form, price: Number(form.price) })
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='fixed inset-0 z-50 grid place-items-center bg-black/70 px-4' role='presentation' onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className='w-full max-w-md rounded-xl border border-base-content/10 bg-base-100 p-6 shadow-2xl' role='dialog' aria-modal='true' aria-labelledby='add-product-title'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 id='add-product-title' className='text-xl font-bold'>Add New Product</h2>
          <button type='button' onClick={onClose} className='btn btn-circle btn-ghost btn-sm' aria-label='Close'>
            <X className='size-4' />
          </button>
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <label className='form-control'>
            <span className='mb-2 text-sm font-medium'>Product Name</span>
            <div className='input input-bordered flex items-center gap-2'>
              <Package className='size-4 opacity-60' />
              <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder='Enter product name' className='grow' />
            </div>
          </label>
          <label className='form-control'>
            <span className='mb-2 text-sm font-medium'>Price</span>
            <div className='input input-bordered flex items-center gap-2'>
              <Tag className='size-4 opacity-60' />
              <input required min='0.01' step='0.01' type='number' value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder='0.00' className='grow' />
            </div>
          </label>
          <label className='form-control'>
            <span className='mb-2 text-sm font-medium'>Image URL</span>
            <div className='input input-bordered flex items-center gap-2'>
              <Image className='size-4 opacity-60' />
              <input required type='url' value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} placeholder='https://example.com/image.jpg' className='grow' />
            </div>
          </label>
          <div className='mt-6 flex justify-end gap-3'>
            <button type='button' onClick={onClose} className='btn btn-ghost'>Cancel</button>
            <button type='submit' disabled={submitting} className='btn btn-primary'>
              {submitting ? <span className='loading loading-spinner loading-sm' /> : <Plus className='size-4' />}
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductFormModal
