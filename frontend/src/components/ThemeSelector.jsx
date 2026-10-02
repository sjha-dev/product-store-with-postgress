import { Palette } from 'lucide-react'
import { THEMES } from '../constant'
import { useThemeStore } from '../store/useThemestore'

function ThemeSelector() {
	const { theme: selectedTheme, setTheme } = useThemeStore()

	return (
		<div className='dropdown dropdown-end'>
			<button
				type='button'
				tabIndex={0}
				aria-label='Choose theme'
				className='btn btn-ghost btn-sm gap-2 px-2 text-base-content'
			>
				<Palette className='size-5' />
				<span className='hidden sm:inline'>ThemeSelector</span>
			</button>
			<ul
				tabIndex={0}
				className='menu dropdown-content z-[1] mt-2 w-64 gap-1 rounded-box border border-base-content/10 bg-base-100 p-2 shadow-xl'
			>
				{THEMES.map((theme) => (
					<li key={theme.value}>
						<button
							type='button'
								onClick={() => setTheme(theme.value)}
							className={`flex items-center justify-between ${selectedTheme === theme.value ? 'bg-primary/15 text-primary' : ''}`}
						>
							<span className='flex items-center gap-3'>
								<Palette className='size-4' />
								<span>{theme.name}</span>
							</span>
							<span className='flex gap-1' aria-hidden='true'>
								{theme.colors.map((color) => (
									<span
										key={color}
										className='size-3 rounded-full border border-base-content/20'
										style={{ backgroundColor: color }}
									/>
								))}
							</span>
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ThemeSelector
