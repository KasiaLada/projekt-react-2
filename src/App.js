import { useState } from 'react';
import './App.css';

const url = 'https://api.nbp.pl/api/exchangerates/rates/a/';

function App() {
	const [result, setResult] = useState('0.00');
	const handleSubmit = (event) => {
		event.preventDefault();
		const amount = Number(event.currentTarget.elements.amount.value);
		const currency = event.currentTarget.elements.currency.value;
		fetch(`${url}/${currency}`)
			.then((response) => response.json())
			.then((data) => {
				const mid = data?.rates[0]?.mid;

				if (!mid) {
					window.alert('Błąd pobierania danych z NBP');
					return;
				}

				setResult((amount * mid).toFixed(2));
			})
			.catch(() => window.alert('Błąd pobierania danych z NBP'));
	};
	return (
		<div>
			<h1>Przelicznik walut</h1>
			<form onSubmit={handleSubmit} class='container'>
				<input name='amount' type='number' placeholder='Wpisz kwotę' min='0.01' step='0.01' />
				<select name='currency'>
					<option value='eur'>EUR</option>
					<option value='usd'>USD</option>
					<option value='chf'>CHF</option>
				</select>
				<button type='submit'>Przelicz</button>
				<p class='result'>
					To <span id='calculateResult'>{result}</span> PLN
				</p>
			</form>
		</div>
	);
}

export default App;
