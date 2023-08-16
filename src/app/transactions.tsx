"use client";

import { IconButton, Select, Table } from "@radix-ui/themes";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Transaction } from "@prisma/client";

export const Transactions = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <>
      <Table.Root variant="surface" className="mt-4">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {transactions.map((transaction) => (
            <Table.Row key={`transaction-${transaction.id}`}>
              <Table.RowHeaderCell>
                {new Intl.DateTimeFormat("en-GB").format(transaction.timestamp)}
              </Table.RowHeaderCell>
              <Table.Cell>{transaction.description}</Table.Cell>
              <Table.Cell>
                {Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(transaction.amount)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <div className="mt-4 flex justify-between">
        <div className="flex items-center">
          <p className="mr-2">Transactions per page</p>
          <Select.Root value="10">
            <Select.Trigger color="gray" />
            <Select.Content>
              <Select.Group>
                <Select.Item value="10">10</Select.Item>
                <Select.Item value="25">25</Select.Item>
                <Select.Item value="50">50</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>

        <div className="flex gap-4 items-center">
          <p>0-0 of 0</p>
          <IconButton variant="ghost" color="gray" size="3">
            <DoubleArrowLeftIcon height="18" width="18" />
          </IconButton>
          <IconButton variant="ghost" color="gray" size="3">
            <ChevronLeftIcon height="18" width="18" />
          </IconButton>
          <IconButton variant="ghost" color="gray" size="3">
            <ChevronRightIcon height="18" width="18" />
          </IconButton>
          <IconButton variant="ghost" color="gray" size="3">
            <DoubleArrowRightIcon height="18" width="18" />
          </IconButton>
        </div>
      </div>
    </>
  );
};
