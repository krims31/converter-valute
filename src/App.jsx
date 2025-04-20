import { useEffect, useState } from 'react'
import './App.css'
import { Block } from './components/Block'
import './index.css'

function App() {
	const [fromCurrency, setFromCurrency] = useState('RUB')
	const [toCurrency, setToCurrency] = useState('USD')
	const [fromPrice, setFromPrice] = useState(1)
	const [toPrice, setToPrice] = useState(0)
	const [rates, setRates] = useState({})

	useEffect(() => {
		fetch('https://www.cbr-xml-daily.ru/latest.js')
			.then(res => res.json())
			.then(json => {
				const updatedRates = { ...json.rates, RUB: 1 }
				setRates(updatedRates)
				onChangeFromPrice(1)
			})
			.catch(err => {
				console.warn(err)
				alert('Не удалось получить информацию')
			})
	}, [])

	const onChangeFromPrice = value => {
		if (!rates[fromCurrency] || !rates[toCurrency]) return

		const price = value / rates[fromCurrency]
		const result = price * rates[toCurrency]
		setToPrice(result.toFixed(3))
		setFromPrice(value)
	}

	const onChangeToPrice = value => {
		if (!rates[fromCurrency] || !rates[toCurrency]) return

		const result = (rates[fromCurrency] / rates[toCurrency]) * value
		setFromPrice(result.toFixed(3))
		setToPrice(value)
	}

	useEffect(() => {
		if (Object.keys(rates).length > 0) {
			onChangeFromPrice(fromPrice)
		}
	}, [fromCurrency, rates])

	useEffect(() => {
		if (Object.keys(rates).length > 0) {
			onChangeToPrice(toPrice)
		}
	}, [toCurrency, rates])

	return (
		<>
			<div className='App'>
				<Block
					value={fromPrice}
					currency={fromCurrency}
					onChangeCurrency={setFromCurrency}
					onChangeValue={onChangeFromPrice}
				/>
				<Block
					value={toPrice}
					currency={toCurrency}
					onChangeCurrency={setToCurrency}
					onChangeValue={onChangeToPrice}
				/>
			</div>
		</>
	)
}

export default App
