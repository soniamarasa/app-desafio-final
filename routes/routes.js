const express = require('express');
const transactionRouter = express.Router();
const service = require('../services/transactionService');

transactionRouter.get('/', async (request, response) => {
  const { query } = request;

  try {
    if (!query.period) {
      throw new Error(
        `É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm`
      );
    }

    const { period } = query;

    //2020-09
    if (period.length !== 7) {
      throw new Error(`Periodo inválido! Use o formato yyyy-mm`);
    }

    //MONGO DB
    const filteredTransactions = await service.getTransactionsFrom(period);

    response.send({
      length: filteredTransactions.length,
      transactions: filteredTransactions,
    });
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });
  }
});

transactionRouter.post('/', async (request, response) => {
  const { body } = request;

  try {
    if (JSON.stringify(body) === '{}') {
      throw new Error(`Conteúdo Inexistente`);
    }

    //MONGO DB
    const { description, value, category, year, month, day, type } = body;
    const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
    const yearMonthDay = `${yearMonth}-${day.toString().padStart(2, '0')}`;

    const postTransaction = {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    };

    const newTransaction = await service.postTransaction(postTransaction);

    response.send({
      status: 'Ok',
      transaction: newTransaction,
    });
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });
  }
});

transactionRouter.put('/', async (request, response) => {
  try {
    throw new Error(`Id inexistente`);
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });
  }
});

transactionRouter.delete('/', async (request, response) => {
  try {
    throw new Error(`Id inexistente`);
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });
  }
});

transactionRouter.put('/:id', async (request, response) => {
  const { body, params } = request;

  try {
    if (JSON.stringify(body) === '{}') {
      throw new Error(`Conteúdo Inexistente`);
    }

    //MONGO DB
    const { description, value, category, year, month, day, type } = body;
    const { id } = params;
    const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
    const yearMonthDay = `${yearMonth}-${day.toString().padStart(2, '0')}`;

    const updateTransaction = {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    };

    const updatedTransaction = await service.updateTransaction(
      id,
      updateTransaction
    );

    response.send({
      status: 'Ok',
      transaction: updatedTransaction,
    });
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });
  }
});

transactionRouter.delete('/:id', async (request, response) => {
  const { params } = request;

  try {
    const { id } = params;
    //MONGO DB
    const didDelete = await service.deleteTransaction(id);

    if (didDelete) {
      response.send({
        status: 'Ok',
        message: `Lançamento de ${id} excluído com sucesso!`,
      });
    } else {
      throw new Error(`Não doi possível excluir`);
    }
  } catch ({ message }) {
    console.log(message);
    response.status(400).send({ error: message });
  }
});

module.exports = transactionRouter;
