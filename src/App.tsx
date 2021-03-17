import { useState } from 'react';
import Modal from 'react-modal';
import { Header } from "./components/Header/index"
import { Dashboard } from "./components/Dashboard/index"
import { GlobalStyle } from "./styles/global";
import { TransactionModal } from "./components/TransactionModal/index"
import { TransactionsProvider } from "./hooks/useTransactions"

Modal.setAppElement('#root');

export function App() {
    const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);

    function handleOpenNewTransaction() {
        setIsNewTransactionOpen(true)
    }

    function handleCloseNewTransaction() {
        setIsNewTransactionOpen(false)
    }

    return (
        <TransactionsProvider>
            <GlobalStyle />
            <Header onOpenNewTransaction={handleOpenNewTransaction} />
            <TransactionModal isOpen={isNewTransactionOpen} onRequestClose={handleCloseNewTransaction} />
            <Dashboard />
        </TransactionsProvider >
    )
}

