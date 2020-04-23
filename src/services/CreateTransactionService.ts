import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface requestDTO {

  title: string;

  value: number;

  type: 'income' | 'outcome';
}


class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: requestDTO): Transaction {
    //if para valiar apenas preechimento com 'income' e 'outcome';
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transações validas: income ou outcome')

    }

    const { total } = this.transactionsRepository.getBalance();
    if(type === 'outcome' && total < value){
      throw new Error("Seu saldo é de R$:" + total +
      " FAÇA UM DEPÓSITO PARA CONTINUAR " );
    }
  const transaction = this.transactionsRepository.create({
    title,
    value,
    type,
  });
  return transaction;
  }
}

export default CreateTransactionService;
