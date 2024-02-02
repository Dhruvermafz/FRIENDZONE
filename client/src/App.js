import logo from "./logo.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/routes";
import { ChakraProvider } from "@chakra-ui/react";
import { MyContextProvier } from "./context/MyContext";
import "./pages/custom-scrollbar.css";
import socketIOClient from "socket.io-client";
import { REACT_APP_API_URL } from "./utils/config";
import { Provider } from "react-redux";
import store from "./store";
const socket = socketIOClient(REACT_APP_API_URL);
function App() {
  return (
    <Provider store={store}>
      <MyContextProvier socket={socket}>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </MyContextProvier>
    </Provider>
  );
}

export default App;
