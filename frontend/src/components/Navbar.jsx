import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, ShoppingCartIcon } from 'lucide-react'
import ThemeSelector from './ThemeSelector'
import { useNotificationStore } from '../store/useNotificationStore'

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false)
  const { notifications, fetchNotifications } = useNotificationStore()

  useEffect(() => {
    fetchNotifications()
    const interval = window.setInterval(fetchNotifications, 30000)
    return () => window.clearInterval(interval)
  }, [fetchNotifications])

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
          <div className='dropdown dropdown-end'>
            <button
              type='button'
              aria-label={`Notifications (${notifications.length})`}
              onClick={() => setShowNotifications(!showNotifications)}
              className='relative rounded-full p-2 transition-colors duration-300 hover:bg-base-300'
            >
              <Bell className='size-6 stroke-[1.8] text-base-content' />
              {notifications.length > 0 && (
                <span className='absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-xs font-bold leading-none text-secondary-content shadow-sm ring-2 ring-base-100'>
                  {notifications.length > 99 ? '99+' : notifications.length}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className='dropdown-content z-50 mt-3 w-80 rounded-box border border-base-content/10 bg-base-100 p-3 shadow-xl'>
                <div className='mb-2 flex items-center justify-between'>
                  <h2 className='font-semibold'>Recent changes</h2>
                  <span className='text-xs text-base-content/60'>Last 24 hours</span>
                </div>
                {notifications.length === 0 ? (
                  <p className='py-4 text-center text-sm text-base-content/60'>No recent changes.</p>
                ) : (
                  <ul className='max-h-72 space-y-2 overflow-y-auto'>
                    {notifications.map((notification) => (
                      <li key={notification.id} className='rounded-lg bg-base-200 px-3 py-2 text-sm'>
                        <p>{notification.message}</p>
                        <time className='text-xs text-base-content/60'>
                          {new Date(notification.created_at).toLocaleString()}
                        </time>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            </div>
          </div>
        </div>
    </header>
  )
}

export default Navbar