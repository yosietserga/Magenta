import '../styles/globals.css'
console.log(process.env);
function MyApp({ Component, pageProps }) {
  const port = process.env.PORT ?? 3000;
  pageProps.port = port;
  return <Component {...pageProps} />
}

export default MyApp
