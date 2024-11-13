import axios from 'axios';
import fetch from 'node-fetch';

// BSCScan API Key
const bscScanApiKey = process.env.BSC_SCAN_API_KEY;

// TRONSCAN API Key
const tronScanApiKey = process.env.TRON_SCAN_API_KEY;

// Etherscan API Key
const etherScanApiKey = process.env.ETHER_SCAN_API_KEY;

// Helper function to call BSCScan API
export const getBscTransactions = async (walletAddress) => {
    try {
        // Call the BSCScan API to get transaction details
        const response = await axios.get('https://api.bscscan.com/api', {
            params: {
                module: 'account',
                action: 'txlist',
                address: walletAddress,
                startblock: 0,
                endblock: 99999999,
                sort: 'desc',
                apikey: bscScanApiKey
            },
        });

        if (response.data.status === '0') {
            throw new Error(response.data.message || 'No transactions found.');
        }

        return response.data.result;

    } catch (err) {
        console.error('Error calling BSCScan API:', err);
        throw new Error(`Failed to retrieve transactions for wallet address: ${walletAddress}`);
    }
};

// Helper function to call TronScan API for TRON transactions
export const getTronTransactions = async (walletAddress) => {
    try {
        // Call the TronScan API to get transaction details
        const response = await axios.get(`https://api.tronscan.org/api/transaction`, {
            params: {
                address: walletAddress,
                sort: '-timestamp'
            }
        });

        if (response.data.data && response.data.data.length === 0) {
            throw new Error('No transactions found.');
        }

        const transactions = response.data.data.map(tx => ({
            block: tx.block,
            hash: tx.hash,
            timestamp: tx.timestamp,
            fromAddress: tx.ownerAddress,
            toAddress: tx.toAddressList ? tx.toAddressList[0] : null,
            amount: tx.amount,
            token: {
                tokenAbbr: tx.tokenInfo ? tx.tokenInfo.tokenAbbr : 'trx',
                tokenName: tx.tokenInfo ? tx.tokenInfo.tokenName : 'trx',
                tokenLogo: tx.tokenInfo ? tx.tokenInfo.tokenLogo : 'https://static.tronscan.org/production/logo/trx.png'
            },
            contractRet: tx.contractRet,
            result: tx.result
        }));

        return transactions;

    } catch (err) {
        console.error('Error calling TronScan API:', err);
        throw new Error(`Failed to retrieve transactions for wallet address: ${walletAddress}`);
    }
};

// Helper function to call Etherscan API for Ethereum transactions
export const getEthTransactions = async (walletAddress) => {
    try {
        // Call the Etherscan API to get transaction details
        const response = await axios.get(`https://api.etherscan.io/api`, {
            params: {
                module: 'account',
                action: 'txlist',
                address: walletAddress,
                startblock: 0,
                endblock: 99999999,
                // sort: 'desc',
                apikey: etherScanApiKey
            },
        });

        if (response.data.status === '0' || !response.data.result.length) {
            throw new Error('No transactions found or error in response.');
        }

        return response.data.result;

    } catch (err) {
        console.error('Error calling Etherscan API:', err);
        throw new Error(`Failed to retrieve transactions for wallet address: ${walletAddress}`);
    }
};

// Helper function to determine the blockchain using transaction hash
export const determineBlockchain = async (txHash) => {
    try {
        // Check BSCScan
        const bscResponse = await axios.get(`https://api.bscscan.com/api`, {
            params: {
                module: 'proxy',
                action: 'eth_getTransactionByHash',
                txhash: txHash,
                apikey: bscScanApiKey,
            },
        });

        if (bscResponse.data && bscResponse.data.result) {
            return 'BSC';
        }

        // Check Etherscan
        const etherScanResponse = await axios.get(`https://api.etherscan.io/api`, {
            params: {
                module: 'proxy',
                action: 'eth_getTransactionByHash',
                txhash: txHash,
                apiKey: etherScanApiKey,
            }
        });

        if (etherScanResponse.data && etherScanResponse.data.result) {
            return 'ETH';
        }

        // If not found on BSC, check TRONScan
        const tronResponse = await fetch(`https://apilist.tronscanapi.com/api/transaction-info?hash=${txHash}`, {
            method: 'GET',
            headers: {
                'TRON-PRO-API-KEY': tronScanApiKey,
                'Accept': 'application/json'
            }
        });

        if (tronResponse.ok) {
            const responseData = await tronResponse.json();
            if (responseData && responseData.transfersAllList) {
                return 'TRON';
            }
        }

        return null;
    } catch (err) {
        console.error('Error determining blockchain:', err);
        throw new Error('Failed to determine blockchain');
    }
};