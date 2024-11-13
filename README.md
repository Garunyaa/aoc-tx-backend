# AOC Token Distribution Platform

## Overview

The AOC Transaction Verification Platform consists of a user form to input transaction details and an admin dashboard. Users provide details such as transaction hash, sender's wallet, recipient's wallet, and amount. These details are verified using the BSCScan API to ensure the transaction's legitimacy. Administrators can configure B wallet addresses and monitor the status of fundraising initiatives.

## User Flow

Users will enter the following information on the AOC platform:

1. Identifier Code - Code assigned by the AOC team for each fundraising initiative.
2. A Wallet (Contributor's Wallet) - The sender's wallet address.
3. B Wallet (AOC Wallet) - The AOC recipient wallet address.
4. Transaction Hash - Unique transaction ID from the blockchain.
5. Amount in USDT - Must match the specific amount required for the initiative.
6. Date and Time (GMT+1) - The date and time of the transaction.

Once the user submits the form, an API call is made to BSCScan to verify the transaction details.

## Admin Dashboard

The admin dashboard allows AOC administrators to:

1. Add B Wallets
- Administrators can enter the B wallet address(es) for each initiative.
2. Monitor Transactions
- Administrators can verify and track user transactions.
3. Set Fraud Alerts
- The system will alert users who attempt to input fraudulent data, with potential blacklisting within the AOC system.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Usage](#usage)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js v20.9.0
- MongoDB (Latest version)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Blockchainxtech/AOC-distribution-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd AOC-distribution-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

Before you start, copy the example environment file to create your own configuration file. Run the following commands in the project root:

```bash
cp .env-sample .env
```

# Other Configurations...

```

Replace `your_mongodb_uri`, `your_redis_host`, and `your_redis_port` with your MongoDB connection URI and Redis server details.

```

## Usage

To start the project after the Babel transpilation, use the following command:

```bash
npm start
```

The application will start, and you can access it by navigating to `http://localhost:your_port` in your browser, with `your_port` being the port specified in your environment variables.