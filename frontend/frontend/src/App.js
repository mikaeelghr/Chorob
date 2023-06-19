import React, {useEffect, lazy, Suspense} from "react";
import {Router, Route, BrowserRouter, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductSearchResults from "./pages/ProductSearchResults";
import Test from "./Test";
import ProductPage from "./pages/ProductPage";
import categories from './static/categoriesWithChild.json'
import CategoriesPopOver from "./components/category/CategoriesPopOver";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import { createTheme, responsiveFontSizes, ThemeProvider, Typography } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const theme = createTheme({
   typography: {
    "fontFamily": `"Vazirmatn"`,
    "fontSize": 14,
   },
   components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: Vazirmatn;
          src: url('fonts/webfonts/Vazirmatn-Thin.woff2') format('woff2');
          font-weight: 100;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: Vazirmatn;
          src: url('fonts/webfonts/Vazirmatn-ExtraLight.woff2') format('woff2');
          font-weight: 200;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: Vazirmatn;
          src: url('fonts/webfonts/Vazirmatn-Light.woff2') format('woff2');
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: Vazirmatn;
          src: url('fonts/webfonts/Vazirmatn-Regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: Vazirmatn;
          src: url('fonts/webfonts/Vazirmatn-Medium.woff2') format('woff2');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: Vazirmatn;
          src: url('fonts/webfonts/Vazirmatn-SemiBold.woff2') format('woff2');
          font-weight: 600;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: Vazirmatn;
          src: url('fonts/webfonts/Vazirmatn-Bold.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: Vazirmatn;
          src: url('fonts/webfonts/Vazirmatn-ExtraBold.woff2') format('woff2');
          font-weight: 800;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: Vazirmatn;
          src: url('fonts/webfonts/Vazirmatn-Black.woff2') format('woff2');
          font-weight: 900;
          font-style: normal;
          font-display: swap;
        }

      `,
    },
  },
});

// const Home = lazy(() => import("./pages/Home"));


const App = () => {

    return (
        <>
        <ThemeProvider theme={theme}>
           <CssBaseline />
           <BrowserRouter>
                <Routes>
                    {/*<Route exact path="/" element={<CategoriesPopOver data={categories.categories}/>}/>*/}
                    {/*<Route exact path="/" element={<Test data={categories.categories}/>}/>*/}
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/sign-up" element={<SignUp/>}/>
                    <Route exact path="/sign-in" element={<SignIn/>}/>
                    <Route path="/products" element={<ProductSearchResults/>}/>
                    <Route path="/products/productPage" element={<ProductPage/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>

        </>
    );
};

export default App;