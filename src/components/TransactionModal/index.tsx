import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import { Container, TransactionType, RadioBox } from "./styles";
import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import { useTransactions } from '../../hooks/useTransactions';

interface TransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function TransactionModal({ isOpen, onRequestClose }: TransactionModalProps) {
    const { createTransaction } = useTransactions();

    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    async function handleCreateTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title, amount: value, category, type
        })

        setTitle('');
        setValue(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}
            overlayClassName='react-modal-overlay'
            className='react-modal-content'>

            <button type="button" onClick={onRequestClose} className="react-modal-close"><img src={closeImg} alt="Fechar" /></button>
            <Container onSubmit={handleCreateTransaction}>
                <h2>Cadastrar transação</h2>
                <input placeholder="Título" onChange={event => setTitle(event.target.value)} />
                <input type="number" placeholder="Valor" onChange={event => setValue(Number(event.target.value))} />
                <TransactionType>
                    <RadioBox
                        isActive={type === 'deposit'}
                        onClick={() => { setType('deposit') }}
                        type="button"
                        activeColor="green">
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        isActive={type === 'withdraw'}
                        onClick={() => { setType('withdraw') }}
                        type="button"
                        activeColor="red">
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionType>
                <input placeholder="Categoria" onChange={event => setCategory(event.target.value)} />
                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}