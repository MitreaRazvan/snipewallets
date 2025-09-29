-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "walletAddress" TEXT,
    "authMethod" TEXT NOT NULL,
    "passwordHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SavedWallet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "nickname" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WalletCache" (
    "walletAddress" TEXT NOT NULL,
    "realizedPnl" DOUBLE PRECISION NOT NULL,
    "unrealizedPnl" DOUBLE PRECISION NOT NULL,
    "totalPnl" DOUBLE PRECISION NOT NULL,
    "roi" DOUBLE PRECISION NOT NULL,
    "winRate" DOUBLE PRECISION NOT NULL,
    "totalTrades" INTEGER NOT NULL,
    "winningTrades" INTEGER NOT NULL,
    "losingTrades" INTEGER NOT NULL,
    "volume24h" DOUBLE PRECISION NOT NULL,
    "volume7d" DOUBLE PRECISION NOT NULL,
    "volume30d" DOUBLE PRECISION NOT NULL,
    "totalVolume" DOUBLE PRECISION NOT NULL,
    "bestToken" TEXT,
    "bestTokenProfit" DOUBLE PRECISION,
    "worstToken" TEXT,
    "worstTokenLoss" DOUBLE PRECISION,
    "avgTradeSize" DOUBLE PRECISION NOT NULL,
    "bestTrade" DOUBLE PRECISION NOT NULL,
    "worstTrade" DOUBLE PRECISION NOT NULL,
    "activeDays" INTEGER NOT NULL,
    "firstTradeDate" TIMESTAMP(3),
    "lastTradeDate" TIMESTAMP(3),
    "solBalance" DOUBLE PRECISION,
    "tokenCount" INTEGER,
    "nftCount" INTEGER,
    "totalGasFees" DOUBLE PRECISION,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rawData" JSONB,

    CONSTRAINT "WalletCache_pkey" PRIMARY KEY ("walletAddress")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "blockTime" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "tokenMint" TEXT NOT NULL,
    "tokenSymbol" TEXT NOT NULL,
    "tokenName" TEXT,
    "tokenLogo" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "pricePerToken" DOUBLE PRECISION NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "realizedPnl" DOUBLE PRECISION,
    "costBasis" DOUBLE PRECISION,
    "solAmount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TokenHolding" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "tokenMint" TEXT NOT NULL,
    "tokenSymbol" TEXT NOT NULL,
    "tokenName" TEXT,
    "tokenLogo" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "costBasis" DOUBLE PRECISION NOT NULL,
    "avgBuyPrice" DOUBLE PRECISION NOT NULL,
    "currentPrice" DOUBLE PRECISION NOT NULL,
    "currentValue" DOUBLE PRECISION NOT NULL,
    "unrealizedPnl" DOUBLE PRECISION NOT NULL,
    "pnlPercentage" DOUBLE PRECISION NOT NULL,
    "portfolioPercent" DOUBLE PRECISION NOT NULL,
    "firstBuyDate" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenHolding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ScrapedWallet" (
    "walletAddress" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "rank" INTEGER,
    "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ScrapedWallet_pkey" PRIMARY KEY ("walletAddress")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "public"."User"("walletAddress");

-- CreateIndex
CREATE INDEX "SavedWallet_userId_idx" ON "public"."SavedWallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedWallet_userId_walletAddress_key" ON "public"."SavedWallet"("userId", "walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_signature_key" ON "public"."Transaction"("signature");

-- CreateIndex
CREATE INDEX "Transaction_walletAddress_idx" ON "public"."Transaction"("walletAddress");

-- CreateIndex
CREATE INDEX "Transaction_tokenMint_idx" ON "public"."Transaction"("tokenMint");

-- CreateIndex
CREATE INDEX "Transaction_blockTime_idx" ON "public"."Transaction"("blockTime");

-- CreateIndex
CREATE INDEX "TokenHolding_walletAddress_idx" ON "public"."TokenHolding"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "TokenHolding_walletAddress_tokenMint_key" ON "public"."TokenHolding"("walletAddress", "tokenMint");

-- AddForeignKey
ALTER TABLE "public"."SavedWallet" ADD CONSTRAINT "SavedWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
