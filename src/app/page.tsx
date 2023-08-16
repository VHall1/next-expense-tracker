import { Button } from "@radix-ui/themes";
import { Transactions } from "./transactions";
import { PrismaClient } from "@prisma/client";

export default async function Dashboard() {
  const transactions = await getTransactions();
  return (
    <main className="max-w-screen-lg mx-auto px-4 pt-24">
      <div className="flex justify-between">
        <h3 className="text-3xl font-medium">Transactions</h3>
        <Button variant="solid">Add transaction</Button>
      </div>

      <Transactions transactions={transactions} />
    </main>
  );
}

async function getTransactions() {
  const prisma = new PrismaClient();
  return prisma.transaction.findMany();
}
