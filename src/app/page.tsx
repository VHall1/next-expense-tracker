import { prisma } from "@/utils/prisma";
import { Button } from "@radix-ui/themes";
import { Transactions } from "./transactions";

export default async function Dashboard() {
  const transactions = await getTransactions();

  return (
    <main className="max-w-screen-lg mx-auto px-4 pt-24">
      <div className="flex justify-between">
        <h3 className="text-3xl font-medium">Transactions</h3>
        <Button variant="solid">Add transaction</Button>
      </div>

      <Transactions
        transactions={transactions.map((transaction) => ({
          id: transaction.id,
          description: transaction.description,
          amount: Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(transaction.amount.toNumber()),
          timestamp: new Intl.DateTimeFormat("en-GB").format(
            transaction.timestamp
          ),
        }))}
      />
    </main>
  );
}

async function getTransactions() {
  return prisma.transaction.findMany();
}
