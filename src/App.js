import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import Products from './Components/Products';
import Cart from './Components/Cart';
import Errorpage from './Components/Errorpage';
import Signup from './Components/Signup';
import Login from './Components/Login';

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Home />,
      errorElement: <Errorpage />,
      children: [
        { path: 'products', element: <Products />, index: true },
        { path: 'cart', element: <Cart /> },
        { path: 'signup', element: <Signup /> },
        { path: 'login', element: <Login /> }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
