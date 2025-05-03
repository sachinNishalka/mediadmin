import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import AddStaff from "./pages/AddStaff";
import AssignDuties from "./pages/AssignDuties";
import EditDuties from "./pages/EditDuties";
import AllAppointments from "./pages/AllAppointments";

function Staff() {
  return <div>Staff Page</div>;
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="staff" element={<Staff />} />
            <Route path="staff/add" element={<AddStaff />} />
            <Route path="/staff/duties" element={<AssignDuties />} />
            <Route path="/staff/duties/edit" element={<EditDuties />} />
            <Route path="/appointments" element={<AllAppointments />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
      ></ToastContainer>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
