"use client";

import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  type ColDef,
} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { contracts } from "@/data/contracts";
import type { Contract } from "@/types/contract";

// ✅ Register modules AFTER all imports
ModuleRegistry.registerModules([AllCommunityModule]);

export default function RecentContractsTable() {
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
          const colors = {
            Locked: "bg-blue-100 text-blue-700",
            Pending: "bg-yellow-100 text-yellow-700",
            Released: "bg-green-100 text-green-700",
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
        headerName: "Status",
        field: "contractStatus",
        flex: 1,
        cellRenderer: (params: any) => {
          const colors = {
            Active: "bg-green-100 text-green-700",
            Review: "bg-orange-100 text-orange-700",
            Completed: "bg-gray-200 text-gray-700",
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
        headerName: "Due Date",
        field: "dueDate",
        flex: 1.2,
      },
    ],
    [],
  );

  return (
    <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            📑 Recent Smart Contracts
          </h2>

          <p className="mt-2 text-gray-500">
            Live AI-verified contracts secured with PayPal Escrow.
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          {contracts.length} Contracts
        </span>
      </div>

      <div
        className="ag-theme-quartz"
        style={{
          height: 420,
          width: "100%",
        }}
      >
        <AgGridReact<Contract>
          rowData={contracts}
          columnDefs={columnDefs}
          animateRows={true}
          pagination={true}
          paginationPageSize={5}
          defaultColDef={{
            sortable: true,
            filter: true,
            floatingFilter: true,
            resizable: true,
            flex: 1,
          }}
        />
      </div>
    </section>
  );
}
