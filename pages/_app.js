import Link from 'next/link';

const MyApp = ({ Component, pageProps }) => {
  return(
    <>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/products">
        <a>Products</a>
      </Link>
      
      <Component {...pageProps} />
      
      <footer>Zanella was here!</footer>
    </>
  )
}

export default MyApp;