import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC, useEffect, useState } from 'react';
import styles from '../styles/BalanceDisplay.module.css';

export const BalanceDisplay: FC = () => {
    const [balance, setBalance] = useState(0);
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    useEffect(() => {
        const upadateBalance = async () => {
            if (publicKey) {
                connection.onAccountChange(publicKey, (accountInfo) => {
                    console.log('Account changed:', accountInfo);
                    setBalance(accountInfo.lamports);
                });
                const balance = await connection.getBalance(publicKey);
                setBalance(balance);
            }
        };
        upadateBalance();
    }, [connection, publicKey]);


    return (
        <div>
            <p className={styles.balanceDisplay}>{publicKey ? `Public Key: ${publicKey.toBase58()}, Balance: ${balance / LAMPORTS_PER_SOL} SOL` : 'Wallet is not connected'}</p>
        </div>
    )
}