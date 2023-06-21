// import * as React from "react";
// import {
//   QueryClient,
//   QueryClientProvider,
//   useInfiniteQuery
// } from "react-query";
// import { TableVirtuoso } from "react-virtuoso";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import TableBody from "@mui/material/TableBody";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// // import axios from "axios";
// import { columns } from "./mock";
// import { Button, Skeleton, Stack } from "@mui/material";

// const queryClient = new QueryClient();

// const VirtuosoTableComponents = {
//   Scroller: React.forwardRef((props, ref) => {
//     console.log(ref);
//     return <TableContainer component={Paper} {...props} ref={ref} />;
//   }),
//   TableHead,
//   Table: (props) => (
//     <Table
//       {...props}
//       sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
//     />
//   ),
//   TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
//   TableBody: React.forwardRef((props, ref) => (
//     <TableBody {...props} ref={ref} />
//   ))
// };

// function ReactVirtualizedTable() {
//   const [open, setOpen] = React.useState(false);
//   const [totalCount, setTotalCount] = React.useState(0);
//   const mountRef = React.useRef(false);

//   const fetchCharacters = async ({ pageParam = 1 }) => {
//     await new Promise((resolve) => setTimeout(resolve, 0)); // Atraso de 1500ms
//     const response = await axios.get(
//       `https://rickandmortyapi.com/api/character?page=${pageParam}`
//     );
//     return response.data;
//   };

//   const {
//     data,
//     fetchNextPage,
//     isFetchingNextPage,
//     isError,
//     isLoading
//   } = useInfiniteQuery("characters", fetchCharacters, {
//     getNextPageParam: (lastPage) => {
//       return lastPage.info.next ? lastPage.info.next.slice(-1) : null;
//     },
//     queryClient,
//     refetchOnWindowFocus: false
//   });

//   React.useEffect(() => {
//     if (data) {
//       console.log(data.pages[0].info.count);
//       setTotalCount(data.pages[0].info.count);
//     }
//   }, [data]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error fetching data</div>;
//   }

//   const rows = data.pages.flatMap((page) => page.results);

//   function fixedHeaderContent() {
//     return (
//       <TableRow>
//         <TableCell
//           variant="head"
//           sx={{
//             backgroundColor: "background.paper",
//             display: open ? "table-cell" : "none"
//           }}
//         >
//           Checkbox
//         </TableCell>
//         {columns.map((column) => (
//           <TableCell
//             key={column.dataKey}
//             variant="head"
//             align={column.numeric || false ? "right" : "left"}
//             style={{ width: column.width }}
//             sx={{
//               backgroundColor: "background.paper"
//             }}
//           >
//             {column.label}
//           </TableCell>
//         ))}
//       </TableRow>
//     );
//   }

//   const loadMoreItems = async () => {
//     if (!isFetchingNextPage) {
//       await fetchNextPage();
//     }
//   };

//   function itemContent(index) {
//     if (index >= rows.length - 1) {
//       loadMoreItems();
//       return (
//         <>
//           <TableCell sx={{ display: open ? "table-cell" : "none" }}>
//             <Skeleton />
//           </TableCell>
//           {columns.map((column) => (
//             <TableCell
//               key={column.dataKey}
//               align={column.numeric || false ? "right" : "left"}
//             >
//               <Skeleton />
//             </TableCell>
//           ))}
//         </>
//       );
//     }

//     return (
//       <>
//         <TableCell sx={{ display: open ? "table-cell" : "none" }}>
//           Delete
//         </TableCell>
//         {columns.map((column) => (
//           <TableCell
//             key={column.dataKey}
//             align={column.numeric || false ? "right" : "left"}
//           >
//             {rows[index][column.dataKey]}
//           </TableCell>
//         ))}
//       </>
//     );
//   }

//   return (
//     <Paper style={{ width: "100%" }} elevation={0}>
//       <h2>Olá</h2>
//       <Button onClick={() => setOpen(!open)}>Delete</Button>
//       <Stack
//         sx={{ height: "calc(100vh - 200px)", padding: 5, overflow: "auto" }}
//       >
//         <TableVirtuoso
//           components={VirtuosoTableComponents}
//           itemContent={itemContent}
//           totalCount={totalCount}
//           fixedHeaderContent={fixedHeaderContent}
//           // Não copiar inicio

//           // Não copiar final
//         />
//       </Stack>
//     </Paper>
//   );
// }

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ReactVirtualizedTable />
//     </QueryClientProvider>
//   );
// }





"use client";
import React from "react";
import styles from "./../page.module.css";
import Sidebar from "../sidebar/page";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";

interface Data {
  code: number;
  name: string;
  address: number;
  id: number;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width: number;
}

type Sample = [string, number, number, number, number];

const sample: readonly Sample[] = [
  ["Frozen yoghurt", 159, 6.0, 24, 4.0],
  ["Ice cream sandwich", 237, 9.0, 37, 4.3],
  ["Eclair", 262, 16.0, 24, 6.0],
  ["Cupcake", 305, 3.7, 67, 4.3],
  ["Gingerbread", 356, 16.0, 49, 3.9],
];

function createData(
  id: number,
  name: string,
  code: number,
  fat: number,
  address: number,
  protein: number
): Data {
  return { id, name, code, address };
}

const columns: ColumnData[] = [
  {
    width: 20,
    label: "Code",
    dataKey: "code",
    numeric: true,
  },
  {
    width: 50,
    label: "Name",
    dataKey: "name",
  },

  {
    width: 150,
    label: "Address",
    dataKey: "address",
    numeric: true,
  },
];

const rows: Data[] = Array.from({ length: 200 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});

const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "auto" }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "left" : "left"}
          style={{ width: column.width }}
          sx={{
            backgroundColor: "background.paper",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: Data) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? "left" : "left"}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

const ViewLotto = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={styles.container}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div className={styles.branchesTable}>
          <h1 className={styles.textColor}>View Branches</h1>
          <Paper style={{ height: 500, width: "80%" }}>
            <TableVirtuoso
              data={rows}
              components={VirtuosoTableComponents}
              fixedHeaderContent={fixedHeaderContent}
              itemContent={rowContent}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default ViewLotto;
