import PropTypes from 'prop-types'

const defaultCurrenties = ['RUB', 'USD', 'EUR', 'GBP']

export const Block = ({ value, currency, onChangeValue, onChangeCurrency }) => {
	return (
		<div className='block'>
			<ul className='currencies'>
				{defaultCurrenties.map(cur => (
					<li
						onClick={() => onChangeCurrency(cur)}
						className={currency === cur ? 'active' : ''}
						key={cur}
					>
						{cur}
					</li>
				))}
				<li>
					<svg height='50px' viewBox='0 0 50 50' width='50px'>
						<rect fill='none' height='50' width='50' />
						<polygon points='25,35 15,20 35,20' fill='#000' />
					</svg>
				</li>
			</ul>
			<input
				type='number'
				onChange={e => onChangeValue(e.target.value)}
				value={value}
				placeholder={0}
			/>
		</div>
	)
}

Block.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	currency: PropTypes.string.isRequired,
	onChangeValue: PropTypes.func.isRequired,
	onChangeCurrency: PropTypes.func.isRequired,
}
