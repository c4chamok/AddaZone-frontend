import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Router from "@/routes/router";
import { Provider } from "react-redux";
import { store } from "@/lib/store";


const App = () => (
  <Provider store={store}>
    <TooltipProvider>
      <Sonner />
      <Router/>
    </TooltipProvider>
  </Provider>
);

export default App;
