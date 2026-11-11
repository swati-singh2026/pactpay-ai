"use client";

import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  enableDevValidations,
} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { contracts } from "@/data/contracts";
import type { Contract } from "@/types/contract";

ModuleRegistry.registerModules([AllCommunityModule]);

if (process.env.NODE_ENV !== "production") {
  enableDevValidations();
}

export default function RecentContractsTable() {
  const [contractFilter, setContractFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");

  // Filter Contracts
  const filteredContracts = useMemo(() => {
    return contracts.filter((contract) => {
      const matchesContract =
        contractFilter === "All" || contract.contractStatus === contractFilter;

      const matchesPayment =
        paymentFilter === "All" || contract.paymentStatus === paymentFilter;

      return matchesContract && matchesPayment;
    });
  }, [contractFilter, paymentFilter]);

  // AG Grid Columns
  const columnDefs = useMemo<ColDef<Contract>[]>(
    () => [
      {
        headerName: "Contract",
        field: "contractName",
        flex: 2,
        cellRenderer: (params: any) => (
          <div className="flex items-center gap-2">
            📄
            <span>{params.value}</span>
          </div>
        ),
      },

      {
        headerName: "Client",
        field: "client",
        flex: 1.3,
      },

      {
        headerName: "Freelancer",
        field: "freelancer",
        flex: 1.3,
      },

      {
        headerName: "Escrow",
        field: "escrowAmount",
        flex: 1,
        cellRenderer: (params: any) => (
          <span className="font-semibold text-green-600">
            ${params.value.toLocaleString()}
          </span>
        ),
      },

      {
        headerName: "Milestone",
        field: "milestone",
        flex: 1.5,
      },

      {
        headerName: "AI Risk",
        field: "aiRisk",
        flex: 1,
        cellRenderer: (params: any) => {
          const colors = {
            Low: "bg-green-100 text-green-700",
            Medium: "bg-yellow-100 text-yellow-700",
            High: "bg-red-100 text-red-700",
          };

          return (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                colors[params.value as keyof typeof colors]
              }`}
            >
              {params.value}
            </span>
          );
        },
      },

      {
        headerName: "Payment",
        field: "paymentStatus",
        flex: 1,
        cellRenderer: (params: any) => {
          const colors: Record<string, string> = {
            Locked: "bg-blue-100 text-blue-700",
            Pending: "bg-yellow-100 text-yellow-700",
            Released: "bg-green-100 text-green-700",
            Processing: "bg-purple-100 text-purple-700",
            Completed: "bg-green-100 text-green-700",
          };

          return (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                colors[params.value] || "bg-gray-100 text-gray-700"
              }`}
            >
              {params.value}
            </span>
          );
        },
      },

      {
        headerName: "Status",
        field: "contractStatus",
        flex: 1,
        cellRenderer: (params: any) => {
          const colors: Record<string, string> = {
            Draft: "bg-gray-100 text-gray-700",
            Review: "bg-orange-100 text-orange-700",
            Active: "bg-green-100 text-green-700",
            Pending: "bg-yellow-100 text-yellow-700",
            Completed: "bg-blue-100 text-blue-700",
            Cancelled: "bg-red-100 text-red-700",
          };

          return (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                colors[params.value] || "bg-gray-100 text-gray-700"
              }`}
            >
              {params.value}
            </span>
          );
        },
      },

      {
        headerName: "Due Date",
        field: "dueDate",
        flex: 1.2,
      },
    ],
    [],
  );

  // Clear Filters
  const clearFilters = () => {
    setContractFilter("All");
    setPaymentFilter("All");
  };

  return (
    <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            📑 Recent Smart Contracts
          </h2>

          <p className="mt-2 text-gray-500">
            AI-verified contracts secured with PayPal Escrow.
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          {filteredContracts.length} Contracts
        </span>
      </div>

      {/* Filters */}

      <div className="mb-6 flex flex-wrap items-end gap-4">
        {/* Contract Status Filter */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Contract Status
          </label>

          <select
            value={contractFilter}
            onChange={(e) => setContractFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All Contracts</option>
            <option value="Draft">Draft</option>
            <option value="Review">Review</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Payment Status Filter */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Payment Status
          </label>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All Payments</option>
            <option value="Locked">Locked</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Released">Released</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Clear Filters */}

        <button
          type="button"
          onClick={() => {
            setContractFilter("All");
            setPaymentFilter("All");
          }}
          className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
        >
          Clear Filters
        </button>
      </div>

      {/* AG Grid Table */}

      <div
        className="ag-theme-quartz w-full overflow-x-auto rounded-xl"
        style={{
          height: 450,
          width: "100%",
        }}
      >
        <AgGridReact<Contract>
          rowData={filteredContracts}
          columnDefs={columnDefs}
          animateRows={true}
          pagination={true}
          paginationPageSize={5}
          paginationPageSizeSelector={[5, 10, 20, 50]}
          rowHeight={55}
          headerHeight={55}
          defaultColDef={{
            sortable: true,
            filter: true,
            floatingFilter: true,
            resizable: true,
            flex: 1,
            wrapHeaderText: true,
            autoHeaderHeight: true,
          }}
          theme="legacy"
        />
      </div>
    </section>
  );
}
