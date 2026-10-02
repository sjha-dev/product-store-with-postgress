import { Link, useResolvedPath } from 'react-router-dom'
import { ShoppingBagIcon, ShoppingCartIcon } from 'lucide-react'
import ThemeSelector from './ThemeSelector'

function Navbar() {
  const pathName = useResolvedPath()
  const isHomePage = pathName.pathname === '/'
  return (
    <header className='sticky top-0 z-50 border-b border-base-content/30 bg-base-100'>
      <div className='mx-auto flex h-14 max-w-5xl items-center justify-between px-4'>
        <Link
          to='/'
          aria-label='SS-STORE home'
          className='group inline-flex items-center gap-2 transition-opacity hover:opacity-80'
        >
          <ShoppingCartIcon className='size-7 stroke-[1.8] text-primary' />
          <span className='font-mono text-lg font-semibold tracking-[0.16em] text-primary'>
            SS-STORE
          </span>
        </Link>
        <div className='flex items-center gap-5'>
          <ThemeSelector />
          {isHomePage && (
            <div className='indicator'>
              <button
                type='button'
                aria-label='Shopping cart with 7 items'
                className='rounded-full p-2 transition-colors duration-300 hover:bg-base-300'
              >
                <ShoppingBagIcon className='size-5 stroke-[1.8] text-base-content' />
                <span className='badge badge-sm badge-primary indicator-item'>7</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar