import React from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'api' });

const PERIODS = [
  '2019-01',
  '2019-02',
  '2019-03',
  '2019-04',
  '2019-05',
  '2019-06',
  '2019-07',
  '2019-08',
  '2019-09',
  '2019-10',
  '2019-11',
  '2019-12',
  '2020-01',
  '2020-02',
  '2020-03',
  '2020-04',
  '2020-05',
  '2020-06',
  '2020-07',
  '2020-08',
  '2020-09',
  '2020-10',
  '2020-11',
  '2020-12',
  '2021-01',
  '2021-02',
  '2021-03',
  '2021-04',
  '2021-05',
  '2021-06',
  '2021-07',
  '2021-08',
  '2021-09',
  '2021-10',
  '2021-11',
  '2021-12',
];

const LIST_SCREEN = 0;
const MAINTENANCE_SCREEN = 1;
const EARNING_COLOR = '#81ecec';
const EXPENSE_COLOR = '#fab1a0';

export default function App() {
  const [transactions, setTransactions] = React.useState([]);
  const [filteredTransactions, setFilteredTransactions] = React.useState([]);
  const [currentPeriod, setCurrentPeriod] = React.useState(PERIODS[0]);
  const [currentScreen, setCurrentScreen] = React.useState(0);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await api.get(`/transaction?period=${currentPeriod}`);
      console.log(data);

      setTransactions(data.transactions);
      setFilteredTransactions(data.transactions);
    };

    fetchTransactions();
  }, [currentPeriod]);

  const handlePeriodChange = (event) => {
    const newPeriod = event.target.value;
    setCurrentPeriod(newPeriod);
  };

const {transactionStyle} = styles;

  return (
    <div className="container">
      <h1 className="center">Desafio Final do Bootcamp Full Stack</h1>

      {currentScreen === LIST_SCREEN ? (
        <>
          <select
            className="browser-default"
            value={currentPeriod}
            onChange={handlePeriodChange}
          >
            {PERIODS.map((period) => {
              return <option key={period}>{period}</option>;
            })}
          </select>

          {filteredTransactions.map((transaction) => {
            const currentColor = transaction.type === '+' ? EARNING_COLOR : EXPENSE_COLOR;
            return (
              <p key={transaction._id} style={{...transactionStyle, backgroundColor: currentColor}}>
                {transaction.yearMonthDay} - {''}
                <strong>{transaction.category}</strong> - {''}
                {transaction.description} - {transaction.value}
              </p>
            );
          })}
        </>
      ) : (
        <p>Tela de manutenção</p>
      )}
    </div>
  );
}


const styles = {
  transactionStyle: {
    padding: '5px',
    margin: '5px',
    border: '1px solid lightgray',
    borderRadius: '5px',
  }
}